import { useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { UberContext } from '../context/uberContext';

const style = {
  wrapper: `flex h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates } =
    useContext(UberContext);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/secondkyo/cl121pgyj000u14pbkeenvo5h',
      center: [-90, 90],
      zoom: 3,
    });

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates);
    }
    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates);
    }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: 200,
      });
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  return <div className={style.wrapper} id="map"></div>;
};

export default Map;
