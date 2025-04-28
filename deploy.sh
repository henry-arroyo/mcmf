#!/bin/bash

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "Installing Amplify CLI..."
    npm install -g @aws-amplify/cli
fi

# Initialize Amplify project
echo "Initializing Amplify project..."
amplify init

# Add hosting
echo "Adding hosting..."
amplify add hosting

# Push changes
echo "Pushing changes to AWS..."
amplify push

# Publish
echo "Publishing to AWS..."
amplify publish

echo "Deployment complete! Your site should be live at the URL provided above." 