import {AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

function AdvancedMarks() {
  
  return (
    <AdvancedMarker position={{lat: 29.5, lng: -81.2}}>
    <Pin
      background={'#0f9d58'}
      borderColor={'#006425'}
      glyphColor={'#60d98f'}
    />
  </AdvancedMarker>
  );
}

export default AdvancedMarks;