import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const style = {
  wrapper: `flex h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/secondkyo/cl121pgyj000u14pbkeenvo5h',
      center: [-99.965379, 39.637828],
      zoom: 3,
    });
  }, []);

  return <div className={style.wrapper} id="map"></div>;
};

export default Map;
