/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { ComponentWithStaticMethod, NoUndefinedField } from 'kta-ui-components';
import isArray from 'lodash/isArray';
import {
  Map as TMap,
  Marker,
  LeafletMouseEvent,
  LeafletEvent,
  LatLng,
  LatLngExpression,
} from 'leaflet';
import LeafletMap, { LeafletMapProps } from './LeafletMap';
import { isPossiblyNumber } from '../../utils/number';

type RequiredLeafletMapProps = NoUndefinedField<LeafletMapProps>;
type BasicArgs = Pick<RequiredLeafletMapProps, 'center' | 'scrollWheelZoom' | 'zoom'> & {
  height: string;
  width: string;
};

export default { component: LeafletMap, title: 'Components / LeafletMap' };

export const Basic: ComponentWithStaticMethod<BasicArgs> = args => {
  const { height, width, center, scrollWheelZoom = false, zoom, ...rest } = args;
  const marker = React.useRef<Marker>();

  const onLoad = (e: LeafletEvent) => {
    const { L } = window;
    marker.current = L.marker(center).addTo(e.target);
    marker.current.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  };

  const onDidUpdate = (map: TMap, prevProps: LeafletMapProps) => {
    if (prevProps.height !== height || prevProps.width !== width) {
      map.invalidateSize();
    }

    if (prevProps.center !== center || prevProps.zoom !== zoom) {
      marker.current && marker.current.setLatLng(center);
      map.setView(center, zoom);
    }

    if (prevProps.scrollWheelZoom !== scrollWheelZoom) {
      if (scrollWheelZoom) {
        map.scrollWheelZoom.enable();
      } else {
        map.scrollWheelZoom.disable();
      }
    }
  };

  // Inputting arrays through storybook controls sometimes breaks the component
  // so we fix array value for `center` props
  let lat = 0;
  let long = 0;
  if (isArray(center)) {
    lat = isNaN(center[0]) ? 0 : center[0];
    long = isNaN(center[1]) ? 0 : center[1];
  }
  const position: LatLngExpression = [lat, long];

  // Adjusts the width & height values caused by the `text` storybook control
  const adjHeight = height && isPossiblyNumber(height) ? Number(height) : height;
  const adjWidth = width && isPossiblyNumber(width) ? Number(width) : width;

  return (
    <LeafletMap
      {...rest}
      center={position}
      height={adjHeight}
      width={adjWidth}
      onDidUpdate={onDidUpdate}
      onLoad={onLoad}
      scrollWheelZoom={scrollWheelZoom}
      zoom={zoom}
    />
  );
};

Basic.storyName = 'basic';
Basic.argTypes = {
  height: {
    name: 'height',
    defaultValue: 300,
    table: {
      type: { summary: 'string | number' },
      defaultValue: { summary: 300 },
    },
    control: { type: 'text' },
  },
  center: {
    name: 'center',
    defaultValue: [-6.173760985297043, 106.82664312422276],
    table: {
      type: { summary: 'array<number>' },
      defaultValue: { summary: [-6.173760985297043, 106.82664312422276] },
    },
    control: { type: 'array' },
  },
  scrollWheelZoom: {
    name: 'scrollWheelZoom',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
    control: { type: 'boolean' },
  },
  width: {
    name: 'width',
    defaultValue: 500,
    table: {
      type: { summary: 'string | number' },
      defaultValue: { summary: 500 },
    },
    control: { type: 'text' },
  },
  zoom: {
    name: 'zoom',
    defaultValue: 13,
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 13 },
    },
    control: { type: 'number' },
  },
};

export const MoveMarkerOnClick: ComponentWithStaticMethod<unknown> = () => {
  const center: LeafletMapProps['center'] = [-6.173760985297043, 106.82664312422276];
  const marker = React.useRef<Marker>();

  const onLoad = (evt: LeafletEvent) => {
    const { L } = window;
    marker.current = L.marker(center).addTo(evt.target);

    evt.target.on('click', (e: LeafletMouseEvent) => {
      marker.current && marker.current.setLatLng(e.latlng);
    });
  };

  return <LeafletMap center={center} onLoad={onLoad} />;
};

MoveMarkerOnClick.storyName = 'move marker on click';

// https://stackoverflow.com/questions/53168692/esri-leaflet-geosearch-how-to-integrate-it-with-react
// https://esri.github.io/esri-leaflet/examples/reverse-geocoding.html
export const ReverseGeocoding: ComponentWithStaticMethod<unknown> = () => {
  const center: LeafletMapProps['center'] = [-6.173760985297043, 106.82664312422276];
  const [value, setValue] = React.useState<{ lat?: number; lng?: number; address?: string }>({});
  const marker = React.useRef<Marker>();

  const runGeocodeService = (latlng: LatLng) => {
    const { L } = window;
    const geocodeService = L.esri.Geocoding.geocodeService();
    geocodeService
      .reverse()
      .latlng(latlng)
      .run((error, result) => {
        if (error) {
          return;
        }
        setValue({ ...latlng, address: result.address.Match_addr });
      });
  };

  const onLoad = (evt: LeafletEvent) => {
    const { L } = window;

    evt.target.on('click', (e: LeafletMouseEvent) => {
      if (!marker.current) {
        marker.current = L.marker(center, { draggable: true })
          .addTo(evt.target)
          .setLatLng(e.latlng)
          .on('dragend', event => {
            const currMarker = event.target;
            const position = currMarker.getLatLng();
            runGeocodeService(position);
          });
      } else {
        marker.current && marker.current.setLatLng(e.latlng);
      }

      runGeocodeService(e.latlng);
    });
  };

  return (
    <Fragment>
      <h6>Click on map to get address</h6>
      <LeafletMap
        onLoad={onLoad}
        center={center}
        css={css`
          margin-bottom: 16px;
        `}
      />
      <p>
        <b>Latitude:</b> {value.lat || '-'}
        <br />
        <b>Longitude:</b> {value.lng || '-'}
        <br />
        <b>Address:</b> {value.address || '-'}
      </p>
    </Fragment>
  );
};

ReverseGeocoding.storyName = 'reverse geocoding';
