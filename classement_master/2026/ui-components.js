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
            const aValue = a[this.sortColumn];
            const bValue = b[this.sortColumn];

            let compareValue = (typeof aValue === 'string') ? aValue.localeCompare(bValue) : aValue - bValue;

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
                        ${joueur.Details.map((event, index) => `
                            event-${index}-name="${event.nom}"
                            event-${index}-score="${event.score}"
                            event-${index}-rank="${event.rang}"
                            event-${index}-total="${event.totalParticipants}"
                        `).join('')}
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
                <span class="col-points clickable">${this.getAttribute('points')}</span>
                <span class="col-region">${this.getAttribute('region')}</span>
            </div>
        `;

        this.querySelector('.col-points').addEventListener('click', () => this.showDetailsPopin());
    }

    showDetailsPopin() {
        document.body.appendChild(new DetailsPopin({pseudonyme: this.getAttribute('pseudonyme'), details: this.#eventDetails()}));
    }

    #eventDetails() {
        const details = [];
        let index = 0;
        while (this.hasAttribute(`event-${index}-name`)) {
            details.push({
                name: this.getAttribute(`event-${index}-name`),
                score: this.getAttribute(`event-${index}-score`),
                rank: this.getAttribute(`event-${index}-rank`),
                total: this.getAttribute(`event-${index}-total`)
            });
            index++;
        }
        return details;
    }
}

class DetailsPopin extends HTMLElement {
    constructor({pseudonyme: pseudonyme, details: details}) {
        super();
        this.details = details;
        this.pseudonyme = pseudonyme;
    }

    close() {
        this.remove();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="popin-overlay">
                <div class="popin-content">
                    <div class="popin-header">
                        <h3>Détails des points - ${this.pseudonyme}</h3>
                        <button class="popin-close">&times;</button>
                    </div>
                    <div class="popin-body">
                        ${this.details.map((detail, index) => `
                            <div class="event-detail ${index < 4 ? 'top-event' : 'bottom-event'}">
                                <span class="event-name">${detail.name} (${detail.rank}/${detail.total})</span>
                                <span class="event-points">${detail.score} points</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // Add click listener to close button
        const closeButton = this.querySelector('.popin-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.close());
        }

        // Add click listener to overlay to close when clicking outside
        const overlay = this.querySelector('.popin-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }
    }
}

customElements.define('details-popin', DetailsPopin);
customElements.define('classement-individuel', ClassementIndividuel);
customElements.define('visualisation-classement-qualificatif', VisualisationClassementQualificatif);
