import React from 'react';
import { Map as TMap, LatLngExpression, LeafletEvent } from 'leaflet';
import omit from 'lodash/omit';
import { ScriptStyleLoader } from './LeafletMap.helper';

export type LeafletMapProps = {
  /** @default [-6.2, 106.816666] */
  center: LatLngExpression;
  className?: string;
  /** @default 300 */
  height: string | number;
  onDidUpdate?: (map: TMap, prevProps: LeafletMapProps) => void;
  onLoad?: (e: LeafletEvent) => void;
  scrollWheelZoom: boolean;
  /** @default 500 */
  width: string | number;
  /** @default 13 */
  zoom: number;
};

class LeafletMap extends React.Component<LeafletMapProps> {
  static defaultProps: Pick<
    LeafletMapProps,
    'center' | 'height' | 'width' | 'scrollWheelZoom' | 'zoom'
  > = {
    center: [-6.173760985297043, 106.82664312422276],
    height: 300,
    scrollWheelZoom: true,
    width: 500,
    zoom: 13,
  };

  ref = React.createRef<HTMLDivElement>();
  map: TMap | undefined = undefined;
  mapboxAccessToken =
    'pk.eyJ1IjoiYmFrdGlhZGl0eWEiLCJhIjoiY2tmODVkZzhjMDkyajMwcHBza2g0ejZ4aSJ9.1sn0quTi9yKYI2_AlZq7xQ';

  async componentDidMount() {
    const { center, onLoad, scrollWheelZoom, zoom } = this.props;

    try {
      const loader = new ScriptStyleLoader();
      await loader.require('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
      await loader.require('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js');
      await loader.require('https://unpkg.com/esri-leaflet@2.5.0/dist/esri-leaflet.js');
      await loader.require(
        'https://unpkg.com/esri-leaflet-geocoder@2.3.3/dist/esri-leaflet-geocoder.css',
      );
      await loader.require(
        'https://unpkg.com/esri-leaflet-geocoder@2.3.3/dist/esri-leaflet-geocoder.js',
      );

      if (this.ref.current) {
        const { L } = window;
        this.map = L.map(this.ref.current);
        this.map.on('load', e => {
          onLoad && onLoad(e);
        });
        this.map.setView(center, zoom);
        if (scrollWheelZoom) {
          this.map.scrollWheelZoom.enable();
        } else {
          this.map.scrollWheelZoom.disable();
        }

        L.tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.mapboxAccessToken}`,
          {
            maxZoom: 18,
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
          },
        ).addTo(this.map);
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidUpdate(prevProps: LeafletMapProps) {
    const { onDidUpdate } = this.props;
    if (this.map) {
      onDidUpdate && onDidUpdate(this.map, prevProps);
    }
  }

  render() {
    const { height, width, ...rest } = omit(this.props, [
      'center',
      'onDidUpdate',
      'onLoad',
      'scrollWheelZoom',
      'zoom',
    ]);

    return <div {...rest} ref={this.ref} style={{ width, height }} />;
  }
}

export default LeafletMap;
