#!/bin/bash

# Check if arguments are provided
if [ $# -eq 0 ]; then
    # No arguments - just run the container
    echo "Building and running rise-exercise with tsx (no build step)..."
    docker-compose up --build
else
    case "$1" in
        "test")
            echo "Running tests in Docker..."
            docker-compose run --rm rise-exercise npm test
            ;;
        "shell")
            echo "Opening shell in production container..."
            docker-compose run --rm rise-exercise /bin/bash
            ;;
        "build")
            echo "Building Docker images..."
            docker-compose build
            ;;
        "clean")
            echo "Cleaning up containers and images..."
            docker-compose down --rmi all --volumes --remove-orphans
            ;;
        "help")
            echo "Available commands:"
            echo "  test        - Run tests in Docker"
            echo "  shell       - Open shell in production container"
            echo "  build       - Build Docker images"
            echo "  clean       - Clean up containers and images"
            echo "  classify    - Classify a transaction (usage: classify 'title' amount)"
            echo "  help        - Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./docker-run.sh test"
            echo "  ./docker-run.sh classify 'Flight to Paris' 1200"
            echo "  ./docker-run.sh 'Restaurant dinner' 85"
            ;;
        "classify")
            # If first argument is "classify", skip it and use the next two as title and amount
            if [ $# -eq 3 ]; then
                docker-compose run --rm rise-exercise npx tsx src/index.ts classify --title "$2" --amount "$3"
            else
                echo "Usage: ./docker-run.sh classify 'title' amount"
                echo "Example: ./docker-run.sh classify 'Flight to Paris' 1200"
                exit 1
            fi
            ;;
        *)
            # If two arguments provided, treat as title and amount for classification
            if [ $# -eq 2 ]; then
                echo "Running classification command..."
                docker-compose run --rm rise-exercise npx tsx src/index.ts classify --title "$1" --amount "$2"
            else
                echo "Unknown command: $1"
                echo "Use './docker-run.sh help' for available commands"
                exit 1
            fi
            ;;
    esac
fi

# To run in background, use: docker-compose up -d --build
# To stop: docker-compose down
