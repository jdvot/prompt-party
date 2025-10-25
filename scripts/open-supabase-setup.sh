#!/bin/bash

# Supabase Setup Helper
# This script opens the necessary Supabase pages and copies the migration SQL

PROJECT_ID="hfswbeyptqqhvhnxzcbh"
MIGRATION_FILE="supabase/migrations/add_prompt_versioning.sql"

echo "🚀 Opening Supabase Setup Pages..."
echo ""

# Copy migration SQL to clipboard
if command -v pbcopy &> /dev/null; then
  cat "$MIGRATION_FILE" | pbcopy
  echo "✅ Migration SQL copied to clipboard!"
  echo ""
fi

# Open SQL Editor
SQL_EDITOR_URL="https://supabase.com/dashboard/project/${PROJECT_ID}/sql/new"
echo "📝 Step 1: Apply Migration"
echo "   Opening SQL Editor..."
echo "   → ${SQL_EDITOR_URL}"
echo ""
echo "   Action: Paste (Cmd+V) and click 'Run' (Cmd+Enter)"
echo ""

if command -v open &> /dev/null; then
  open "$SQL_EDITOR_URL"
  sleep 2
fi

# Open Replication page
REPLICATION_URL="https://supabase.com/dashboard/project/${PROJECT_ID}/database/replication"
echo "⚡ Step 2: Enable Realtime"
echo "   Opening Replication settings..."
echo "   → ${REPLICATION_URL}"
echo ""
echo "   Action: Enable these tables:"
echo "     • prompt_versions"
echo "     • prompt_presence"
echo ""

if command -v open &> /dev/null; then
  sleep 3
  open "$REPLICATION_URL"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Setup Instructions:"
echo ""
echo "1️⃣  In the SQL Editor (first tab):"
echo "   • Paste the migration SQL (already in clipboard)"
echo "   • Click 'Run' or press Cmd+Enter"
echo "   • Wait for ✅ Success message"
echo ""
echo "2️⃣  In the Replication page (second tab):"
echo "   • Find 'prompt_versions' → Toggle ON"
echo "   • Find 'prompt_presence' → Toggle ON"
echo ""
echo "🎉 Done! Your collaborative features will be active!"
echo ""
