/* eslint-disable @typescript-eslint/no-shadow */
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';
import Collapsible from '@components/Collapsible';
import { useComparison } from '@context/comparisonContextState';
import { useComparison as useComparisonState } from '@context/comparisonContextState';
import useMap from '@hook/useMap';
import * as Styles from './styles';
import './styles.css';
import { useSelector } from 'react-redux';
import { estadosSelected } from 'src/features/estadosSlice';
import { useEffect } from 'react';
import { Estado } from 'src/interfaces/Estado.type';
import { State } from '@customTypes/state';

const ComparisonDetails = () => {
  const allEstados = useSelector(estadosSelected);
  const isEnglish =
    window.location.href.includes('/comparison_en') || window.location.href.includes('/comparison_states_en');
  const isState = window.location.href.includes('/comparison_states');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const comparisonContext = isState ? useComparisonState() : useComparison();
  const { comparison, removeComparisonDistrict, removeComparisonState, removeAllComparisons } = comparisonContext;

  const { resetMapValues } = useMap();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (isEnglish) {
      navigate('/en');
    } else {
      navigate('');
    }
    resetMapValues();
    removeAllComparisons();
  };

  const filtredData: object[] = [];
  const compareEstados = () => {
    comparison.forEach((estado) => {
      const data = allEstados.filter((estadoData) => estadoData.cdEstado == estado.properties.CD_UF);
      for (let i = 0; i < data.length; i++) {
        //console.log(`Data ${i}:`, data[i]);
        filtredData.push(data[i]);
      }
    });
    console.log('Filtred Data:', filtredData);
  };

  if (isState) {
    compareEstados();
  }

  const Title = () => (
    <Styles.TitleWrapper>
      <Styles.ArrowBackButton style={{ color: 'white' }} onClick={handleGoBack} />
      <Styles.Title style={{ color: 'white' }}>{isEnglish ? 'Comparing Regions' : 'Comparando Regiões'}</Styles.Title>
    </Styles.TitleWrapper>
  );

  return (
    <Box>
      <Title />
      {comparison.length > 0 && (
        <Collapsible title={isEnglish ? 'Comparison' : 'Comparação'}>
          <>
            {comparison.map((feature: any, id) => (
              <Styles.ComparisonList key={id}>
                {isState ? feature.properties.NM_UF : feature.properties.NM_MUN}
                {isState ? (
                  <Styles.CloseButton onClick={() => removeComparisonState(feature)} />
                ) : (
                  <Styles.CloseButton onClick={() => removeComparisonDistrict(feature)} />
                )}
              </Styles.ComparisonList>
            ))}
          </>
        </Collapsible>
      )}
    </Box>
  );
};

export default ComparisonDetails;
