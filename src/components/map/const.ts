import { Icon } from 'leaflet';

const URL_MARKER_DEFAULT = '../../../../public/img/svg/pin-default.svg';
const URL_MARKER_ACTIVE = '../../../../public/img/svg/pin-active.svg';

const offerMapStyle = {
//  width: '1144px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

export { defaultCustomIcon, currentCustomIcon, offerMapStyle};
