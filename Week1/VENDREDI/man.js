const users = [
    { id: 1, pseudo: "TechSellerPro", email: "techseller@marketplace.com", role: "vendeur", note_moyenne: 4.8, solde: 1250.00 },
    { id: 2, pseudo: "BargainHunter42", email: "bargain42@marketplace.com", role: "acheteur", note_moyenne: 4.5, solde: 320.50 },
    { id: 3, pseudo: "VintageTreasures", email: "vintage.treasures@marketplace.com", role: "vendeur", note_moyenne: 4.9, solde: 3780.75 },
    { id: 4, pseudo: "ShopAddict99", email: "shopaddict99@marketplace.com", role: "acheteur", note_moyenne: 3.7, solde: 85.20 },
    { id: 5, pseudo: "GadgetKing", email: "gadgetking@marketplace.com", role: "vendeur", note_moyenne: 4.2, solde: 940.00 },
    { id: 6, pseudo: "EcoShopper", email: "ecoshopper@marketplace.com", role: "acheteur", note_moyenne: 5.0, solde: 210.00 },
    { id: 7, pseudo: "HandmadeByLea", email: "handmade.lea@marketplace.com", role: "vendeur", note_moyenne: 4.6, solde: 2100.30 },
]


const annonces = [
    { id: 1, vendeur_id: 1, titre: "iPhone 14 Pro", description: "iPhone 14 Pro 256GB, black, excellent condition", prix: 750.00, categorie: "Electronics", etat: "very good", statut: "available", date_publication: "2026-01-10" },
    { id: 2, vendeur_id: 1, titre: "MacBook Air M2", description: "MacBook Air M2 8GB RAM, 512GB SSD", prix: 999.00, categorie: "Electronics", etat: "new", statut: "available", date_publication: "2026-01-15" },
];

function publishListing(user, request) {
    if (user.role !== "vendeur") {
        return console.log(`user "${user.pseudo}" is not a vendeur.`);
    }
    if (request.condition !== "neuf" && request.condition !== "très bon" && request.condition !== "bon" && request.condition !== "acceptable") {
        console.log(`invalid condition "${request.condition}". Must be: neuf, très bon, bon, or acceptable.`);
        return;
    }

    if (request.statut !== "disponible" && request.statut !== "vendu" && request.statut !== "réservé") {
        console.log(`invalid status "${request.statut}". Must be: disponible, vendu, or réservé.`)
        return;
    }

    let id = (annonces.sort((a, b) => {
        return b.id - a.id
    }))[0].id + 1
    const listing = {
        id: id,
        vendeur_id: user.id,
        titre: request.title,
        description: request.description,
        prix: request.price,
        categorie: request.category,
        condition: request.condition,
        statut: request.statut,
        date_publication: new Date().toISOString().split("T")[0],
    };

    annonces.push(listing);
    console.log(`Listing "${listing.titre}" published successfully (id: ${listing.id}).`);
    return;
}

function updatePrice(seller_id, listing_id, newPrice) {
    const listing = annonces.find(a => a.id === listing_id);

    if (!listing) {
        console.log(`listing id ${listing_id} not found.`);
        return;
    }
    if (listing.vendeur_id !== seller_id) {
        console.log(`Access denied: listing id ${listing_id} does not belong to seller id ${seller_id}.`);
        return;
    }
    if (newPrice <= 0) {
        console.log(`price must be greater than 0.`);
        return;
    }

    let oldPrice = listing.prix;
    listing.prix = newPrice;
    console.log(`Price of "${listing.titre}" updated: $${oldPrice} -> $${newPrice}.`);
    return;
}

function removeListing(seller_id, listing_id) {
    let index = annonces.findIndex(a => a.id === listing_id);

    if (index === -1) {
        console.log(`listing id ${listing_id} not found.`);
        return;
    }
    if (annonces[index].vendeur_id !== seller_id) {
        console.log(`Access denied: listing id ${listing_id} does not belong to seller id ${seller_id}.`);
        return;
    }

    let [listing] = annonces.splice(index, 1);
    console.log(`Listing "${listing.titre}" (id: ${listing.id}) removed successfully.`);
    return;
}



const transactions = [];

function buyListing(buyer, listing_id) {
    let listing = annonces.find(a => a.id === listing_id);

    if (!listing) {
        console.log(`listing id ${listing_id} not found.`);
        return;
    }
    if (buyer.role !== "acheteur") {
        console.log(`user "${buyer.pseudo}" is not a buyer.`);
        return;
    }

    if (listing.statut !== "available") {
        console.log(`listing "${listing.titre}" is not available (current status: ${listing.statut}).`);
        return;
    }

    if (buyer.solde < listing.prix) {
        console.log(`insufficient balance: "${buyer.pseudo}" has $${buyer.solde} but listing costs $${listing.prix}.`);
        return;
    }

    let seller = users.find(u => u.id === listing.vendeur_id);
    let commission = listing.prix * 0.05;
    let sellerAmount = listing.prix - commission;

    buyer.solde -= listing.prix;
    seller.solde += sellerAmount;

    listing.statut = "vendu";

    let transaction = {
        date: new Date().toISOString().split("T")[0],
        acheteur_id: buyer.id,
        vendeur_id: seller.id,
        annonce_id: listing.id,
        montant: listing.prix,
        commission: commission,
    };

    transactions.push(transaction);

    console.log(`Purchase successful: "${buyer.pseudo}" bought "${listing.titre}" for $${listing.prix}.`);
    console.log(`  Seller "${seller.pseudo}" received $${sellerAmount} (commission: $${commission}).`);
}




const reviews = [];

function leaveReview(buyer, transaction_id, rating, comment) {
    let transaction = transactions.find(t => t.id === transaction_id);
    if (!transaction) {
        console.log(`transaction id ${transaction_id} not found.`);
        return;
    }

    if (transaction.buyer_id !== buyer.id) {
        console.log(`transaction id ${transaction_id} does not belong to buyer "${buyer.pseudo}".`);
        return;
    }

    let alreadyReviewed = reviews.find(r => r.transaction_id === transaction_id);
    if (alreadyReviewed) {
        console.log(`buyer "${buyer.pseudo}" has already left a review for transaction id ${transaction_id}.`);
        return;
    }

    if (rating < 1 || rating > 5) {
        console.log(`invalid rating "${rating}". Must be between 1 and 5.`);
        return;
    }

    let review = {
        id: reviews.length + 1,
        transaction_id: transaction_id,
        buyer_id: buyer.id,
        seller_id: transaction.seller_id,
        rating: rating,
        comment: comment,
        date: new Date().toISOString().split("T")[0],
    };

    reviews.push(review);

    let seller = users.find(u => u.id === transaction.seller_id);
    let sellerReviews = reviews.filter(r => r.seller_id === seller.id);
    let total = 0;
    sellerReviews.forEach(r => total += r.rating);
    seller.note_moyenne = total / sellerReviews.length;
    console.log(`Review submitted: "${buyer.pseudo}" rated "${seller.pseudo}" ${rating}/5.`);
}

function getSellerProfile(seller_id) {
    let seller = users.find(u => u.id === seller_id);

    if (!seller) {
        console.log(`seller id ${seller_id} not found.`);
        return;
    }
    if (seller.role !== "seller") {
        console.log(`user "${seller.pseudo}" is not a seller.`);
        return;
    }

    let sellerReviews = reviews.filter(r => r.seller_id === seller_id);
    let totalSales = transactions.filter(t => t.seller_id === seller_id).length;

    console.log(`Seller Profile`);
    console.log(`Pseudo: ${seller.pseudo}`);
    console.log(`Avg Rating: ${seller.note_moyenne.toFixed(2)} / 5`);
    console.log(`Total Sales: ${totalSales}`);
    console.log(`Reviews (${sellerReviews.length}):`);
    sellerReviews.forEach(r => {
        let buyer = users.find(u => u.id === r.buyer_id);
        console.log(`  [${r.date}] ${buyer.pseudo}: ${r.rating}/5 - "${r.comment}"`);
    });
}

function getStats() {
    let availableCount = 0;
    let soldCount = 0;
    let reservedCount = 0;
    annonces.forEach(l => {
        if (l.status === "available") availableCount++;
        if (l.status === "sold") soldCount++;
        if (l.status === "reserved") reservedCount++;
    });

    let totalRevenue = 0;
    let totalCommission = 0;
    transactions.forEach(t => {
        totalRevenue += t.amount;
        totalCommission += t.commission;
    });

    let sellers = users.filter(u => u.role === "seller");
    sellers.sort((a, b) => b.avg_rating - a.avg_rating);
    let top3 = sellers.slice(0, 3);

    let categoryCount = {};
    let categoryTotal = {};
    annonces.forEach(l => {
        if (!categoryCount[l.category]) {
            categoryCount[l.category] = 0;
            categoryTotal[l.category] = 0;
        }
        categoryCount[l.category]++;
        categoryTotal[l.category] += l.price;
    });

    let topCategory = null;
    let topCount = 0;
    for (let cat in categoryCount) {
        if (categoryCount[cat] > topCount) {
            topCount = categoryCount[cat];
            topCategory = cat;
        }
    }

    let avgPriceByCategory = {};
    for (let cat in categoryTotal) {
        avgPriceByCategory[cat] = Math.floor((categoryTotal[cat] / categoryCount[cat]) * 10) / 10;
    }
    console.log("Marketplace Stats ");
    console.log(`Listings: ${availableCount} available, ${soldCount} sold, ${reservedCount} reserved`);
    console.log(`Revenue: $${totalRevenue.toFixed(2)}`);
    console.log(`Commission: $${totalCommission.toFixed(2)}`);
    console.log(`Top 3 Sellers:`);
    top3.forEach((s, i) => console.log(`  ${i + 1}. ${s.pseudo} - ${s.avg_rating.toFixed(2)}/5`));
    console.log(`Top Category: ${topCategory} (${topCount} annonces)`);
    console.log(`Avg Price by Category:`);
    for (let cat in avgPriceByCategory) {
        console.log(`  ${cat}: $${avgPriceByCategory[cat]}`);
    }
}

