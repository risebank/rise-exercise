#!/bin/bash

# Rise Exercise - Docker Runner Script
# This script makes it easy to run the project in Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a service is running
is_service_running() {
    local service_name=$1
    docker-compose ps -q "$service_name" | grep -q .
}

# Function to start service if not running
ensure_service_running() {
    local service_name=$1
    if ! is_service_running "$service_name"; then
        print_status "Service $service_name is not running. Starting it..."
        docker-compose up -d "$service_name"
        sleep 2  # Give it time to start
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  build           Build the Docker images"
    echo "  run             Run the production service"
    echo "  dev             Run the development service"
    echo "  dev-watch       Start development with live reloading"
    echo "  test            Run tests in Docker"
    echo "  classify        Classify a transaction (requires title and amount)"
    echo "  shell           Open a shell in the production container"
    echo "  shell-dev       Open a shell in the development container"
    echo "  clean           Remove containers and images"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build                    # Build Docker images"
    echo "  $0 run                      # Start production service"
    echo "  $0 classify 'Flight to Paris' 1200  # Classify a transaction"
    echo "  $0 test                     # Run tests in Docker"
    echo "  $0 dev-watch                # Start development with live reloading"
    echo "  $0 shell                    # Open shell in production container"
}

# Function to build images
build_images() {
    print_status "Building Docker images..."
    docker-compose build
    print_success "Docker images built successfully!"
}

# Function to run production service
run_production() {
    print_status "Starting production service..."
    docker-compose up -d rise-exercise
    print_success "Production service started!"
    echo "Run '$0 classify \"Title\" amount' to classify a transaction"
}

# Function to run development service
run_development() {
    print_status "Starting development service..."
    docker-compose up -d rise-exercise-dev
    print_success "Development service started!"
}

# Function to run development service with live reloading
run_development_watch() {
    print_status "Starting development service with live reloading..."
    print_status "This will automatically rebuild when you change source code"
    print_status "To run tests, use: ./docker-run.sh test"
    print_status "To open a shell: ./docker-run.sh shell-dev"
    print_status "Press Ctrl+C to stop watching"
    
    # Start the development service in the background
    docker-compose up -d rise-exercise-dev
    
    # Wait a moment for it to start
    sleep 3
    
    # Show the logs and follow them
    docker-compose logs -f rise-exercise-dev
}

# Function to run tests
run_tests() {
    print_status "Running tests in Docker..."
    docker-compose run --rm rise-exercise-dev npm test
}

# Function to classify a transaction
classify_transaction() {
    if [ $# -lt 2 ]; then
        print_error "Usage: $0 classify \"Title\" amount"
        exit 1
    fi
    
    title="$1"
    amount="$2"
    
    print_status "Classifying transaction: $title ($amount)"
    docker-compose run --rm rise-exercise node dist/index.js classify-ai --title "$title" --amount "$amount"
}

# Function to open shell in production container
open_shell() {
    ensure_service_running "rise-exercise"
    print_status "Opening shell in production container..."
    docker-compose exec rise-exercise sh
}

# Function to open shell in development container
open_shell_dev() {
    ensure_service_running "rise-exercise-dev"
    print_status "Opening shell in development container..."
    docker-compose exec rise-exercise-dev sh
}

# Function to clean up
clean_up() {
    print_status "Cleaning up Docker resources..."
    docker-compose down --rmi all --volumes --remove-orphans
    print_success "Cleanup completed!"
}

# Main script logic
case "${1:-help}" in
    "build")
        build_images
        ;;
    "run")
        run_production
        ;;
    "dev")
        run_development
        ;;
    "dev-watch")
        run_development_watch
        ;;
    "test")
        run_tests
        ;;
    "classify")
        shift
        classify_transaction "$@"
        ;;
    "shell")
        open_shell
        ;;
    "shell-dev")
        open_shell_dev
        ;;
    "clean")
        clean_up
        ;;
    "help"|*)
        show_usage
        ;;
esac
