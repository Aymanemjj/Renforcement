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






Taux d'occupation par type de chambre sur un mois donné







Chiffre d'affaires par mois (jointure réservations + chambres + types)

SELECT DATE_FORMAT(r.start_date, '%Y-%m') AS `date`, SUM(t.price) AS total FROM reservations r
LEFT JOIN chambres c ON r.chambre_id = c.id
LEFT JOIN type_chambre t ON t.id = c.type_id
GROUP BY DATE_FORMAT(r.start_date, '%Y-%m')



Clients fidèles (plus de 3 réservations)

























-- ============================================
--  DB SEED — hotel management system
-- ============================================

-- 1. HOTELS
INSERT INTO hotels (id, name, address, rating, branch_number) VALUES
  (1, 'Atlas Grand Hotel',   '12 Avenue Mohammed V, Casablanca',  5, 1001),
  (2, 'Riad Soleil',         '7 Rue des Orangers, Marrakech',     4, 1002),
  (3, 'Marina Bay Hotel',    '3 Boulevard de la Corniche, Agadir',3, 1003),
  (4, 'Palais des Roses',    '21 Avenue Hassan II, Rabat',        4, 1004);

-- 2. SERVICES
INSERT INTO services (id, name, hotel_id) VALUES
  (1,  'Piscine',             1),
  (2,  'Spa & Hammam',        1),
  (3,  'Restaurant gastronomique', 1),
  (4,  'Parking couvert',     1),
  (5,  'Salle de sport',      2),
  (6,  'Petit-déjeuner inclus', 2),
  (7,  'Navette aéroport',    2),
  (8,  'Piscine',             3),
  (9,  'Bar & Lounge',        3),
  (10, 'Animaux acceptés',    3),
  (11, 'Conciergerie',        4),
  (12, 'Salle de conférence', 4),
  (13, 'Blanchisserie',       4);

-- 3. TYPE_CHAMBRE
INSERT INTO type_chambre (id, name, people_per_room, bed_type, meta_data, hotel_id) VALUES
  (1,  'Standard Simple',  1, 'Single',      '{"view":"courtyard","floor":1,"area_m2":18}', 1),
  (2,  'Standard Double',  2, 'Double',      '{"view":"city","floor":2,"area_m2":24}',      1),
  (3,  'Suite Junior',     2, 'King',        '{"view":"sea","floor":5,"area_m2":40,"jacuzzi":true}', 1),
  (4,  'Riad Standard',    2, 'Double',      '{"view":"garden","floor":1,"area_m2":28}',    2),
  (5,  'Riad Prestige',    4, 'Twin+Double', '{"view":"pool","floor":2,"area_m2":55,"terrace":true}', 2),
  (6,  'Chambre Vue Mer',  2, 'Queen',       '{"view":"sea","floor":3,"area_m2":30}',       3),
  (7,  'Suite Familiale',  4, 'Twin+Double', '{"view":"sea","floor":4,"area_m2":60,"kitchenette":true}', 3),
  (8,  'Chambre Classic',  2, 'Double',      '{"view":"garden","floor":1,"area_m2":22}',    4),
  (9,  'Suite Royale',     2, 'King',        '{"view":"city","floor":6,"area_m2":75,"butler":true}', 4);

-- 4. CHAMBRES
INSERT INTO chambres (id, number, type_id, hotel_id) VALUES
  (1,  101, 1, 1),
  (2,  102, 1, 1),
  (3,  201, 2, 1),
  (4,  202, 2, 1),
  (5,  501, 3, 1),
  (6,  101, 4, 2),
  (7,  102, 4, 2),
  (8,  201, 5, 2),
  (9,  101, 6, 3),
  (10, 102, 6, 3),
  (11, 401, 7, 3),
  (12, 101, 8, 4),
  (13, 102, 8, 4),
  (14, 601, 9, 4);

-- 5. CLIENTS
INSERT INTO clients (id, firstname, lastname, cna, email, phone_number) VALUES
  (1,  'Youssef',   'El Amrani',  'AB123456', 'y.elamrani@gmail.com',   '0661234567'),
  (2,  'Sophie',    'Martin',     'CD789012', 'sophie.martin@gmail.com', '0033612345678'),
  (3,  'Mohamed',   'Benali',     'EF345678', 'm.benali@hotmail.com',    '0662345678'),
  (4,  'Laura',     'Dupont',     'GH901234', 'laura.dupont@gmail.com',  '0033698765432'),
  (5,  'Fatima',    'Oussama',    'IJ567890', 'f.oussama@gmail.com',     '0663456789'),
  (6,  'Pierre',    'Garnier',    'KL123456', 'p.garnier@outlook.com',   '0033645678901'),
  (7,  'Nadia',     'Khalil',     'MN789012', 'nadia.k@gmail.com',       '0664567890'),
  (8,  'Thomas',    'Bernard',    'OP345678', 't.bernard@gmail.com',     '0033678901234'),
  (9,  'Amina',     'Saddiki',    'QR901234', 'amina.s@gmail.com',       '0665678901'),
  (10, 'Jean-Paul', 'Rousseau',   'ST567890', 'jp.rousseau@gmail.com',   '0033656789012');

-- 6. RESERVATIONS
INSERT INTO reservations (id, start_date, end_date, number_of_people, chambre_id) VALUES
  (1,  '2024-01-10', '2024-01-14', 1,  1),
  (2,  '2024-01-15', '2024-01-18', 2,  3),
  (3,  '2024-02-01', '2024-02-07', 2,  6),
  (4,  '2024-02-10', '2024-02-12', 2,  9),
  (5,  '2024-02-20', '2024-02-25', 4,  8),
  (6,  '2024-03-05', '2024-03-08', 1,  2),
  (7,  '2024-03-12', '2024-03-16', 2,  5),
  (8,  '2024-03-18', '2024-03-22', 2,  10),
  (9,  '2024-04-01', '2024-04-05', 2,  14),
  (10, '2024-04-08', '2024-04-12', 4,  11),
  (11, '2024-04-15', '2024-04-17', 2,  4),
  (12, '2024-05-01', '2024-05-06', 2,  7),
  (13, '2024-05-10', '2024-05-15', 1,  1),
  (14, '2024-05-20', '2024-05-24', 2,  12),
  (15, '2024-06-01', '2024-06-08', 2,  3),
  (16, '2024-06-10', '2024-06-14', 4,  8),
  (17, '2024-06-18', '2024-06-20', 2,  9),
  (18, '2024-07-01', '2024-07-07', 2,  5),
  (19, '2024-07-10', '2024-07-14', 1,  13),
  (20, '2024-07-20', '2024-07-25', 4,  11);

-- 7. AVIS
INSERT INTO avis (id, rating, comment, client_id, reservation_id) VALUES
  (1,  4.5, 'Excellent séjour, personnel très accueillant.',         1,  1),
  (2,  3.0, 'Chambre correcte mais un peu bruyante.',                2,  2),
  (3,  5.0, 'Magnifique riad, dépaysement total !',                  3,  3),
  (4,  4.0, 'Belle vue sur mer, petit-déjeuner délicieux.',          4,  4),
  (5,  2.5, 'Déçu par le manque de propreté.',                       5,  5),
  (6,  4.0, 'Bon rapport qualité-prix.',                             6,  6),
  (7,  5.0, 'Suite somptueuse, service impeccable.',                 7,  7),
  (8,  3.5, 'Agréable mais climatisation défaillante.',              8,  8),
  (9,  4.5, 'Hôtel superbe, on reviendra !',                         9,  9),
  (10, 4.0, 'Très bien pour un séjour en famille.',                  10, 10),
  (11, 3.0, 'Check-in lent, chambre conforme aux photos.',           1,  11),
  (12, 5.0, 'Riad authentique, personnel aux petits soins.',         3,  12),
  (13, 4.0, 'Propre et bien situé.',                                 5,  14),
  (14, 4.5, 'Piscine magnifique, très bon buffet.',                  2,  15),
  (15, 3.5, 'Séjour correct sans plus.',                             6,  17);

-- 8. FACTURES
INSERT INTO factures (id, amount, date, client_id, reservation_id) VALUES
  (1,  480.00,  '2024-01-14', 1,  1),
  (2,  360.00,  '2024-01-18', 2,  2),
  (3,  840.00,  '2024-02-07', 3,  3),
  (4,  260.00,  '2024-02-12', 4,  4),
  (5,  750.00,  '2024-02-25', 5,  5),
  (6,  270.00,  '2024-03-08', 6,  6),
  (7,  1200.00, '2024-03-16', 7,  7),
  (8,  520.00,  '2024-03-22', 8,  8),
  (9,  900.00,  '2024-04-05', 9,  9),
  (10, 1400.00, '2024-04-12', 10, 10),
  (11, 200.00,  '2024-04-17', 1,  11),
  (12, 600.00,  '2024-05-06', 3,  12),
  (13, 400.00,  '2024-05-15', 5,  13),
  (14, 440.00,  '2024-05-24', 6,  14),
  (15, 840.00,  '2024-06-08', 2,  15),
  (16, 960.00,  '2024-06-14', 4,  16),
  (17, 280.00,  '2024-06-20', 8,  17),
  (18, 1800.00, '2024-07-07', 7,  18),
  (19, 320.00,  '2024-07-14', 9,  19),
  (20, 1250.00, '2024-07-25', 10, 20);
