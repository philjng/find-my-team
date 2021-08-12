import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function EventMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isRendered, setIsRendered] = useState(false);
  const [viewableEvents, setViewableEvents] = useState([]);

  const initial_lat = 49.2827;
  const initial_lon = -123.12;
  const initial_zoom = 2;

  useEffect(() => {
    if (map.current && isRendered && viewableEvents === props.events) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initial_lon, initial_lat],
      zoom: initial_zoom,
    });

    props.events.forEach((event) => {
      setIsRendered(true);
      setViewableEvents(props.events);
      if (event.useCoordinates) {
        if (
          isNaN(event.latitude) ||
          isNaN(parseFloat(event.latitude)) ||
          event.latitude > 90 ||
          event.latitude < -90 ||
          isNaN(event.longitude) ||
          isNaN(parseFloat(event.longitude)) ||
          event.longitude > 180 ||
          event.longitude < -180
        ) {
          console.log("invalid coordinates");
          return;
        }
        let center = [event.longitude, event.latitude];
        let popup = new mapboxgl.Popup().setHTML(
          `<h2>${event.title}<h2/> <a href="/events/${event._id}"><p>Details</p></a>`
        );
        new mapboxgl.Marker()
          .setLngLat(center)
          .setPopup(popup)
          .addTo(map.current);
      } else {
        const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
        mapboxClient
          .forwardGeocode({
            query: event.location,
            limit: 1,
          })
          .send()
          .then((res) => {
            if (!res.body?.features?.length) {
              return;
            }
            let center = res.body.features[0].center;
            let popup = new mapboxgl.Popup().setHTML(
              `<h2>${event.title}<h2/> <a href="/events/${event._id}"><p>Details</p></a>`
            );
            new mapboxgl.Marker()
              .setLngLat(center)
              .setPopup(popup)
              .addTo(map.current);
          })
          .catch((err) => {
          });
      }
    });
  });

  return (
    <div>
      <div ref={mapContainer} style={{ height: "400px" }} />
    </div>
  );
}
export default EventMap;
