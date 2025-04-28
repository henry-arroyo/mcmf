#!/bin/bash

# Initialize Git repository
echo "Initializing Git repository..."
git init

# Add all files
echo "Adding files to Git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit"

# Ask for remote repository URL
read -p "Enter your Git repository URL (e.g., https://github.com/username/repo.git): " REPO_URL

# Add remote repository
echo "Adding remote repository..."
git remote add origin $REPO_URL

# Push to remote repository
echo "Pushing to remote repository..."
git push -u origin main

echo "Git repository setup complete!"
echo "To push changes in the future, use:"
echo "  git add ."
echo "  git commit -m 'Your commit message'"
echo "  git push" 