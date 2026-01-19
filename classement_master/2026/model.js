class EvenementQualificatif {
    constructor(resultats) {
        this.resultats = resultats;
    }

    resultats() {
        let resultatsIndividuels = [];

        for (let i = 0; i < this.resultats.classement.length; i++) {
            resultatsIndividuels.push({
                pseudonyme: this.resultats.classement[i],
                classementIndividuel: {
                    nom: this.resultats.nom,
                    score: this.score(i, this.resultats.classement.length, this.resultats.duree)
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
}

class ClassementAnnuel {
    constructor() {
        this.candidats = {};
    }

    ajouter(evenementQualificatif) {
        for (let resultat of evenementQualificatif.resultats()) {
            if (!this.candidats[resultat.pseudonyme]) {
                this.candidats[resultat.pseudonyme] = [];
            }

            this.candidats[resultat.pseudonyme].push(resultat.classementIndividuel);
        }
    }

    classement() {
        let classement = []

        for (const [pseudonyme, classements] of Object.entries(this.candidats)) {
            classements.sort(function (c1, c2) {
                return c2.score - c1.score
            }).slice(0, 4);
            classement.push({
                Joueur: pseudonyme,
                Evenements: classements.length,
                Points: classements.sort(function (c1, c2) {
                    return c2.score - c1.score
                }).slice(0, 4).map(c => c.score).reduce((a, b) => a + b, 0),
            })
        }

        classement = classement.sort((c1, c2) => (c2.Points - c1.Points) === 0 ? c1.Evenements - c2.Evenements : c2.Points - c1.Points)
        for (let i = 0; i < classement.length; i++) {
            classement[i]["Classement"] = i + 1;
        }
        return classement;
    }
}