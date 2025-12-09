#!/bin/bash

# Script to generate TypeScript types from Supabase
# Usage: ./scripts/generate-types.sh YOUR_PROJECT_ID

set -e

PROJECT_ID=$1

if [ -z "$PROJECT_ID" ]; then
  echo "❌ Error: Supabase project ID is required"
  echo ""
  echo "Usage: ./scripts/generate-types.sh YOUR_PROJECT_ID"
  echo ""
  echo "You can find your project ID in:"
  echo "  - Supabase Dashboard URL: https://app.supabase.com/project/YOUR_PROJECT_ID"
  echo "  - Or in your NEXT_PUBLIC_SUPABASE_URL: https://YOUR_PROJECT_ID.supabase.co"
  echo ""
  exit 1
fi

echo "🔄 Generating TypeScript types from Supabase..."
echo "Project ID: $PROJECT_ID"
echo ""

# Generate types
npx supabase gen types typescript --project-id "$PROJECT_ID" > src/types/supabase.generated.ts

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Types generated successfully!"
  echo "📝 File: src/types/supabase.generated.ts"
  echo ""
  echo "Next steps:"
  echo "1. Review the generated types"
  echo "2. Update imports in your code to use the new types"
  echo "3. Remove 'as any' type assertions where possible"
  echo ""
else
  echo ""
  echo "❌ Failed to generate types"
  echo "Please check your Supabase credentials and project ID"
  exit 1
fi
