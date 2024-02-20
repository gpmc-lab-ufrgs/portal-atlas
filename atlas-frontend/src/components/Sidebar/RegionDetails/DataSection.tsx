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

  // let comparison, selected;

  // if (isState) {
  //   const { comparison: mainComparison } = useComparisonState();
  //   const { selected: selectedMain } = useSelectedState();

  //   comparison = mainComparison;
  //   selected = selectedMain;
  // } else {
  //   const { comparison: mainComparison } = useComparison();
  //   const { selected: selectedMain } = useSelectedDistrict();

  //   comparison = mainComparison;
  //   selected = selectedMain;
  // }

  // let isSelectedOnComparison;

  // if (isState) {
  //   isSelectedOnComparison = comparison.some((region) => region.properties.CD_MUN === selected?.properties.CD_UF);
  // } else {
  //   isSelectedOnComparison = comparison.some((region) => region.properties.CD_MUN === selected?.properties.CD_MUN);
  // }

  //const hasSelectedDistrict = Boolean(selected);

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

/**
 * versao anterior
 * return (
    <Collapsible isTitle={true} title={title}>
      {content.map((props: MapPropsContentType, id) => (
        <Styles.PropsWrapper key={id}>
          {!props.nestedData ? (
            <CollapsibleContent props={props} />
          ) : (
            <>
              <Collapsible isTitle={false} title={props.title}>
                {comparison && (
                  <>
                    {props.nestedData?.map((data, index) => (
                      <div key={index}>
                        <CollapsibleContent props={props} />
                      </div>
                    ))}
                  </>
                )}

                {!isSelectedOnComparison && !comparison.length && hasSelectedDistrict && (
                  <>
                    {props.nestedData.map((data, index) => (
                      <div key={index}>
                        <Tooltip title={data.description} arrow>
                          <Styles.PropsTitle>{data.title}</Styles.PropsTitle>
                        </Tooltip>
                        <Styles.ValueContent>
                          {isState ? <p>{selected?.properties.NM_UF}</p> : <p>{selected?.properties.NM_MUN}</p>}
                          <MetricDetails region={selected} metric={data} />
                        </Styles.ValueContent>
                      </div>
                    ))}
                  </>
                )}
              </Collapsible>
            </>
          )}
        </Styles.PropsWrapper>
      ))}
    </Collapsible>
  );
 */
