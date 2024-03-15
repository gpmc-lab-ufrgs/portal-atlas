/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';

import { useComparison } from '@context/comparisonContext';
import { useComparison as useComparisonState } from '@context/comparisonContextState';

import GridMode from './GridMode';
import TableMode from './TableMode';

import * as Styles from './styles';
import { useSelector } from 'react-redux';
import { estadosSelected } from 'src/features/estadosSlice';
import { Estado } from 'src/interfaces/Estado.type';

import { Cidades } from 'src/interfaces/Cidades.type';
import { State } from '@customTypes/state';

interface Props {
  comparisonType: string;
}

const ComparisonMode: React.FC<Props> = ({ comparisonType }) => {
  const allEstados = useSelector(estadosSelected);
  const filtredData: Estado[] = [];

  const compareEstados = () => {
    isState
      ? comparison.forEach((estado: State) => {
          const data = allEstados.filter((estadoData) => estadoData.cdEstado == estado.properties.CD_UF);
          for (let i = 0; i < data.length; i++) {
            //console.log(`Data ${i}:`, data[i]);
            filtredData.push(data[i]);
          }
        })
      : comparison.forEach((estado: State) => {
          const data = allEstados.filter((estadoData) => estadoData.cdEstado == estado.properties.CD_UF);
          for (let i = 0; i < data.length; i++) {
            //console.log(`Data ${i}:`, data[i]); //IMPLEMENTAR PARA CIDADES
            filtredData.push(data[i]);
          }
        });
  };

  useEffect(() => {
    compareEstados();
  }, [filtredData]);

  let comparison: any;

  const isState =
    window.location.href.includes('/comparison_states') || window.location.href.includes('/comparison_states_en');

  if (isState) {
    ({ comparison } = useComparisonState());
  } else {
    ({ comparison } = useComparison());
  }

  function comparisonModeToggle() {
    switch (comparisonType) {
      case 'table':
        return <TableMode comparison={comparison} estadosData={filtredData} />;
      case 'grid':
        return <GridMode comparison={comparison} />;
      default:
        return <>Erro ao carregar dados</>;
    }
  }

  return <Styles.ComparisonWrapper>{comparisonModeToggle()}</Styles.ComparisonWrapper>;
};

export default ComparisonMode;
