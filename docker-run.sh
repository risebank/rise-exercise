#!/bin/bash

# Check if arguments are provided
if [ $# -eq 0 ]; then
    # No arguments - just run the container
    echo "Building and running rise-exercise with tsx (no build step)..."
    docker-compose up --build
else
    # Arguments provided - run classification command
    echo "Running classification command..."
    
    # If first argument is "classify", skip it and use the next two as title and amount
    if [ "$1" = "classify" ]; then
        docker-compose run --rm rise-exercise npx tsx src/index.ts classify --title "$2" --amount "$3"
    else
        # Otherwise use first two arguments as title and amount
        docker-compose run --rm rise-exercise npx tsx src/index.ts classify --title "$1" --amount "$2"
    fi
fi

# To run in background, use: docker-compose up -d --build
# To stop: docker-compose down
