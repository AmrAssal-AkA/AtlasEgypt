import Image from "next/image"
import { Clock } from "lucide-react";

import Button from "../ui/Button"

function TourCard({tour}) {
  return (
                <div
                key={tour.tourId}
                className="rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-center"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-2xl font-bold mb-2">{tour.title}</h4>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Clock size={16} className="mr-1 text-amber-500" />
                    {tour.duration}
                  </p>
                  <p className="text-xl ">{tour.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-amber-600 font-bold text-xl">
                      {tour.price} EGP
                    </span>
                    <Button>
                      View Tour
                    </Button>
                  </div>
                </div>
              </div>
  )
}

export default TourCard