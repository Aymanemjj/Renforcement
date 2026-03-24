const ingredients = [
    // Légumes
    { nom: "Tomates", quantite: 15, unite: "kg", prix_unitaire: 2.50, seuil_alerte: 5, categorie: "légume" },
    { nom: "Oignons", quantite: 2, unite: "kg", prix_unitaire: 1.20, seuil_alerte: 3, categorie: "légume" },
    { nom: "Courgettes", quantite: 8, unite: "kg", prix_unitaire: 1.80, seuil_alerte: 3, categorie: "légume" },

    // Viandes
    { nom: "Poulet", quantite: 20, unite: "kg", prix_unitaire: 7.50, seuil_alerte: 5, categorie: "viande" },
    { nom: "Bœuf haché", quantite: 12, unite: "kg", prix_unitaire: 12.00, seuil_alerte: 4, categorie: "viande" },
    { nom: "Saumon", quantite: 1, unite: "kg", prix_unitaire: 18.50, seuil_alerte: 2, categorie: "viande" },

    // Épices
    { nom: "Cumin", quantite: 0.8, unite: "kg", prix_unitaire: 9.00, seuil_alerte: 0.2, categorie: "épice" },
    { nom: "Paprika", quantite: 0.5, unite: "kg", prix_unitaire: 8.50, seuil_alerte: 0.2, categorie: "épice" },
    { nom: "Cannelle", quantite: 0.3, unite: "kg", prix_unitaire: 11.00, seuil_alerte: 0.1, categorie: "épice" },

    // Boissons
    { nom: "Eau minérale", quantite: 48, unite: "pièces", prix_unitaire: 0.30, seuil_alerte: 12, categorie: "boisson" },
    { nom: "Jus d'orange", quantite: 10, unite: "litres", prix_unitaire: 2.80, seuil_alerte: 3, categorie: "boisson" },
    { nom: "Lait", quantite: 8, unite: "litres", prix_unitaire: 1.10, seuil_alerte: 2, categorie: "boisson" },
];

let total = null
ingredients.forEach(e => {
    total += e.prix_unitaire * e.quantite
    if (e.quantite < e.seuil_alerte) {
        console.log("Alert stock bas:", e)
    }
})

console.log("prix total du stock: ", total)
let valuePerCategorie = []

function check(categorie) {
    return valuePerCategorie.filter(a => {
        return a.categorie == categorie
    })
}

function indexOfCategory(cat) {
    let categorie = valuePerCategorie.filter(a => {
        return a.categorie == cat
    })
    return valuePerCategorie.indexOf(categorie[0])
}
ingredients.forEach(e => {
    let categorie = check(e.categorie)
    if (categorie.length == 0) {
        valuePerCategorie.push({ categorie: e.categorie, valeur_total: 0 })
    }
    index = indexOfCategory(e.categorie)
    valuePerCategorie[index].valeur_total += e.prix_unitaire * e.quantite;
})
console.log(valuePerCategorie)

const plat = {
    nom: "Poulet rôti aux épices",
    ingredients: [
        { nom: "Poulet", quantite: 2.5 },
        { nom: "Cumin", quantite: 0.05 },
        { nom: "Paprika", quantite: 0.03 },
        { nom: "Oignons", quantite: 1.2 },
        { nom: "Tomates", quantite: 0.8 },
    ]
};

calculate(plat)
function calculate(plat) {
    if (!available(plat)) {
        console.log("Can't be made")
        return;
    } else {
        console.log("Can be made")
        calculateStock(plat)
    }

}

function available(plat) {
    let canBeMade = true;

    plat.ingredients.forEach(e => {
        let ing = ingredients.filter(a => {
            return a.nom == e.nom
        })
        if (ing.length == 0) {
            console.log(`${e.nom} isn't available, in need of ${e.quantite}`)
            canBeMade = false
        } else if (ing[0].quantite < e.quantite) {
            console.log(`${e.nom} is available, but in need of restock, neded quantity: ${ingredient.quantite}, available in stock: ${ing[0].quantite}`)
            canBeMade = false
        }
    })

    return canBeMade
}

function calculateStock(plat) {
    plat.ingredients.forEach(e => {
        let index = indexOfIngredient(e.nom)
        ingredients[index].quantite -= e.quantite
    })
    console.log(ingredients)
}

function indexOfIngredient(ing) {
    let ingredient = ingredients.filter(a => {
        return a.nom == ing
    })
    return ingredients.indexOf(ingredient[0])
}


let courses = []
let under = ingredients.filter(a=>{
  return a.quantite < a.seuil_alerte
})
under.forEach(e=>{
  courses.push({nom: e.nom, quantite_a_commander: (e.seuil_alerte*2)-e.quantite, unite: e.unite})
})
console.log("to order:",courses)



















