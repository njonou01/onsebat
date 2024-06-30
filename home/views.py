# -*- coding: utf-8 -*-

import random
from django.http import HttpResponseNotAllowed, JsonResponse
from django.utils.translation import gettext as _
from django.utils import translation
import json
import os
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from django.shortcuts import redirect, reverse ,render

from home import chat


DATA_DIR = "data"
ARTISANS_FILE = "artisans"
SERVICES_FILE = "service"
SERVICES_BASE = "services"
DEFAULT_LANGUAGE = "fr"

cities = [
    "Yaoundé",
    "Douala",
    "Bafoussam",
    "Ngaoundéré",
    "Buéa",
    "Bamenda",
    "Garoua",
    "Maroua",
    "Kousséri",
    "Bertoua",
    "Limbé",
    "Kumba",
    "Ebolowa",
    "Dschang",
    "Bafang",
    "Kribi",
    "Foumban",
    "Meiganga",
    "Bafia",
    "Mbalmayo",
    "Batouri",
    "Edea",
    "Nkongsamba",
    "Bangangté",
    "Mokolo",
    "Mbouda",
    "Ngaoundal",
    "Sangmélima",
    "Tiko",
    "Wum",
    "Foumbot",
    "Mora",
    "Fontem",
    "Lolodorf",
    "Nkoteng",
    "Banyo",
    "Manjo",
    "Bogo",
    "Mutengene",
    "Melong",
    "Mbanga",
    "Bamuso",
    "Mundemba",
    "Tibati",
    "Guider",
    "Akonolinga",
    "Nanga-Eboko",
    "Mamfe",
]


def get_artisans_api(request):
    """
    Retourne les artisans au format JSON, filtrés et paginés selon les paramètres d'URL.
    """
    if request.method == "GET":
        experience_min = int(request.GET.get("experienceMin", 0))
        rating_min = float(request.GET.get("ratingMin", 1.0))
        sort_by = request.GET.get("sortBy", "rating")
        page_number = int(request.GET.get("page", 1))
        items_per_page = int(request.GET.get("itemsPerPage", 9))

        artisans = filter_artisans(experience_min, rating_min, sort_by)

        paginated_artisans = paginate_results(artisans, page_number, items_per_page)

        return JsonResponse(paginated_artisans, safe=False)

    else:
        return HttpResponseNotAllowed(["GET"])


def filter_artisans(experience_min, rating_min, sort_by):
    """
    Filtrer les artisans en fonction des critères spécifiés.
    """
    artisans = get_artisans()

    filtered_artisans = [
        artisan
        for artisan in artisans
        if artisan["experience"] >= experience_min and artisan["rating"] >= rating_min
    ]

    filtered_artisans.sort(key=lambda x: x.get(sort_by, 0), reverse=True)

    return filtered_artisans


def paginate_results(results, page_number, items_per_page):
    """
    Paginer les résultats.
    """
    from django.core.paginator import Paginator

    paginator = Paginator(results, items_per_page)
    page_obj = paginator.get_page(page_number)

    return list(page_obj.object_list)


def search_page(request):
    """
    Affiche la page de recherche.
    """
    if request.method == "GET":
        services = get_services()
        context = {
            "services": services,
            "cities": cities,
        }
        return render(request, "searchPage.html", context)
    return HttpResponseNotAllowed(["GET"])


def home(request):
    """
    Affiche la page d'accueil avec les artisans et les services populaires.
    """
    artisans = get_artisans()[:10]
    services_populaires = get_services()[:4]
    services = get_services()

    context = {
        "artisans": artisans,
        "popular_features": services_populaires,
        "services": services,
    }
    return render(request, "home.html", context)


def quote_page(request):
    """
    Affiche la page de devis.
    """
    return render(request, "quote-page.html")


def get_data(request):
    """
    Traite les données envoyées par le formulaire de devis.
    """
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        service = request.POST.get('service')
        address = request.POST.get('address')
        description = request.POST.get('description')
        langue = request.POST.get('langue')
        url = reverse('thanks_page')
        url = url + f'?name={name}&email={email}&phone={phone}&service={service}&address={address}&description={description}&langue={langue}'
        return redirect(url)

    else:
        return HttpResponseNotAllowed(["POST"])


def chat_api(request):
    """
    Retourne les données des personnes au format JSON.
    """
    question = request.POST.get('question')
    if request.method == "POST":
        response = chat(question)
        return JsonResponse({"reponse" :response}, safe=False)
    else:
        return HttpResponseNotAllowed(["POST"])


def thanks_page(request):
    """
    Affiche la page de remerciement après l'envoi du formulaire de devis.
    """
    name = request.GET.get('name')
    email = request.GET.get('email')
    phone = request.GET.get('phone')
    service = request.GET.get('service')
    address = request.GET.get('address')
    description = request.GET.get('description')
    langue = request.GET.get('langue')
    prompt = chat.generer_prompt_devis(service=service, nom= name, email=email, telephone=phone, adresse=address, description_projet=description, langue=langue)
    devis = chat.chat(prompt)
    print(devis)

    return render(request, "thanksPage.html", {'devis':devis})


def get_artisans():
    """
    Récupère les artisans à partir des données JSON traduites.

    Retourne:
        list: Une liste de dictionnaires contenant le nom, la spécialité, l'URL de l'image des artisans,
              et des champs générés aléatoirement pour 'neighborhood', 'experienceMin' et 'ratingMin'.
    """
    data = load_translated_json(base=ARTISANS_FILE, file_name=ARTISANS_FILE)
    artisans = []

    for artisan in data["artisans"]:
        neighborhood = random.choice(cities)
        experience_min = random.randint(1, 20)
        rating_min = round(random.uniform(0, 5), 1)

        artisans.append(
            {
                "id_service": artisan["id_service"],
                "description": artisan["description"],
                "id": artisan["id"],
                "nom": artisan["nom"],
                "specialite": artisan["specialite"],
                "image_url": artisan["image_url"],
                "city": neighborhood,
                "experience": experience_min,
                "rating": rating_min,
                "skills": [artisan["specialite"]],
            }
        )

    return artisans


def get_services():
    """
    Récupère les services populaires à partir des données JSON traduites.

    Retourne:
        list: Une liste de dictionnaires contenant le titre, la description et l'URL de l'image des services populaires.
    """
    data = load_translated_json(base=SERVICES_BASE, file_name=SERVICES_FILE)
    return [
        {
            "id": service["id"],
            "titre": service["titre"],
            "category": service["category"],
            "description": service["description"],
            "image_url": service["image_url"],
        }
        for service in data.get("popular_services", [])
    ]


def load_translated_json(base, file_name, default_language=DEFAULT_LANGUAGE):
    """
    Charge un fichier JSON traduit en fonction du paramètre de langue actuel.

    Args:
        base (str): Le répertoire de base où le fichier JSON est situé.
        file_name (str): Le nom du fichier JSON à charger.
        default_language (str): La langue par défaut à utiliser si le fichier traduit n'est pas trouvé.

    Retourne:
        dict: Les données JSON chargées.
    """
    language_code = translation.get_language()
    file_path = os.path.join(DATA_DIR, base, f"{file_name}_{language_code}.json")

    if not os.path.isfile(file_path):
        file_path = os.path.join(DATA_DIR, base, f"{file_name}_{default_language}.json")

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        raise ValueError(f"Erreur lors du chargement du fichier JSON : {e}")

    return data

