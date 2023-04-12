/* Classe définissant les profils créés */
class Profil {
    constructor(prénom, nom) {
        this.prénom = prénom;
        this.nom = nom;
    }
};


var PromoJSON = localStorage.getItem("PromoJSON");
var promotions = JSON.parse(PromoJSON);
var ProfilsJSON = localStorage.getItem("ProfilsJSON");
var Profils = JSON.parse(ProfilsJSON);

if (promotions == null) {
    promotions = [0,0,0];
}

if (Profils == null) {
    Profils = {};
}

/* Affiche les profils déjà créés */
function print_profils(Profils) {
    for (const key in Profils) {
        prof = JSON.stringify(Profils[key])
        document.getElementById("liste").innerHTML += `${key}: ${prof} <br>`;
    }
}

print_profils(Profils);

/* Graphique de répartition par promo */

function graphe_promo() {
    const graph = document.getElementById("graph").getContext("2d");

    Chart.defaults.global.defaultFontSize = 18;

    let massPopChart = new Chart(graph, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: [
        "P23",
        "P24",
        "P25",
        ],
        datasets: [
        {
            label: "Nombre de particants",
            data: [promotions[0], promotions[1], promotions[2]],
            // backgroundColor: "blue",
            backgroundColor: [
            "orange",
            "purple",
            "green",
            ],
            hoverBorderWidth: 3,
        },
        ],
    },
    options: {
        title: {
        display: true,
        text: "Répartition par promotions",
        fontSize: 24,
        },
        legend: {
        display: true,
        },
        layout: {
        padding: {
            left: 100,
            right: 100,
        },
        },
    },
    });
}

graphe_promo();


/* Fonction d'ajout d'un nouveau profil */
function new_profile() {
    var name = document.getElementById("name").value;
    var surname= document.getElementById("surname").value;
    var Id = document.getElementById("Id").value;
    NouveauProfil = new Profil(surname,name);

    /* Test d'appartenance */
    if(Id in Profils){
        document.getElementById("Error").innerHTML = "L'identifiant est déjà utilisé";
    } else {
        Profils[Id] = NouveauProfil;
        document.getElementById("liste").innerHTML += `${Id}: ${JSON.stringify(Profils[Id])} <br>`;
        document.getElementById("Error").innerHTML = "";

        /* Mise jour promo */
        var promo = JSON.stringify(Id)
        if(promo[2] == '0'){
            promotions[0] += 1;
        } else if(promo[2] == '1'){
            promotions[1] += 1;
        } else {
            promotions[2] += 1;
        }
    }
    graphe_promo();

    /* Mise à jour stockage*/ 
    var PromotoJSON = JSON.stringify(promotions);
    localStorage.setItem("PromoJSON", PromotoJSON);
    var ProfilstoJSON = JSON.stringify(Profils);
    localStorage.setItem("ProfilsJSON", ProfilstoJSON);
}

/* Fonction de retrait d'un nouveau profil */
function delete_profile() {
    var name = document.getElementById("name").value;
    var surname= document.getElementById("surname").value;
    var Id = document.getElementById("Id").value;
    Reflect.deleteProperty(Profils, Id);
    document.getElementById("liste").innerHTML = "";
    print_profils(Profils);

    /* Mise jour promo */
    var promo = JSON.stringify(Id)
    if(promo[2] == '0'){
        promotions[0] -= 1;
    } else if(promo[2] == '1'){
        promotions[1] -= 1;
    } else {
        promotions[2] -= 1;
    }
    graphe_promo();

    /* Mise à jour stockage*/ 
    var PromotoJSON = JSON.stringify(promotions);
    localStorage.setItem("PromoJSON", PromotoJSON);
    var ProfilstoJSON = JSON.stringify(Profils);
    localStorage.setItem("ProfilsJSON", ProfilstoJSON);
}

/* Dark Mode */
function dark_mode() {
    const element = document.querySelector('body');
    if (element.style.backgroundColor == 'whitesmoke') {
        element.style.backgroundColor = '#303030';
    } else {
        element.style.backgroundColor = 'whitesmoke';
    }
}

