/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

import MetricDetails from '@components/MetricDetails';

import { Tooltip } from '@mui/material';

import * as Styles from './styles';
import { Estado } from 'src/interfaces/Estado.type';
import { Cidades } from 'src/interfaces/Cidades.type';

interface CollapsibleContentProps {
  propsEstado?: Estado;
  propsCidade?: Cidades;
}

export const CollapsibleContent = (props: CollapsibleContentProps) => {
  const dadosEstado = props.propsEstado;
  const dadosCidade = props.propsCidade;
  const isState = window.location.href.includes('/state');
  const isDistrict = window.location.href.includes('/district');
  const [nmTitulo, setNmTitulo] = useState<string>('');
  const [nmDescricao, setNmDescricao] = useState<string>('');
  const [nmLabel, setNmLabel] = useState<string>('');

  const { pathname } = location;
  const isEnglish = pathname.includes('/en');

  useEffect(() => {
    if(isState){
      if(dadosEstado){
        setNmTitulo(dadosEstado.nmEstado);
        setNmDescricao(isEnglish? dadosEstado.nmDescricaoEn : dadosEstado.nmDescricaoPt);
        setNmLabel(isEnglish ? dadosEstado.nmLabelEn : dadosEstado.nmLabelPt);
      }    
    } else /*if (!isState && isDistrict)*/{
      if(dadosCidade){
        setNmTitulo(dadosCidade.nmCidade);
        setNmDescricao(isEnglish? dadosCidade.nmDescricaoEn : dadosCidade.nmDescricaoPt);
        setNmLabel(isEnglish ? dadosCidade.nmLabelEn : dadosCidade.nmLabelPt);
      }    
    }
  }, [isState, isDistrict]);
  return (
    <>
      <Tooltip title={`${nmDescricao}`} arrow>
        <Styles.PropsTitle>{`${nmLabel}`}</Styles.PropsTitle>
      </Tooltip>
      <Styles.ValueContent>
        <p>{nmTitulo}</p>
        <MetricDetails propsEstado={dadosEstado} propsCidade={dadosCidade} />
      </Styles.ValueContent>
      
      {/* {comparison.map((region) => (
        <Styles.ValueContent key={isState ? region.properties.CD_UF : region.properties.CD_MUN}>
          <p>{isState ? region.properties.NM_UF : region.properties.NM_MUN}</p>
          <MetricDetails region={region} metric={props} />
        </Styles.ValueContent>
      ))} */}

      {/* {(hasSelectedState || hasSelectedDistrict) && (
        <Styles.ValueContent>
          <p>{nmTitulo}</p>
          <MetricDetails propsEstado={dadosEstado} propsCidade={dadosCidade} />
        </Styles.ValueContent>
      )} */}
    </>
  );
};
