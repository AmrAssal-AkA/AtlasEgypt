
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

export function getBlogs() {
    return blogs;
}

export function getDestinationById(id) {
    return Destinations.find((destination) => destination.id === id);
}
export function getToursById(tourId){
    return tours.find((tour) => tour.tourId === tourId);
}