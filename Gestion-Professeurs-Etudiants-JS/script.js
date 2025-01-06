class Professeur {

    static _salaireDeBase = 2000;

    constructor (nom, prénom, matière, numéroDeTéléphone) {
        this.nom = nom;
        this.prénom = prénom;
        this.matière = matière;
        this._numéroDeTéléphone = numéroDeTéléphone;
    }

    get numéroDeTéléphone() {
        return this._numéroDeTéléphone;
    }

    set numéroDeTéléphone(nouveauNum) {
        this._numéroDeTéléphone = nouveauNum;
        console.log(`Nouveau numéro de téléphone de ${this.prénom} ${this.nom} : ${this.numéroDeTéléphone}`);
    }
    
    get salaireDeBase() {
        return Professeur._salaireDeBase;
    }

    set salaireDeBase(nouveauSalaire) {
        Professeur._salaireDeBase = nouveauSalaire;
        console.log(`${this.nom.toUpperCase()} ${this.prénom} a dorénavant un salaire de ${Professeur._salaireDeBase}€`);
    }

    afficher() {
        console.log(`${this.nom.toUpperCase()} ${this.prénom}\nMatière : ${this.matière}\nTéléphone : ${this._numéroDeTéléphone}\nSalaire : ${Professeur._salaireDeBase}\n------`);
    }

}

let anna = new Professeur ("Martin", "Anna", "Histoire-Géo", "06-67-68-69-70");
let marc = new Professeur ("Dupont", "Marc", "Physique-Chimie", "06-20-21-22-23");
let sophie = new Professeur ("Paul", "Sophie", "Latin", "06-30-31-32-33");
let jérôme = new Professeur ("Foin", "Jérôme", "Français", "06-12-13-14-15");
let joanna = new Professeur ("Croix", "Joanna", "EPS", "06-43-44-45-46");

let professeurs = [anna, marc, sophie, jérôme, joanna];

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

class Etudiant {
    constructor (prénom, nom, numéroDeTéléphone, dateDeNaissance, niveau, commentaires) {
        this.prénom = prénom;
        this.nom = nom;
        this.numéroDeTéléphone = numéroDeTéléphone;
        this.dateDeNaissance = dateDeNaissance;
        this.niveau = niveau;
        this._commentaires = commentaires || "[aucun commentaire]";
    }

    // get commentaires() {
    //     return this._commentaires;
    // }

    // set commentaires(ajoutCommentaire) {
    //     this._commentaires = ajoutCommentaire;
    // }

    afficher() {
        console.log(`${this.nom.toUpperCase()} ${this.prénom}\nTéléphone : ${this.numéroDeTéléphone}\nDate de naissance : ${this.dateDeNaissance}\nNiveau : ${this.niveau}\nCommentaires : ${this._commentaires}\n-----`)
    }
}

let emilie = new Etudiant("Emilie", "Roi", "06-10-12-14-16", "07-12-03", "Licence");
let pascal = new Etudiant("Pascal", "De Silva", "07-67-68-69-70", "01-02-01", "Master", "Allergique aux arachides");
let jennie = new Etudiant("Jennie", "Joplin", "07-08-09-10-11", "21-06-98", "Doctorat", "Actuellement au Canada");

let etudiants = [emilie, pascal, jennie];

console.log("----- Etudiants -----")
etudiants.forEach(etudiant => etudiant.afficher());

class Adresse {
    constructor(numéroVoie, typeDeVoie, nomDeVoie, codePostal, ville, mentionsComplémentaires) {
        this.mentionsComplémentaires = mentionsComplémentaires || "";
        this.numéroVoie = numéroVoie;
        this.typeDeVoie = typeDeVoie;
        this.nomDeVoie = nomDeVoie;
        this.codePostal = codePostal;
        this.ville = ville;
    }

    afficher() {
        console.log(`${this.mentionsComplémentaires}\n${this.numéroVoie} ${this.typeDeVoie} ${this.nomDeVoie}\n${this.codePostal} ${this.ville.toUpperCase()}\n-----`);
    }
}

let adresses = [
    new Adresse (5, "rue", "du Joli Bois", 45009, "Ville-Mystère"),
    new Adresse (10, "voie", "du Port", 12765, "Ville-Fantôme", "Appartement B"),
    new Adresse (12, "avenue", "des Saules", 78900, "Saint-Port-du-Comte")
];

console.log("----- Adresses -----")
adresses.forEach(adresse => adresse.afficher());