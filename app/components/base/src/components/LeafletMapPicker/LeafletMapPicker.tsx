/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { Marker, LeafletMouseEvent, LatLngLiteral, LeafletEvent, LatLng } from 'leaflet';
import { useTheme } from 'emotion-theming';
import { Theme } from '../../theme';
import LeafletMap from '../LeafletMap/LeafletMap';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Button from '../Button/Button';
import createStyles from './LeafletMapPicker.styles';

type MapValues = { lat?: number; lng?: number; address?: string };

export type LeafletMapProps = JSX.LibraryManagedAttributes<
  typeof LeafletMap,
  React.ComponentProps<typeof LeafletMap>
>;

export type LeafletMapPickerProps = Omit<LeafletMapProps, 'height' | 'width'> & {
  className?: string;
  onChange?: (values: MapValues) => void;
};

const LeafletMapPickerProps: React.FC<LeafletMapPickerProps> = props => {
  const {
    center = [-6.173760985297043, 106.82664312422276],
    className,
    onChange,
    onLoad,
    ...rest
  } = props;

  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const [addressValue, setAddressValue] = React.useState<string>();
  const [modalMapValue, setModalMapValue] = React.useState<MapValues>({});
  const [openModal, setOpenModal] = React.useState(false);
  const [isModalExited, setModalExited] = React.useState(false);

  const marker = React.useRef<Marker>();

  const centerPos = (modalMapValue.lat && modalMapValue.lng
    ? [modalMapValue.lat, modalMapValue.lng]
    : center) as LatLngLiteral;

  const runGeocodeService = (latlng: LatLng) => {
    const { L } = window;
    const geocodeService = L.esri.Geocoding.geocodeService();
    geocodeService
      .reverse()
      .latlng(latlng)
      .run((error, result) => {
        let address;

        if (error && error.code === 400) {
          address = '-';
        } else if (result && result.address) {
          address = result.address.Match_addr;
        }

        setModalMapValue({ ...latlng, address });
        onChange && onChange({ ...latlng, address });
      });
  };

  const handleMapLoad = (evt: LeafletEvent) => {
    window.L.marker(center).addTo(evt.target);
  };

  const handleMapLoadModal = (evt: LeafletEvent) => {
    const { L } = window;
    marker.current = L.marker(centerPos, { draggable: true })
      .addTo(evt.target)
      .on('dragend', event => {
        const currMarker = event.target;
        const position = currMarker.getLatLng();
        runGeocodeService(position);
      });

    evt.target.on('click', (e: LeafletMouseEvent) => {
      if (marker.current) {
        marker.current.setLatLng(e.latlng);
        runGeocodeService(e.latlng);
      }
    });

    onLoad && onLoad(evt);
  };

  const onMaskClick = () => {
    setOpenModal(true);
  };

  const onModalExited = () => {
    setModalExited(true);
    if (modalMapValue.address) {
      setAddressValue(modalMapValue.address);
    }
  };

  const toggle = () => {
    setOpenModal(prevOpen => !prevOpen);
  };

  return (
    <Fragment>
      <div className={className} css={styles.container}>
        <div css={styles.containerInner}>
          <div css={styles.mask}>
            <div css={styles.maskBtn} onClick={onMaskClick}>
              <span>Pin alamat anda</span>
              <Icon name="map-marker-alt" size="sm" />
            </div>
          </div>

          <div css={styles.mapContainer}>
            <LeafletMap
              {...rest}
              center={center}
              onLoad={handleMapLoad}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        {isModalExited && addressValue && <div css={styles.address}>Alamat: {addressValue}</div>}
      </div>

      <Modal open={openModal} toggle={toggle} size="lg" onExited={onModalExited}>
        <ModalHeader onClose={toggle}>Pin alamat anda</ModalHeader>
        <ModalBody>
          <LeafletMap
            {...rest}
            center={centerPos}
            onLoad={handleMapLoadModal}
            width="100%"
            height={500}
          />
          <div css={styles.address}>Alamat: {modalMapValue.address || '-'}</div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Tutup</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default LeafletMapPickerProps;
