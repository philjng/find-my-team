// Followed mapbox tutorials: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/ and https://docs.mapbox.com/mapbox-gl-js/example/marker-from-geocode/

import {useEffect, useRef} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
import { addMapMarker } from "../../actions/events";
import {connect} from "react-redux";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
const _ = require("lodash");

function DisplayMap(props) {

const mapContainer = useRef(null);
const map = useRef(null);
  // const [latitude, setLatitude] = useState(49.2827);
  // const [longitude, setLongitude] = useState(-123.12);
  // const [zoom, setZoom] = useState(9);
  const initial_lat = 49.2827;
  const initial_lon = -123.12
  const initial_zoom = 10;
    
  useEffect(() => {
        if (map.current && _.isEqual(props.location,props.marker)) return;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [initial_lon, initial_lat],
          zoom: initial_zoom
        });
        if (props.useCoordinates) {
          let center = [props.longitude, props.latitude];
          new mapboxgl.Marker().setLngLat(center).addTo(map.current);
              props.addMapMarker(props.location);
              map.current.flyTo({
                center: center
              })
              return;
        }
        
        const mapboxClient = mapboxSdk({accessToken: mapboxgl.accessToken});
            mapboxClient.forwardGeocode({
              query: props.location,
              limit: 1
            })
            .send()
            .then((res) => {
              if (!res.body?.features?.length) {
                return;
              }
              let center = res.body.features[0].center;
              new mapboxgl.Marker().setLngLat(center).addTo(map.current);
              props.addMapMarker(props.location);
              map.current.flyTo({
                center: center
              })
            })
      });

      // useEffect(() => {
      //     if (!map.current) return;
      //     map.current.on("move", () => {
      //         setLatitude(map.current.getCenter().lat.toFixed(4));
      //         setLongitude(map.current.getCenter().lng.toFixed(4));
      //         setZoom(map.current.getZoom().toFixed(2));
      //     });
      // });

      return (
        <div>
            <div ref={mapContainer} style={{"height": "400px"}} />
        </div>
        );

}

const mapStateToProps = (state) => {
  return {
    marker: state.events.marker
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMapMarker: (marker) => addMapMarker(dispatch, marker)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMap);