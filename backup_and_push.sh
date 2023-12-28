#!/bin/bash

# Sync directories
rsync -av ../Obsidian\ Vault ./backup

# Check for changes
if [ -n "$(git status --porcelain)" ]; then
  # Add changes to git
  git add .

  # Commit changes
  git commit -m "Automated backup commit on $(date)"

  # Push changes
  git push
fi
