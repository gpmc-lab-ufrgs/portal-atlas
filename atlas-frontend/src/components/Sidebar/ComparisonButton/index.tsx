import { Box } from '@mui/material';

import { useComparison } from '@context/comparisonContext';
import { useComparison as useComparisonState } from '@context/comparisonContextState';

import { useSelectedDistrict } from '@context/district/selectedContext';
import { useSelectedState } from '@context/state/selectedContext';

import { District } from '@customTypes/district';

import { ReactComponent as CompareIcon } from '../../../assets/utils/compare.svg';
import * as Styles from './styles';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { estadosSelected } from 'src/features/estadosSlice';

const ComparisonButton = () => {
  const allEstados = useSelector(estadosSelected);
  const isState = window.location.href.includes('/state');

  let comparison,
    selected,
    addComparisonDistrict: (arg0: (District | null)[]) => void,
    removeComparisonDistrict: (arg0: District | null) => void,
    addComparisonState: (arg0: (District | null)[]) => void,
    removeComparisonState: (arg0: District | null) => void;

  if (isState) {
    const {
      comparison: mainComparison,
      addComparisonState: mainComparison2,
      removeComparisonState: mainComparison3,
    } = useComparisonState();
    const { selected: selectedMain } = useSelectedState();

    comparison = mainComparison;
    addComparisonState = mainComparison2;
    removeComparisonState = mainComparison3;
    selected = selectedMain;
  } else {
    const {
      comparison: mainComparison,
      addComparisonDistrict: mainComparison2,
      removeComparisonDistrict: mainComparison3,
    } = useComparison();
    const { selected: selectedMain } = useSelectedDistrict();

    comparison = mainComparison;
    addComparisonDistrict = mainComparison2;
    removeComparisonDistrict = mainComparison3;
    selected = selectedMain;
  }

  const isButtonOn = comparison.length >= 4;

  let isSelectedOnComparison;

  if (isState) {
    isSelectedOnComparison = comparison.some((region) => region.properties.SIGLA_UF === selected?.properties.SIGLA_UF);
  } else {
    isSelectedOnComparison = comparison.some((region) => region.properties.CD_MUN === selected?.properties.CD_MUN);
  }
  // //TESTE DE COMPARAÇÃO - PRECISA DE AJUSTES
  // const filtredData: object[] = [];
  // const compareEstados = () => {
  //   comparison.forEach((estado) => {
  //     const data = allEstados.filter((estadoData) => estadoData.cdEstado == estado.properties.CD_UF);
  //     for (let i = 0; i < data.length; i++) {
  //       //console.log(`Data ${i}:`, data[i]);
  //       filtredData.push(data[i]);
  //     }
  //     console.log('Filtred Data:', filtredData);
  //   });
  // };

  const comparisonClick = (feature: District | null) => {
    if (isState) {
      if (isSelectedOnComparison) {
        removeComparisonState(feature);
      } else {
        addComparisonState([feature]);
      }
    } else {
      if (isSelectedOnComparison) {
        removeComparisonDistrict(feature);
      } else {
        addComparisonDistrict([feature]);
      }
    }
  };

  const location = useLocation();
  const { pathname } = location;
  const isEnglish = pathname.includes('/en');

  return (
    <Styles.ComparisonButton>
      <Styles.ButtonWrapper disabled={!isSelectedOnComparison && isButtonOn} onClick={() => comparisonClick(selected)}>
        <Box mr="12px">
          <CompareIcon />
        </Box>
        {isSelectedOnComparison
          ? isEnglish
            ? 'Remove from comparison'
            : 'Remover da comparação'
          : isEnglish
          ? 'Add to comparison'
          : 'Adicionar a comparação'}
      </Styles.ButtonWrapper>
    </Styles.ComparisonButton>
  );
};

export default ComparisonButton;
