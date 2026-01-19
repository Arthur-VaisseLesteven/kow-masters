class Qualification {
    constructor(resultats) {
        this.resultats = resultats;
    }

    resultatsIndividuels() {
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

let qualifications2025 = {
    candidats: {},

    ajouter(qualification) {
        for (let resultat of qualification.resultatsIndividuels()) {
            if (!this.candidats[resultat.pseudonyme]) {
                this.candidats[resultat.pseudonyme] = [];
            }

            this.candidats[resultat.pseudonyme].push(resultat.classementIndividuel);
        }
    },

    classement() {
        let classement = []

        for (const [pseudonyme, classements] of Object.entries(this.candidats)) {
            classements.sort(function(c1, c2) { return c2.score - c1.score }).slice(0,4);
            classement.push({
                Joueur: pseudonyme,
                Evenements: classements.length,
                Points: classements.sort(function(c1, c2) { return c2.score - c1.score }).slice(0,4).map(c => c.score).reduce( (a,b) => a+b, 0),
            })
        }

        classement = classement.sort((c1, c2) => (c2.Points - c1.Points) === 0 ? c1.Evenements - c2.Evenements : c2.Points - c1.Points)
        for(let i = 0; i < classement.length; i++) {
            classement[i]["Classement"] = i+1;
        }
        return classement;
    }
}

qualifications2025.ajouter(new Qualification({
    nom:'Launaguet Journée 1',
    duree: 'journée',
    classement: [
        'Knurlnien',
        'Chapelier',
        'Beerserkr',
        'El_chatardo',
        'Pantoufle',
        'BOSS',
        'Le_Cul_de_Jatte',
        'biak40',
        'Kutchuc',
        'EDAEPHNOS',
        'krypt',
        'Nabot',
        'Astrabell',
        'MaSeDrIm'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Ork\'n Games 2025',
    duree: 'week-end',
    classement: [
        'Nayko_le_Rat',
        'Kutchuc',
        'Knurlnien',
        'El_chatardo',
        'eric',
        'Khardaos',
        'Anonyme',
        'BrG',
        'Le_Cul_de_Jatte',
        'BOSS',
        'Siilence',
        'Helvain'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Launaguet Journée 2',
    duree: 'journée',
    classement: [
        'Nayko_le_Rat',
        'Le_Cul_de_Jatte',
        'Nabot',
        'El_chatardo',
        'Beerserkr',
        'Chapelier',
        'krypt',
        'Kutchuc',
        'Astrabell',
        'EDAEPHNOS',
        'MaSeDrIm',
        'Pantoufle'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: 'King in the North VI',
    duree: 'week-end',
    classement: [
        'Iblis',
        'walach',
        'Orckel',
        'Julo62',
        'expunk',
        'BrG',
        'Alexlesec',
        'Kenozan',
        'KENZO',
        'Pattopesto'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: 'Havoc at the Brewery',
    duree: 'journée',
    classement: [
        'Dunk',
        'Tenekha',
        'Kappa_Shop',
        'Garuses',
        'BrG',
        'TheDoc',
        'Lebic',
        'Gv15_19_20',
        'DerHeldderWelt',
        'Aldarion',
        'Thalantir',
        'Marmiu'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: 'La Castagne III',
    duree: 'journée',
    classement: [
        'Nayko_le_Rat',
        'Dablama',
        'Jarekson',
        'Siilence',
        'AEnoriel',
        'Dalendur'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: 'Le muton Noir 2025',
    duree: 'week-end',
    classement: [
        'Knurlnien',
        'kentx',
        'MyNicknameIsBetterThanYours',
        'Twerk',
        'Iblis',
        'Nayko_le_Rat',
        'Leff',
        'expunk',
        'Kintz',
        'AVL',
        'Le_Cul_de_Jatte',
        'Beerserkr',
        'Julo62',
        'krypt',
        'Ketep',
        'LuciusForge',
        'Orckel',
        'Kutchuc',
        'BOSS',
        'Fao',
        'Poliorcetic',
        'Siilence',
        'Mamatt89',
        'Jawjaw'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: 'La Big Bourgogne Cup',
    duree: 'week-end',
    classement: [
        'AVL',
        'Nayko_le_Rat',
        'Kintz',
        'expunk',
        'MyNicknameIsBetterThanYours',
        'kentx',
        'Julo62',
        'Orckel',
        'walach',
        'morphee_joker',
        'VargLeRedoutable',
        'Ketep',
        'Maximork',
        'Jarekson',
        'Kenozan',
        'LuciusForge',
        'Jawjaw',
        'Mamatt89',
        'Sousou',
        'wil_ly'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: "GUILD 'Con 2025",
    duree: 'journée',
    classement: [
        'Chapelier',
        'Knurlnien',
        'CH1PS',
        'Kutchuc',
        'Beerserkr',
        'Beji',
        'Pantoufle',
        'MaSeDrIm',
        'Nabot',
        'Garzak',
        'Emariv',
        'Helvain',
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: "Lille 2",
    duree: 'journée',
    classement: [
        'Julo62',
        'expunk',
        'Iblis',
        'Theodrid',
        'walach',
        'Alexlesec',
        'Fao',
        'Miguel Angel Santiago',
        'Oscar Malaga',
        'Orckel',
        'LuciusForge',
        'Sousou',
        'KENZO',
        'impair'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom: "Lille 1",
    duree: 'journée',
    classement: [
        'Iblis',
        'Theodrid',
        'Alexlesec',
        'Orckel',
        'Oscar Malaga',
        'Miguel Angel Santiago',
        'walach',
        'expunk',
        'ollv',
        'Crom-_-',
        'LuciusForge',
        'Sousou',
        'Fao',
        'Julo62',
        'KENZO',
        'meg',
        'Galahad59',
        'impair'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Clash of Charnay',
    duree: 'week-end',
    classement: [
        'Dablama',
        'Nayko_le_Rat',
        'Kintz',
        'morphee_joker',
        'BrG',
        'Jarekson',
        'LuciusForge',
        'VargLeRedoutable',
        'MyNicknameIsBetterThanYours',
        'Maximork',
        'Argozs_Nai_Quasser',
        'Jawjaw',
        'kraspeck',
        'magoran',
        'Arkhaon',
        'Thorgrimleouf',
        'Lancelot71',
        'erwik',
        'Proteus',
        'anonyme'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Lice Lemovices',
    duree: 'week-end',
    classement: [
        'Maximork',
        'CH1PS',
        'Kutchuc',
        'LuciusForge',
        'krypt',
        'Kintz',
        'Le_Cul_de_Jatte',
        'Nabot',
        'Beerserkr',
        'BOSS',
        'Helvain',
        'Jawjaw'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'small bourgogne cup',
    duree: 'journée',
    classement: [
        'Maximork',
        'MyNicknameIsBetterThanYours',
        'firegantelet',
        'Kintz',
        'Jawjaw',
        'LuciusForge',
        'Balthus',
        'Sousou'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Olympias Rheni 2',
    duree: 'week-end',
    classement: [
        'Knurlnien',
        'Jarekson',
        'BrG',
        'Bichette',
        'VargLeRedoutable',
        'Zeeloy'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'La Castagne V',
    duree: 'journée',
    classement: [
        'Jarekson',
        'AEnoriel',
        'Pinus',
        'Siilence'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Lices de Bourgueil',
    duree: 'week-end',
    classement: [
        'Knurlnien',
        'AVL',
        'Beerserkr',
        'krypt',
        'MyNicknameIsBetterThanYours',
        'Le_Cul_de_Jatte',
        'Dablama',
        'Ketep',
        'Poliorcetic',
        'Kutchuc',
        'Chapelier',
        'CH1PS',
        'Leff',
        'pepestilence',
        'Jawjaw',
        'MaSeDrIm'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'TAK VI',
    duree: 'week-end',
    classement: [
        'Kintz',
        'Knurlnien',
        'MyNicknameIsBetterThanYours',
        'Julo62',
        'Le_Cul_de_Jatte',
        'Kutchuc',
        'Twerk',
        'Dablama',
        'Orckel',
        'firegantelet',
        'El_chatardo',
        'Demo',
        'LuciusForge',
        'Leloup',
        'Siilence',
        'Dalendur',
        'Helvain',
        'AEnoriel',
        'Rako',
        'Pinus',
        'Jawjaw',
        'Morzaad',
        'Sousou',
        'Wugga'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'Marche Barbare 5',
    duree: 'journée',
    classement: [
        'Crom-_-',
        'Alex_59',
        'Kheps',
        'Alexlesec'
    ]
}));

qualifications2025.ajouter(new Qualification({
    nom:'The king of the hill',
    duree: 'week-end',
    classement: [
        'Beerserkr',
        'Vince3310',
        'Ketep',
        'Pantoufle',
        'Le_Cul_de_Jatte',
        'Beji',
        'Chapelier',
        'Nabot',
        'krypt',
        'Gorgorbey',
        'Flopus_hodus',
        'Helvain'
    ]
}));

let classement2025 = qualifications2025.classement();
console.info(classement2025);

$(document).ready(function() {
    $('#myTable').DataTable( {
        "pageLength": -1,
        "paging":   false,
        "info": false,
        responsive: true,
        data: classement2025,
        columns: [
            {data: 'Joueur'},
            {data: 'Evenements'},
            {data: 'Points'},
            {data: 'Classement'}
        ]
    } );
} );