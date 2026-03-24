const ventes = [
    { mois: "Janvier", chiffre_affaires: 42000, nb_clients: 320, ville: "Paris" },
    { mois: "Février", chiffre_affaires: 38500, nb_clients: 290, ville: "Lyon" },
    { mois: "Mars", chiffre_affaires: 51000, nb_clients: 410, ville: "Marseille" },
    { mois: "Avril", chiffre_affaires: 47200, nb_clients: 375, ville: "Paris" },
    { mois: "Mai", chiffre_affaires: 63000, nb_clients: 490, ville: "Lyon" },
    { mois: "Juin", chiffre_affaires: 71500, nb_clients: 560, ville: "Marseille" },
    { mois: "Juillet", chiffre_affaires: 58000, nb_clients: 430, ville: "Paris" },
    { mois: "Août", chiffre_affaires: 44000, nb_clients: 310, ville: "Lyon" },
    { mois: "Septembre", chiffre_affaires: 66000, nb_clients: 520, ville: "Marseille" },
    { mois: "Octobre", chiffre_affaires: 79000, nb_clients: 615, ville: "Paris" },
    { mois: "Novembre", chiffre_affaires: 83500, nb_clients: 670, ville: "Lyon" },
    { mois: "Décembre", chiffre_affaires: 91000, nb_clients: 740, ville: "Marseille" },
];

let totalAffaires = 0
ventes.forEach(e => {
    totalAffaires += e.chiffre_affaires
})
console.log('totalAffaires: ' + totalAffaires, "\n")
let moyenAffaires = []
ventes.forEach(e => {
    moyenAffaires.push({
        mois: `${e.mois}`,
        chiffre_affaires: `${e.chiffre_affaires}`,
        nb_clients: `${e.nb_clients}`,
        moyen_chiffre_affaires: `${Math.floor(e.chiffre_affaires / e.nb_clients,)}`
    })
})
console.log("Moyen affaires per month: ", moyenAffaires, "\n")

let sorted = ventes.toSorted((a, b) => {
    return b.chiffre_affaires - a.chiffre_affaires
})
let leastClientsPerMonth = sorted[0];
ventes.forEach(e => {
    if (e.nb_clients < leastClientsPerMonth.nb_clients) {
        leastClientsPerMonth = e
    }
})
console.log("best month in sales number: ", ventes[0], "\n")
console.log("worst month in clients number: ", leastClientsPerMonth, "\n")

let moreThan50K = ventes.filter(e => {
    return e.chiffre_affaires > 50000
})

console.log("months with more than 50K in revenue: ", moreThan50K, "\n")


let cityResume = []

function check(ville) {
    return cityResume.filter(a => {
        return a.ville == ville
    })
}

function indexOfCity(ville) {
    let city = cityResume.filter(a => {
        return a.ville == ville
    })
    return cityResume.indexOf(city[0])
}
ventes.forEach(e => {
    let city = check(e.ville)
    if (city.length == 0) {
        cityResume.push({ ville: e.ville, CATotal: 0, clientsTotal: 0 })
    }
    index = indexOfCity(e.ville)
    cityResume[index].CATotal += e.chiffre_affaires;
    cityResume[index].clientsTotal += e.nb_clients;
})

console.log("Resume per city: ", cityResume, "\n")


console.log("sorted biggest to lowest", sorted, "\n")


let growth = []

for (let i = 1; i < ventes.length; i++) {
    growth.push({
        dernier_mois: ventes[i - 1].mois,
        chiffre_affaires_dernier_mois: ventes[i - 1].chiffre_affaires,
        mois: ventes[i].mois,
        chiffre_affaires: ventes[i].chiffre_affaires,
        croissance: ventes[i].chiffre_affaires - ventes[i - 1].chiffre_affaires
    })
}

console.log("Croissance: ", growth, "\n")






