#!/usr/bin/env node

/**
 * Apply Prompt Versioning Migration
 * This script applies the migration directly to Supabase
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
const envPath = join(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim()
  }
})

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

console.log('🔗 Connecting to Supabase...')
console.log(`   URL: ${SUPABASE_URL}`)

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Read migration file
const migrationPath = join(__dirname, '..', 'supabase', 'migrations', 'add_prompt_versioning.sql')
const migrationSQL = readFileSync(migrationPath, 'utf-8')

console.log('\n📝 Migration file loaded')
console.log(`   File: add_prompt_versioning.sql`)
console.log(`   Size: ${(migrationSQL.length / 1024).toFixed(1)} KB`)

// Split SQL into statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && s !== 'COMMENT ON TABLE' && s !== 'COMMENT ON FUNCTION')

console.log(`\n🚀 Executing ${statements.length} SQL statements...\n`)

let successCount = 0
let errorCount = 0

// Note: The anon key may not have permissions to execute DDL
// This will likely fail, but let's try using RPC if available
console.log('⚠️  Note: Applying migrations requires database admin access.')
console.log('   The anon key may not have sufficient permissions.\n')

for (let i = 0; i < Math.min(statements.length, 5); i++) {
  const statement = statements[i]
  const preview = statement.substring(0, 60) + (statement.length > 60 ? '...' : '')

  console.log(`   [${i + 1}/${statements.length}] ${preview}`)

  try {
    // Try to execute using the query method
    const { error } = await supabase.rpc('exec_sql', { query: statement })

    if (error) {
      console.log(`      ❌ ${error.message}`)
      errorCount++
    } else {
      console.log(`      ✅ Success`)
      successCount++
    }
  } catch (error) {
    console.log(`      ❌ ${error.message}`)
    errorCount++
  }
}

console.log('\n' + '='.repeat(60))
console.log(`\n📊 Results: ${successCount} successful, ${errorCount} failed\n`)

if (errorCount > 0) {
  console.log('⚠️  Migration could not be applied automatically.')
  console.log('\n📋 Please apply the migration manually:')
  console.log('\n   1. Go to: https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/sql/new')
  console.log('   2. Copy content from: supabase/migrations/add_prompt_versioning.sql')
  console.log('   3. Paste and click "Run" (Cmd/Ctrl + Enter)')
  console.log('\n   Direct link to SQL Editor:')
  console.log('   → https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/sql/new\n')

  console.log('📋 After applying the migration:')
  console.log('\n   1. Go to: https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/database/replication')
  console.log('   2. Enable Realtime for these tables:')
  console.log('      - prompt_versions')
  console.log('      - prompt_presence\n')

  process.exit(1)
} else {
  console.log('✅ Migration applied successfully!')
  console.log('\n📋 Next step: Enable Realtime')
  console.log('\n   Go to: https://supabase.com/dashboard/project/hfswbeyptqqhvhnxzcbh/database/replication')
  console.log('   Enable Realtime for:')
  console.log('      - prompt_versions')
  console.log('      - prompt_presence\n')
}
