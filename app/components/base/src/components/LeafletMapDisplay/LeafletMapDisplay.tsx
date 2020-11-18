/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Marker, LeafletEvent } from 'leaflet';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import LeafletMap from '../LeafletMap/LeafletMap';
import createStyles from './LeafletMapDisplay.styles';

export type LeafletMapProps = JSX.LibraryManagedAttributes<
  typeof LeafletMap,
  React.ComponentProps<typeof LeafletMap>
>;

export type LeafletMapDisplayProps = Omit<LeafletMapProps, 'onDidUpdate' | 'onLoad'>;

const LeafletMapDisplay: React.FC<LeafletMapDisplayProps> = props => {
  const {
    center = [-6.173760985297043, 106.82664312422276],
    className,
    height = '100%',
    width = '100%',
    zoom = 12,
    ...rest
  } = props;
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const marker = React.useRef<Marker>();

  const onLoad = (e: LeafletEvent) => {
    const { L } = window;
    marker.current = L.marker(center).addTo(e.target);
  };

  return (
    <div css={styles.container} className={className}>
      <LeafletMap
        {...rest}
        center={center}
        onLoad={onLoad}
        height={height}
        width={width}
        zoom={zoom}
      />
    </div>
  );
};

export default LeafletMapDisplay;
