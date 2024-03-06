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

  const compareEstados = () => {
    const allEstadosCodes = allEstados.map((estado) => estado.cdEstado.toString());
    const comparedEstados = comparison.filter((estado) => {
      // Verificar se CD_UF não é undefined antes de usar includes
      return estado.properties.CD_UF !== undefined && allEstadosCodes.includes(estado.properties.CD_UF.toString());
    });
    // console.log('All Estados:', allEstadosCodes);
    // console.log('Comparison:', comparison);
    console.log('Estados que serão comparados:', comparedEstados);
    return comparedEstados;
  };

  useEffect(() => {
    compareEstados();
  }, [comparison]);

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
                {/* {console.log(comparison.map((feature: any) => feature.properties))} */}
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
