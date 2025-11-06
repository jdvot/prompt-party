#!/usr/bin/env node

/**
 * Script to add new translation keys to locale files
 */

const fs = require('fs');
const path = require('path');

// Read the new keys
const newKeys = require('./new-translation-keys.json');

// Paths to locale files
const locales = {
  en: path.join(__dirname, '../messages/en.json'),
  fr: path.join(__dirname, '../messages/fr.json'),
  nl: path.join(__dirname, '../messages/nl.json')
};

// French translations
const frenchTranslations = {
  "simpleWizard": {
    "step1_title": "Choisir une catégorie",
    "step1_description": "Quel type de prompt créez-vous?",
    "step2_title": "Écrire votre prompt",
    "step2_description": "Créez votre prompt IA incroyable",
    "step3_title": "Ajouter des tags",
    "step3_description": "Aidez les autres à découvrir votre prompt",
    "step4_title": "Aperçu & Publier",
    "step4_description": "Vérifiez et partagez votre création",
    "categories": {
      "writing": "Écriture",
      "coding": "Codage",
      "creative": "Créatif",
      "business": "Business",
      "education": "Éducation",
      "other": "Autre"
    },
    "form": {
      "title_label": "Titre",
      "title_required": "*",
      "title_placeholder": "Donnez un titre accrocheur à votre prompt...",
      "prompt_label": "Prompt",
      "prompt_required": "*",
      "prompt_placeholder": "Écrivez votre prompt ici... Soyez aussi détaillé que vous le souhaitez!",
      "characters_count": "{count} caractères",
      "tags_helper": "Sélectionnez des tags pour aider les autres à découvrir votre prompt (choisissez au moins un)",
      "tags_selected": "Sélectionnés: {count} tag(s)",
      "make_public": "Rendre ce prompt public"
    },
    "buttons": {
      "back": "Retour",
      "next": "Suivant",
      "publishing": "Publication...",
      "publish": "Publier le prompt"
    }
  },
  "apiKeys": {
    "created_title": "Clé API créée!",
    "created_description": "Copiez cette clé maintenant. Vous ne pourrez plus la voir.",
    "create_title": "Créer une nouvelle clé API",
    "create_description": "Les clés API vous permettent d'accéder à l'API Prompt Party de manière programmatique",
    "your_keys_title": "Vos clés API ({count})",
    "your_keys_description": "Gérez vos clés API existantes. Limite mensuelle: 10 000 requêtes",
    "key_name_label": "Nom de la clé",
    "key_name_placeholder": "Mon intégration d'application",
    "create_button": "Créer une clé",
    "saved_key_button": "J'ai sauvegardé ma clé",
    "empty_state": "Aucune clé API pour le moment. Créez-en une pour commencer.",
    "delete_confirm": "Êtes-vous sûr de vouloir supprimer cette clé API? Cette action ne peut pas être annulée.",
    "requests_of": "{used} / {limit} requêtes",
    "last_used": "Dernière utilisation: {date}",
    "last_used_never": "Dernière utilisation: Jamais",
    "created_date": "Créé: {date}",
    "docs_title": "Documentation API",
    "docs_description": "Apprenez à intégrer l'API Prompt Party",
    "docs_base_url": "URL de base:",
    "docs_auth": "Authentification:",
    "docs_auth_description": "Incluez votre clé API dans l'en-tête",
    "docs_auth_header": "x-api-key",
    "docs_auth_description_2": "",
    "docs_endpoints": "Points de terminaison:",
    "endpoint_list_prompts": "Lister les prompts",
    "endpoint_create_prompt": "Créer un prompt",
    "endpoint_get_prompt": "Obtenir un prompt",
    "endpoint_update_prompt": "Mettre à jour un prompt",
    "endpoint_delete_prompt": "Supprimer un prompt"
  },
  "search": {
    "clear_filters": "Effacer les filtres",
    "browse_tutorials": "Parcourir les tutoriels",
    "explore_prompts": "Explorer les prompts"
  },
  "auth": {
    "show_password": "Afficher le mot de passe",
    "hide_password": "Masquer le mot de passe",
    "secure_auth_heading": "Authentification sécurisée",
    "join_academy_heading": "Rejoindre Prompt Academy"
  },
  "brand": {
    "name": "Prompt Academy",
    "logo_alt": "Logo Prompt Academy"
  },
  "collectionsNew": {
    "page_title": "Créer une nouvelle collection",
    "collection_name_label": "Nom de la collection",
    "collection_name_placeholder": "Mes prompts préférés",
    "description_label": "Description (facultatif)",
    "description_placeholder": "Une collection organisée de prompts pour...",
    "make_public": "Rendre cette collection publique",
    "create_button": "Créer la collection",
    "cancel_button": "Annuler"
  }
};

// Dutch translations
const dutchTranslations = {
  "simpleWizard": {
    "step1_title": "Kies categorie",
    "step1_description": "Welk type prompt maak je?",
    "step2_title": "Schrijf je prompt",
    "step2_description": "Creëer je geweldige AI-prompt",
    "step3_title": "Voeg tags toe",
    "step3_description": "Help anderen je prompt te ontdekken",
    "step4_title": "Voorbeeld & Publiceren",
    "step4_description": "Bekijk en deel je creatie",
    "categories": {
      "writing": "Schrijven",
      "coding": "Programmeren",
      "creative": "Creatief",
      "business": "Zakelijk",
      "education": "Onderwijs",
      "other": "Overig"
    },
    "form": {
      "title_label": "Titel",
      "title_required": "*",
      "title_placeholder": "Geef je prompt een pakkende titel...",
      "prompt_label": "Prompt",
      "prompt_required": "*",
      "prompt_placeholder": "Schrijf hier je prompt... Wees zo gedetailleerd als je wilt!",
      "characters_count": "{count} tekens",
      "tags_helper": "Selecteer tags om anderen te helpen je prompt te ontdekken (kies er minimaal één)",
      "tags_selected": "Geselecteerd: {count} tag(s)",
      "make_public": "Maak deze prompt openbaar"
    },
    "buttons": {
      "back": "Terug",
      "next": "Volgende",
      "publishing": "Publiceren...",
      "publish": "Publiceer prompt"
    }
  },
  "apiKeys": {
    "created_title": "API-sleutel aangemaakt!",
    "created_description": "Kopieer deze sleutel nu. Je kunt hem later niet meer zien.",
    "create_title": "Nieuwe API-sleutel maken",
    "create_description": "API-sleutels geven je programmatische toegang tot de Prompt Party API",
    "your_keys_title": "Jouw API-sleutels ({count})",
    "your_keys_description": "Beheer je bestaande API-sleutels. Maandelijks limiet: 10.000 verzoeken",
    "key_name_label": "Sleutelnaam",
    "key_name_placeholder": "Mijn app-integratie",
    "create_button": "Sleutel maken",
    "saved_key_button": "Ik heb mijn sleutel opgeslagen",
    "empty_state": "Nog geen API-sleutels. Maak er een om te beginnen.",
    "delete_confirm": "Weet je zeker dat je deze API-sleutel wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.",
    "requests_of": "{used} / {limit} verzoeken",
    "last_used": "Laatst gebruikt: {date}",
    "last_used_never": "Laatst gebruikt: Nooit",
    "created_date": "Aangemaakt: {date}",
    "docs_title": "API-documentatie",
    "docs_description": "Leer hoe je integreert met de Prompt Party API",
    "docs_base_url": "Basis-URL:",
    "docs_auth": "Authenticatie:",
    "docs_auth_description": "Voeg je API-sleutel toe in de",
    "docs_auth_header": "x-api-key",
    "docs_auth_description_2": "header",
    "docs_endpoints": "Endpoints:",
    "endpoint_list_prompts": "Prompts weergeven",
    "endpoint_create_prompt": "Prompt maken",
    "endpoint_get_prompt": "Prompt ophalen",
    "endpoint_update_prompt": "Prompt bijwerken",
    "endpoint_delete_prompt": "Prompt verwijderen"
  },
  "search": {
    "clear_filters": "Filters wissen",
    "browse_tutorials": "Tutorials bekijken",
    "explore_prompts": "Prompts verkennen"
  },
  "auth": {
    "show_password": "Toon wachtwoord",
    "hide_password": "Verberg wachtwoord",
    "secure_auth_heading": "Beveiligde authenticatie",
    "join_academy_heading": "Word lid van Prompt Academy"
  },
  "brand": {
    "name": "Prompt Academy",
    "logo_alt": "Prompt Academy Logo"
  },
  "collectionsNew": {
    "page_title": "Nieuwe collectie maken",
    "collection_name_label": "Collectienaam",
    "collection_name_placeholder": "Mijn favoriete prompts",
    "description_label": "Beschrijving (optioneel)",
    "description_placeholder": "Een samengestelde collectie van prompts voor...",
    "make_public": "Maak deze collectie openbaar",
    "create_button": "Collectie maken",
    "cancel_button": "Annuleren"
  }
};

function mergeKeys(existing, newKeys) {
  return { ...existing, ...newKeys };
}

// Process each locale
for (const [locale, filePath] of Object.entries(locales)) {
  console.log(`\nProcessing ${locale}...`);

  // Read existing translations
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Get translations for this locale
  let translations;
  if (locale === 'en') {
    translations = newKeys;
  } else if (locale === 'fr') {
    translations = frenchTranslations;
  } else if (locale === 'nl') {
    translations = dutchTranslations;
  }

  // Merge with existing
  const updated = mergeKeys(existing, translations);

  // Backup original file
  fs.writeFileSync(filePath + '.backup', JSON.stringify(existing, null, 2));
  console.log(`✓ Backed up to ${filePath}.backup`);

  // Write updated file
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  console.log(`✓ Updated ${filePath}`);
  console.log(`  Added ${Object.keys(translations).length} new top-level keys`);
}

console.log('\n✅ All locale files updated successfully!');
console.log('\nNext steps:');
console.log('1. Review the changes in each locale file');
console.log('2. Update components to use the new translation keys');
console.log('3. Test language switching');
console.log('4. Remove .backup files once verified');
