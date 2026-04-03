Chaque livre avec le nom de son éditeur et le nom de son genre (3 tables)

SELECT l.titre, e.nom, g.nom FROM livres l
LEFT JOIN editeurs e ON e.id = l.editeur_id
LEFT JOIN genres g ON g.id = l.genre_id



Le nombre de livres par éditeur, trié du plus au moins prolifique

SELECT e.id, e.nom, COUNT(l.id) AS amount  FROM editeurs e
LEFT JOIN livres l ON l.editeur_id = e.id
GROUP BY e.id
ORDER BY  amount DESC



Le chiffre daffaires par genre (jointure 3 tables avec calcul prix × quantité)

SELECT g.nom AS genre, ROUND(SUM(l.prix *v.quantite),2) AS total FROM genres g
LEFT JOIN livres l ON l.genre_id = g.id
LEFT JOIN ventes v ON v.livre_id = l.id
GROUP BY g.nom




Les éditeurs qui n'ont aucun livre vendu (pense à comment trouver l'absence de correspondance)

SELECT e.nom FROM editeurs e WHERE e.nom NOT IN (SELECT e.nom FROM editeurs e
INNER JOIN livres l ON l.editeur_id = e.id
INNER JOIN ventes v ON v.livre_id = l.id
GROUP BY e.nom)



Le livre le plus vendu de chaque genre

 SELECT genre, titre, MAX(quantite)
FROM (SELECT g.nom AS genre, l.titre, SUM(v.quantite) AS quantite FROM genres g
LEFT JOIN livres l ON l.genre_id = g.id
LEFT JOIN ventes v ON v.livre_id = l.id
GROUP BY g.nom, l.titre) t
GROUP BY genre




Les clients qui ont acheté des livres de plus de 3 genres différents

SELECT client, COUNT(DISTINCT genre) AS genre_count
FROM(
    SELECT v.client AS client, g.nom AS genre FROM ventes v
	INNER JOIN livres l ON l.id = v.livre_id
	INNER JOIN genres g ON g.id = l.genre_id
	) t
GROUP BY client
HAVING genre_count > 2



L'évolution mensuelle du chiffre d'affaires (regroupé par mois)


SELECT DATE_FORMAT(v.date_vente, '%Y-%m')  AS mois, SUM(l.prix * v.quantite) AS chiffre_affaires
FROM ventes v
JOIN livres l ON v.livre_id = l.id
GROUP BY DATE_FORMAT(v.date_vente, '%Y-%m')
ORDER BY mois ASC;


Les livres publiés après 2020 dont le prix est supérieur au prix moyen de leur genre

