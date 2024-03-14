/* eslint-disable prettier/prettier */
import Collapsible from '@components/Collapsible';
import { CollapsibleContent } from './CollapsibleContent';
import { Estado } from 'src/interfaces/Estado.type';
import { Cidades } from 'src/interfaces/Cidades.type';
import { useEffect } from 'react';

interface DataSectionProps {
  title: string;
  propsEstado?: Estado[];
  propsCidade?: Cidades[];
}

const DataSection = (props: DataSectionProps) => {

  useEffect(() => {
  }, [props]);
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
