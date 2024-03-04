import mapboxgl from 'mapbox-gl';
import { State } from '@customTypes/state';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { formatPopulationNumber } from '@utils/formatValue';
import { fitStateBounds, handleCleanStateLayer, onAddStateToComparison } from '../hook/useStateLayer/stateActions';
import * as Styles from './styles';

interface Props {
  regionName: string;
  reference: mapboxgl.Map;
  feature: State;
}

const ClickablePopupContent = ({ regionName, reference, feature }: Props) => {
  const isEnglish = window.location.href.includes('/en');

  const handleClick = () => {
    handleCleanStateLayer(reference);
    fitStateBounds(feature, reference);
  };

  return (
    <Styles.Popup>
      <Styles.ClickableSection onClick={handleClick}>
        <Styles.PopupText>{regionName}</Styles.PopupText>
        <Styles.IconWrapper className="iconAction">
          <ChevronRightIcon fontSize="small" />
        </Styles.IconWrapper>
      </Styles.ClickableSection>
      <Styles.PopupContent>
        <Styles.PopupText>
          {isEnglish ? 'Population' : 'População'}: {formatPopulationNumber(feature.properties?.POPULATION)}
        </Styles.PopupText>
      </Styles.PopupContent>
    </Styles.Popup>
  );
};

export default ClickablePopupContent;
