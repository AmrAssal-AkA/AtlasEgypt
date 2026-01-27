import React from "react";
import TourCard from "./Tour-card";

function TourGrid(props) {
  const { tours } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto px-4">
      {tours.map((tour) => (
        <TourCard key={tour.tourId} tour={tour} />
      ))}
    </div>
  );
}

export default TourGrid;
