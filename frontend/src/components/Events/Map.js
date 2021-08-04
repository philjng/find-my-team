// Followed mapbox tutorial: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
import {useEffect, useState, useRef} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {

const mapContainer = useRef(null);
  const map = useRef(null);
  const [latitude, setLatitude] = useState(49.2827);
  const [longitude, setLongitude] = useState(-123.12);
  const [zoom, setZoom] = useState(9);


    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [longitude, latitude],
          zoom: zoom
        });
      });

      return (
        <div>
            <div ref={mapContainer} style={{"height": "400px"}} />
        </div>
        );

}
export default Map;