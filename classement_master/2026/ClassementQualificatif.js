class ClassementQualificatif {
    constructor() {
        this.joueurs = {};
    }

    ajouter(evenementQualificatif) {
        for (let resultat of evenementQualificatif.resultats()) {
            if (!this.joueurs[resultat.pseudonyme]) {
                this.joueurs[resultat.pseudonyme] = [];
            }

            this.joueurs[resultat.pseudonyme].push(resultat.classementIndividuel);
        }
    }

    classement() {
        let classement = []

        for (const [pseudonyme, classements] of Object.entries(this.joueurs)) {
            const sortedClassements = classements.sort(function (c1, c2) {
                return c2.score - c1.score
            });
            const top4 = sortedClassements.slice(0, 4);

            classement.push({
                Joueur: pseudonyme,
                Evenements: classements.length,
                Points: top4.map(c => c.score).reduce((a, b) => a + b, 0),
                Region: JoueursEtRegions[pseudonyme] || 'Inconnue',
                Details: classements
            })
        }

        classement = classement.sort((c1, c2) => (c2.Points - c1.Points) === 0 ? c1.Evenements - c2.Evenements : c2.Points - c1.Points)
        for (let i = 0; i < classement.length; i++) {
            classement[i]["Classement"] = i + 1;
        }
        return classement;
    }
}