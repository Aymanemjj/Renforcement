const rates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.86,
    MAD: 10.85,
    JPY: 162.5,
    CAD: 1.47
};

let history = []

let cart = {
    currency: "GBP",
    money: [12.2, 45, 8, 65, 18]

}

let cart2 = {
    currency: "CAD",
    money: [12.2, 45]

}

let cart3 = {
    currency: "USD",
    money: [12.2, 45, 8, 18]

}
converCart(cart, cart.currency, 'EUR')
converCart(cart2, cart2.currency, 'GBP')
converCart(cart3, cart3.currency, 'JPY')
console.log(convert(100, 'EUR', 'USD'))

function convert(amount, from, to) {
    if (rates[to] == null) {
        console.log("target currency doesn't exist")
        return
    }
    let exchangeRate = rates[to] / rates[from]
    let result = amount * exchangeRate
    saveExchange(amount, from, to, result)
    return result
}





function converCart(cart, from, to) {
    let converted = []
    cart.money.forEach(m => {
        converted.push(convert(m, from, to))
    })
}


function convertToAll(amount, from) {
    if (rates[from] == null) {
        console.log("source currency doesn't exist")
        return
    }
    for (let key in rates) {
        let exchangeRate = rates[key] / rates[from]
        let result = amount * exchangeRate
        console.log(`${key}: ${result}`)
    }

}

function saveExchange(amount, from, to, result) {
    history.push({ date: new Date(), original_amount: amount, original_currency: from, after_conversion: result, target_currency: to })
}
convertToAll(10, 'USD')


function displayHistory() {
    history.forEach(h => {
        console.log(h)
    })
}
displayHistory()

function stats() {
    let exchangeFrequency = []
    let currencyFrequency = [{}]
    history.forEach(x => {
        let exchange = exchangeFrequency.filter(y => {
            return y.from == x.original_currency && y.to == x.target_currency
        })
        let found = x.
            currencyFrequency[] ? currencyFrequency[`${x.target_currency}`] += 1 : currencyFrequency[`${x.target_currency}`] = 1
        if (exchange.length == 0) {
            exchangeFrequency.push({ from: x.original_currency, to: x.target_currency, frequency: 1 })
        } else {
            exchangeFrequency[exchangeFrequency.indexOf(exchange[0])].frequency += 1
        }
    })
    let mostAskedForCurrency = 0
    console.log(exchangeFrequency)
    console.log(currencyFrequency)
    console.log(mostAskedForCurrency)


}


stats()















