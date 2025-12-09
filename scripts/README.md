# Scripts Utilities

This directory contains utility scripts for the Prompt Party project.

## 📝 Type Generation

### Generate Supabase Types

Generate TypeScript types from your Supabase database schema.

#### Windows:
```bash
npm run types:generate:win YOUR_PROJECT_ID
```

#### Linux/Mac:
```bash
npm run types:generate:unix YOUR_PROJECT_ID
```

#### Finding Your Project ID

Your Supabase project ID can be found in:
- **Dashboard URL**: `https://app.supabase.com/project/YOUR_PROJECT_ID`
- **API URL**: `https://YOUR_PROJECT_ID.supabase.co`
- **Environment variable**: Extract from `NEXT_PUBLIC_SUPABASE_URL`

#### Example:
```bash
# If your URL is https://abcdefghijklmnop.supabase.co
npm run types:generate:win abcdefghijklmnop
```

#### What This Does:
1. Connects to your Supabase project
2. Reads your database schema
3. Generates TypeScript types in `src/types/supabase.generated.ts`
4. Types include:
   - Table definitions
   - Row types
   - Insert/Update types
   - Function signatures
   - Enum types

#### After Generation:
1. Review the generated types in `src/types/supabase.generated.ts`
2. Update `src/types/supabase.ts` to export from the generated file
3. Remove `as any` type assertions throughout the codebase
4. Update imports to use the new types

## 🌐 i18n Scripts

### Check Translations

Check for missing or incomplete translations:

```bash
npm run i18n:check          # Normal mode
npm run i18n:check:strict   # Strict mode
npm run i18n:check:fix      # Auto-fix mode
```

## 🔧 Other Scripts

Add documentation for other scripts here as they are created.
