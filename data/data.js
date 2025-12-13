
const Destinations =[
        {
      "id": 1,
      "name": "Giza Pyramids",
      "city": "Giza",
      "description": "One of the Seven Wonders of the Ancient World and a world-famous archaeological site.",
      "image": "/trips/giza-pyramids.jpeg",
      "category": "Historical",
      "rating": 4.9,
    },
    {
      "id": 2,
      "name": "Karnak Temple",
      "city": "Luxor",
      "description": "The largest religious complex in ancient Egypt with massive columns and statues.",
      "image": "/trips/karnak-temple.jpeg",
      "category": "Historical",
      "rating": 4.8
    },
    {
      "id": 3,
      "name": "Sharm El Sheikh",
      "city": "South Sinai",
      "description": "A famous tourist city known for resorts, beaches, and diving spots.",
      "image": "/trips/sharm-el-sheikh.jpeg",
      "category": "Beaches",
      "rating": 4.7
    },
    {
      "id": 4,
      "name": "Nile River Cruise",
      "city": "Cairo to Aswan",
      "description": "Experience the beauty of Egypt while cruising along the Nile River.",
      "image": "/trips/nile-cruise.jpeg",
      "category": "Cruises",
      "rating": 4.9
    },
    {
      "id": 5,
      "name": "Abu Simbel Temples",
      "city": "Aswan",
      "description": "Famous rock temples built by Ramses II, relocated to avoid flooding from the Aswan High Dam.",
      "image": "/trips/Abu-Simbel.jpg",
      "category": "Historical",
      "rating": 4.8
    },
    {
      "id": 6,
      "name": "Siwa Oasis",
      "city": "Western Desert",
      "description": "A remote oasis known for its unique culture, natural springs, and ancient ruins.",
      "image": "/trips/siwa-oasis.jpeg",
      "category": "Nature",
      "rating": 4.6
    },
    {
      "id": 7,
      "name": "Alexandria city",
      "city": "Alexandria",
      "description": "Home to the historic Library of Alexandria and beautiful Mediterranean beaches.",
      "image": "/trips/Alexandria-city.jpeg",
      "category": "City Trips",
      "rating": 4.5
    },
    {
      "id": 9,
      "name": "Dahab",
      "city": "Sinai Peninsula",
      "description": "A laid-back beach town known for its diving spots and relaxed atmosphere.",
      "image": "/trips/Dahab-city-trip.jpg",
      "category": "Beaches",
      "rating": 4.6
    },
    {
      "id": 10,
      "name": "Luxor Temple",
      "city": "Luxor",
      "description": "An ancient temple complex located on the east bank of the Nile River.",
      "image": "/trips/Luxor-temple.jpg",
      "category": "Historical",
      "rating": 4.8
    }
]
const tours = [
       {
      "tourId": 101,
      "title": "Full-Day Tour to the Pyramids and Sphinx",
      "price": 850,
      "currency": "EGP",
      "duration": "8 hours",
      "includes": ["Tour guide", "Air-conditioned vehicle", "Entry tickets"],
      "image": "/trips/giza-pyramids.jpeg"
    },
    {
      "tourId": 102,
      "title": "Nile Dinner Cruise",
      "price": 600,
      "currency": "EGP",
      "duration": "2 hours",
      "includes": ["Dinner", "Oriental music", "Tanoura show"],
      "image": "/trips/nile-cruise.jpeg"
    },
    {
      "tourId": 103,
      "title": "Sharm El Sheikh trip and Diving Experience",
      "price": 5000,
      "currency": "EGP",
      "duration": "7 Days",
      "includes": [
        "breakfast",
        "Dinner",
        "Oriental music",
        "Tanoura show",
        "Diving sessions",
        "Hotel accommodation",
        "Airport transfers"
      ],
      "image": "/trips/sharm-el-sheikh.jpeg"
    },
    {
      "tourId": 104,
      "title": "Luxor and Karnak Temples Tour",
      "price": 4200,
      "currency": "EGP",
      "duration": "10 hours",
      "includes": ["Tour guide", "Air-conditioned vehicle", "Entry tickets", "Lunch"],
      "image": "/trips/karnak-temple.jpeg"
    },
    {
      "tourId": 105,
      "title": "Abu Simbel Day Trip from Aswan",
      "price": 3000,
      "currency": "EGP",
      "duration": "12 hours",
      "includes": ["Tour guide", "Air-conditioned vehicle", "Entry tickets", "Lunch"],
      "image": "/trips/Abu-Simbel.jpg"
    },
    {
      "tourId": 106,
      "title": "Siwa Oasis Adventure Tour",
      "price": 7500,
      "currency": "EGP",
      "duration": "3 Days",
      "includes": [
        "Accommodation",
        "Meals",
        "Guided tours",
        "Transportation"
      ],
      "image": "/trips/siwa-oasis.jpeg"
    }
]
const blogs =[
     {
      "postId": 301,
      "title": "Best Time to Visit Egypt",
      "content": "The best time to visit is from October to April when the weather is mild and pleasant.",
      "image": "/blogs/best-time.jpeg",
      "publishedAt": "2023-11-15",
      "author": "Ramy Ahmed"
    },
    {
      "postId": 302,
      "title": "10 Travel Tips for Visiting Egypt",
      "content": "Visit historical sites, book tours with trusted companies, and plan ahead for peak season.",
      "image": "/blogs/tips.jpeg",
      "publishedAt": "2023-12-01",
      "author": "Sara El-Masry"
    },
    {
      "postId": 303,
      "title": "Exploring the Egyptian Cuisine",
      "content": "Try traditional dishes like koshari, ful medames, and molokhia for an authentic taste of Egypt.",
      "image": "/blogs/cuisine.jpeg",
      "publishedAt": "2024-01-10",
      "author": "Omar Hassan"
    },
    {
      "postId": 304,
      "title": "Top 5 Beaches in Egypt",
      "content": "Discover the best beaches in Sharm El Sheikh, Dahab, and Marsa Matruh for sun and sea lovers.",
      "image": "/blogs/beaches.jpeg",
      "publishedAt": "2024-02-20",
      "author": "Laila Nasser"
    },
    {
      "postId": 305,
      "title": "Cultural Etiquette in Egypt",
      "content": "Respect local customs, dress modestly, and always ask permission before taking photos of people.",
      "image": "/blogs/etiquette.jpeg",
      "publishedAt": "2024-03-15",
      "author": "Youssef Karim"
    },
    {
      "postId": 306,
      "title": "Must-See Historical Sites in Egypt",
      "content": "From the Pyramids of Giza to the temples of Luxor, explore Egypt's rich history and heritage.",
      "image": "/blogs/historical-sites.jpeg",
      "publishedAt": "2024-04-05",
      "author": "Nadia Fathy"
    }
]

export function getDestinations() {
    return Destinations;
}
export function getTours() {
    return tours;
}
export function getBlogs() {
    return blogs;
}

export function getDestinationById(id) {
    return Destinations.find((destination) => destination.id === id);
}
export function getToursById(tourId){
    return tours.find((tour) => tour.tourId === tourId);
}