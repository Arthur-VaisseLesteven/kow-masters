class VisualisationClassementQualificatif extends HTMLElement {
    constructor(classementQualificatif) {
        super();
        this.classementQualificatif = classementQualificatif;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML += `
            <div class="header-line">
                <span class="col-rank">Rang</span>
                <span class="col-username">Pseudo</span>
                <span class="col-events">Evenements</span>
                <span class="col-points">Points</span>
                <span class="col-region">Région</span>
            </div>
            <div class="players">
                ${this.classementQualificatif.classement().map((joueur, index) => {
                    return `<classement-individuel
                        rang="${index + 1}"
                        pseudonyme="${joueur.Joueur}"
                        evenements="${joueur.Evenements}"
                        points="${joueur.Points}"
                    ></classement-individuel>`
                }).join('')}
            </div>    
        `;
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
                <span class="col-events">Events: ${this.getAttribute('evenements')}</span>
                <span class="col-points">Points: ${this.getAttribute('points')}</span>
                <span class="col-region">Région: TODO</span>
            </div>
        `;
    }
}

customElements.define('classement-individuel', ClassementIndividuel);
customElements.define('visualisation-classement-qualificatif', VisualisationClassementQualificatif);