import Image from "next/image";
import { Bookmark, Star } from "lucide-react";

import Button from "../../components/ui/Button";

function DestinationCard({ destination, handleClick }) {
  return (
    <div key={destination.id} className=" rounded-lg shadow-xl overflow-hidden">
      {/* Destination Card */}
      <div className="relative w-full h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
        />
      </div>
      {/* Card Content */}
      <div className="relative p-4">
        <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
        <div className="flex items-center mb-2">
          <Bookmark className="inline-block mb-2 mr-2 text-orange-400" />
          <p className="text-gray-600 mb-2">{destination.category}</p>
        </div>
        {/* Rating and Description */}
        <div className="absolute top-2 right-2 flex items-center">
          <Star className="mr-1 fill-yellow-500 border-yellow-500" />
          <p> {destination.rating}</p>
        </div>
        <p className="text-gray-700 mb-4">{destination.shortDescription}</p>
        <div className="flex items-center justify-between mt-2">
        <Button onClick={() => handleClick(destination.id)}>Learn More</Button>
        <span className="font-semibold text-xl">
          {destination.price} <span className="text-amber-600 font-bold"> EGP</span>
        </span>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
