/* eslint-disable prettier/prettier */
import React from 'react';
import Collapsible from '@components/Collapsible';
import MetricDetails from '@components/MetricDetails';
import { useSelectedDistrict } from '@context/district/selectedContext';
import { useSelectedState } from '@context/state/selectedContext';
import { useComparison } from '@context/comparisonContext';
import { useComparison as useComparisonState } from '@context/comparisonContextState';
import { MapPropsContentType, MapPropsSectionType } from '@customTypes/map';
import { Tooltip } from '@mui/material';
import { CollapsibleContent } from './CollapsibleContent';
import * as Styles from './styles';
import { Estado } from 'src/interfaces/Estado.type';
import { Cidades } from 'src/interfaces/Cidades.type';

interface DataSectionProps {
  title: string;
  propsEstado?: Estado[];
  propsCidade?: Cidades[];
}

const DataSection = (props: DataSectionProps) => {
  const title = props.title;
  const lstDadosEstado = props.propsEstado;
  const lstDadosCidade = props.propsCidade;
  const isState = window.location.href.includes('/state');
  const isDistrict = window.location.href.includes('/district');

  return (
    <Collapsible 
      isTitle={true} 
      title={title}
    >
      {
        (isState && lstDadosEstado)?
        lstDadosEstado.map((estado: Estado, index: number) => (
          <CollapsibleContent key={`${index}`} propsEstado={estado} />
        ))
        :
        (
          !isState && isDistrict && lstDadosCidade?
          lstDadosCidade.map((cidade: Cidades, index: number) => (
            <CollapsibleContent key={`${index}`} propsCidade={cidade} />
          ))
          : <></>
        )
      }      
    </Collapsible>
  );
};

export default DataSection;
