import React from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

//const [markerRef, marker] = useAdvancedMarkerRef();
function Markers(locations){

  return <>
  {locations?.map((card) => (
          <AdvancedMarker
            key={card.id}
            position={{ lat: card.latitude, lng: card.longitude }}
            // onClick={() => setSelectedPlace(card)}
            //ref={markerRef}
            icon={{
              url: "/hospital logo.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
     
      </>
};

export default Markers;
  
 //<Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />