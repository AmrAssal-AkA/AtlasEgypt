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

export async function getFeaturedDestination() {
  const allDestination = await getAllDestination();
  return allDestination.filter((destination) => destination.isFeatured);
}

export async function getDestinationById(Id) {
  const allDestination = await getAllDestination();
  return allDestination.find((destination) => destination.id === Id);
}
