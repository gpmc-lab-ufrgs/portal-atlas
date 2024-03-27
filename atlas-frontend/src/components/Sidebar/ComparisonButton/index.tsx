/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useComparison } from '@context/comparisonContext';
import { useComparison as useComparisonState } from '@context/comparisonContextState';

import { useSelectedDistrict } from '@context/district/selectedContext';
import { useSelectedState } from '@context/state/selectedContext';

import { District } from '@customTypes/district';

import { ReactComponent as CompareIcon } from '../../../assets/utils/compare.svg';
import * as Styles from './styles';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Estado } from 'src/interfaces/Estado.type';
import { Cidades } from 'src/interfaces/Cidades.type';
import { EstadoComparacao } from 'src/interfaces/EstadoComparacao.type';
import { CidadeComparacao } from 'src/interfaces/CidadeComparacao.type';
import { estadoSelected } from 'src/features/estadoSlice';
import { cidadeSelected } from 'src/features/cidadeSlice';
import { estadosComparacaoSelected, changeEstadosComparacao } from 'src/features/estadosComparacaoSlice';
import { cidadesComparacaoSelected, changeCidadesComparacao } from 'src/features/cidadesComparacaoSlice';
import { ReturnEstadoPorId, groupBy } from 'src/helpers/Helpers';
import { useAppDispatch, useAppSelector } from '@hook/hooks';

const ComparisonButton = () => {
  //const allEstados = useSelector(estadosSelected);
  const [lstEstadosModoComparacao, setLstEstadosModoComparacao] = useState<EstadoComparacao[]>();
  const [lstCidadesModoComparacao, setLstCidadesModoComparacao] = useState<CidadeComparacao[]>();
  const isState = window.location.href.includes('/state');

  let comparison,
    selected: any,
    addComparisonDistrict: (arg0: (District | null)[]) => void,
    removeComparisonDistrict: (arg0: District | null) => void,
    addComparisonState: (arg0: (District | null)[]) => void,
    removeComparisonState: (arg0: District | null) => void;

  const addEstadoComparacao = () => {
    const selectedEstado = useAppSelector(estadoSelected);
    const estComp: EstadoComparacao = {
      cdEstado: selectedEstado[0].cdEstado,
      dadosEstado: selectedEstado
    };
    lstEstadosModoComparacao?.push(estComp);
  };

  const removerEstadoComparacao = () => {
    const selectedEstado = useAppSelector(estadoSelected);
    lstEstadosModoComparacao?.filter(a =>
      a.cdEstado !== selectedEstado[0].cdEstado
    );
  };

  const addCidadeComparacao = () => {
    const selectedCidade = useAppSelector(cidadeSelected);
    const cidComp: CidadeComparacao = {
      cdCidade: selectedCidade[0].cdCidade,
      dadosCidade: selectedCidade
    };
    lstCidadesModoComparacao?.push(cidComp);;
  };

  const removerCidadeComparacao = () => {
    const selectedCidade = useAppSelector(cidadeSelected);
    lstCidadesModoComparacao?.filter(a =>
      a.cdCidade !== selectedCidade[0].cdCidade
    );
  };

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

  let isSelectedOnComparison: boolean = false;

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
