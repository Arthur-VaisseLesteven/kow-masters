/**
 * Un événement qualificatif.
 * Un événement possede un nom, une durée (journée ou week-end) et un classement des participants.
 */
class EvenementQualificatif {
    constructor(donnees) {
        this.donnees = donnees;
    }

    resultats() {
        let resultatsIndividuels = [];

        for (let i = 0; i < this.donnees.classement.length; i++) {
            resultatsIndividuels.push({
                pseudonyme: this.donnees.classement[i],
                classementIndividuel: {
                    nom: this.donnees.nom,
                    score: this.score(i, this.donnees.classement.length, this.donnees.duree)
                }
            })
        }

        return resultatsIndividuels;
    }

    score(classement, nombreDeParticipants, duree) {
        return Math.max(0, Math.ceil(nombreDeParticipants / 2) - (classement) + this.bonusPoints(classement, duree));
    }

    bonusPoints(classement, duree) {
        if (duree === 'journée') return 0
        if (classement === 0) return 6
        if (classement === 1) return 3
        if (classement === 2) return 1
        else return 0;
    }

    static nommé(nom) {
        return new EvenementQualificatifBuilder(nom);
    }
}

class EvenementQualificatifBuilder {
    constructor(nom) {
        this.nom = nom;
        this.duree = null;
        this.classement = [];
    }

    surUnJour() {
        this.duree = 'journée';
        return this;
    }

    surUnWeekEnd() {
        this.duree = 'week-end';
        return this;
    }

    avecPourClassement() {
        return new ClassementBuilder(this);
    }

    construire() {
        return new EvenementQualificatif({
            nom: this.nom,
            duree: this.duree,
            classement: this.classement
        });
    }
}

class ClassementBuilder {
    constructor(evenementBuilder) {
        this.evenementBuilder = evenementBuilder;
    }

    enPremier(joueur) {
        this.evenementBuilder.classement.push(joueur);
        return this;
    }

    puis(joueur) {
        this.evenementBuilder.classement.push(joueur);
        return this;
    }

    enDernier(joueur) {
        this.evenementBuilder.classement.push(joueur);
        return this.evenementBuilder.construire();
    }
}
