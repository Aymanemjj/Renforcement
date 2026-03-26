const products = [
    { id: 1, nom: "Laptop", prix: 999.99, stock_disponible: 10 },
    { id: 2, nom: "Mouse", prix: 29.99, stock_disponible: 50 },
    { id: 3, nom: "Keyboard", prix: 59.99, stock_disponible: 25 },
]

const cart = {
    articles: [
        { produit: products[0], quantite: 2, sub_total: 1999.98 },
        { produit: products[1], quantite: 1, sub_total: 29.99 },
    ],
    total_articles: 2,
    code_promo: null,
    total: 2029.97,
    tva: 20,
    Lfee: 7
}


addToCart('Keyboard', 2)
modifyQuantity('Keyboard', 1, '-')
removeFromCart('Laptop')
console.log('--------------------------------------------')
addPromoCode('BIENVENUE')
calculateTotal()


function addPromoCode(code) {
    if (cart.code_promo != null) {
        console.log("new code provided, the previous one will be changed")
    }
    if (code != 'BIENVENUE' && code != 'NOEL2025' && code != 'LIVGRATUITE') {
        return console.log('This code is unavailable')
    } else {
        cart.code_promo = code
    }

}




function calculateTotal() {
    switch (cart.code_promo) {
        case 'BIENVENUE':
            cart.total = - (cart.total * 15) / 100
            break;
        case 'NOEL2025':
            if (cart.total > 50) {
                cart.total = - 10
            }
            break;
        case 'LIVGRATUITE':
            cart.Lfee = 0
            break;
        default:
            break;
    }
    cart.total = Math.floor((cart.total + ((cart.total * cart.tva) / 100) + cart.Lfee) * 100) / 100
    cart.articles.forEach(a => {
        console.log(`${a.produit.nom} for ${a.produit.prix} a piece, you ordered ${a.quantite} piece, totaling ${a.sub_total}`)
    })
    console.log(`totaling ${cart.total}$ with the TVA being ${cart.tva}%, and the shipping fee being ${cart.Lfee}$`)
}




function addToCart(name, quantite) {
    if (checkIfExists(name, 'cart')) {
        if (products[indexByName(name, 'products')].stock_disponible >= quantite) {
            cart.articles[indexByName(name, 'cart')].quantite += quantite
            cart.articles[indexByName(name, 'cart')].sub_total = products[indexByName(name)].prix * quantite
            cart.total += cart.articles[indexByName(name, 'cart')].sub_total
            cart.total_articles = cart.articles.length
            products[indexByName(name, 'products')].stock_disponible - quantite
        } else {
            console.log('Out of stock')
        }
    } else {
        cart.articles.push({
            produit: products[indexByName(name)], quantite: quantite,
            sub_total: products[indexByName(name)].prix * quantite
        })
        cart.total += cart.articles[indexByName(name, 'cart')].sub_total
        cart.total_articles = cart.articles.length
    }

    console.log(cart)
}

function modifyQuantity(name, quantite, action) {
    if (checkIfExists(name, 'cart')) {
        if (action == '+') {
            if (products[indexByName(name, 'products')].stock_disponible >= quantite) {
                cart.articles[indexByName(name, 'cart')].quantite += quantite
                cart.articles[indexByName(name, 'cart')].sub_total = products[indexByName(name)].prix * quantite

                products[indexByName(name, 'products')].stock_disponible -= quantite
            }
        } else {

            cart.articles[indexByName(name, 'cart')].quantite -= quantite
            cart.articles[indexByName(name, 'cart')].sub_total = products[indexByName(name)].prix * quantite

            products[indexByName(name, 'products')].stock_disponible += quantite

        }
    } else {
        console.log('Product no in the cart, try and add it insted')
    }

    console.log(cart)

}

function removeFromCart(name) {
    if (checkIfExists(name, 'cart')) {
        products[indexByName(name, 'products')].stock_disponible += cart.articles[indexByName(name, 'cart')].quantite
        cart.articles.splice(indexByName(name, 'cart'), 1)
    } else {
        console.log('Product no in the cart, try and add it insted')
    }

    console.log(cart)

}

function indexByName(name, target) {
    if (target == 'cart') {
        let article = cart.articles.filter(a => a.produit.nom == name)
        return cart.articles.indexOf(article[0])
    } else {
        let product = products.filter(p => p.nom == name)
        return products.indexOf(product[0])
    }
}

function checkIfExists(name, target) {
    if (target == 'cart') {
        let product = cart.articles.filter(p => {
            return p.produit == products[indexByName(name, 'products')]
        })
        if (product.length == 0) {
            return false
        } else {
            return true
        }
    } else {
        let product = products.filter(p => {
            return p.nom == name
        })
        if (product.length == 0) {
            return false
        } else {
            return true
        }
    }
}