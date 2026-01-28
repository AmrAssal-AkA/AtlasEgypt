export async function getAllDestination() {
  const response = await fetch(
    "https://atlasegypt-5d673-default-rtdb.firebaseio.com/Destination.json",
  );
  const data = await response.json();
  const destinations = [];

  for (const key in data) {
    destinations.push({
      id: key,
      ...data[key],
    });
  }
  return destinations;
}

export async function getAllTours() {
  const response = await fetch(
    "https://atlasegypt-5d673-default-rtdb.firebaseio.com/tours.json",
  );
  const data = await response.json();
  const tours = [];

  for (const key in data) {
    tours.push({
      id: key,
      ...data[key],
    });
  }
  return tours;
}
export async function getFeaturedTours() {
  const allTours = await getAllTours();
  return allTours.filter((tour) => tour.isFeatured);
}

export async function getDestinationById(Id) {
  const allDetination = await getAllDestination();
  return allDetination.find((destination) => destination.id === Id);
}
