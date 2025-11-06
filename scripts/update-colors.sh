#!/bin/bash

# Script to update old color palette to new Prompt Academy palette
# Old: violet-600, fuchsia-600, purple-600, pink-500
# New: indigo-600, violet-600, cyan-500

echo "🎨 Updating color palette across the entire app..."

# Define the base directory
BASE_DIR="/Users/admin/prompt-party/src"

# Find all TypeScript and TSX files
find "$BASE_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
  # Skip node_modules
  if [[ $file == *"node_modules"* ]]; then
    continue
  fi

  # Replace gradients with fuchsia
  sed -i '' 's/from-violet-500 to-fuchsia-500/from-indigo-500 to-violet-600/g' "$file"
  sed -i '' 's/from-violet-600 to-fuchsia-600/from-indigo-600 to-violet-600/g' "$file"
  sed -i '' 's/via-fuchsia-600/via-violet-600/g' "$file"
  sed -i '' 's/to-fuchsia-600/to-violet-600/g' "$file"

  # Replace fuchsia with violet
  sed -i '' 's/fuchsia-500/violet-500/g' "$file"
  sed -i '' 's/fuchsia-600/violet-600/g' "$file"
  sed -i '' 's/fuchsia-400/violet-400/g' "$file"

  # Replace old purple with violet
  sed -i '' 's/from-violet-500 to-purple-600/from-indigo-500 to-violet-600/g' "$file"
  sed -i '' 's/to-purple-600/to-violet-600/g' "$file"
  sed-i '' 's/purple-500/violet-500/g' "$file"
  sed -i '' 's/purple-600/violet-600/g' "$file"
  sed -i '' 's/purple-400/violet-400/g' "$file"

  # Replace pink with cyan (for accents)
  sed -i '' 's/from-pink-500/from-cyan-500/g' "$file"
  sed -i '' 's/to-pink-500/to-cyan-500/g' "$file"
  sed -i '' 's/-pink-500/-cyan-500/g' "$file"

  # Check if file was modified
  if git diff --quiet "$file" 2>/dev/null; then
    :
  else
    echo "✅ Updated: $file"
  fi
done

echo "🎉 Color palette update complete!"
