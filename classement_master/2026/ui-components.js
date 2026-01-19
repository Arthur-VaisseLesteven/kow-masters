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
                <div class="player-rank">#${this.getAttribute('rang')}</div>
                <div class="player-info">
                    <div class="player-username">${this.getAttribute('pseudonyme')}</div>
                    <div class="player-stats">
                        <span class="player-events">Events: ${this.getAttribute('evenements')}</span>
                        <span class="player-points">Points: ${this.getAttribute('points')}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('classement-individuel', ClassementIndividuel);
customElements.define('visualisation-classement-qualificatif', VisualisationClassementQualificatif);