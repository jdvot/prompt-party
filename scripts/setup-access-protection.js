#!/usr/bin/env node
/**
 * Setup Access Protection
 *
 * This script helps you configure site-wide password protection.
 * It generates the necessary environment variables for .env.local
 */

const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateHash(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

console.log('\n🔐 Prompt Party - Access Protection Setup\n');
console.log('This will generate environment variables for password protection.\n');

rl.question('Enter the access password: ', (password) => {
  if (!password || password.length < 8) {
    console.error('\n❌ Password must be at least 8 characters long');
    rl.close();
    process.exit(1);
  }

  const hash = generateHash(password);
  const secret = generateSecret();

  console.log('\n✅ Configuration generated!\n');
  console.log('Add these lines to your .env.local file:\n');
  console.log('# Access Protection');
  console.log('ACCESS_PROTECTION_ENABLED=true');
  console.log(`ACCESS_PASSWORD_HASH=${hash}`);
  console.log(`ACCESS_TOKEN_SECRET=${secret}`);
  console.log('NEXT_PUBLIC_ACCESS_PROTECTION_ENABLED=true');
  console.log('\n');
  console.log('For Vercel deployment, add these as environment variables in the dashboard:');
  console.log('Settings → Environment Variables\n');

  rl.close();
});
