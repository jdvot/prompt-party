# MCP vs RAG : Guide Complet pour les Développeurs IA

## 📚 Table des matières
1. [Introduction](#introduction)
2. [Qu'est-ce que RAG ?](#quest-ce-que-rag)
3. [Qu'est-ce que MCP ?](#quest-ce-que-mcp)
4. [Comparaison détaillée](#comparaison-détaillée)
5. [Cas d'usage](#cas-dusage)
6. [Comment choisir ?](#comment-choisir)
7. [Exemples pratiques](#exemples-pratiques)
8. [Architecture technique](#architecture-technique)

---

## Introduction

Quand on travaille avec des LLMs (Large Language Models), on a souvent besoin de leur donner accès à des **données externes** ou des **outils**. Deux approches principales existent :

- **RAG** (Retrieval-Augmented Generation) - Pour les **données**
- **MCP** (Model Context Protocol) - Pour les **outils et actions**

Ce sont deux paradigmes **complémentaires**, pas concurrents !

---

## Qu'est-ce que RAG ?

### 🎯 Définition simple

**RAG = Chercher des infos pertinentes, puis les donner à l'IA**

C'est comme donner à l'IA un **livre ouvert** avec les pages pertinentes déjà trouvées.

### 🔄 Comment ça marche ?

```
┌─────────────────────────────────────────────────────────┐
│  1. QUESTION UTILISATEUR                                 │
│  "Quels sont les horaires d'ouverture du magasin ?"    │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. RECHERCHE DANS LA BASE DE DONNÉES                   │
│  Embeddings + Vector Search                             │
│  → Trouve les documents pertinents                      │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. CONTEXTE ENRICHI                                     │
│  Question + Documents trouvés                           │
│                                                          │
│  "Contexte: Le magasin est ouvert 9h-19h Lu-Ve...      │
│  Question: Quels sont les horaires d'ouverture ?"      │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. RÉPONSE LLM                                         │
│  "Le magasin est ouvert de 9h à 19h du lundi au...    │
└─────────────────────────────────────────────────────────┘
```

### 💡 Composants techniques

1. **Embedding Model** (ex: text-embedding-ada-002)
   - Transforme le texte en vecteurs numériques
   - Permet la recherche sémantique

2. **Vector Database** (ex: Pinecone, Weaviate, Qdrant)
   - Stocke les embeddings
   - Recherche rapide par similarité

3. **Retriever**
   - Trouve les k documents les plus pertinents
   - Utilise cosine similarity

4. **LLM** (ex: GPT-4, Claude)
   - Génère la réponse finale
   - Utilise les documents comme contexte

### ✅ Forces de RAG

| Avantage | Description |
|----------|-------------|
| 📚 **Données à jour** | Peut accéder à des infos récentes non dans le modèle |
| 🎯 **Réponses précises** | Base ses réponses sur des sources réelles |
| 💰 **Moins cher** | Pas besoin de re-entraîner le modèle |
| 🔍 **Traçabilité** | On sait d'où vient l'information (sources) |
| 📈 **Scalable** | Ajoutez autant de documents que nécessaire |

### ❌ Limites de RAG

| Limite | Description |
|--------|-------------|
| 📖 **Lecture seule** | Ne peut pas modifier ou créer de données |
| 🐌 **Latence** | Recherche vectorielle ajoute du temps |
| 💾 **Coût stockage** | Vector DB peut être coûteux à grande échelle |
| 🎲 **Qualité variable** | Dépend de la pertinence de la recherche |
| 📝 **Pas d'actions** | Ne peut pas exécuter de code ou appeler des APIs |

### 🎯 Quand utiliser RAG ?

**✅ OUI si vous avez besoin de :**
- Répondre à partir d'une **base de connaissances**
- Accéder à des **documents** (PDFs, wikis, docs...)
- Citer des **sources** précises
- Maintenir des infos **à jour** sans ré-entraînement
- Chercher dans un **historique** de conversations

**❌ NON si vous avez besoin de :**
- Exécuter des actions (envoyer un email, créer un fichier...)
- Appeler des APIs externes
- Modifier des données
- Utiliser des outils (calculatrice, base de données...)

---

## Qu'est-ce que MCP ?

### 🎯 Définition simple

**MCP = Donner des "super-pouvoirs" à l'IA via des outils**

C'est comme donner à l'IA une **boîte à outils** qu'elle peut utiliser.

### 🔄 Comment ça marche ?

```
┌─────────────────────────────────────────────────────────┐
│  1. REQUÊTE UTILISATEUR                                  │
│  "Envoie un email à jean@example.com avec le rapport"  │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  2. LLM ANALYSE ET DÉCIDE                               │
│  "Je dois utiliser l'outil send_email"                 │
│  Paramètres: {to: "jean@...", subject: "...", ...}     │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  3. MCP SERVER EXÉCUTE L'OUTIL                          │
│  → Appelle l'API Gmail                                  │
│  → Envoie réellement l'email                           │
│  → Retourne le résultat                                │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  4. LLM CONFIRME À L'UTILISATEUR                        │
│  "✅ Email envoyé à jean@example.com avec succès"      │
└─────────────────────────────────────────────────────────┘
```

### 💡 Composants techniques

1. **MCP Client** (dans votre app)
   - Se connecte aux serveurs MCP
   - Expose les outils au LLM

2. **MCP Server** (backend)
   - Héberge les outils/fonctions
   - Exécute les actions demandées
   - Retourne les résultats

3. **Tools/Resources** (définitions)
   - Description de chaque outil
   - Paramètres requis
   - Format de réponse

4. **LLM** (avec function calling)
   - Comprend quand utiliser quel outil
   - Génère les bons paramètres
   - Interprète les résultats

### ✅ Forces de MCP

| Avantage | Description |
|----------|-------------|
| 🔧 **Actions réelles** | Peut modifier, créer, supprimer des données |
| 🌐 **APIs externes** | Accède à n'importe quel service (GitHub, Gmail...) |
| ⚡ **Temps réel** | Données toujours à jour (pas de cache) |
| 🔌 **Extensible** | Ajoutez autant d'outils que nécessaire |
| 🎯 **Précis** | Appels API structurés (pas d'hallucinations) |
| 🔄 **Réutilisable** | Un serveur MCP = utilisable partout |

### ❌ Limites de MCP

| Limite | Description |
|--------|-------------|
| 🛡️ **Sécurité** | Doit sécuriser chaque outil (authentification, permissions) |
| 💻 **Complexité** | Plus difficile à implémenter que RAG |
| 🐛 **Débogage** | Erreurs dans les outils peuvent casser l'expérience |
| 💰 **Coût** | Chaque appel API peut coûter de l'argent |
| ⏱️ **Latence** | Appels réseau peuvent être lents |

### 🎯 Quand utiliser MCP ?

**✅ OUI si vous avez besoin de :**
- **Exécuter des actions** (envoyer email, créer fichier...)
- **Appeler des APIs** externes (météo, stocks, GitHub...)
- **Lire/écrire** en base de données
- Utiliser des **outils** (calculatrice, terminal...)
- **Automatiser** des workflows

**❌ NON si vous avez besoin de :**
- Simplement chercher dans des documents
- Répondre à partir d'une base de connaissances statique
- Éviter les appels API pour réduire les coûts

---

## Comparaison détaillée

### 📊 Tableau comparatif

| Critère | RAG 📚 | MCP 🔧 |
|---------|--------|--------|
| **Nature** | Données statiques enrichies | Outils et actions dynamiques |
| **Action** | Lecture seule | Lecture + Écriture + Actions |
| **Latence** | Moyenne (recherche vectorielle) | Variable (dépend des APIs) |
| **Coût** | Vector DB + Embeddings | Appels API + Compute |
| **Complexité** | Moyenne | Élevée |
| **Scalabilité** | Excellente (ajoutez des docs) | Bonne (ajoutez des outils) |
| **Sécurité** | Faible risque (lecture) | Haut risque (exécution) |
| **Temps réel** | Non (cache vectoriel) | Oui (APIs live) |
| **Sources** | Traçables | Non applicable |
| **Hallucinations** | Réduites (source réelle) | Rares (API structurée) |

### 🎨 Analogie simple

**RAG = Bibliothèque** 📚
- L'IA peut **lire** tous les livres
- Elle trouve les passages pertinents
- Elle cite ses sources
- Mais elle ne peut rien **modifier**

**MCP = Atelier** 🔧
- L'IA a des **outils**
- Elle peut **construire** des choses
- Elle peut **agir** sur le monde
- Mais elle n'a pas de mémoire longue terme

### 🤝 Complémentarité

**La vraie puissance = RAG + MCP ensemble !**

```
┌─────────────────────────────────────────────────────────┐
│  QUESTION: "Résume les tickets GitHub ouverts ce mois   │
│            et envoie un rapport à l'équipe"             │
└─────────────────────────────────────────────────────────┘
                        ↓
    ┌───────────────────────────────────────┐
    │  MCP: Récupère tickets via GitHub API │
    │  → get_open_issues(repo, since=...)   │
    └───────────────────────────────────────┘
                        ↓
    ┌───────────────────────────────────────┐
    │  RAG: Cherche contexte historique     │
    │  → "Tickets similaires le mois dernier│
    │     ont pris 5 jours en moyenne..."   │
    └───────────────────────────────────────┘
                        ↓
    ┌───────────────────────────────────────┐
    │  LLM: Génère le rapport               │
    │  Combine données temps réel + contexte│
    └───────────────────────────────────────┘
                        ↓
    ┌───────────────────────────────────────┐
    │  MCP: Envoie l'email                  │
    │  → send_email(to=team, body=rapport) │
    └───────────────────────────────────────┘
```

---

## Cas d'usage

### 📚 RAG - Exemples concrets

#### 1. Chatbot support client
```
Besoin: Répondre aux questions clients avec la doc produit
Solution: RAG sur la documentation
Stack:
  - Docs → Chunking → Embeddings (OpenAI)
  - Vector DB: Pinecone
  - LLM: GPT-4 avec contexte enrichi
```

#### 2. Assistant juridique
```
Besoin: Recherche dans 10,000 documents légaux
Solution: RAG sur corpus juridique
Stack:
  - PDFs → Parse → Embeddings (Cohere)
  - Vector DB: Weaviate
  - LLM: Claude 3 (long context)
```

#### 3. Base de connaissances interne
```
Besoin: Employés cherchent dans confluence/notion
Solution: RAG sur tous les docs internes
Stack:
  - Sync Notion/Confluence → Embeddings
  - Vector DB: Qdrant
  - LLM: GPT-4-turbo
```

### 🔧 MCP - Exemples concrets

#### 1. Assistant développeur
```
Besoin: Créer des PRs, lire des issues, déployer
Solution: MCP avec outils GitHub/CI
Outils:
  - create_pull_request()
  - get_issues()
  - trigger_deployment()
  - run_tests()
```

#### 2. Assistant e-commerce
```
Besoin: Chercher produits, créer commandes, suivre livraisons
Solution: MCP avec APIs e-commerce
Outils:
  - search_products(query, filters)
  - create_order(items, address)
  - track_shipment(order_id)
  - process_refund(order_id)
```

#### 3. Gestionnaire de tâches
```
Besoin: Créer tâches, envoyer notifs, générer rapports
Solution: MCP avec outils productivité
Outils:
  - create_task(title, assignee, due_date)
  - send_slack_message(channel, text)
  - generate_weekly_report()
  - update_calendar(event)
```

### 🚀 Hybride RAG + MCP

#### 1. Assistant RH intelligent
```
RAG: Base de connaissances (politiques, procédures)
  → Répond aux questions RH

MCP: Actions RH
  → create_time_off_request()
  → schedule_interview()
  → update_employee_info()

Exemple:
"Combien de jours de congé me reste-t-il ?"
  → RAG: trouve la politique de congés
  → MCP: appelle l'API RH pour les jours restants
  → Réponse: "Selon notre politique, vous avez droit à
             25 jours. Il vous reste 12 jours cette année."
```

#### 2. Analyste financier IA
```
RAG: Rapports financiers historiques
  → Analyse des tendances, comparaisons

MCP: APIs financières temps réel
  → get_stock_price()
  → get_market_news()
  → execute_trade() [avec validation humaine]

Exemple:
"Analyse l'action AAPL et compare aux derniers trimestres"
  → MCP: prix actuel temps réel
  → RAG: rapports financiers Q1-Q4 2024
  → Synthèse avec contexte historique + données live
```

#### 3. Assistant médical
```
RAG: Base de données médicale, études cliniques
  → Recommandations basées sur recherche

MCP: Dossier patient, APIs hôpital
  → get_patient_history()
  → schedule_appointment()
  → order_lab_tests()

⚠️ Validation humaine obligatoire!
```

---

## Comment choisir ?

### 🎯 Arbre de décision

```
Avez-vous besoin d'ACTIONS (modifier/créer/supprimer) ?
├─ OUI → MCP
│  └─ Aussi besoin de chercher dans des docs ?
│     ├─ OUI → MCP + RAG
│     └─ NON → MCP seul
│
└─ NON → Besoin de chercher dans des documents ?
   ├─ OUI → RAG
   └─ NON → LLM simple (zero-shot)
```

### 📋 Checklist

**Utilisez RAG si :**
- ✅ Vous avez une **grande base documentaire**
- ✅ Les infos changent **occasionnellement**
- ✅ Vous voulez des **sources citées**
- ✅ **Lecture seule** suffit
- ✅ Budget limité (pas d'appels API récurrents)

**Utilisez MCP si :**
- ✅ Vous devez **exécuter des actions**
- ✅ Vous intégrez des **APIs tierces**
- ✅ Besoin de données **temps réel**
- ✅ L'IA doit **modifier** des données
- ✅ Vous voulez **automatiser** des workflows

**Utilisez RAG + MCP si :**
- ✅ Scénarios complexes nécessitant les deux
- ✅ Ex: "Cherche dans nos docs ET crée un ticket"
- ✅ Budget et ressources suffisants
- ✅ Besoin de contexte enrichi + actions

---

## Exemples pratiques

### 📚 Exemple RAG complet

```python
# 1. Préparer les documents
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone

# Charger les documents
loader = DirectoryLoader('./docs', glob="**/*.md")
documents = loader.load()

# Découper en chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

# Créer les embeddings et stocker
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_documents(
    chunks,
    embeddings,
    index_name="knowledge-base"
)

# 2. Faire une requête RAG
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)

# Question
question = "Quelle est notre politique de remboursement ?"
answer = qa_chain.run(question)

# Résultat avec contexte des docs pertinents
print(answer)
# "Selon notre politique, les remboursements sont acceptés
#  sous 30 jours avec le reçu original..."
```

### 🔧 Exemple MCP complet

```python
# 1. Définir les outils MCP
from anthropic import Anthropic
import json

tools = [
    {
        "name": "create_github_issue",
        "description": "Crée une issue GitHub dans un repo",
        "input_schema": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Nom du repo (owner/name)"
                },
                "title": {
                    "type": "string",
                    "description": "Titre de l'issue"
                },
                "body": {
                    "type": "string",
                    "description": "Description de l'issue"
                },
                "labels": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Labels à ajouter"
                }
            },
            "required": ["repo", "title", "body"]
        }
    },
    {
        "name": "get_repository_issues",
        "description": "Récupère les issues ouvertes d'un repo",
        "input_schema": {
            "type": "object",
            "properties": {
                "repo": {
                    "type": "string",
                    "description": "Nom du repo (owner/name)"
                },
                "state": {
                    "type": "string",
                    "enum": ["open", "closed", "all"],
                    "description": "État des issues"
                }
            },
            "required": ["repo"]
        }
    }
]

# 2. Implémenter les fonctions
def create_github_issue(repo, title, body, labels=None):
    # Appel API GitHub réel
    from github import Github
    g = Github(os.getenv("GITHUB_TOKEN"))
    repository = g.get_repo(repo)
    issue = repository.create_issue(
        title=title,
        body=body,
        labels=labels or []
    )
    return {"issue_number": issue.number, "url": issue.html_url}

def get_repository_issues(repo, state="open"):
    from github import Github
    g = Github(os.getenv("GITHUB_TOKEN"))
    repository = g.get_repo(repo)
    issues = repository.get_issues(state=state)
    return [{"number": i.number, "title": i.title} for i in issues[:10]]

# 3. Utiliser avec Claude
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

user_message = "Crée une issue dans mon/repo pour le bug de login"

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    tools=tools,
    messages=[{"role": "user", "content": user_message}]
)

# 4. Gérer les appels d'outils
if response.stop_reason == "tool_use":
    tool_use = response.content[1]  # Le tool_use block
    tool_name = tool_use.name
    tool_input = tool_use.input

    # Exécuter l'outil
    if tool_name == "create_github_issue":
        result = create_github_issue(**tool_input)

        # Renvoyer le résultat à Claude
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            tools=tools,
            messages=[
                {"role": "user", "content": user_message},
                {"role": "assistant", "content": response.content},
                {
                    "role": "user",
                    "content": [{
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": json.dumps(result)
                    }]
                }
            ]
        )

    print(response.content[0].text)
    # "✅ J'ai créé l'issue #42 : Bug de login
    #  Vous pouvez la voir ici: https://github.com/..."
```

### 🚀 Exemple Hybride (RAG + MCP)

```python
# Agent qui combine RAG (docs) et MCP (actions GitHub)

class HybridAgent:
    def __init__(self):
        # Setup RAG
        self.vectorstore = setup_rag_vectorstore()

        # Setup MCP tools
        self.tools = setup_mcp_tools()

        self.client = Anthropic()

    def process_request(self, user_message):
        # 1. D'abord chercher dans RAG si besoin de contexte
        if self.needs_context(user_message):
            context_docs = self.vectorstore.similarity_search(
                user_message, k=3
            )
            context = "\n".join([doc.page_content for doc in context_docs])

            # Enrichir le message
            enriched_message = f"""
            Contexte de notre documentation:
            {context}

            Question de l'utilisateur:
            {user_message}
            """
        else:
            enriched_message = user_message

        # 2. Envoyer à Claude avec les outils MCP
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            tools=self.tools,
            messages=[{"role": "user", "content": enriched_message}]
        )

        # 3. Gérer les appels d'outils si nécessaire
        if response.stop_reason == "tool_use":
            return self.execute_tools(response, enriched_message)

        return response.content[0].text

# Utilisation
agent = HybridAgent()

# Exemple 1: Pure RAG
result = agent.process_request(
    "Quelle est notre politique de contribution ?"
)
# → Cherche dans les docs, pas d'action

# Exemple 2: Pure MCP
result = agent.process_request(
    "Crée une issue pour documenter l'API"
)
# → Action directe, pas besoin de contexte

# Exemple 3: Hybride
result = agent.process_request(
    "Selon nos conventions de code, crée une issue pour "
    "améliorer le nommage des variables dans auth.py"
)
# → RAG: récupère les conventions de code
# → MCP: crée l'issue avec le bon contexte
```

---

## Architecture technique

### 🏗️ Architecture RAG

```
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   User UI    │────────▶│  Query       │             │
│  └──────────────┘         │  Processor   │             │
│                           └──────┬───────┘             │
│                                  │                      │
│                                  ▼                      │
│                           ┌──────────────┐             │
│                           │  Embedding   │             │
│                           │  Model       │             │
│                           └──────┬───────┘             │
│                                  │                      │
│                                  ▼                      │
│  ┌──────────────┐         ┌──────────────┐             │
│  │  Vector DB   │◀────────│  Retriever   │             │
│  │  (Pinecone)  │         └──────┬───────┘             │
│  └──────────────┘                │                      │
│         │                        │                      │
│         │  Top-k docs            │                      │
│         └────────────────────────┘                      │
│                                  │                      │
│                                  ▼                      │
│                           ┌──────────────┐             │
│                           │     LLM      │             │
│                           │  (GPT-4)     │             │
│                           └──────┬───────┘             │
│                                  │                      │
│                                  ▼                      │
│                           ┌──────────────┐             │
│                           │   Response   │             │
│                           │   to User    │             │
│                           └──────────────┘             │
│                                                          │
└─────────────────────────────────────────────────────────┘

OFFLINE: Document Ingestion Pipeline
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Documents   │───▶│   Chunking   │───▶│  Embeddings  │
│ (.pdf, .md)  │    │  (LangChain) │    │  (OpenAI)    │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  Vector DB   │
                                        │   Storage    │
                                        └──────────────┘
```

### 🏗️ Architecture MCP

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT APP                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐                                       │
│  │   User UI    │                                       │
│  └──────┬───────┘                                       │
│         │                                                │
│         ▼                                                │
│  ┌──────────────┐                                       │
│  │  MCP Client  │                                       │
│  └──────┬───────┘                                       │
│         │                                                │
│         │ JSON-RPC                                       │
│         ▼                                                │
└─────────┼────────────────────────────────────────────────┘
          │
          │ stdio/HTTP/WebSocket
          │
┌─────────▼────────────────────────────────────────────────┐
│                   MCP SERVER                              │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────────────────────────────────────┐          │
│  │           Tool Registry                     │          │
│  ├────────────────────────────────────────────┤          │
│  │  - create_issue()                          │          │
│  │  - send_email()                            │          │
│  │  - query_database()                        │          │
│  │  - execute_code()                          │          │
│  └─────┬──────────────────────────────────────┘          │
│        │                                                  │
│        ▼                                                  │
│  ┌────────────────────────────────────────────┐          │
│  │         Tool Executor                       │          │
│  └─────┬──────────────────────────────────────┘          │
│        │                                                  │
│        ├──────────────┬──────────────┬─────────┐         │
│        ▼              ▼              ▼         ▼         │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐  ┌─────────┐  │
│  │ GitHub  │   │  Gmail  │   │   DB    │  │  File   │  │
│  │   API   │   │   API   │   │  Query  │  │ System  │  │
│  └─────────┘   └─────────┘   └─────────┘  └─────────┘  │
│                                                           │
└───────────────────────────────────────────────────────────┘
          │
          │ Results
          ▼
┌──────────────────────────────────────────────────────────┐
│                       LLM                                 │
│                  (Claude/GPT-4)                           │
├──────────────────────────────────────────────────────────┤
│  1. Reçoit la liste des outils disponibles               │
│  2. Décide quel outil utiliser                           │
│  3. Génère les paramètres                                │
│  4. Interprète les résultats                             │
│  5. Répond à l'utilisateur                               │
└──────────────────────────────────────────────────────────┘
```

### 🏗️ Architecture Hybride (RAG + MCP)

```
┌─────────────────────────────────────────────────────────┐
│                  USER REQUEST                            │
│  "Selon nos guidelines, crée un PR pour fix le bug"     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
         ┌────────────────┐
         │  Orchestrator   │ ← Décide: RAG? MCP? Both?
         └────────┬────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│   RAG Path    │   │   MCP Path    │
├───────────────┤   ├───────────────┤
│ 1. Search     │   │ 1. List tools │
│    "guidelines"│   │ 2. Select:    │
│                │   │    create_pr()│
│ 2. Get top 3  │   │ 3. Prepare    │
│    relevant   │   │    params     │
│    docs       │   │               │
│                │   │ 4. Execute    │
│ 3. Extract    │   │    → GitHub   │
│    context    │   │               │
└───────┬───────┘   └───────┬───────┘
        │                   │
        └─────────┬─────────┘
                  │
                  ▼
         ┌────────────────┐
         │      LLM       │
         │   (Claude)     │
         ├────────────────┤
         │ Input:         │
         │ - Guidelines   │ ← From RAG
         │ - PR created   │ ← From MCP
         │                │
         │ Output:        │
         │ "✅ PR créé    │
         │  selon nos     │
         │  guidelines"   │
         └────────────────┘
```

---

## 🎓 Résumé - Aide-mémoire

### 📊 Cheat Sheet

| Besoin | Solution | Exemple |
|--------|----------|---------|
| **Chercher dans docs** | RAG | "Quelle est notre politique ?" |
| **Exécuter une action** | MCP | "Envoie un email à l'équipe" |
| **Contexte + action** | RAG + MCP | "Selon nos règles, crée un ticket" |
| **Données temps réel** | MCP | "Quel est le prix de AAPL maintenant ?" |
| **Historique de chat** | RAG | "Que m'as-tu dit hier sur X ?" |
| **Calcul complexe** | MCP | "Calcule l'amortissement sur 10 ans" |
| **Citation de sources** | RAG | "Montre-moi d'où vient cette info" |

### ✅ Checklist décision

```
□ Mon cas d'usage nécessite-t-il de MODIFIER des données ?
  └─ OUI → MCP requis

□ Ai-je besoin de CHERCHER dans une base documentaire ?
  └─ OUI → RAG requis

□ Les données doivent-elles être TEMPS RÉEL ?
  └─ OUI → MCP recommandé

□ Ai-je besoin de CITER MES SOURCES ?
  └─ OUI → RAG requis

□ Mon budget est-il LIMITÉ ?
  └─ OUI → Préférer RAG (moins d'appels API)

□ La SÉCURITÉ est-elle critique ?
  └─ OUI → MCP nécessite plus de précautions
```

---

## 🚀 Pour aller plus loin

### 📚 Ressources RAG

- **LangChain Docs**: https://python.langchain.com/docs/use_cases/question_answering/
- **Pinecone RAG Guide**: https://www.pinecone.io/learn/rag/
- **OpenAI Embeddings**: https://platform.openai.com/docs/guides/embeddings

### 🔧 Ressources MCP

- **MCP Spec (Anthropic)**: https://github.com/anthropics/model-context-protocol
- **Claude Function Calling**: https://docs.anthropic.com/claude/docs/tool-use
- **OpenAI Function Calling**: https://platform.openai.com/docs/guides/function-calling

### 🎯 Outils recommandés

**RAG Stack:**
- Embeddings: OpenAI, Cohere, HuggingFace
- Vector DB: Pinecone, Weaviate, Qdrant, Chroma
- Framework: LangChain, LlamaIndex

**MCP Stack:**
- Serveurs MCP: @anthropics/sdk-mcp, mcp-server-github
- LLMs: Claude 3.5 Sonnet, GPT-4, Gemini Pro
- Runtime: Node.js, Python

---

**Créé pour Prompt Party** 🎉
Le réseau social pour les prompts IA
