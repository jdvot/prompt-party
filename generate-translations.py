#!/usr/bin/env python3
"""
Generate comprehensive translation files for Prompt Party i18n
"""

import json

# All translations organized by namespace
translations = {
    "emptyStates": {
        "en": {
            "noPrompts": {
                "title": "No prompts yet",
                "description": "Start sharing your amazing AI prompts with the community",
                "action": "Create your first prompt"
            },
            "noResults": {
                "title": "No results found",
                "description": "Try adjusting your search terms or filters"
            },
            "noLikes": {
                "title": "No likes yet",
                "description": "Prompts you like will appear here",
                "action": "Explore prompts"
            },
            "noComments": {
                "title": "No comments yet",
                "description": "Be the first to share your thoughts on this prompt"
            },
            "noFollowers": {
                "title": "No followers yet",
                "description": "Share great prompts to attract followers",
                "action": "Create a prompt"
            },
            "noCollections": {
                "title": "No collections yet",
                "description": "Organize your favorite prompts into collections",
                "action": "Create collection"
            },
            "noNotifications": {
                "title": "No notifications",
                "description": "When you get notifications, they'll appear here"
            },
            "noBookmarks": {
                "title": "No bookmarks yet",
                "description": "Save prompts you want to revisit later",
                "action": "Explore prompts"
            },
            "noActivity": {
                "title": "No activity yet",
                "description": "Your activity will be shown here once you start interacting"
            },
            "noData": {
                "title": "No data available",
                "description": "Data will appear here once it becomes available"
            }
        },
        "fr": {
            "noPrompts": {
                "title": "Aucun prompt pour le moment",
                "description": "Commencez à partager vos incroyables prompts IA avec la communauté",
                "action": "Créer votre premier prompt"
            },
            "noResults": {
                "title": "Aucun résultat trouvé",
                "description": "Essayez d'ajuster vos termes de recherche ou filtres"
            },
            "noLikes": {
                "title": "Aucun like pour le moment",
                "description": "Les prompts que vous aimez apparaîtront ici",
                "action": "Explorer les prompts"
            },
            "noComments": {
                "title": "Aucun commentaire pour le moment",
                "description": "Soyez le premier à partager vos réflexions sur ce prompt"
            },
            "noFollowers": {
                "title": "Aucun abonné pour le moment",
                "description": "Partagez d'excellents prompts pour attirer des abonnés",
                "action": "Créer un prompt"
            },
            "noCollections": {
                "title": "Aucune collection pour le moment",
                "description": "Organisez vos prompts préférés en collections",
                "action": "Créer une collection"
            },
            "noNotifications": {
                "title": "Aucune notification",
                "description": "Lorsque vous recevrez des notifications, elles apparaîtront ici"
            },
            "noBookmarks": {
                "title": "Aucun favori pour le moment",
                "description": "Enregistrez les prompts que vous souhaitez consulter plus tard",
                "action": "Explorer les prompts"
            },
            "noActivity": {
                "title": "Aucune activité pour le moment",
                "description": "Votre activité sera affichée ici une fois que vous commencerez à interagir"
            },
            "noData": {
                "title": "Aucune donnée disponible",
                "description": "Les données apparaîtront ici dès qu'elles seront disponibles"
            }
        },
        "nl": {
            "noPrompts": {
                "title": "Nog geen prompts",
                "description": "Begin met het delen van je geweldige AI-prompts met de gemeenschap",
                "action": "Creëer je eerste prompt"
            },
            "noResults": {
                "title": "Geen resultaten gevonden",
                "description": "Probeer je zoektermen of filters aan te passen"
            },
            "noLikes": {
                "title": "Nog geen likes",
                "description": "Prompts die je leuk vindt verschijnen hier",
                "action": "Verken prompts"
            },
            "noComments": {
                "title": "Nog geen reacties",
                "description": "Wees de eerste om je gedachten over deze prompt te delen"
            },
            "noFollowers": {
                "title": "Nog geen volgers",
                "description": "Deel geweldige prompts om volgers aan te trekken",
                "action": "Creëer een prompt"
            },
            "noCollections": {
                "title": "Nog geen collecties",
                "description": "Organiseer je favoriete prompts in collecties",
                "action": "Collectie aanmaken"
            },
            "noNotifications": {
                "title": "Geen meldingen",
                "description": "Wanneer je meldingen ontvangt, verschijnen ze hier"
            },
            "noBookmarks": {
                "title": "Nog geen bladwijzers",
                "description": "Bewaar prompts die je later opnieuw wilt bekijken",
                "action": "Verken prompts"
            },
            "noActivity": {
                "title": "Nog geen activiteit",
                "description": "Je activiteit wordt hier weergegeven zodra je begint te interacteren"
            },
            "noData": {
                "title": "Geen gegevens beschikbaar",
                "description": "Gegevens verschijnen hier zodra ze beschikbaar zijn"
            }
        }
    },
    "commandPalette": {
        "en": {
            "placeholder": "Type a command or search...",
            "noResults": "No results found.",
            "searchResults": "Search Results",
            "quickActions": "Quick Actions",
            "navigation": "Navigation",
            "proFeatures": "Pro Features",
            "account": "Account",
            "actions": {
                "createPrompt": "Create new prompt",
                "advancedSearch": "Advanced search"
            },
            "nav": {
                "home": "Home",
                "trending": "Trending",
                "following": "Following",
                "collections": "Collections",
                "bookmarks": "Bookmarks"
            },
            "pro": {
                "analytics": "Analytics",
                "apiAccess": "API Access",
                "designSystem": "Design System"
            },
            "accountMenu": {
                "profile": "Profile",
                "notifications": "Notifications",
                "settings": "Settings",
                "signOut": "Sign out"
            }
        },
        "fr": {
            "placeholder": "Tapez une commande ou recherchez...",
            "noResults": "Aucun résultat trouvé.",
            "searchResults": "Résultats de recherche",
            "quickActions": "Actions rapides",
            "navigation": "Navigation",
            "proFeatures": "Fonctionnalités Pro",
            "account": "Compte",
            "actions": {
                "createPrompt": "Créer un nouveau prompt",
                "advancedSearch": "Recherche avancée"
            },
            "nav": {
                "home": "Accueil",
                "trending": "Tendances",
                "following": "Abonnements",
                "collections": "Collections",
                "bookmarks": "Favoris"
            },
            "pro": {
                "analytics": "Analytiques",
                "apiAccess": "Accès API",
                "designSystem": "Système de design"
            },
            "accountMenu": {
                "profile": "Profil",
                "notifications": "Notifications",
                "settings": "Paramètres",
                "signOut": "Se déconnecter"
            }
        },
        "nl": {
            "placeholder": "Typ een commando of zoek...",
            "noResults": "Geen resultaten gevonden.",
            "searchResults": "Zoekresultaten",
            "quickActions": "Snelle acties",
            "navigation": "Navigatie",
            "proFeatures": "Pro-functies",
            "account": "Account",
            "actions": {
                "createPrompt": "Nieuwe prompt maken",
                "advancedSearch": "Geavanceerd zoeken"
            },
            "nav": {
                "home": "Home",
                "trending": "Trending",
                "following": "Volgend",
                "collections": "Collecties",
                "bookmarks": "Bladwijzers"
            },
            "pro": {
                "analytics": "Analytics",
                "apiAccess": "API-toegang",
                "designSystem": "Ontwerpsysteem"
            },
            "accountMenu": {
                "profile": "Profiel",
                "notifications": "Meldingen",
                "settings": "Instellingen",
                "signOut": "Uitloggen"
            }
        }
    },
    "shortcuts": {
        "en": {
            "title": "Keyboard Shortcuts",
            "close": "Close",
            "navigation": "Navigation",
            "actions": "Actions (on prompt pages)",
            "general": "General",
            "helpText": "Press ? anytime to view shortcuts",
            "keys": {
                "goHome": "Go to Home",
                "goTrending": "Go to Trending",
                "goCollections": "Go to Collections",
                "createPrompt": "Create new prompt",
                "likePrompt": "Like/Unlike prompt",
                "saveToCollection": "Save to collection",
                "duplicate": "Duplicate prompt",
                "remix": "Remix prompt",
                "share": "Share prompt",
                "focusSearch": "Focus search",
                "showHelp": "Show this help",
                "closeModals": "Close modals"
            }
        },
        "fr": {
            "title": "Raccourcis clavier",
            "close": "Fermer",
            "navigation": "Navigation",
            "actions": "Actions (sur les pages de prompts)",
            "general": "Général",
            "helpText": "Appuyez sur ? à tout moment pour voir les raccourcis",
            "keys": {
                "goHome": "Aller à l'accueil",
                "goTrending": "Aller aux tendances",
                "goCollections": "Aller aux collections",
                "createPrompt": "Créer un nouveau prompt",
                "likePrompt": "Aimer/Ne plus aimer le prompt",
                "saveToCollection": "Enregistrer dans une collection",
                "duplicate": "Dupliquer le prompt",
                "remix": "Remixer le prompt",
                "share": "Partager le prompt",
                "focusSearch": "Rechercher",
                "showHelp": "Afficher cette aide",
                "closeModals": "Fermer les fenêtres"
            }
        },
        "nl": {
            "title": "Sneltoetsen",
            "close": "Sluiten",
            "navigation": "Navigatie",
            "actions": "Acties (op promptpagina's)",
            "general": "Algemeen",
            "helpText": "Druk op ? om sneltoetsen te bekijken",
            "keys": {
                "goHome": "Ga naar Home",
                "goTrending": "Ga naar Trending",
                "goCollections": "Ga naar Collecties",
                "createPrompt": "Nieuwe prompt maken",
                "likePrompt": "Prompt liken/unliken",
                "saveToCollection": "Opslaan in collectie",
                "duplicate": "Prompt dupliceren",
                "remix": "Prompt remixen",
                "share": "Prompt delen",
                "focusSearch": "Zoeken focussen",
                "showHelp": "Toon deze help",
                "closeModals": "Modals sluiten"
            }
        }
    }
}

def merge_translations(existing, new):
    """Merge new translations into existing ones"""
    for key, value in new.items():
        if isinstance(value, dict) and key in existing and isinstance(existing[key], dict):
            merge_translations(existing[key], value)
        else:
            existing[key] = value
    return existing

def main():
    # Read existing translation files
    locales = ['en', 'fr', 'nl']
    existing_translations = {}

    for locale in locales:
        try:
            with open(f'messages/{locale}.json', 'r', encoding='utf-8') as f:
                existing_translations[locale] = json.load(f)
        except FileNotFoundError:
            existing_translations[locale] = {}

    # Merge new translations
    for namespace, trans_by_locale in translations.items():
        for locale in locales:
            if locale in trans_by_locale:
                if namespace not in existing_translations[locale]:
                    existing_translations[locale][namespace] = {}
                existing_translations[locale][namespace] = trans_by_locale[locale]

    # Write updated translation files
    for locale in locales:
        with open(f'messages/{locale}.json', 'w', encoding='utf-8') as f:
            json.dump(existing_translations[locale], f, indent=2, ensure_ascii=False)

    print("✓ Translation files updated successfully!")
    print(f"  - Added emptyStates namespace")
    print(f"  - Added commandPalette namespace")
    print(f"  - Added shortcuts namespace")

if __name__ == '__main__':
    main()
