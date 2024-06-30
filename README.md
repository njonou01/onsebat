# Onsebat: Plateforme de Connexion Professionnels-Particuliers au Cameroun

## Objectif
Onsebat facilite la mise en relation entre particuliers et professionnels qualifiés pour divers travaux (construction, rénovation, services divers) au Cameroun.

## Contexte
Ayant grandi au Cameroun, j'ai constaté les difficultés de mon père à trouver des professionnels fiables pour ses projets. Onsebat vise à résoudre ces problèmes en offrant une plateforme où chaque utilisateur peut trouver des professionnels qualifiés, avec des garanties de qualité et de fiabilité.

## Fonctionnalités déjà réalisées

### Page d'accueil 
### Recherche de Professionnels
- **Formulaire de Recherche**: Sélectionnez un service et une localisation.
- **Professionnels Qualifiés**: Liste de professionnels vérifiés avec évaluations.

### Demande de Devis
- **Devis Gratuit**: Demande de devis en ligne pour différents types de travaux.

### Support Client
- **Assistance 24/7 avec un chat**: Service d'assistance pour répondre aux questions et résoudre les problèmes.

### L'Internationalisation 
Avec 7 langues implémentées : Français, Anglais, Espagnol, Allemand, Japonais, Hindi, Chinois et Arabe.

Onsebat simplifie la recherche de professionnels et assure des travaux de qualité pour tous vos projets au Cameroun.

## Technologies : 
- **Django**
- **HTML**
- **CSS & TailwindCSS**
- **Vanilla JS**

## Outils : 
- **Youtube** : particulièrement une chaîne (https://www.youtube.com/@donaldprogrammeur)  
   + https://www.youtube.com/watch?v=CzDZZPWcGj8&t=1608s&pp=ygUbaW50ZXJuYXRpb25hbGlzYXRpb24gZGphbmdv
   + https://www.youtube.com/watch?v=q-RWsnQ2wHA&pp=ygUbaW50ZXJuYXRpb25hbGlzYXRpb24gZGphbmdv
   + 5 ou 6 autres vidéos

- **Mistral AI**
   + Pour la génération de contenu, particulièrement après avoir défini la structure de mon JSON, il devait me générer un tableau.
   + Après avoir réalisé la page principale, j'ai utilisé des animations.
   + Pour la page de filtrage, il m'a fourni la structure et un bon modèle que j'ai ajusté.
   + Pour les JSON, je vérifiais simplement s'il respectait les clés.
   + Pour le code, utilisant du JS et Tailwind, je vérifiais son bon fonctionnement, ajustais des éléments et parfois restructurais la logique.

- **Chat GPT** : Lorsque Mistral ne me donnait pas ce que je voulais ou pour ajuster ce qu'il avait fait et vice versa.

## Problèmes de l'application : 
- **Une API très lente** : En effet, l'API de Mistral envoie des résultats avec des délais longs.
- **J'ai eu des difficultés pour gérer la mise de ma clé secrète dans une variable d'environnement lors du déploiement, j'ai dû la mettre en dur.**

## Planning  Suivi : 
- **Un jour et demi pour apprendre Django et Python**
- **6 jours pour coder** : Souhaitant réaliser cette application, j'ai dû réfléchir à une structure (design HTML, CSS) que je souhaitais et j'ai aussi beaucoup réfléchi à la structure globale de l'application.
- **Demi-journée pour documenter et déployer**

## Comment lancer l'application ?
- **Cloner le projet**
- **Taper la commande `pip install -r requirements.txt`**
- **`python manage.py runserver`**
