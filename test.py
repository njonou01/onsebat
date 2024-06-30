import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

def generer_prompt_devis_infaillible(service, nom, email, telephone, adresse, description_projet, langue="français"):
    prompt = f"""
    RÔLE : Tu es un expert comptable camerounais spécialisé dans la création de devis précis et professionnels pour l'entreprise Onsebat. Ta tâche est de générer un devis détaillé en {langue} pour le service suivant.
    
    CONTEXTE : Onsebat est une entreprise de construction et de services basée au Cameroun, connue pour sa fiabilité et son professionnalisme.

    INFORMATIONS CLIENT :
    - Service demandé : {service}
    - Nom : {nom}
    - E-mail : {email}
    - Téléphone : {telephone}
    - Adresse : {adresse}

    DESCRIPTION DU PROJET :
    {description_projet}

    INSTRUCTIONS DÉTAILLÉES :

    1. En-tête du devis :
    - Logo et nom de l'entreprise : Onsebat
    - Numéro unique du devis (format : ONS-AAAAMMJJ-XXX)
    - Date d'émission du devis
    - Mention "Valable 30 jours à compter de la date d'émission"

    2. Informations du client :
    - Reproduire les informations fournies ci-dessus

    3. Description détaillée des services :
    - Décomposer le service demandé en étapes ou composants spécifiques
    - Pour chaque étape/composant, fournir une brève description

    4. Estimation des coûts :
    - Main-d'œuvre :
        * Détailler les différents types de travailleurs nécessaires
        * Estimer le nombre d'heures pour chaque type
        * Appliquer un taux horaire réaliste pour le Cameroun
    - Matériaux :
        * Lister tous les matériaux nécessaires avec leurs quantités
        * Fournir un coût unitaire et un coût total pour chaque matériau
    - Équipements :
        * Si applicable, lister les équipements nécessaires et leur coût de location/utilisation
    - Frais supplémentaires :
        * Transport
        * Permis et autorisations
        * Frais d'inspection
        * Marge pour imprévus (généralement 10-15% du total)

    5. Récapitulatif des coûts :
    - Sous-total pour chaque catégorie (main-d'œuvre, matériaux, équipements, frais supplémentaires)
    - Total avant taxes
    - Taxes   (TVA à 19.25%)
    - Total final TTC

    6. Conditions de paiement :
    - Proposer un échéancier de paiement (par exemple : 30% à la signature, 40% à mi-projet, 30% à la livraison)
    - Spécifier les modes de paiement acceptés

    7. Délais d'exécution :
    - Fournir une estimation réaliste du temps nécessaire pour compléter le projet
    - Mentionner les facteurs pouvant influencer ce délai

    8. Garanties et services après-vente :
    - Détailler les garanties offertes sur le travail et les matériaux
    - Mentionner tout service après-vente inclus

    9. Conditions générales :
    - Inclure les clauses standards (modification du projet, résiliation, force majeure, etc.)

    10. Signature :
        - Signature et cachet d'Onsebat

    11. Pied de page :
        - Coordonnées complètes d'Onsebat
        - Numéro d'identification fiscale
        - Mention légale : "Onsebat, société de droit camerounais"

    CONSIGNES SUPPLÉMENTAIRES :
    - Utilise un langage formel et professionnel
    - Assure-toi que toutes les estimations sont réalistes pour le marché camerounais actuel
    - Vérifie la cohérence des calculs
    - Adapte le niveau de détail à l'ampleur du projet
    - Utilise le franc CFA (FCFA) comme devise
    - Rédige l'intégralité du devis en {langue}

    Génère maintenant un devis complet et détaillé en suivant scrupuleusement ces instructions.
    """
    return prompt

def chat(question):
    api_key = "rug3ahbZQs9ZOrvjJiuOAm9ZYlgWTKU4"
    model = "mistral-large-latest"
    client = MistralClient(api_key=api_key)

    prompt_devis_infaillible = generer_prompt_devis_infaillible(
        service="Construction d'une villa moderne",
        nom="Dr. Amadou Nkotto",
        email="a.nkotto@email.com",
        telephone="+237 677 889 900",
        adresse="17 Rue des Manguiers, Quartier Bastos, Yaoundé, Cameroun",
        description_projet="Construction d'une villa moderne de 250m² sur deux niveaux, comprenant 4 chambres, 3 salles de bain, un salon spacieux, une cuisine équipée, un bureau, un garage pour deux voitures et une piscine. Le projet inclut également l'aménagement paysager du jardin de 500m².",
        langue="français"
    )

    chat_response = client.chat(
        model=model,
        messages=[ChatMessage(role="user", content=prompt_devis_infaillible)]
    )
    return chat_response.choices[0].message.content

print(chat("je voudrais le devis d'une maison , duplex au Cameroun avec des chiffres fait une section html bien stylée avec Tailwind CSS, uniquement une section html"))
