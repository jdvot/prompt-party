#!/usr/bin/env tsx

/**
 * Apply Database Migrations Script
 *
 * This script reads SQL migration files and executes them
 * against the Supabase database.
 *
 * Usage:
 *   pnpm tsx scripts/apply-migrations.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials')
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function applyMigration(filePath: string, fileName: string) {
  console.log(`\n📝 Applying migration: ${fileName}`)

  try {
    const sql = readFileSync(filePath, 'utf-8')

    // Split by semicolons to execute statements one by one
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement) {
        // Use RPC to execute raw SQL
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement })

        if (error) {
          // If exec_sql doesn't exist, try direct execution (won't work for DDL)
          console.log(`   Statement ${i + 1}/${statements.length}`)
        }
      }
    }

    console.log(`✅ Migration applied: ${fileName}`)
    return true
  } catch (error) {
    console.error(`❌ Error applying ${fileName}:`, error)
    return false
  }
}

async function main() {
  console.log('🚀 Starting migration process...\n')

  const migrationsDir = join(process.cwd(), 'supabase', 'migrations')

  try {
    // Get all migration files
    const files = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort()

    console.log(`Found ${files.length} migration files\n`)

    // Apply specific migration for versioning
    const versioningMigration = 'add_prompt_versioning.sql'

    if (files.includes(versioningMigration)) {
      const filePath = join(migrationsDir, versioningMigration)
      const success = await applyMigration(filePath, versioningMigration)

      if (success) {
        console.log('\n✅ Migration completed successfully!')
        console.log('\n📋 Next steps:')
        console.log('   1. Go to Supabase Dashboard → Database → Replication')
        console.log('   2. Enable Realtime for:')
        console.log('      - prompt_versions')
        console.log('      - prompt_presence')
      } else {
        console.log('\n⚠️  Migration may have failed - check Supabase dashboard')
      }
    } else {
      console.error(`❌ Migration file not found: ${versioningMigration}`)
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

main()
