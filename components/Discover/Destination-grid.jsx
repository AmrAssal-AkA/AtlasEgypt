import DestinationCard from "./Destination-card";

function DestinationGrid(props) {
  const { destinations , handleClick } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10  px-5">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination}  handleClick={handleClick}/>
      ))}
    </div>
  );
}

export default DestinationGrid;
