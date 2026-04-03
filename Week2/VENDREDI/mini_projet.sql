CREATE DATABASE renforcement_miniprojet; 

CREATE TABLE hotels(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    rating INT,
    branch_number INT NOT NULL UNIQUE
);

CREATE TABLE services(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hotel_id INT NOT NULL,
    
    FOREIGN KEY(hotel_id) REFERENCES hotels(id)
);

CREATE TABLE type_chambre(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    people_per_room INT NOT NULL,
    bed_type VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    meta_data JSON,
    hotel_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE chambres(
	id INT AUTO_INCREMENT PRIMARY KEY,
    number INT NOT NULL,
	type_id INT NOT NULL,
    hotel_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (type_id) REFERENCES type_chambre(id)

);


CREATE TABLE clients(
	id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    cna VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(255)
);


CREATE TABLE reservations(
	id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
	end_date DATE NOT NULL,
    number_of_people INT NOT NULL,
    chambre_id INT NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY(client_id) REFERENCES clients(id),
    FOREIGN KEY (chambre_id) REFERENCES chambres(id)

);



CREATE TABLE avis(
	id INT AUTO_INCREMENT PRIMARY KEY,
    rating FLOAT,
    comment TEXT,
	client_id INT NOT NULL,
    reservation_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);


CREATE TABLE factures(
	id INT AUTO_INCREMENT PRIMARY KEY,
	amount FLOAT NOT NULL,
    `date` DATE NOT NULL DEFAULT CURRENT_DATE,
	client_id INT NOT NULL,
    reservation_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);






Taux doccupation par type de chambre sur un mois donné

SELECT  DATE_FORMAT(r.start_date, "%Y-%m") AS date, t.name, COUNT(c.id) AS total   FROM reservations r
LEFT JOIN chambres c ON c.id = r.chambre_id
LEFT JOIN type_chambre t ON t.id=c.type_id
GROUP BY DATE_FORMAT(r.start_date, "%Y-%m"), t.id





Chiffre daffaires par mois (jointure réservations + chambres + types)

SELECT DATE_FORMAT(r.start_date, '%Y-%m') AS `date`, SUM(t.price) AS total FROM reservations r
LEFT JOIN chambres c ON r.chambre_id = c.id
LEFT JOIN type_chambre t ON t.id = c.type_id
GROUP BY DATE_FORMAT(r.start_date, '%Y-%m')



Clients fidèles (plus de 3 réservations)

SELECT c.id, c.email, COUNT(r.id) FROM clients c
LEFT JOIN reservations r ON r.client_id = c.id
GROUP BY c.id


Chambres disponibles entre 2 dates (la requête la plus complexe : une chambre est disponible si elle na aucune réservation qui chevauche les dates demandées)

SELECT * 
FROM chambres c 
WHERE c.id NOT IN 
(
    SELECT r.chambre_id FROM reservations r
WHERE r.start_date < :end_date AND r.end_date > :start_date
 ) t
 


Revenu moyen par client

SELECT c.id, c.email, ROUND(SUM(t.price) / COUNT(r.id), 2) AS moyen FROM clients c
LEFT JOIN reservations r ON r.client_id = c.id
LEFT JOIN chambres ch ON ch.id  = r.chambre_id
LEFT JOIN type_chambre t ON t.id = ch.type_id
GROUP BY r.client_id



Top 5 des clients par montant dépensé

SELECT c.id, c.email, ROUND(SUM(t.price), 2) AS total FROM clients c
LEFT JOIN reservations r ON r.client_id = c.id
LEFT JOIN chambres ch ON ch.id  = r.chambre_id
LEFT JOIN type_chambre t ON t.id = ch.type_id
GROUP BY r.client_id
ORDER BY total DESC

LIMIT 5














-- ============================================================
-- Hotel Database Sample Data
-- ============================================================

-- ============================================================
-- HOTELS
-- ============================================================
INSERT INTO hotels (name, address, rating, branch_number) VALUES
('Atlas Prestige Hotel',       '12 Avenue Hassan II, Casablanca',        5, 1001),
('Riad Sultana',               '34 Rue Zitoun El Kedim, Marrakech',      4, 1002),
('Le Phare Bleu',              '7 Boulevard de la Corniche, Tanger',     4, 1003),
('Palais des Dunes',           '1 Route de Merzouga, Erfoud',            3, 1004),
('Océan Vert Resort',          '22 Avenue Mohamed V, Agadir',            5, 1005);

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO services (name, hotel_id) VALUES
-- Atlas Prestige Hotel (id=1)
('Piscine intérieure',          1),
('Spa & bien-être',             1),
('Restaurant gastronomique',    1),
('Salle de conférence',         1),
('Service voiturier',           1),
-- Riad Sultana (id=2)
('Hammam traditionnel',         2),
('Roof-top panoramique',        2),
('Restaurant marocain',         2),
('Transferts aéroport',         2),
-- Le Phare Bleu (id=3)
('Bar panoramique',             3),
('Salle de sport',              3),
('Service blanchisserie',       3),
-- Palais des Dunes (id=4)
('Excursions désert',           4),
('Dîner berbère sous les étoiles', 4),
('Location de dromadaires',     4),
-- Océan Vert Resort (id=5)
('Piscine extérieure',          5),
('Club enfants',                5),
('Spa marin',                   5),
('Sports nautiques',            5),
('Restaurants multiples',       5);

-- ============================================================
-- TYPE_CHAMBRE
-- ============================================================
INSERT INTO type_chambre (name, people_per_room, bed_type, price, meta_data, hotel_id) VALUES
-- Atlas Prestige Hotel
('Chambre Standard',       1, 'Lit simple',        650,  '{"view":"city","floor":"2-5","amenities":["wifi","tv","minibar"]}',              1),
('Chambre Double Deluxe',  2, 'Lit double',        950,  '{"view":"city","floor":"6-9","amenities":["wifi","tv","minibar","bathrobe"]}',   1),
('Suite Junior',           2, 'Lit king-size',    1800,  '{"view":"ocean","floor":"10-14","amenities":["wifi","tv","jacuzzi","lounge"]}',  1),
('Suite Présidentielle',   4, 'Lit king-size',    4500,  '{"view":"panoramic","floor":"15","amenities":["wifi","tv","jacuzzi","butler","terrace"]}', 1),
-- Riad Sultana
('Chambre Riad Classique', 2, 'Lit double',        800,  '{"view":"patio","style":"traditional","amenities":["wifi","ac","safe"]}',       2),
('Suite Riad Supérieure',  2, 'Lit king-size',    1500,  '{"view":"rooftop","style":"luxury","amenities":["wifi","ac","safe","hammam"]}',  2),
-- Le Phare Bleu
('Chambre Vue Mer',        2, 'Lit double',        750,  '{"view":"sea","floor":"1-4","amenities":["wifi","tv","balcony"]}',               3),
('Chambre Twin',           2, 'Lits jumeaux',      680,  '{"view":"city","floor":"1-4","amenities":["wifi","tv"]}',                       3),
-- Palais des Dunes
('Tente de Luxe',          2, 'Lit double',        550,  '{"style":"berber","amenities":["ac","wifi","terrace"]}',                        4),
('Suite Caravane',         4, 'Lit king-size',     900,  '{"style":"imperial","amenities":["ac","wifi","private_pool"]}',                 4),
-- Océan Vert Resort
('Chambre Ocean View',     2, 'Lit double',        870,  '{"view":"ocean","amenities":["wifi","tv","balcony","minibar"]}',                 5),
('Chambre Familiale',      4, 'Lits jumeaux',     1100,  '{"view":"garden","amenities":["wifi","tv","extra_beds"]}',                      5),
('Bungalow Prestige',      2, 'Lit king-size',    2200,  '{"view":"direct_sea","amenities":["wifi","tv","private_pool","jacuzzi"]}',       5);

-- ============================================================
-- CHAMBRES
-- ============================================================
INSERT INTO chambres (number, type_id, hotel_id) VALUES
-- Atlas Prestige Hotel
(101, 1, 1), (102, 1, 1), (103, 1, 1),
(201, 2, 1), (202, 2, 1), (203, 2, 1),
(301, 3, 1), (302, 3, 1),
(1501, 4, 1),
-- Riad Sultana
(11, 5, 2), (12, 5, 2), (13, 5, 2),
(21, 6, 2), (22, 6, 2),
-- Le Phare Bleu
(101, 7, 3), (102, 7, 3), (103, 7, 3),
(201, 8, 3), (202, 8, 3),
-- Palais des Dunes
(1, 9, 4), (2, 9, 4), (3, 9, 4),
(10, 10, 4),
-- Océan Vert Resort
(101, 11, 5), (102, 11, 5),
(201, 12, 5), (202, 12, 5), (203, 12, 5),
(301, 13, 5);

-- ============================================================
-- CLIENTS
-- ============================================================
INSERT INTO clients (firstname, lastname, cna, email, phone_number) VALUES
('Youssef',    'El Amrani',   'BE123456', 'y.elamrani@gmail.com',     '+212661001001'),
('Fatima',     'Benali',      'CD234567', 'fatima.benali@outlook.com','+212662002002'),
('Mehdi',      'Ouazzani',    'EF345678', 'mehdi.ouazzani@yahoo.fr',  '+212663003003'),
('Sofia',      'Chraibi',     'GH456789', 'sofia.chraibi@gmail.com',  '+212664004004'),
('Karim',      'Tazi',        'IJ567890', 'k.tazi@hotmail.com',       '+212665005005'),
('Nadia',      'Berrada',     'KL678901', 'nadia.berrada@gmail.com',  '+212666006006'),
('Omar',       'Fassi',       'MN789012', 'omar.fassi@gmail.com',     '+212667007007'),
('Laila',      'Rais',        'OP890123', 'laila.rais@gmail.com',     '+212668008008'),
('Hamid',      'Benkirane',   'QR901234', 'h.benkirane@outlook.com',  '+212669009009'),
('Zineb',      'El Mansouri', 'ST012345', 'zineb.elmansouri@gmail.com','+212660010010'),
('Khalid',     'Sabiri',      'UV123456', 'khalid.sabiri@gmail.com',  '+212671011011'),
('Amina',      'Moukrim',     'WX234567', 'amina.moukrim@yahoo.fr',   '+212672012012');

-- ============================================================
-- RESERVATIONS
-- ============================================================
INSERT INTO reservations (start_date, end_date, number_of_people, chambre_id, client_id) VALUES
-- Past reservations
('2024-11-01', '2024-11-05', 2, 4,  1),   -- Youssef, Chambre Double Deluxe, Atlas
('2024-11-10', '2024-11-14', 2, 11, 2),   -- Fatima, Riad Classique, Riad Sultana
('2024-12-20', '2024-12-27', 2, 15, 3),   -- Mehdi, Chambre Vue Mer, Le Phare Bleu
('2024-12-24', '2024-12-31', 4, 22, 4),   -- Sofia, Chambre Familiale, Océan Vert
('2025-01-05', '2025-01-08', 1, 1,  5),   -- Karim, Chambre Standard, Atlas
('2025-01-15', '2025-01-20', 2, 21, 6),   -- Nadia, Tente Luxe, Palais des Dunes
('2025-02-10', '2025-02-14', 2, 13, 7),   -- Omar, Riad Classique, Riad Sultana
('2025-02-20', '2025-02-22', 2, 16, 8),   -- Laila, Chambre Vue Mer, Le Phare Bleu
('2025-03-01', '2025-03-07', 2, 7,  9),   -- Hamid, Suite Junior, Atlas
('2025-03-15', '2025-03-18', 2, 24, 10),  -- Zineb, Bungalow Prestige, Océan Vert
-- Upcoming reservations
('2025-07-01', '2025-07-10', 2, 5,  11),  -- Khalid, Chambre Double Deluxe, Atlas
('2025-08-15', '2025-08-20', 2, 14, 12);  -- Amina, Suite Riad, Riad Sultana

-- ============================================================
-- AVIS (only past reservations)
-- ============================================================
INSERT INTO avis (rating, comment, client_id, reservation_id) VALUES
(5.0, 'Séjour exceptionnel, personnel très attentionné. Chambre impeccable avec une vue magnifique.', 1, 1),
(4.5, 'Riad charmant au coeur de la médina. Petit-déjeuner délicieux sur le rooftop.', 2, 2),
(4.0, 'Très bon séjour à Tanger. Vue sur la mer splendide. Quelques améliorations possibles au restaurant.', 3, 3),
(5.0, 'Vacances de Noël parfaites ! Les enfants ont adoré la piscine. Personnel adorable.', 4, 4),
(3.5, 'Chambre correcte mais petite. Service rapide et efficace.', 5, 5),
(4.5, 'Une expérience unique dans le désert. Nuit sous les étoiles inoubliable !', 6, 6),
(4.0, 'Riad authentique, très bien situé. Hammam inclus, excellent.', 7, 7),
(3.0, 'Séjour correct mais sans surprise. Chambre propre, accueil moyen.', 8, 8),
(5.0, 'Suite Junior fantastique ! Le jacuzzi avec vue sur Casablanca, un must.', 9, 9),
(4.5, 'Bungalow de rêve, piscine privée superbe. On reviendra sans hésiter.', 10, 10);

-- ============================================================
-- FACTURES
-- ============================================================
INSERT INTO factures (amount, `date`, client_id, reservation_id) VALUES
-- amount = price × nights
(3800.00,  '2024-11-05', 1,  1),   -- 950 × 4 nuits
(3200.00,  '2024-11-14', 2,  2),   -- 800 × 4 nuits
(5250.00,  '2024-12-27', 3,  3),   -- 750 × 7 nuits
(7700.00,  '2024-12-31', 4,  4),   -- 1100 × 7 nuits
(1950.00,  '2025-01-08', 5,  5),   -- 650 × 3 nuits
(2750.00,  '2025-01-20', 6,  6),   -- 550 × 5 nuits
(3200.00,  '2025-02-14', 7,  7),   -- 800 × 4 nuits
(1500.00,  '2025-02-22', 8,  8),   -- 750 × 2 nuits
(10800.00, '2025-03-07', 9,  9),   -- 1800 × 6 nuits
(6600.00,  '2025-03-18', 10, 10);  -- 2200 × 3 nuits