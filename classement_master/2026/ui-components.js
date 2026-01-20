class VisualisationClassementQualificatif extends HTMLElement {
    constructor(classementQualificatif) {
        super();
        this.classementQualificatif = classementQualificatif;
        this.sortColumn = 'Classement';
        this.sortAscending = true;
    }

    connectedCallback() {
        this.render();
    }

    sortClassement(classement) {
        const sorted = [...classement].sort((a, b) => {
            let compareValue;

            if (this.sortColumn === 'Classement') {
                compareValue = a.Classement - b.Classement;
            } else if (this.sortColumn === 'Joueur') {
                compareValue = a.Joueur.localeCompare(b.Joueur);
            } else if (this.sortColumn === 'Evenements') {
                compareValue = a.Evenements - b.Evenements;
            } else if (this.sortColumn === 'Points') {
                compareValue = a.Points - b.Points;
            } else if (this.sortColumn === 'Region') {
                compareValue = a.Region.localeCompare(b.Region);
            }

            // Use rank as tie breaker
            if (compareValue === 0) {
                compareValue = a.Classement - b.Classement;
            }

            return this.sortAscending ? compareValue : -compareValue;
        });

        return sorted;
    }

    handleHeaderClick(column) {
        if (this.sortColumn === column) {
            this.sortAscending = !this.sortAscending;
        } else {
            this.sortColumn = column;
            this.sortAscending = true;
        }
        this.render();
    }

    render() {
        const sortedClassement = this.sortClassement(this.classementQualificatif.classement());

        this.innerHTML = `
            <div class="header-line">
                <span class="col-rank" data-column="Classement" style="cursor: pointer;">Rang ${this.getSortIndicator('Classement')}</span>
                <span class="col-username" data-column="Joueur" style="cursor: pointer;">Pseudo ${this.getSortIndicator('Joueur')}</span>
                <span class="col-events" data-column="Evenements" style="cursor: pointer;">Evenements ${this.getSortIndicator('Evenements')}</span>
                <span class="col-points" data-column="Points" style="cursor: pointer;">Points ${this.getSortIndicator('Points')}</span>
                <span class="col-region" data-column="Region" style="cursor: pointer;">Région ${this.getSortIndicator('Region')}</span>
            </div>
            <div class="players">
                ${sortedClassement.map((joueur) => {
                    return `<classement-individuel
                        rang="${joueur.Classement}"
                        pseudonyme="${joueur.Joueur}"
                        evenements="${joueur.Evenements}"
                        points="${joueur.Points}"
                        region="${joueur.Region}"
                    ></classement-individuel>`
                }).join('')}
            </div>    
        `;

        // Attach click event listeners to header cells
        this.querySelectorAll('.header-line span[data-column]').forEach(span => {
            span.addEventListener('click', () => {
                this.handleHeaderClick(span.dataset.column);
            });
        });
    }

    getSortIndicator(sortColumn) {
        if (this.sortColumn === sortColumn) {
            return this.sortAscending ? '▲' : '▼';
        }
        return '';
    }
}

class ClassementIndividuel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="player-card">
                <span class="col-rank">#${this.getAttribute('rang')}</span>
                <span class="col-username">${this.getAttribute('pseudonyme')}</span>
                <span class="col-events">${this.getAttribute('evenements')}</span>
                <span class="col-points">${this.getAttribute('points')}</span>
                <span class="col-region">${this.getAttribute('region')}</span>
            </div>
        `;
    }
}

customElements.define('classement-individuel', ClassementIndividuel);
customElements.define('visualisation-classement-qualificatif', VisualisationClassementQualificatif);