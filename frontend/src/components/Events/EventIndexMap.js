import { Wrapper } from "@googlemaps/react-wrapper";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import eventsReducer, { fetchEvents, loadEvents } from "../../store/events";
import myIcon from './MapMarker.png';
import EventIndexItem from "./EventIndexItem";
import './Event.scss'


export const EventIndexMap = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const events = useSelector(loadEvents);
  const [showInfoBox, setShowInfoBox] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [])

  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, { zoom: 12, center: {lat: 37.773259546305965, lng: -122.44496350133707}}))
    };
    
  }, [mapRef]);

  // const mIcon = {
  //   path: window.google.maps.SymbolPath.CIRCLE,
  //   fillOpacity: 1,
  //   fillColor: 'blue',
  //   strokeOpacity: 0,
  //   strokeWeight: 0,
  //   strokeColor: '#333',
  //   scale: 6,
  //   labelOrigin: window.google.maps.Point(20, 40)
  // };

  const markerIcon = {
    url: myIcon,
    scaledSize: new window.google.maps.Size(30, 30),
    // anchor: new window.google.maps.Point(32,65),
  };

  useEffect(() => {
    if (map && events.length) {
      events.forEach(event => {
        const marker = new window.google.maps.Marker({
          position: event.initCoords[0],
          map: map,
          icon: markerIcon
        });
        marker.addListener('click', async () => {
          // history.push(`/events/${event._id}`);
          console.log('heyy')
          setShowInfoBox(event);
        })
      })
    }
  }, [map, events])

  return (
    <>
      <div className="google-map-container" ref={mapRef}>Map</div>
      { showInfoBox &&
        <div className="popup-box">
          <EventIndexItem event={showInfoBox}/>
        </div>
      }
    </>
  )

}



const EventIndexMapWrapper = () => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} >
      <EventIndexMap/>
    </Wrapper>
  )
};


export default EventIndexMapWrapper;