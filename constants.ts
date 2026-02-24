
import { Car, Transmission, Fuel, TranslationSet, Review } from './types';

export const WHATSAPP_NUMBER = "355695169873";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/m6shU3n1ZKna6yLi7";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Adelina Ruci",
    rating: 5,
    comment: "The best service I’ve received in a long time. Very comfortable cars reasonable price and more important very nice and polite people. Highly recommended",
    date: "1 week ago"
  },
  {
    id: 2,
    name: "Adel Redhwan",
    rating: 5,
    comment: "Ailemle birlikte birkaç günlüğüne Elbasan şehrindeydim ve MRentals'tan kiraladığım arabadan çok memnun kaldım. Uygun fiyat ve konforlu",
    date: "2 weeks ago"
  },
  {
    id: 3,
    name: "unejs duka",
    rating: 5,
    comment: "Great prices and very comfortable cars",
    date: "1 month ago"
  }
];

export const FLEET: Car[] = [
  {
    id: 'audi-a5',
    name: 'Audi A5',
    engine: '2.0',
    transmission: Transmission.AUTO,
    fuel: Fuel.DIESEL,
    year: 2013,
    pricePerDay: 50,
    seats: 5,
    features: ['S-Line Package', 'Navigation', 'Bluetooth', 'Parking Sensors'],
    images: [
      'photos/Audi A5(1).jpg',
      'photos/Audi A5(3).jpg',
      'photos/Audi A5(2).jpg'
    ],
    isAvailable: true,
    category: 'Premium'
  },
  {
    id: 'volvo-xc90',
    name: 'Volvo XC90',
    engine: '2.4',
    transmission: Transmission.AUTO,
    fuel: Fuel.DIESEL,
    year: 2007,
    pricePerDay: 50,
    seats: 7,
    features: ['7 Seats', 'AWD', 'Luxury Interior', 'Safety Tech'],
    images: [
      'photos/Volvo(1).jpg',
      'photos/Volvo(2).jpg',
      'photos/Volvo(3).jpg'
    ],
    isAvailable: true,
    category: 'SUV'
  },
  {
    id: 'vw-golf-6-auto',
    name: 'VW Golf 6',
    engine: '2.0',
    transmission: Transmission.AUTO,
    fuel: Fuel.DIESEL,
    year: 2013,
    pricePerDay: 35,
    seats: 5,
    features: ['Automatic', 'Climate Control', 'Economic', 'Compact'],
    images: [
      'photos/Golf 6 Blue(1).jpg',
      'photos/Golf 6 Blue(2).jpg',
      'photos/Golf 6 Blue(3).jpg'
    ],
    isAvailable: true,
    category: 'Standard'
  },
  {
    id: 'vw-golf-6-manual',
    name: 'VW Golf 6',
    engine: '1.6',
    transmission: Transmission.MANUAL,
    fuel: Fuel.DIESEL,
    year: 2009,
    pricePerDay: 30,
    seats: 5,
    features: ['Manual', 'Very Economic', 'Easy to Drive', 'Reliable'],
    images: [
      'photos/Golf 6 Black(1).jpg',
      'photos/Golf 6 Black(2).jpg',
      'photos/Golf 6 Black(3).jpg'
    ],
    isAvailable: true,
    category: 'Standard'
  },
  {
    id: 'skoda-octavia',
    name: 'Skoda Octavia',
    engine: '1.9',
    transmission: Transmission.AUTO,
    fuel: Fuel.DIESEL,
    year: 2009,
    pricePerDay: 30,
    seats: 5,
    features: ['Huge Trunk', 'Automatic', 'Comfortable', 'Fuel Efficient'],
    images: [
      'photos/Skoda(1).jpg',
      'photos/Skoda(2).jpg',
      'photos/Skoda(3).jpg'
    ],
    isAvailable: true,
    category: 'Standard'
  },
  {
    id: 'vw-jetta',
    name: 'VW Jetta',
    engine: '1.6',
    transmission: Transmission.AUTO,
    fuel: Fuel.DIESEL,
    year: 2013,
    pricePerDay: 35,
    seats: 5,
    features: ['Automatic', 'Sedan Comfort', 'Large Interior', 'Economic'],
    images: [
      'photos/Jetta(1).jpg',
      'photos/Jetta(2).jpg',
      'photos/Jetta(3).jpg'
    ],
    isAvailable: true,
    category: 'Standard'
  }
];

export const TRANSLATIONS: TranslationSet = {
  nav_home: { en: 'Home', sq: 'Kryefaqja' },
  nav_cars: { en: 'Our Fleet', sq: 'Flota' },
  nav_why: { en: 'Why Us', sq: 'Pse Ne?' },
  nav_reviews: { en: 'Reviews', sq: 'Vlerësimet' },
  nav_contact: { en: 'Contact', sq: 'Kontakti' },
  hero_title: { en: 'Car Rental in Tirana and Elbasan', sq: 'Makina me Qera në Elbasan dhe Tiranë' },
  hero_subtitle: { en: 'Experience the best car rental services in Albania. Modern vehicles, transparent pricing, and 24/7 airport pick-up at TIA.', sq: 'Përjetoni shërbimin më të mirë të makinave me qera në Shqipëri. Mjete moderne, çmime transparente dhe marrje në aeroportin e Rinasit 24/7.' },
  btn_view_cars: { en: 'Browse Fleet', sq: 'Shiko Flotën' },
  btn_book_now: { en: 'Book Now', sq: 'Rezervo Tani' },
  fleet_title: { en: 'Elite Fleet', sq: 'Flota Elite' },
  fleet_subtitle: { en: 'Selected quality and economy vehicles for your ultimate comfort.', sq: 'Automjete cilësore dhe ekonomike të përzgjedhura për rehatinë tuaj maksimale.' },
  fleet_discover_title: { en: 'Discover', sq: 'Zbuloni' },
  fleet_discover_fleet: { en: 'Fleet Our', sq: 'Flotën Tonë' },
  fleet_airport_service: { en: 'Pick-up and Drop-off to TIA (Tirana International Airport)', sq: 'Marrja dhe dorëzimi në Aeroportin e Tiranës (TIA)' },
  fleet_airport_transfer: { en: 'Airport Transfer', sq: 'Transfertë Aeroporti' },
  fleet_available_24_7: { en: 'Available 24/7', sq: 'Disponueshëm 24/7' },
  fleet_ready_to_drive: { en: 'Ready to drive?', sq: 'Gati për të nisur?' },
  fleet_no_cars: { en: 'No cars available', sq: 'Nuk ka makina të disponueshme' },
  fleet_check_later: { en: 'Please check back later for our updated fleet.', sq: 'Ju lutemi na vizitoni përsëri së shpejti për përditësimet më të fundit.' },
  spec_engine: { en: 'Engine', sq: 'Motori' },
  spec_gearbox: { en: 'Gearbox', sq: 'Kambio' },
  spec_fuel: { en: 'Fuel', sq: 'Karburanti' },
  spec_year: { en: 'Year', sq: 'Viti' },
  price_label: { en: '/day', sq: '/dita' },
  car_per_day: { en: 'Per Day', sq: 'Në Ditë' },
  car_seats: { en: 'Seats', sq: 'Vende' },
  why_title: { en: 'The MRentals Advantage', sq: 'Avantazhi MRentals' },
  why_price_title: { en: 'Transparent Pricing', sq: 'Çmime Transparente' },
  why_price_desc: { en: 'What you see is what you pay. No hidden fees, guaranteed.', sq: 'Ajo që shihni është ajo që paguani. Pa kosto të fshehura, e garantuar.' },
  why_fleet_title: { en: 'Modern Fleet', sq: 'Flotë Moderne' },
  why_fleet_desc: { en: 'Our cars are new, well-maintained and equipped with the latest technology.', sq: 'Makinat tona janë të reja, të mirëmbajtura dhe të pajisura si dhe me teknologjinë më të fundit.' },
  why_support_title: { en: 'Customer Service', sq: 'Shërbim Klienti' },
  why_support_desc: { en: 'Our team is always ready to help you and provide support 24/7.', sq: 'Ekipi ynë është gjithmonë i gatshëm t\'ju ndihmojë dhe t\'ju ofrojë mbështetje 24/7.' },
  review_title: { en: 'Google Customer Reviews', sq: 'Vlerësimet nga Klientët' },
  review_official_badge: { en: 'Official Reviews', sq: 'Vlerësime Zyrtare' },
  review_summary_stat: { en: 'Based on 23+ local reviews', sq: 'Bazuar në mbi 23+ vlerësime reale' },
  review_verified_guide: { en: 'Verified Local Guide', sq: 'Udhërrëfyes Lokal' },
  review_highly_recommended: { en: 'Highly Recommended', sq: 'Rekomandohet Shumë' },
  review_write_btn: { en: 'Write a Review', sq: 'Shkruaj një Vlerësim' },
  review_view_all_btn: { en: 'View All Google Reviews', sq: 'Shiko të gjitha në Google' },
  contact_get_in_touch: { en: 'Get in Touch', sq: 'Na Kontaktoni' },
  contact_showroom_title: { en: 'Visit Our Showroom', sq: 'Vizitoni Sallonin Tonë' },
  contact_location_title: { en: 'Our Location', sq: 'Vendndodhja' },
  contact_address: { en: 'Elbasan, Albania', sq: 'Elbasan, Shqipëri' },
  contact_direct_title: { en: 'Direct Contact', sq: 'Kontakt Direkt' },
  contact_direct_desc: { en: 'WhatsApp & Local Call', sq: 'WhatsApp dhe Thirrje' },
  contact_follow_title: { en: 'Follow Us', sq: 'Na Ndiqni' },
  contact_navigation_btn: { en: 'Start Navigation', sq: 'Fillo Navigimin' },
  footer_premium_services: { en: 'Premium Services', sq: 'Shërbime Premium' },
  footer_rights: { en: 'All rights reserved.', sq: 'Të gjitha të drejtat të rezervuara.' },
  ai_assistant_btn: { en: 'Travel Concierge', sq: 'Asistenti i Udhëtimit' },
  ai_assistant_placeholder: { en: 'Ask me anything about your trip to Albania...', sq: 'Më pyet për çdo gjë rreth udhëtimit tënd...' },
  ai_concierge_title: { en: 'Concierge', sq: 'Konshierzh' },
  ai_concierge_subtitle: { en: 'AI Powered', sq: 'AI Inteligjente' },
  ai_concierge_welcome: { en: "Welcome to MRentals! I'm your travel assistant. How can I help with your trip?", sq: "Mirësevini në MRentals! Jam asistenti juaj virtual. Si mund t'ju ndihmoj me udhëtimin tuaj?" },

  // SEO Content Blocks
  seo_title: { en: 'Car Rental Albania - Premium Services in Tirana and Elbasan', sq: 'Makina me Qera në Shqipëri - Shërbime Premium në Tiranë dhe Elbasan' },
  seo_intro: {
    en: 'Are you looking for a reliable car rental service in Albania? MRentals offers a premium experience for travelers arriving at Tirana International Airport or staying in Elbasan and Tirana. We provide a diverse fleet of modern vehicles ranging from economic city cars like the VW Golf to luxurious like Audi A5, ensuring comfort for every type of journey.',
    sq: 'Po kërkoni një shërbim të besueshëm makinash me qera në Shqipëri? MRentals ofron një përvojë premium për udhëtarët që mbërrijnë në Aeroportin Ndërkombëtar të Tiranës ose që qëndrojnë në Elbasan dhe Tiranë. Ne ofrojmë një flotë të larmishme mjetesh moderne, nga makinat ekonomike si VW Golf deri te luksoze si Audi A5, duke garantuar komoditet për çdo lloj udhëtimi.'
  },
  seo_elbasan_title: { en: 'Rent a Car in Elbasan - Local Expertise', sq: 'Makina me Qera në Elbasan - Ekspertizë Lokale' },
  seo_elbasan_body: {
    en: 'Based in the heart of Elbasan, MRentals is your primary choice for local car rentals. Whether you are visiting for business or exploring the historic sites of the city, our Elbasan showroom provides quick and easy access to high-quality vehicles. We pride ourselves on transparent pricing with no hidden costs, making us the most trusted "Car rental in Elbasan" provider.',
    sq: 'Me bazë në zemër të Elbasanit, MRentals është zgjedhja juaj parësore për makina me qera lokale. Pavarësisht nëse po vizitoni për biznes ose po eksploroni pikat historike të qytetit, salloni ynë në Elbasan ofron akses të shpejtë dhe të lehtë në mjetet cilësore. Ne krenohemi me çmimet transparente pa kosto të fshehura, duke na bërë ofruesin më të besuar për "Makina me qera ne Elbasan".'
  },
  seo_tirana_title: { en: 'Car Rental Tirana Airport (TIA) - 24/7 Service', sq: 'Makina me Qera Aeroporti Rinas (TIA) - Shërbim 24/7' },
  seo_tirana_body: {
    en: 'Arriving at Rinas? Our "rent a car Tirana airport" service is designed for maximum convenience. We offer 24/7 pick-up and drop-off services directly at Tirana International Airport (TIA). Skip the long queues and start your Albanian adventure immediately with our meet-and-greet service. Our team ensures your vehicle is ready as soon as you land, providing the best "Car rental Tirana Airport" experience available.',
    sq: 'Po mbërrini në Rinas? Shërbimi ynë "makina me qera ne Tirane" dhe Aeroport është projektuar për komoditet maksimal. Ne ofrojmë shërbime marrjeje dhe dorëzimi 24/7 direkt në Aeroportin Ndërkombëtar të Tiranës (TIA). Shmangni radhët e gjata dhe filloni aventurën tuaj shqiptare menjëherë me shërbimin tonë të pritjes. Ekipi ynë siguron që mjeti juaj të jetë gati sapo të uleni, duke ofruar përvojën më të mirë "Makina me qera Aeroporti Rinas".'
  },
  seo_fleet_title: { en: 'Our Diverse and Modern Fleet', sq: 'Flota Jonë e Larmishme dhe Moderne' },
  seo_fleet_body: {
    en: 'At MRentals, we understand that every traveler has different needs. That is why our fleet includes premium sedans, rugged SUVs, and economic hatchbacks. All our cars undergo rigorous safety checks and regular maintenance. From the Audi A5 for a stylish business trip to the Skoda Octavia for a family vacation with plenty of luggage space, we have the perfect match for you.',
    sq: 'Në MRentals, ne kuptojmë që çdo udhëtar ka nevoja të ndryshme. Kjo është arsyeja pse flota jonë përfshin sedana premium, SUV të fuqishëm dhe makina ekonomike. Të gjitha makinat tona i nënshtrohen kontrolleve rigoroze të sigurisë dhe mirëmbajtjes së rregullt. Nga Audi A5 për një udhëtim pune me stil, deri te Skoda Octavia për një pushim familjar me hapësirë të bollshme për bagazhe, ne kemi mjetin perfekt për ju.'
  },
  seo_cta: { en: 'Ready to Explore Albania? Book your car today via WhatsApp for the best rates!', sq: 'Gati për të eksploruar Shqipërinë? Rezervoni makinën tuaj sot përmes WhatsApp për çmimet më të mira!' }
};
