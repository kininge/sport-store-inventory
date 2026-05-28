TRUNCATE TABLE inventories RESTART IDENTITY CASCADE;
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

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