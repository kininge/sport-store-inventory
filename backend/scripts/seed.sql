TRUNCATE TABLE inventories RESTART IDENTITY CASCADE;
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

-- Categories
INSERT INTO categories (name) VALUES
('Cricket'),
('Football'),
('Basketball'),
('Badminton'),
('Tennis'),
('Running'),
('Gym'),
('Swimming'),
('Cycling'),
('Yoga');

-- Manual realistic products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
VALUES

-- FOOTBALL

(
    'Mercurial Football Shoes',
    'Nike',
    'MERC-X1',
    'Professional football shoes for turf and grass matches',
    5999,
    10,
    20,
    2
),

(
    'Training Football',
    'Nivia',
    'FB-TRAIN',
    'Durable football for practice sessions and tournaments',
    899,
    5,
    45,
    2
),

(
    'Football Shin Guards',
    'Adidas',
    'SHIELD-PRO',
    'Protective shin guards for football training and matches',
    1499,
    15,
    30,
    2
),

-- CRICKET

(
    'English Willow Cricket Bat',
    'SG',
    'SG-T20',
    'Premium English willow cricket bat for leather ball cricket',
    8999,
    12,
    14,
    1
),

(
    'Cricket Tennis Ball',
    'Cosco',
    'CTB-100',
    'Lightweight cricket tennis ball for practice matches',
    299,
    0,
    100,
    1
),

(
    'Batting Gloves',
    'SS',
    'BAT-GLOVES',
    'Comfortable batting gloves with finger protection',
    1799,
    8,
    25,
    1
),

-- BASKETBALL

(
    'Indoor Basketball',
    'Spalding',
    'NBA-PRO',
    'Official size indoor basketball with superior grip',
    2499,
    10,
    18,
    3
),

(
    'Basketball Shoes',
    'Puma',
    'COURT-X',
    'High ankle basketball shoes for indoor courts',
    6999,
    18,
    12,
    3
),

-- BADMINTON

(
    'Carbon Fiber Badminton Racket',
    'Yonex',
    'YNX-77',
    'Lightweight badminton racket for professional players',
    5499,
    20,
    16,
    4
),

(
    'Nylon Shuttlecock Pack',
    'Li-Ning',
    'SHUTTLE-6',
    'Durable shuttlecock pack for badminton practice',
    799,
    0,
    60,
    4
),

-- TENNIS

(
    'Professional Tennis Racket',
    'Wilson',
    'WIL-ACE',
    'Professional tennis racket with graphite frame',
    7999,
    10,
    10,
    5
),

(
    'Tennis Ball Pack',
    'Head',
    'HEAD-3',
    'Pack of 3 professional tennis balls',
    499,
    0,
    75,
    5
),

-- RUNNING

(
    'Running Shoes',
    'Adidas',
    'RUN-BOOST',
    'Comfortable running shoes with responsive cushioning',
    6499,
    15,
    22,
    6
),

(
    'Fitness Tracker Watch',
    'Noise',
    'TRACK-FIT',
    'Smart fitness watch with heart rate monitor',
    3499,
    5,
    17,
    6
),

-- GYM

(
    'Adjustable Dumbbells',
    'Boldfit',
    'DUMB-20',
    'Adjustable dumbbell set for gym workouts',
    4999,
    10,
    8,
    7
),

(
    'Resistance Bands Set',
    'Strauss',
    'RB-PRO',
    'Resistance bands for strength and mobility workouts',
    999,
    0,
    50,
    7
),

-- SWIMMING

(
    'Swimming Goggles',
    'Speedo',
    'SWIM-VISION',
    'Anti-fog swimming goggles with UV protection',
    1299,
    5,
    40,
    8
),

(
    'Swimming Cap',
    'Arena',
    'CAP-PRO',
    'Silicone swimming cap for professional swimmers',
    599,
    0,
    55,
    8
),

-- CYCLING

(
    'Mountain Bicycle Helmet',
    'Btwin',
    'MTB-HELM',
    'Protective cycling helmet for mountain biking',
    2499,
    12,
    14,
    9
),

(
    'Cycling Gloves',
    'Rockrider',
    'CYCLE-GRIP',
    'Breathable cycling gloves with palm cushioning',
    899,
    0,
    35,
    9
),

-- YOGA

(
    'Yoga Mat',
    'Boldfit',
    'YOGA-MAT',
    'Non-slip yoga mat for home workouts and yoga sessions',
    1499,
    10,
    28,
    10
),

(
    'Yoga Block Set',
    'AmazonBasics',
    'YOGA-BLOCK',
    'Foam yoga blocks for stretching and flexibility exercises',
    799,
    0,
    33,
    10
);

-- Generated Cricket Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Cricket Bat Model ' || gs,
    (ARRAY['SG','SS','MRF','Kookaburra','Gray Nicolls'])[floor(random()*5+1)],
    'CB-' || gs,
    'Premium cricket bat suitable for practice and tournament matches',
    floor(random()*9000 + 1000),
    floor(random()*30),
    floor(random()*100 + 1),
    1
FROM generate_series(1,20) gs;

-- Generated Football Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Football Shoes ' || gs,
    (ARRAY['Nike','Adidas','Puma','Nivia'])[floor(random()*4+1)],
    'FB-' || gs,
    'Professional football shoes for training and matches',
    floor(random()*7000 + 1000),
    floor(random()*25),
    floor(random()*50 + 1),
    2
FROM generate_series(1,20) gs;

-- Generated Basketball Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Basketball Item ' || gs,
    (ARRAY['Spalding','Wilson','Nike','Puma'])[floor(random()*4+1)],
    'BB-' || gs,
    'Professional basketball equipment',
    floor(random()*6000 + 500),
    floor(random()*20),
    floor(random()*40 + 1),
    3
FROM generate_series(1,10) gs;

-- Generated Tennis Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Tennis Equipment ' || gs,
    (ARRAY['Wilson','Head','Babolat'])[floor(random()*3+1)],
    'TN-' || gs,
    'Professional tennis gear',
    floor(random()*8000 + 500),
    floor(random()*15),
    floor(random()*30 + 1),
    5
FROM generate_series(1,10) gs;

-- Generated Running Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Running Shoes ' || gs,
    (ARRAY['Nike','Adidas','Asics','Puma'])[floor(random()*4+1)],
    'RN-' || gs,
    'Lightweight running shoes',
    floor(random()*7000 + 1000),
    floor(random()*20),
    floor(random()*60 + 1),
    6
FROM generate_series(1,10) gs;

-- Generated Gym Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Gym Equipment ' || gs,
    (ARRAY['Boldfit','Strauss','Decathlon'])[floor(random()*3+1)],
    'GY-' || gs,
    'Strength training equipment',
    floor(random()*10000 + 500),
    floor(random()*15),
    floor(random()*30 + 1),
    7
FROM generate_series(1,10) gs;

-- Generated Swimming Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Swimming Gear ' || gs,
    (ARRAY['Speedo','Arena','Nabaiji'])[floor(random()*3+1)],
    'SW-' || gs,
    'Professional swimming equipment',
    floor(random()*3000 + 300),
    floor(random()*10),
    floor(random()*70 + 1),
    8
FROM generate_series(1,10) gs;

-- Generated Cycling Products
INSERT INTO inventories (
    name,
    brand,      
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT      
    'Cycling Gear ' || gs,
    (ARRAY['Btwin','Rockrider','Decathlon'])[floor(random()*3+1)],
    'CY-' || gs,
    'Durable cycling equipment',
    floor(random()*4000 + 500),
    floor(random()*12),
    floor(random()*40 + 1),
    9
FROM generate_series(1,10) gs;  

-- Generated Yoga Products
INSERT INTO inventories (
    name,
    brand,
    product_model,
    description,
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Yoga Product ' || gs,
    (ARRAY['Boldfit','AmazonBasics','Strauss'])[floor(random()*3+1)],
    'YG-' || gs,
    'Yoga and stretching accessory',
    floor(random()*2000 + 200),
    floor(random()*10),
    floor(random()*50 + 1),
    10
FROM generate_series(1,10) gs;

-- Additional random products for variety
INSERT INTO inventories (
    name,
    brand,          
    product_model,
    description,        
    price,
    offer,
    quantity,
    category_id
)
SELECT
    'Sports Item ' || gs,       
    (ARRAY['Nike','Adidas','Puma','SG','SS','Wilson','Head','Boldfit','Speedo'])[floor(random()*9+1)],
    'SP-' || gs,
    'High-quality sports equipment for various activities',
    floor(random()*10000 + 500),
    floor(random()*30),
    floor(random()*100 + 1),
    floor(random()*10 + 1)
FROM generate_series(1,20) gs;  
