#!/usr/bin/env node

/**
 * Merge generated translation keys into existing message files
 * and provide translations for FR and NL
 */

const fs = require('fs');
const path = require('path');

const GENERATED_FILE = path.join(__dirname, 'generated-translation-keys.json');
const MESSAGES_DIR = path.join(__dirname, '../messages');

// Load generated keys
const generated = JSON.parse(fs.readFileSync(GENERATED_FILE, 'utf8'));

// Load existing translations
const enPath = path.join(MESSAGES_DIR, 'en.json');
const frPath = path.join(MESSAGES_DIR, 'fr.json');
const nlPath = path.join(MESSAGES_DIR, 'nl.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));
const nl = JSON.parse(fs.readFileSync(nlPath, 'utf8'));

// French translations for common terms
const frTranslations = {
  // Auth
  'Secure Authentication': 'Authentification Sécurisée',

  // Collections
  'Search prompts...': 'Rechercher des prompts...',
  'No prompts found.': 'Aucun prompt trouvé.',
  'Create New Collection': 'Créer une Nouvelle Collection',
  'My Favorite Prompts': 'Mes Prompts Favoris',
  'A curated collection of prompts for...': 'Une collection organisée de prompts pour...',
  'Add to': 'Ajouter à',
  'Added': 'Ajouté',
  'Add': 'Ajouter',
  'Twitter': 'Twitter',

  // Common UI
  'Loading...': 'Chargement...',
  'Error': 'Erreur',
  'Success': 'Succès',
  'Cancel': 'Annuler',
  'Save': 'Enregistrer',
  'Delete': 'Supprimer',
  'Edit': 'Modifier',
  'Create': 'Créer',
  'Update': 'Mettre à jour',
  'Submit': 'Soumettre',
  'Close': 'Fermer',
  'Back': 'Retour',
  'Next': 'Suivant',
  'Previous': 'Précédent',
  'Continue': 'Continuer',
  'Finish': 'Terminer',
  'Skip': 'Passer',
  'Done': 'Terminé',

  // Forms
  'Name': 'Nom',
  'Description': 'Description',
  'Title': 'Titre',
  'Email': 'Email',
  'Password': 'Mot de passe',
  'Confirm Password': 'Confirmer le mot de passe',
  'Username': 'Nom d\'utilisateur',
  'Search': 'Rechercher',
  'Filter': 'Filtrer',
  'Sort by': 'Trier par',

  // Messages
  'Something went wrong': 'Une erreur s\'est produite',
  'Please try again': 'Veuillez réessayer',
  'Are you sure?': 'Êtes-vous sûr ?',
  'This action cannot be undone': 'Cette action ne peut pas être annulée',

  // Test page
  'Badge Icon Alignment Test': 'Test d\'Alignement des Icônes de Badge',
  'Small Badges (size="sm")': 'Petits Badges (taille="sm")',
  'Medium Badges (size="md")': 'Badges Moyens (taille="md")',
  'Large Badges (size="lg")': 'Grands Badges (taille="lg")',
  'All Variants (Medium Size)': 'Toutes les Variantes (Taille Moyenne)',
  'Shape Variants': 'Variantes de Forme',
  'Dark Mode Test': 'Test du Mode Sombre',
  'Real-World Use Cases': 'Cas d\'Utilisation Réels',
  'Tutorial Header': 'En-tête du Tutoriel',
  'Status Indicators': 'Indicateurs de Statut',
  'Feature Tags': 'Tags de Fonctionnalités',

  // Profile
  'No prompts yet': 'Aucun prompt pour le moment',
  'Get started by creating your first prompt': 'Commencez par créer votre premier prompt',

  // Prompts
  'Prompt not found': 'Prompt introuvable',
  'The prompt you\'re looking for doesn\'t exist': 'Le prompt que vous recherchez n\'existe pas',
  'Go back home': 'Retour à l\'accueil',

  // Settings
  'Receive email notifications': 'Recevoir des notifications par email',
  'Receive push notifications': 'Recevoir des notifications push',

  // API
  'API Key Manager': 'Gestionnaire de Clés API',
  'Generate New Key': 'Générer une Nouvelle Clé',
  'Key Name': 'Nom de la Clé',
  'Created': 'Créé',
  'Last Used': 'Dernière utilisation',
  'Never': 'Jamais',
  'Revoke': 'Révoquer',
  'Copy': 'Copier',
  'Copied': 'Copié',

  // Notifications
  'Notification Settings': 'Paramètres de Notification',
  'Email Notifications': 'Notifications Email',
  'Push Notifications': 'Notifications Push',
  'New likes on your prompts': 'Nouveaux likes sur vos prompts',
  'New comments on your prompts': 'Nouveaux commentaires sur vos prompts',
  'Someone follows you': 'Quelqu\'un vous suit',
  'New prompts from people you follow': 'Nouveaux prompts des personnes que vous suivez',
  'Weekly digest': 'Résumé hebdomadaire',
  'Marketing emails': 'Emails marketing',

  // Onboarding
  'Welcome to Prompt Party': 'Bienvenue sur Prompt Party',
  'Let\'s get you started': 'Commençons',
  'Complete your profile': 'Complétez votre profil',
  'Follow some users': 'Suivre des utilisateurs',
  'Create your first prompt': 'Créez votre premier prompt',
  'Explore collections': 'Explorer les collections',
  'Take a tour': 'Faire le tour',

  // Search
  'Advanced Search': 'Recherche Avancée',
  'Filter by tags': 'Filtrer par tags',
  'Filter by author': 'Filtrer par auteur',
  'Date range': 'Plage de dates',
  'From': 'De',
  'To': 'À',
  'Min likes': 'Likes minimum',
  'Max likes': 'Likes maximum',
  'Apply filters': 'Appliquer les filtres',
  'Clear filters': 'Effacer les filtres',

  // Tutorials
  'Start Tutorial': 'Commencer le Tutoriel',
  'Continue': 'Continuer',
  'Complete Tutorial': 'Terminer le Tutoriel',
  'Check Your Answer': 'Vérifier votre Réponse',
  'Next Question': 'Question Suivante',
  'Try Again': 'Réessayer',
  'Correct': 'Correct',
  'Incorrect': 'Incorrect',
  'Quiz': 'Quiz',
  'Progress': 'Progression',
};

// Dutch translations
const nlTranslations = {
  // Auth
  'Secure Authentication': 'Beveiligde Authenticatie',

  // Collections
  'Search prompts...': 'Zoek prompts...',
  'No prompts found.': 'Geen prompts gevonden.',
  'Create New Collection': 'Nieuwe Collectie Maken',
  'My Favorite Prompts': 'Mijn Favoriete Prompts',
  'A curated collection of prompts for...': 'Een samengestelde verzameling van prompts voor...',
  'Add to': 'Toevoegen aan',
  'Added': 'Toegevoegd',
  'Add': 'Toevoegen',
  'Twitter': 'Twitter',

  // Common UI
  'Loading...': 'Laden...',
  'Error': 'Fout',
  'Success': 'Succes',
  'Cancel': 'Annuleren',
  'Save': 'Opslaan',
  'Delete': 'Verwijderen',
  'Edit': 'Bewerken',
  'Create': 'Maken',
  'Update': 'Bijwerken',
  'Submit': 'Indienen',
  'Close': 'Sluiten',
  'Back': 'Terug',
  'Next': 'Volgende',
  'Previous': 'Vorige',
  'Continue': 'Doorgaan',
  'Finish': 'Voltooien',
  'Skip': 'Overslaan',
  'Done': 'Klaar',

  // Forms
  'Name': 'Naam',
  'Description': 'Beschrijving',
  'Title': 'Titel',
  'Email': 'E-mail',
  'Password': 'Wachtwoord',
  'Confirm Password': 'Bevestig Wachtwoord',
  'Username': 'Gebruikersnaam',
  'Search': 'Zoeken',
  'Filter': 'Filteren',
  'Sort by': 'Sorteer op',

  // Messages
  'Something went wrong': 'Er is iets misgegaan',
  'Please try again': 'Probeer het opnieuw',
  'Are you sure?': 'Weet je het zeker?',
  'This action cannot be undone': 'Deze actie kan niet ongedaan worden gemaakt',

  // Test page
  'Badge Icon Alignment Test': 'Badge Icoon Uitlijning Test',
  'Small Badges (size="sm")': 'Kleine Badges (grootte="sm")',
  'Medium Badges (size="md")': 'Middelgrote Badges (grootte="md")',
  'Large Badges (size="lg")': 'Grote Badges (grootte="lg")',
  'All Variants (Medium Size)': 'Alle Varianten (Middelgrote)',
  'Shape Variants': 'Vorm Varianten',
  'Dark Mode Test': 'Donkere Modus Test',
  'Real-World Use Cases': 'Praktijkvoorbeelden',
  'Tutorial Header': 'Tutorial Header',
  'Status Indicators': 'Status Indicatoren',
  'Feature Tags': 'Functie Tags',

  // Profile
  'No prompts yet': 'Nog geen prompts',
  'Get started by creating your first prompt': 'Begin met het maken van je eerste prompt',

  // Prompts
  'Prompt not found': 'Prompt niet gevonden',
  'The prompt you\'re looking for doesn\'t exist': 'De prompt die je zoekt bestaat niet',
  'Go back home': 'Ga terug naar home',

  // Settings
  'Receive email notifications': 'Ontvang e-mailmeldingen',
  'Receive push notifications': 'Ontvang pushmeldingen',

  // API
  'API Key Manager': 'API Sleutelbeheer',
  'Generate New Key': 'Nieuwe Sleutel Genereren',
  'Key Name': 'Sleutelnaam',
  'Created': 'Gemaakt',
  'Last Used': 'Laatst Gebruikt',
  'Never': 'Nooit',
  'Revoke': 'Intrekken',
  'Copy': 'Kopiëren',
  'Copied': 'Gekopieerd',

  // Notifications
  'Notification Settings': 'Meldingsinstellingen',
  'Email Notifications': 'E-mailmeldingen',
  'Push Notifications': 'Pushmeldingen',
  'New likes on your prompts': 'Nieuwe likes op je prompts',
  'New comments on your prompts': 'Nieuwe reacties op je prompts',
  'Someone follows you': 'Iemand volgt je',
  'New prompts from people you follow': 'Nieuwe prompts van mensen die je volgt',
  'Weekly digest': 'Wekelijks overzicht',
  'Marketing emails': 'Marketing e-mails',

  // Onboarding
  'Welcome to Prompt Party': 'Welkom bij Prompt Party',
  'Let\'s get you started': 'Laten we beginnen',
  'Complete your profile': 'Voltooi je profiel',
  'Follow some users': 'Volg enkele gebruikers',
  'Create your first prompt': 'Maak je eerste prompt',
  'Explore collections': 'Verken collecties',
  'Take a tour': 'Maak een rondleiding',

  // Search
  'Advanced Search': 'Geavanceerd Zoeken',
  'Filter by tags': 'Filteren op tags',
  'Filter by author': 'Filteren op auteur',
  'Date range': 'Datumbereik',
  'From': 'Van',
  'To': 'Tot',
  'Min likes': 'Min likes',
  'Max likes': 'Max likes',
  'Apply filters': 'Filters toepassen',
  'Clear filters': 'Filters wissen',

  // Tutorials
  'Start Tutorial': 'Start Tutorial',
  'Continue': 'Doorgaan',
  'Complete Tutorial': 'Tutorial Voltooien',
  'Check Your Answer': 'Controleer Je Antwoord',
  'Next Question': 'Volgende Vraag',
  'Try Again': 'Probeer Opnieuw',
  'Correct': 'Correct',
  'Incorrect': 'Onjuist',
  'Quiz': 'Quiz',
  'Progress': 'Voortgang',
};

function translateText(text, targetLang) {
  const translations = targetLang === 'fr' ? frTranslations : nlTranslations;
  return translations[text] || text;
}

// Merge new keys into existing translations
let addedEN = 0;
let addedFR = 0;
let addedNL = 0;

Object.entries(generated.keysForEN).forEach(([namespace, keys]) => {
  // Ensure namespace exists
  if (!en[namespace]) en[namespace] = {};
  if (!fr[namespace]) fr[namespace] = {};
  if (!nl[namespace]) nl[namespace] = {};

  Object.entries(keys).forEach(([key, value]) => {
    // Add to EN if not exists
    if (!en[namespace][key]) {
      en[namespace][key] = value;
      addedEN++;
    }

    // Add to FR if not exists
    if (!fr[namespace][key]) {
      fr[namespace][key] = translateText(value, 'fr');
      addedFR++;
    }

    // Add to NL if not exists
    if (!nl[namespace][key]) {
      nl[namespace][key] = translateText(value, 'nl');
      addedNL++;
    }
  });
});

// Sort keys alphabetically within each namespace
function sortObjectKeys(obj) {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      sorted[key] = sortObjectKeys(obj[key]);
    } else {
      sorted[key] = obj[key];
    }
  });
  return sorted;
}

const sortedEN = sortObjectKeys(en);
const sortedFR = sortObjectKeys(fr);
const sortedNL = sortObjectKeys(nl);

// Save back to files
fs.writeFileSync(enPath, JSON.stringify(sortedEN, null, 2) + '\n');
fs.writeFileSync(frPath, JSON.stringify(sortedFR, null, 2) + '\n');
fs.writeFileSync(nlPath, JSON.stringify(sortedNL, null, 2) + '\n');

console.log('\n' + '='.repeat(80));
console.log('TRANSLATIONS MERGED SUCCESSFULLY');
console.log('='.repeat(80));
console.log(`\n✅ Added ${addedEN} keys to en.json`);
console.log(`✅ Added ${addedFR} keys to fr.json`);
console.log(`✅ Added ${addedNL} keys to nl.json`);
console.log('\nAll translation files have been updated and sorted alphabetically.');
console.log('\nNext step: Run the code replacement script to update all TSX/TS files');
console.log('='.repeat(80) + '\n');
