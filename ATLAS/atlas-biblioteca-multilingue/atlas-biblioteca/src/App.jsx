import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, BookOpen, Bookmark, Check, ChevronDown,
  CircleHelp, Compass, Library, Plus, Search, Sparkles, Trash2, X
} from "lucide-react";

const CATEGORIES = [
  "Filosofia", "Sociologia", "Psicologia", "História", "Política e poder",
  "Economia", "Antropologia", "Pensamento crítico", "Sociedade brasileira",
  "Condição humana"
];
const STATUSES = ["Quero ler", "Lendo", "Concluído"];

const LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" }
];

const I18N = {
  pt: {
    navLibrary:"BIBLIOTECA", navAbout:"SOBRE", navMethod:"MÉTODO", newBook:"Novo livro",
    eyebrow:"UM ESPAÇO PARA PENSAR MELHOR", heroTitle:"Conhecimento", heroEm:"muda perspectivas.",
    heroDescription:"Uma biblioteca para quem deseja compreender o mundo, questionar ideias e enxergar além do óbvio.",
    explore:"Explorar biblioteca", areas:"ÁREAS", ideas:"IDEIAS EM MOVIMENTO", side:"PENSE · LEIA · QUESTIONE",
    collection:"LIVROS NA COLEÇÃO", inProgress:"EM ANDAMENTO", completed:"CONCLUÍDOS", journey:"JORNADA DE LEITURA",
    personal:"ACERVO PESSOAL", libraryTitle:"Sua biblioteca", libraryDescription:"Trinta ideias para começar. Uma vida inteira para continuar aprendendo.",
    addBook:"Adicionar livro", search:"Buscar por título, autor ou área...", all:"Todos", allAreas:"Todas as áreas",
    found:"LIVROS ENCONTRADOS", foundOne:"LIVRO ENCONTRADO", clickStatus:"CLIQUE NO STATUS PARA ATUALIZAR",
    emptyTitle:"Nenhum livro encontrado", emptyText:"Tente mudar os filtros ou adicionar um novo título.", clear:"Limpar filtros",
    manifesto:"NOSSA IDEIA", manifestoTitle:"Não leia apenas para", manifestoEm:"saber mais. Leia para ver diferente.",
    manifestoText:"O objetivo não é acumular páginas. É desenvolver pensamento próprio, repertório e a capacidade de analisar o mundo com profundidade.",
    method:"UM MÉTODO SIMPLES", methodTitle:"Leia. Reflita.", methodEm:"Conecte ideias.",
    understand:"Compreenda", understandText:"Identifique a ideia central e os argumentos do autor.",
    question:"Questione", questionText:"Procure evidências, limites e pontos de discordância.",
    connect:"Conecte", connectText:"Relacione o que leu com a realidade e outras perspectivas.",
    footer:"UMA BIBLIOTECA EM CONSTRUÇÃO CONSTANTE.", backTop:"VOLTAR AO TOPO ↑",
    expand:"EXPANDA SEU ACERVO", modalTitle:"Adicionar livro", title:"Título do livro", author:"Autor",
    category:"Área do conhecimento", status:"Status de leitura", why:"Por que este livro está na sua lista?",
    optional:"(opcional)", notePlaceholder:"Uma ideia, tema ou motivo para ler...", cancel:"Cancelar", save:"Salvar livro",
    added:"Livro adicionado à sua biblioteca.", deleteConfirm:'Excluir "{title}" da biblioteca?',
    deleteBook:"Excluir livro", close:"Fechar", clearSearch:"Limpar busca", allStatus:"Todos",
    statuses:["Quero ler","Lendo","Concluído"],
    categories:["Filosofia","Sociologia","Psicologia","História","Política e poder","Economia","Antropologia","Pensamento crítico","Sociedade brasileira","Condição humana"]
  },
  en: {
    navLibrary:"LIBRARY", navAbout:"ABOUT", navMethod:"METHOD", newBook:"New book",
    eyebrow:"A SPACE TO THINK MORE DEEPLY", heroTitle:"Knowledge", heroEm:"changes perspectives.",
    heroDescription:"A library for those who want to understand the world, question ideas, and see beyond the obvious.",
    explore:"Explore library", areas:"FIELDS", ideas:"IDEAS IN MOTION", side:"THINK · READ · QUESTION",
    collection:"BOOKS IN COLLECTION", inProgress:"IN PROGRESS", completed:"COMPLETED", journey:"READING JOURNEY",
    personal:"PERSONAL COLLECTION", libraryTitle:"Your library", libraryDescription:"Thirty ideas to begin with. A lifetime to keep learning.",
    addBook:"Add book", search:"Search by title, author, or field...", all:"All", allAreas:"All fields",
    found:"BOOKS FOUND", foundOne:"BOOK FOUND", clickStatus:"CLICK A STATUS TO UPDATE IT",
    emptyTitle:"No books found", emptyText:"Try changing the filters or adding a new title.", clear:"Clear filters",
    manifesto:"OUR IDEA", manifestoTitle:"Don't read just to", manifestoEm:"know more. Read to see differently.",
    manifestoText:"The goal is not to accumulate pages. It is to develop independent thinking, knowledge, and the ability to analyze the world deeply.",
    method:"A SIMPLE METHOD", methodTitle:"Read. Reflect.", methodEm:"Connect ideas.",
    understand:"Understand", understandText:"Identify the author's central idea and arguments.",
    question:"Question", questionText:"Look for evidence, limitations, and points of disagreement.",
    connect:"Connect", connectText:"Relate what you read to reality and other perspectives.",
    footer:"A LIBRARY THAT IS ALWAYS GROWING.", backTop:"BACK TO TOP ↑",
    expand:"GROW YOUR COLLECTION", modalTitle:"Add a book", title:"Book title", author:"Author",
    category:"Field of knowledge", status:"Reading status", why:"Why is this book on your list?",
    optional:"(optional)", notePlaceholder:"An idea, theme, or reason to read...", cancel:"Cancel", save:"Save book",
    added:"Book added to your library.", deleteConfirm:'Remove "{title}" from your library?',
    deleteBook:"Delete book", close:"Close", clearSearch:"Clear search", allStatus:"All",
    statuses:["Want to read","Reading","Completed"],
    categories:["Philosophy","Sociology","Psychology","History","Politics & power","Economics","Anthropology","Critical thinking","Brazilian society","The human condition"]
  },
  es: {
    navLibrary:"BIBLIOTECA", navAbout:"SOBRE", navMethod:"MÉTODO", newBook:"Nuevo libro",
    eyebrow:"UN ESPACIO PARA PENSAR MEJOR", heroTitle:"El conocimiento", heroEm:"cambia perspectivas.",
    heroDescription:"Una biblioteca para quienes desean comprender el mundo, cuestionar ideas y ver más allá de lo evidente.",
    explore:"Explorar biblioteca", areas:"ÁREAS", ideas:"IDEAS EN MOVIMIENTO", side:"PIENSA · LEE · CUESTIONA",
    collection:"LIBROS EN LA COLECCIÓN", inProgress:"EN CURSO", completed:"COMPLETADOS", journey:"RUTA DE LECTURA",
    personal:"COLECCIÓN PERSONAL", libraryTitle:"Tu biblioteca", libraryDescription:"Treinta ideas para empezar. Toda una vida para seguir aprendiendo.",
    addBook:"Añadir libro", search:"Buscar por título, autor o área...", all:"Todos", allAreas:"Todas las áreas",
    found:"LIBROS ENCONTRADOS", foundOne:"LIBRO ENCONTRADO", clickStatus:"HAZ CLIC EN EL ESTADO PARA ACTUALIZARLO",
    emptyTitle:"No se encontraron libros", emptyText:"Prueba a cambiar los filtros o añadir un título.", clear:"Limpiar filtros",
    manifesto:"NUESTRA IDEA", manifestoTitle:"No leas solo para", manifestoEm:"saber más. Lee para ver diferente.",
    manifestoText:"El objetivo no es acumular páginas. Es desarrollar pensamiento propio, conocimientos y la capacidad de analizar el mundo en profundidad.",
    method:"UN MÉTODO SENCILLO", methodTitle:"Lee. Reflexiona.", methodEm:"Conecta ideas.",
    understand:"Comprende", understandText:"Identifica la idea central y los argumentos del autor.",
    question:"Cuestiona", questionText:"Busca evidencias, límites y puntos de desacuerdo.",
    connect:"Conecta", connectText:"Relaciona lo que lees con la realidad y otras perspectivas.",
    footer:"UNA BIBLIOTECA EN CONSTANTE CONSTRUCCIÓN.", backTop:"VOLVER ARRIBA ↑",
    expand:"AMPLÍA TU COLECCIÓN", modalTitle:"Añadir libro", title:"Título del libro", author:"Autor",
    category:"Área de conocimiento", status:"Estado de lectura", why:"¿Por qué está este libro en tu lista?",
    optional:"(opcional)", notePlaceholder:"Una idea, tema o motivo para leer...", cancel:"Cancelar", save:"Guardar libro",
    added:"Libro añadido a tu biblioteca.", deleteConfirm:'¿Eliminar "{title}" de tu biblioteca?',
    deleteBook:"Eliminar libro", close:"Cerrar", clearSearch:"Borrar búsqueda", allStatus:"Todos",
    statuses:["Quiero leer","Leyendo","Terminado"],
    categories:["Filosofía","Sociología","Psicología","Historia","Política y poder","Economía","Antropología","Pensamiento crítico","Sociedad brasileña","Condición humana"]
  },
  fr: {
    navLibrary:"BIBLIOTHÈQUE", navAbout:"À PROPOS", navMethod:"MÉTHODE", newBook:"Nouveau livre",
    eyebrow:"UN ESPACE POUR MIEUX RÉFLÉCHIR", heroTitle:"Le savoir", heroEm:"change les perspectives.",
    heroDescription:"Une bibliothèque pour celles et ceux qui veulent comprendre le monde, questionner les idées et voir au-delà des évidences.",
    explore:"Explorer la bibliothèque", areas:"DOMAINES", ideas:"DES IDÉES EN MOUVEMENT", side:"PENSER · LIRE · QUESTIONNER",
    collection:"LIVRES DANS LA COLLECTION", inProgress:"EN COURS", completed:"TERMINÉS", journey:"PARCOURS DE LECTURE",
    personal:"COLLECTION PERSONNELLE", libraryTitle:"Votre bibliothèque", libraryDescription:"Trente idées pour commencer. Toute une vie pour continuer à apprendre.",
    addBook:"Ajouter un livre", search:"Rechercher par titre, auteur ou domaine...", all:"Tous", allAreas:"Tous les domaines",
    found:"LIVRES TROUVÉS", foundOne:"LIVRE TROUVÉ", clickStatus:"CLIQUEZ SUR LE STATUT POUR LE MODIFIER",
    emptyTitle:"Aucun livre trouvé", emptyText:"Modifiez les filtres ou ajoutez un nouveau titre.", clear:"Effacer les filtres",
    manifesto:"NOTRE IDÉE", manifestoTitle:"Ne lisez pas seulement pour", manifestoEm:"en savoir plus. Lisez pour voir autrement.",
    manifestoText:"Le but n'est pas d'accumuler les pages. Il est de développer une pensée autonome, une culture et la capacité d'analyser le monde en profondeur.",
    method:"UNE MÉTHODE SIMPLE", methodTitle:"Lire. Réfléchir.", methodEm:"Relier les idées.",
    understand:"Comprendre", understandText:"Repérez l'idée centrale et les arguments de l'auteur.",
    question:"Questionner", questionText:"Cherchez des preuves, des limites et des désaccords.",
    connect:"Relier", connectText:"Mettez vos lectures en rapport avec la réalité et d'autres perspectives.",
    footer:"UNE BIBLIOTHÈQUE EN CONSTANTE ÉVOLUTION.", backTop:"RETOUR EN HAUT ↑",
    expand:"ENRICHISSEZ VOTRE COLLECTION", modalTitle:"Ajouter un livre", title:"Titre du livre", author:"Auteur",
    category:"Domaine de connaissance", status:"Statut de lecture", why:"Pourquoi ce livre figure-t-il sur votre liste ?",
    optional:"(facultatif)", notePlaceholder:"Une idée, un thème ou une raison de lire...", cancel:"Annuler", save:"Enregistrer le livre",
    added:"Livre ajouté à votre bibliothèque.", deleteConfirm:'Supprimer « {title} » de votre bibliothèque ?',
    deleteBook:"Supprimer le livre", close:"Fermer", clearSearch:"Effacer la recherche", allStatus:"Tous",
    statuses:["À lire","En cours","Terminé"],
    categories:["Philosophie","Sociologie","Psychologie","Histoire","Politique et pouvoir","Économie","Anthropologie","Esprit critique","Société brésilienne","Condition humaine"]
  },
  de: {
    navLibrary:"BIBLIOTHEK", navAbout:"ÜBER UNS", navMethod:"METHODE", newBook:"Neues Buch",
    eyebrow:"EIN ORT FÜR TIEFERE GEDANKEN", heroTitle:"Wissen", heroEm:"verändert Perspektiven.",
    heroDescription:"Eine Bibliothek für Menschen, die die Welt verstehen, Ideen hinterfragen und über das Offensichtliche hinausblicken möchten.",
    explore:"Bibliothek entdecken", areas:"BEREICHE", ideas:"IDEEN IN BEWEGUNG", side:"DENKEN · LESEN · FRAGEN",
    collection:"BÜCHER IN DER SAMMLUNG", inProgress:"IN BEARBEITUNG", completed:"ABGESCHLOSSEN", journey:"LESEWEG",
    personal:"PERSÖNLICHE SAMMLUNG", libraryTitle:"Deine Bibliothek", libraryDescription:"Dreißig Ideen für den Anfang. Ein ganzes Leben zum Weiterlernen.",
    addBook:"Buch hinzufügen", search:"Nach Titel, Autor oder Bereich suchen...", all:"Alle", allAreas:"Alle Bereiche",
    found:"BÜCHER GEFUNDEN", foundOne:"BUCH GEFUNDEN", clickStatus:"KLICKE AUF DEN STATUS, UM IHN ZU ÄNDERN",
    emptyTitle:"Keine Bücher gefunden", emptyText:"Ändere die Filter oder füge einen neuen Titel hinzu.", clear:"Filter zurücksetzen",
    manifesto:"UNSERE IDEE", manifestoTitle:"Lies nicht nur, um", manifestoEm:"mehr zu wissen. Lies, um anders zu sehen.",
    manifestoText:"Es geht nicht darum, Seiten anzuhäufen. Ziel ist es, eigenständiges Denken, Wissen und die Fähigkeit zu entwickeln, die Welt tiefgründig zu analysieren.",
    method:"EINE EINFACHE METHODE", methodTitle:"Lesen. Reflektieren.", methodEm:"Ideen verbinden.",
    understand:"Verstehen", understandText:"Erkenne den Kerngedanken und die Argumente des Autors.",
    question:"Hinterfragen", questionText:"Suche nach Belegen, Grenzen und Gegenpositionen.",
    connect:"Verbinden", connectText:"Setze deine Lektüre mit der Realität und anderen Perspektiven in Beziehung.",
    footer:"EINE BIBLIOTHEK, DIE STÄNDIG WÄCHST.", backTop:"ZURÜCK NACH OBEN ↑",
    expand:"SAMMLUNG ERWEITERN", modalTitle:"Buch hinzufügen", title:"Buchtitel", author:"Autor",
    category:"Wissensgebiet", status:"Lesestatus", why:"Warum steht dieses Buch auf deiner Liste?",
    optional:"(optional)", notePlaceholder:"Ein Gedanke, Thema oder Lesegrund...", cancel:"Abbrechen", save:"Buch speichern",
    added:"Buch zu deiner Bibliothek hinzugefügt.", deleteConfirm:'„{title}“ aus deiner Bibliothek entfernen?',
    deleteBook:"Buch löschen", close:"Schließen", clearSearch:"Suche löschen", allStatus:"Alle",
    statuses:["Möchte ich lesen","Lese ich","Abgeschlossen"],
    categories:["Philosophie","Soziologie","Psychologie","Geschichte","Politik & Macht","Wirtschaft","Anthropologie","Kritisches Denken","Brasilianische Gesellschaft","Menschliche Existenz"]
  }
};


const BOOK_NOTES = {
  en: [
    "Character, reason, and self-mastery.","Justice, power, and the organization of society.","A journey through the history of philosophy.",
    "Consumption, appearances, and social relations.","Instability and contemporary change.","Culture, work, and capitalism.","How to study social phenomena.",
    "How we think, judge, and make decisions.","Social influence and collective behavior.","A landmark work in the history of psychoanalysis.",
    "Human history and the formation of societies.","Geography, environment, and the development of civilizations.","Wars, revolutions, and the twentieth century.",
    "Political strategy and the exercise of power.","Authoritarianism, ideology, and institutions.","Democracy, freedom, and equality.",
    "Markets, labor, and economic development.","Capitalism, commodities, and relations of production.","Incentives and the consequences of economic decisions.",
    "Brazil's historical and cultural formation.","Symbols, customs, and meanings.","Symbols and analytical psychology.",
    "Science, evidence, and rational thinking.","How numbers can distort perception.","Argumentation and rhetoric — read critically.",
    "Brazil's historical, political, and cultural formation.","The Brazilian state, patrimonialism, and elites.","Inequality, social classes, and power.",
    "Connecting individual experiences and social structures.","Work, action, politics, and freedom."
  ],
  es: [
    "Carácter, razón y dominio de uno mismo.","Justicia, poder y organización de la sociedad.","Un recorrido por la historia de la filosofía.",
    "Consumo, apariencia y relaciones sociales.","Inestabilidad y transformaciones contemporáneas.","Cultura, trabajo y capitalismo.","Cómo estudiar los fenómenos sociales.",
    "Cómo pensamos, juzgamos y tomamos decisiones.","Influencia social y comportamiento colectivo.","Una obra histórica del psicoanálisis.",
    "Historia de la humanidad y formación de las sociedades.","Geografía, medioambiente y desarrollo de las civilizaciones.","Guerras, revoluciones y siglo XX.",
    "Estrategia política y ejercicio del poder.","Autoritarismo, ideología e instituciones.","Democracia, libertad e igualdad.",
    "Mercados, trabajo y desarrollo económico.","Capitalismo, mercancías y relaciones de producción.","Incentivos y consecuencias de las decisiones económicas.",
    "Formación histórica y cultural de Brasil.","Símbolos, costumbres y significados.","Símbolos y psicología analítica.",
    "Ciencia, evidencias y pensamiento racional.","Cómo los números pueden distorsionar la percepción.","Argumentación y retórica: leer críticamente.",
    "Formación histórica, política y cultural de Brasil.","Estado brasileño, patrimonialismo y élites.","Desigualdad, clases sociales y poder.",
    "Conectar experiencias individuales y estructuras sociales.","Trabajo, acción, política y libertad."
  ],
  fr: [
    "Caractère, raison et maîtrise de soi.","Justice, pouvoir et organisation de la société.","Un parcours à travers l'histoire de la philosophie.",
    "Consommation, apparence et relations sociales.","Instabilité et transformations contemporaines.","Culture, travail et capitalisme.","Comment étudier les phénomènes sociaux.",
    "Comment nous pensons, jugeons et prenons des décisions.","Influence sociale et comportement collectif.","Un ouvrage historique de la psychanalyse.",
    "Histoire de l'humanité et formation des sociétés.","Géographie, environnement et développement des civilisations.","Guerres, révolutions et XXe siècle.",
    "Stratégie politique et exercice du pouvoir.","Autoritarisme, idéologie et institutions.","Démocratie, liberté et égalité.",
    "Marchés, travail et développement économique.","Capitalisme, marchandises et rapports de production.","Incitations et conséquences des décisions économiques.",
    "Formation historique et culturelle du Brésil.","Symboles, coutumes et significations.","Symboles et psychologie analytique.",
    "Science, preuves et pensée rationnelle.","Comment les chiffres peuvent fausser la perception.","Argumentation et rhétorique — à lire avec recul.",
    "Formation historique, politique et culturelle du Brésil.","État brésilien, patrimonialisme et élites.","Inégalités, classes sociales et pouvoir.",
    "Relier les expériences individuelles aux structures sociales.","Travail, action, politique et liberté."
  ],
  de: [
    "Charakter, Vernunft und Selbstbeherrschung.","Gerechtigkeit, Macht und die Organisation der Gesellschaft.","Eine Reise durch die Geschichte der Philosophie.",
    "Konsum, Schein und soziale Beziehungen.","Instabilität und zeitgenössischer Wandel.","Kultur, Arbeit und Kapitalismus.","Wie man soziale Phänomene untersucht.",
    "Wie wir denken, urteilen und Entscheidungen treffen.","Sozialer Einfluss und kollektives Verhalten.","Ein historisches Werk der Psychoanalyse.",
    "Menschheitsgeschichte und die Entstehung von Gesellschaften.","Geografie, Umwelt und die Entwicklung von Zivilisationen.","Kriege, Revolutionen und das 20. Jahrhundert.",
    "Politische Strategie und die Ausübung von Macht.","Autoritarismus, Ideologie und Institutionen.","Demokratie, Freiheit und Gleichheit.",
    "Märkte, Arbeit und wirtschaftliche Entwicklung.","Kapitalismus, Waren und Produktionsverhältnisse.","Anreize und Folgen wirtschaftlicher Entscheidungen.",
    "Historische und kulturelle Entstehung Brasiliens.","Symbole, Bräuche und Bedeutungen.","Symbole und analytische Psychologie.",
    "Wissenschaft, Belege und rationales Denken.","Wie Zahlen die Wahrnehmung verzerren können.","Argumentation und Rhetorik — kritisch lesen.",
    "Historische, politische und kulturelle Entstehung Brasiliens.","Brasilianischer Staat, Patrimonialismus und Eliten.","Ungleichheit, soziale Klassen und Macht.",
    "Individuelle Erfahrungen mit gesellschaftlichen Strukturen verbinden.","Arbeit, Handeln, Politik und Freiheit."
  ]
};

const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((category, index) =>
  [category, Object.fromEntries(Object.entries(I18N).map(([lang, data]) => [lang, data.categories[index]]))]
));
const STATUS_LABELS = Object.fromEntries(STATUSES.map((status, index) =>
  [status, Object.fromEntries(Object.entries(I18N).map(([lang, data]) => [lang, data.statuses[index]]))]
));


const INITIAL_BOOKS = [
  { id: 1, title: "Meditações", author: "Marco Aurélio", category: "Filosofia", status: "Quero ler", note: "Caráter, razão e domínio de si." },
  { id: 2, title: "A República", author: "Platão", category: "Filosofia", status: "Quero ler", note: "Justiça, poder e organização da sociedade." },
  { id: 3, title: "O Mundo de Sofia", author: "Jostein Gaarder", category: "Filosofia", status: "Quero ler", note: "Uma jornada pela história da filosofia." },
  { id: 4, title: "A Sociedade do Espetáculo", author: "Guy Debord", category: "Sociologia", status: "Quero ler", note: "Consumo, aparência e relações sociais." },
  { id: 5, title: "Modernidade Líquida", author: "Zygmunt Bauman", category: "Sociologia", status: "Quero ler", note: "Instabilidade e transformações contemporâneas." },
  { id: 6, title: "A Ética Protestante e o Espírito do Capitalismo", author: "Max Weber", category: "Sociologia", status: "Quero ler", note: "Cultura, trabalho e capitalismo." },
  { id: 7, title: "As Regras do Método Sociológico", author: "Émile Durkheim", category: "Sociologia", status: "Quero ler", note: "Como estudar os fenômenos sociais." },
  { id: 8, title: "Rápido e Devagar", author: "Daniel Kahneman", category: "Psicologia", status: "Quero ler", note: "Como pensamos, julgamos e decidimos." },
  { id: 9, title: "O Animal Social", author: "Elliot Aronson", category: "Psicologia", status: "Quero ler", note: "Influência social e comportamento coletivo." },
  { id: 10, title: "A Interpretação dos Sonhos", author: "Sigmund Freud", category: "Psicologia", status: "Quero ler", note: "Uma obra histórica da psicanálise." },
  { id: 11, title: "Sapiens", author: "Yuval Noah Harari", category: "História", status: "Quero ler", note: "História da humanidade e formação das sociedades." },
  { id: 12, title: "Armas, Germes e Aço", author: "Jared Diamond", category: "História", status: "Quero ler", note: "Geografia, ambiente e desenvolvimento das civilizações." },
  { id: 13, title: "A Era dos Extremos", author: "Eric Hobsbawm", category: "História", status: "Quero ler", note: "Guerras, revoluções e o século XX." },
  { id: 14, title: "O Príncipe", author: "Nicolau Maquiavel", category: "Política e poder", status: "Quero ler", note: "Estratégia política e exercício do poder." },
  { id: 15, title: "As Origens do Totalitarismo", author: "Hannah Arendt", category: "Política e poder", status: "Quero ler", note: "Autoritarismo, ideologia e instituições." },
  { id: 16, title: "A Democracia na América", author: "Alexis de Tocqueville", category: "Política e poder", status: "Quero ler", note: "Democracia, liberdade e igualdade." },
  { id: 17, title: "A Riqueza das Nações", author: "Adam Smith", category: "Economia", status: "Quero ler", note: "Mercados, trabalho e desenvolvimento econômico." },
  { id: 18, title: "O Capital", author: "Karl Marx", category: "Economia", status: "Quero ler", note: "Capitalismo, mercadorias e relações de produção." },
  { id: 19, title: "Economia em Uma Única Lição", author: "Henry Hazlitt", category: "Economia", status: "Quero ler", note: "Incentivos e consequências das decisões econômicas." },
  { id: 20, title: "O Povo Brasileiro", author: "Darcy Ribeiro", category: "Antropologia", status: "Quero ler", note: "Formação histórica e cultural do Brasil." },
  { id: 21, title: "A Interpretação das Culturas", author: "Clifford Geertz", category: "Antropologia", status: "Quero ler", note: "Símbolos, costumes e significados." },
  { id: 22, title: "O Homem e Seus Símbolos", author: "Carl G. Jung e colaboradores", category: "Antropologia", status: "Quero ler", note: "Símbolos e psicologia analítica." },
  { id: 23, title: "O Mundo Assombrado pelos Demônios", author: "Carl Sagan", category: "Pensamento crítico", status: "Quero ler", note: "Ciência, evidências e pensamento racional." },
  { id: 24, title: "Como Mentir com Estatística", author: "Darrell Huff", category: "Pensamento crítico", status: "Quero ler", note: "Como números podem distorcer a percepção." },
  { id: 25, title: "A Arte de Ter Razão", author: "Arthur Schopenhauer", category: "Pensamento crítico", status: "Quero ler", note: "Argumentação e retórica — para ler criticamente." },
  { id: 26, title: "Raízes do Brasil", author: "Sérgio Buarque de Holanda", category: "Sociedade brasileira", status: "Quero ler", note: "Formação histórica, política e cultural do país." },
  { id: 27, title: "Os Donos do Poder", author: "Raymundo Faoro", category: "Sociedade brasileira", status: "Quero ler", note: "Estado brasileiro, patrimonialismo e elites." },
  { id: 28, title: "A Elite do Atraso", author: "Jessé Souza", category: "Sociedade brasileira", status: "Quero ler", note: "Desigualdade, classes sociais e poder." },
  { id: 29, title: "A Imaginação Sociológica", author: "C. Wright Mills", category: "Sociedade brasileira", status: "Quero ler", note: "Conectar experiências individuais e estruturas sociais." },
  { id: 30, title: "A Condição Humana", author: "Hannah Arendt", category: "Condição humana", status: "Quero ler", note: "Trabalho, ação, política e liberdade." }
];

const CATEGORY_SHORT = {
  "Filosofia": "PH", "Sociologia": "SO", "Psicologia": "PS", "História": "HI",
  "Política e poder": "PO", "Economia": "EC", "Antropologia": "AN",
  "Pensamento crítico": "PC", "Sociedade brasileira": "BR", "Condição humana": "CH"
};

function loadBooks() {
  try {
    const saved = localStorage.getItem("atlas-books-v1");
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  } catch {
    return INITIAL_BOOKS;
  }
}

function BookCard({ book, onCycle, onDelete, lang, t }) {
  const coverClass = `cover cover-${CATEGORIES.indexOf(book.category) % 5}`;
  return (
    <article className="book-card">
      <div className={coverClass} aria-label={`Capa decorativa de ${book.title}`}>
        <span className="cover-mark">ATLAS / {CATEGORY_SHORT[book.category]}</span>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">{book.author}</span>
        <span className="cover-bottom">BIBLIOTECA INTELECTUAL</span>
      </div>
      <div className="book-info">
        <div className="book-category">{CATEGORY_LABELS[book.category]?.[lang] || book.category}</div>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        {book.note && <p className="book-note">{lang === "pt" ? book.note : (BOOK_NOTES[lang]?.[book.id - 1] || book.note)}</p>}
        <div className="book-actions">
          <button className={`status-pill ${book.status === "Concluído" ? "is-done" : book.status === "Lendo" ? "is-reading" : ""}`}
            onClick={() => onCycle(book.id)} title={t.clickStatus}>
            {book.status === "Concluído" ? <Check size={13}/> : <span className="status-dot"/>}
            {STATUS_LABELS[book.status]?.[lang] || book.status}
            <ChevronDown size={13}/>
          </button>
          <button className="icon-button delete-button" onClick={() => onDelete(book.id)} aria-label={`Excluir ${book.title}`} title={t.deleteBook}>
            <Trash2 size={15}/>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [books, setBooks] = useState(loadBooks);
  const [lang, setLang] = useState(() => localStorage.getItem("atlas-language-v1") || "pt");
  const t = I18N[lang] || I18N.pt;
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", category: "Filosofia", status: "Quero ler", note: "" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("atlas-language-v1", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("atlas-books-v1", JSON.stringify(books));
  }, [books]);

  const filteredBooks = useMemo(() => books.filter(book => {
    const term = search.toLocaleLowerCase();
    const matchesSearch = `${book.title} ${book.author} ${book.category} ${CATEGORY_LABELS[book.category]?.[lang] || ""}`.toLocaleLowerCase().includes(term);
    return matchesSearch &&
      (activeCategory === "Todos" || book.category === activeCategory) &&
      (activeStatus === "Todos" || book.status === activeStatus);
  }), [books, search, activeCategory, activeStatus, lang]);

  const completed = books.filter(book => book.status === "Concluído").length;
  const reading = books.filter(book => book.status === "Lendo").length;
  const progress = books.length ? Math.round(completed / books.length * 100) : 0;

  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  function addBook(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    const newBook = { ...form, id: Date.now(), title: form.title.trim(), author: form.author.trim(), note: form.note.trim() };
    setBooks(current => [newBook, ...current]);
    setForm({ title: "", author: "", category: "Filosofia", status: "Quero ler", note: "" });
    setShowForm(false);
    setNotice(t.added);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function cycleStatus(id) {
    setBooks(current => current.map(book => {
      if (book.id !== id) return book;
      const next = (STATUSES.indexOf(book.status) + 1) % STATUSES.length;
      return { ...book, status: STATUSES[next] };
    }));
  }

  function deleteBook(id) {
    const book = books.find(item => item.id === id);
    if (!book || !window.confirm(t.deleteConfirm.replace("{title}", book.title))) return;
    setBooks(current => current.filter(item => item.id !== id));
  }

  return (
    <main>
      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#inicio" aria-label="ATLAS início"><span className="brand-symbol">A</span><span>ATLAS<span className="brand-period">.</span></span></a>
          <nav className="topnav">
            <a href="#biblioteca">{t.navLibrary}</a>
            <a href="#sobre">{t.navAbout}</a>
            <a href="#metodo">{t.navMethod}</a>
          </nav>
          <div className="top-actions"><label className="language-picker" aria-label="Language / Idioma / Langue / Sprache"><span>🌐</span><select value={lang} onChange={e => setLang(e.target.value)}>{LANGUAGES.map(item => <option key={item.code} value={item.code}>{item.flag} {item.label}</option>)}</select></label><button className="top-add" onClick={() => setShowForm(true)}><Plus size={15}/> {t.newBook}</button></div>
        </header>

        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> {t.eyebrow}</div>
            <h1>{t.heroTitle}<br/><em>{t.heroEm}</em></h1>
            <p className="hero-description">{t.heroDescription}</p>
            <a href="#biblioteca" className="hero-link"><span className="arrow-circle"><ArrowRight size={19}/></span> {t.explore}</a>
            <div className="hero-index"><span>01</span><span className="index-line"/><span>10 {t.areas}</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
            <div className="hero-disc"/>
            <div className="hero-quote">“</div>
            <div className="hero-art-caption"><span>ATLAS</span><span>{t.ideas}</span></div>
            <div className="hero-side-label">{t.side}</div>
          </div>
        </section>

        <section className="stats-row" aria-label="Resumo da biblioteca">
          <div className="stat"><span className="stat-number">{books.length.toString().padStart(2, "0")}</span><span className="stat-label">{t.collection}</span></div>
          <div className="stat"><span className="stat-number">{reading.toString().padStart(2, "0")}</span><span className="stat-label">{t.inProgress}</span></div>
          <div className="stat"><span className="stat-number">{completed.toString().padStart(2, "0")}</span><span className="stat-label">{t.completed}</span></div>
          <div className="progress-stat"><div className="progress-label"><span>{t.journey}</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }}/></div></div>
        </section>

        <section className="library-section" id="biblioteca">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line"/> {t.personal}</div><h2>{t.libraryTitle}<span className="heading-dot">.</span></h2><p>{t.libraryDescription}</p></div>
            <button className="outline-add" onClick={() => setShowForm(true)}><Plus size={16}/> {t.addBook}</button>
          </div>

          <div className="toolbar">
            <label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search} aria-label={t.search}/>{search && <button onClick={() => setSearch("")} aria-label={t.clearSearch}><X size={15}/></button>}</label>
            <div className="status-filters" aria-label="Filtrar por status">
              {["Todos", ...STATUSES].map(status => <button key={status} className={activeStatus === status ? "filter-chip active" : "filter-chip"} onClick={() => setActiveStatus(status)}>{status === "Todos" ? t.allStatus : STATUS_LABELS[status][lang]}</button>)}
            </div>
          </div>

          <div className="category-tabs">
            <button className={activeCategory === "Todos" ? "category-tab selected" : "category-tab"} onClick={() => setActiveCategory("Todos")}>{t.allAreas} <span>{books.length}</span></button>
            {CATEGORIES.map(category => <button key={category} className={activeCategory === category ? "category-tab selected" : "category-tab"} onClick={() => setActiveCategory(category)}>{CATEGORY_LABELS[category][lang]}</button>)}
          </div>

          <div className="results-line"><span>{filteredBooks.length} {filteredBooks.length === 1 ? t.foundOne : t.found}</span><span>{t.clickStatus} <ArrowDownRight size={13}/></span></div>

          {filteredBooks.length ? <div className="book-grid">{filteredBooks.map(book => <BookCard key={book.id} book={book} onCycle={cycleStatus} onDelete={deleteBook} lang={lang} t={t}/>)}</div> :
            <div className="empty-state"><BookOpen size={30}/><h3>{t.emptyTitle}</h3><p>{t.emptyText}</p><button className="text-button" onClick={() => { setSearch(""); setActiveCategory("Todos"); setActiveStatus("Todos"); }}>{t.clear}</button></div>}
        </section>

        <section className="manifesto" id="sobre">
          <div className="manifesto-mark">“</div>
          <div><div className="eyebrow"><span className="eyebrow-line"/> {t.manifesto}</div><h2>{t.manifestoTitle}<br/><em>{t.manifestoEm}</em></h2><p>{t.manifestoText}</p></div>
          <div className="manifesto-number">ATLAS<br/><span>01 — 10</span></div>
        </section>

        <section className="method-section" id="metodo">
          <div><div className="eyebrow"><span className="eyebrow-line"/> {t.method}</div><h2>{t.methodTitle}<br/><em>{t.methodEm}</em></h2></div>
          <div className="method-steps">
            <div><span>01</span><section><h3>{t.understand}</h3><p>{t.understandText}</p></section></div>
            <div><span>02</span><section><h3>{t.question}</h3><p>{t.questionText}</p></section></div>
            <div><span>03</span><section><h3>{t.connect}</h3><p>{t.connectText}</p></section></div>
          </div>
        </section>

        <footer><a className="brand footer-brand" href="#inicio"><span className="brand-symbol">A</span><span>ATLAS<span className="brand-period">.</span></span></a><span>{t.footer}</span><a href="#inicio">{t.backTop}</a></footer>
      </div>

      {showForm && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> {t.expand}</div><h2 id="modal-title">{t.modalTitle}<span className="heading-dot">.</span></h2></div><button className="icon-button" onClick={() => setShowForm(false)} aria-label={t.close}><X/></button></div>
          <form onSubmit={addBook}>
            <label>{t.title}<input name="title" value={form.title} onChange={updateField} placeholder="Ex.: Meditações" required maxLength={100}/></label>
            <label>{t.author}<input name="author" value={form.author} onChange={updateField} placeholder="Nome do autor" required maxLength={80}/></label>
            <div className="form-two">
              <label>{t.category}<select name="category" value={form.category} onChange={updateField}>{CATEGORIES.map(category => <option key={category} value={category}>{CATEGORY_LABELS[category][lang]}</option>)}</select></label>
              <label>{t.status}<select name="status" value={form.status} onChange={updateField}>{STATUSES.map(status => <option key={status} value={status}>{STATUS_LABELS[status][lang]}</option>)}</select></label>
            </div>
            <label>{t.why} <span className="optional">{t.optional}</span><textarea name="note" value={form.note} onChange={updateField} placeholder={t.notePlaceholder} rows="3" maxLength={180}/></label>
            <div className="modal-actions"><button type="button" className="cancel-button" onClick={() => setShowForm(false)}>{t.cancel}</button><button type="submit" className="submit-button"><Plus size={16}/> {t.save}</button></div>
          </form>
        </section>
      </div>}
      {notice && <div className="toast"><Check size={16}/>{notice}</div>}
    </main>
  );
}