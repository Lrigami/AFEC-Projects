class Personne {

    // classe qui permet de créer une nouvelle instance de personne. Les classes Professeur et Etudiant en héritent.
    constructor (prénom, nom, numéroDeTéléphone, adresse) {
        this.nom = nom;
        this.prénom = prénom;
        this.adresse = adresse;
        this._numéroDeTéléphone = numéroDeTéléphone;
    }

    // Permet de notifier un changement de numéro de téléphone
    get numéroDeTéléphone() {
        return this._numéroDeTéléphone;
    }

    set numéroDeTéléphone(nouveauNum) {
        this._numéroDeTéléphone = nouveauNum;
        console.log(`Nouveau numéro de téléphone de ${this.prénom} ${this.nom} : ${this.numéroDeTéléphone}`);
    }
}

class Professeur extends Personne {

    // classe pour créer une nouvelle instance de professeur avec toutes ses caractéristiques
    static _salaireDeBase = 2000;

    constructor (prénom, nom, matière, numéroDeTéléphone, adresse) {
        super(prénom, nom, numéroDeTéléphone, adresse);
        this.matière = matière;
        this.créneaux = [];
    }

    // Permet de notifier un changement de salaire
    get salaireDeBase() {
        return Professeur._salaireDeBase;
    }

    set salaireDeBase(nouveauSalaire) {
        Professeur._salaireDeBase = nouveauSalaire;
        console.log(`${this.nom.toUpperCase()} ${this.prénom} a dorénavant un salaire de ${Professeur._salaireDeBase}€`);
    }

    // Affiche dans la console toutes les informations sur le professeur concerné
    afficher() {
        console.log(`${this.nom.toUpperCase()} ${this.prénom}\nMatière : ${this.matière}\nSalaire : ${Professeur._salaireDeBase}€\nTéléphone : ${this._numéroDeTéléphone}\nAdresse : ${this.adresse.insérer()}\nCréneaux :`);
        this.créneaux.forEach(creneau => creneau.insérer());
        console.log("-----");
    }

    // Permet d'ajouter jusqu'à 15 créneaux horaires à un professeur donné.
    ajouterCréneau(début, durée) {
        if (this.créneaux.length < 15) {
            let nouveauCréneau = new Creneau(début, durée, this);
            this.créneaux.push(nouveauCréneau);
        } else {
            console.error("Nombre maximum de créneaux atteint.");
        }
    }

}

class Etudiant extends Personne {

    // Classe qui permet de créer une instance d'étudiant avec toutes ses caractéristiques
    constructor (prénom, nom, numéroDeTéléphone, niveau, numéroEtudiant, adresse, commentaires) {
        super(prénom, nom, numéroDeTéléphone, adresse);
        this.niveau = niveau;
        this.numéroEtudiant = numéroEtudiant;
        this._commentaires = commentaires || "[aucun commentaire]";
    }

    // Méthode qui permet d'afficher toutes les informations sur l'étudiant concerné.
    afficher() {
        console.log(`${this.nom.toUpperCase()} ${this.prénom}\nNiveau : ${this.niveau}\nNuméro étudiant : ${this.numéroEtudiant}\nTéléphone : ${this.numéroDeTéléphone}\nAdresse : ${this.adresse.insérer()}\nCommentaires : ${this._commentaires}\n-----`)
    }
}

class Adresse {

    // Classe qui permet de créer une nouvelle instance d'adresse.
    constructor (numéroVoie, typeDeVoie, nomDeVoie, codePostal, ville, mentionsComplémentaires) {
        this.mentionsComplémentaires = mentionsComplémentaires || "";
        this.numéroVoie = numéroVoie;
        this.typeDeVoie = typeDeVoie;
        this.nomDeVoie = nomDeVoie;
        this.codePostal = codePostal;
        this.ville = ville;
    }

    // Permet d'afficher l'adresse avec toutes ses caractéristiques
    afficher() {
        console.log(`${this.mentionsComplémentaires}\n${this.numéroVoie} ${this.typeDeVoie} ${this.nomDeVoie}\n${this.codePostal} ${this.ville.toUpperCase()}\n-----`);
    }

    // Permet d'insérer l'adresse
    insérer() {
        return `${this.mentionsComplémentaires}\n${this.numéroVoie} ${this.typeDeVoie} ${this.nomDeVoie}\n${this.codePostal} ${this.ville.toUpperCase()}\n-----`;
    }
}

class Creneau {

    // Classe permettant de créer une nouvelle instance de créneau horaire
    constructor (début, durée, professeur) {
        this.début = new Date();
        this.début.setHours(début.split(":")[0]);
        this.début.setMinutes(début.split(":")[1]);
        this.durée = durée;
        this.professeur = professeur;
    }

    // Méthode qui permet de calculer l'heure de fin en fonction du début du cours et de sa durée
    calculerHeureFin() {
        let fin = new Date(this.début);
        fin.setMinutes(this.début.getMinutes() + this.durée);
        return fin;
    }

    // Méthode qui permet d'afficher les informations sur le créneau horaire, et de n'afficher que l'heure et les minutes pour les dates (formatées FR)
    afficher() {
        let fin = this.calculerHeureFin();
        let heureDébut = this.début.toLocaleTimeString("fr-Fr", {
            hour: "2-digit",
            minute: "2-digit"
        });
        let heureFin = fin.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        console.log(`${heureDébut} - ${heureFin} (${this.durée} minutes)\nProfesseur associé : ${this.professeur.nom.toUpperCase()} ${this.professeur.prénom} `)
    }

    // Permet d'insérer le créneau dans les informations d'un professeur, donc inutile de repréciser le professeur.
    insérer() {
        let fin = this.calculerHeureFin();
        let heureDébut = this.début.toLocaleTimeString("fr-Fr", {
            hour: "2-digit",
            minute: "2-digit"
        });
        let heureFin = fin.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        console.log(`${heureDébut} - ${heureFin} (${this.durée} minutes)`)
    }
}

// Professeurs
let annaAdresse = new Adresse (6, "Chemin", "de la soie", 47567, "Villeneuve-du-Vélo");
let marcAdresse = new Adresse (152, "Place", "des Lilas", 21000, "Caen", "Etage 7");
let sophieAdresse = new Adresse (17, "Boulevard", "des airs", 65409, "VillageInconnu");
let jérômeAdresse = new Adresse (322, "Rue", "du chemin de fer", 45678, "Suite");
let joannaAdresse = new Adresse (200, "Voie", "du Paquebot bleu", 89000, "Marseille", "Appartement 14, Etage 6");

let anna = new Professeur ("Anna", "Martin", "Histoire-Géo", "06-67-68-69-70", annaAdresse);
let marc = new Professeur ("Marc", "Dupont", "Physique-Chimie", "06-20-21-22-23", marcAdresse);
let sophie = new Professeur ("Sophie", "Paul", "Latin", "06-30-31-32-33", sophieAdresse);
let jérôme = new Professeur ("Jéröme", "Foin", "Français", "06-12-13-14-15", jérômeAdresse);
let joanna = new Professeur ("Joanna", "Croix", "EPS", "06-43-44-45-46", joannaAdresse);

let professeurs = [anna, marc, sophie, jérôme, joanna];

// Ajout de créneaux pour les professeurs
anna.ajouterCréneau("10:00", 180);
jérôme.ajouterCréneau("16:00", 60);
marc.ajouterCréneau("08:00", 300);
sophie.ajouterCréneau("08:45", 90);
anna.ajouterCréneau("11:30", 120);
jérôme.ajouterCréneau("13:00", 45);
marc.ajouterCréneau("14:30", 90);
sophie.ajouterCréneau("15:15", 60);
joanna.ajouterCréneau("17:00", 180);
anna.ajouterCréneau("07:30", 90);
jérôme.ajouterCréneau("09:15", 120);
marc.ajouterCréneau("10:30", 60);
sophie.ajouterCréneau("11:00", 150);
joanna.ajouterCréneau("12:00", 90);
anna.ajouterCréneau("13:45", 180);
jérôme.ajouterCréneau("14:30", 120);
marc.ajouterCréneau("15:00", 60);
sophie.ajouterCréneau("16:30", 90);
joanna.ajouterCréneau("17:15", 120);
anna.ajouterCréneau("18:00", 45);
jérôme.ajouterCréneau("08:30", 120);
marc.ajouterCréneau("17:45", 90);
sophie.ajouterCréneau("09:00", 180);
joanna.ajouterCréneau("10:45", 60);
anna.ajouterCréneau("14:00", 120);
jérôme.ajouterCréneau("11:30", 90);
marc.ajouterCréneau("12:45", 120);
sophie.ajouterCréneau("08:30", 120);
joanna.ajouterCréneau("16:00", 180);
anna.ajouterCréneau("16:45", 60);
jérôme.ajouterCréneau("13:30", 90);
marc.ajouterCréneau("11:00", 180);
sophie.ajouterCréneau("17:30", 60);
joanna.ajouterCréneau("09:15", 120);
// Ajout de créneaux pour dépasser 15 et tester l'erreur :
anna.ajouterCréneau("07:00", 120);
anna.ajouterCréneau("08:00", 90);
anna.ajouterCréneau("09:30", 60);
anna.ajouterCréneau("10:30", 180);
anna.ajouterCréneau("12:00", 45);
anna.ajouterCréneau("13:00", 120);
anna.ajouterCréneau("14:30", 90);
anna.ajouterCréneau("15:30", 60);
anna.ajouterCréneau("17:00", 180);

console.log("----- Professeurs -----");
professeurs.forEach(professeur => professeur.afficher());

console.log("----- Modification du téléphone -----");
anna.numéroDeTéléphone = "06-10-11-12-13";
jérôme.numéroDeTéléphone = "06-88-89-90-91";
joanna.numéroDeTéléphone = "07-21-22-23-24";

console.log("----- Modification du salaire -----");
anna.salaireDeBase = 3000;
marc.salaireDeBase = 2700;
anna.salaireDeBase = 3200;

// Etudiants
let emilieAdresse = new Adresse (7, "Place", "du Bal", 87006, "Jean-Dit");
let pascalAdresse = new Adresse (4, "Chemin", "du grand chêne", 62355, "Lieu-dit le Jeune");
let jennieAdresse = new Adresse (92, "avenue", "des platanes", 47655, "Grande-ville", "Appartement 212A");

let emilie = new Etudiant("Emilie", "Roi", "06-10-12-14-16", "Licence", "76439275e", emilieAdresse);
let pascal = new Etudiant("Pascal", "De Silva", "07-67-68-69-70", "Master", "05456434e", pascalAdresse, "Allergique aux arachides");
let jennie = new Etudiant("Jennie", "Joplin", "07-08-09-10-11", "Doctorat", "01624356e", jennieAdresse, "Actuellement au Canada");

let etudiants = [emilie, pascal, jennie];

console.log("----- Etudiants -----")
etudiants.forEach(etudiant => etudiant.afficher());