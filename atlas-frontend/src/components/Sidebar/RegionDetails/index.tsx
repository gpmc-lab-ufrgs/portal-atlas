import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@hook/hooks';
import { estadoSelected } from 'src/features/estadoSlice';
import { cidadeSelected } from 'src/features/cidadeSlice';
import ComparisonSection from './ComparisonSection';
import DataSection from './DataSection';
import { useLocation } from 'react-router-dom';
import { Estado } from 'src/interfaces/Estado.type';
import { Cidades } from 'src/interfaces/Cidades.type';

const RegionDetails = () => {
  const isStateSelected = window.location.href.includes('/state');
  const isDistrictSelected = window.location.href.includes('/district');

  const selectedEstado = useAppSelector(estadoSelected);
  const selectedCidade = useAppSelector(cidadeSelected);

  const [lstDados, setLstDados] = useState<Estado[] | Cidades[]>([]);
  const [lstDistinct, setLstDistinct] = useState<string[]>([]);

  const location = useLocation();
  const { pathname } = location;

  const isEnglish = pathname.includes('/en');

  useEffect(() => {
    const selectedData = isStateSelected ? selectedEstado : isDistrictSelected ? selectedCidade : [];
    setLstDados(selectedData);

    const distinctNames = selectedData.map((item) => (isEnglish ? item.nmClassificacaoEn : item.nmClassificacaoPt));
    const uniqueNames = [...new Set(distinctNames)];
    setLstDistinct(uniqueNames);
  }, [selectedEstado, selectedCidade, isStateSelected, isDistrictSelected]);

  return (
    <Box>
      {isStateSelected &&
        lstDistinct.map((item) => {
          const filteredData = lstDados.filter((i) =>
            isEnglish ? i.nmClassificacaoEn === item : i.nmClassificacaoPt === item,
          ) as Estado[];
          return (
            <DataSection key={item} title={item} propsEstado={filteredData.length > 0 ? filteredData : undefined} />
          );
        })}
      {isDistrictSelected &&
        lstDistinct.map((item) => {
          const filteredData = lstDados.filter((i) =>
            isEnglish ? i.nmClassificacaoEn === item : i.nmClassificacaoPt === item,
          ) as Cidades[];
          return (
            <DataSection key={item} title={item} propsCidade={filteredData.length > 0 ? filteredData : undefined} />
          );
        })}
      {selectedEstado ? <ComparisonSection /> : null}
    </Box>
  );
};

export default RegionDetails;
