import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import Collapsible from '@components/Collapsible';
import MetricDetails from '@components/MetricDetails';
import { MapPropsContentType, MapPropsSectionType } from '@customTypes/map';
import { District } from '@customTypes/district';
import { State } from '@customTypes/state';
import * as Styles from './styles';
import { useSelector } from 'react-redux';
import { estadosSelected } from 'src/features/estadosSlice';
import { Estado } from 'src/interfaces/Estado.type';

interface Props<T> {
  comparison: T[];
}
interface DictionaryData {
  title: string;
  content: Array<MapPropsContentType>;
  title_english: string; // Added property for English title
}

const TableContent: React.FC<Props<State> | Props<District>> = ({ comparison }) => {
  const allEstados = useSelector(estadosSelected);
  const filtredData: Estado[] = [];
  const [dictionaryData, setDictionaryData] = useState<Array<DictionaryData>>([]);

  const compareEstados = () => {
    comparison.forEach((estado: State) => {
      const data = allEstados.filter((estadoData) => estadoData.cdEstado == estado.properties.CD_UF);
      for (let i = 0; i < data.length; i++) {
        //console.log(`Data ${i}:`, data[i]);
        filtredData.push(data[i]);
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      let apiUrl = 'http://3.92.188.34:8001/dictionary/dictionary/json/';

      if (window.location.pathname.includes('/comparison_states')) {
        apiUrl = 'http://3.92.188.34:8001/dictionary/dictionary_state/json/';
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setDictionaryData(data);
    }
    fetchData();
  }, []);

  const estadosData: { [key: number]: { estado: number; dados: Estado[] } } = {};

  useEffect(() => {
    compareEstados();
    filtredData.forEach((dado) => {
      const estado = dado.cdEstado;
      if (!estadosData[estado]) {
        estadosData[estado] = {
          estado: estado,
          dados: [dado], // Inicia um array com o primeiro dado do estado
        };
      } else {
        estadosData[estado].dados.push(dado); // Adiciona o dado ao array existente para o estado
      }
    });
    //console.log('Estados Data:', estadosData);
    dictionaryData.map((estado) => {
      console.log(`${estado.title}`, estado);
    });
  }, [filtredData]);

  useEffect(() => {
    filtredData.map((objeto) => {
      console.log('filtredData', objeto);
    });
  }, [filtredData]);

  const isEnglish =
    window.location.href.includes('/comparison_en') || window.location.href.includes('/comparison_states_en');

  // Define the order of sections
  const sectionOrder = isEnglish
    ? [
        'Demographic',
        'Economy',
        'Entrepreneurship',
        'Education',
        'Health',
        'Safety',
        'Urbanism',
        'Technology and inovation',
        'Environment',
        'Mobility',
      ]
    : [
        'Demográfica',
        'Economia',
        'Empreendedorismo',
        'Educação',
        'Saúde',
        'Segurança',
        'Urbanismo',
        'Tecnologia e Inovação',
        'Meio Ambiente',
        'Mobilidade',
      ];

  // Sort the sections based on the predefined order
  const sortedSections = dictionaryData.sort((a, b) => {
    return sectionOrder.indexOf(a.title) - sectionOrder.indexOf(b.title);
  });
  //Depuração
  // useEffect(() => {
  //   console.log('sortedSections', sortedSections);
  // }, [sortedSections]);

  return (
    <>
      {/* {sortedSections.map((section: DictionaryData) => (
        <Collapsible
          isTitle={true}
          title={isEnglish ? section.title_english : section.title}
          key={isEnglish ? section.title_english : section.title}
        >
          {section.content.map((content: MapPropsContentType, id) => (
            <div key={id}>
              {!content.nestedData &&
              content.title !== 'População Estimada em 2017' &&
              content.title !== 'População Estimada em 2018' &&
              content.title !== 'População Estimada em 2019' &&
              content.title !== 'População Estimada em 2020' &&
              content.title !== 'Estimated Population in 2017' &&
              content.title !== 'Estimated Population in 2018' &&
              content.title !== 'Estimated Population in 2019' &&
              content.title !== 'Estimated Population in 2020' &&
              content.title !== 'População' &&
              content.title !== 'Population' ? (
                <Styles.Table lineTableNumber={id}>
                  <Tooltip
                    title={
                      <div>
                        <div>{isEnglish ? content.description : content.description}</div>
                      </div>
                    }
                  >
                    <Styles.ColumnTitle>{isEnglish ? content.title : content.title}</Styles.ColumnTitle>
                  </Tooltip>
                  {filtredData.map((objeto, index) => (
                    <Styles.Column gridColumnNumber={index + 2} key={index}>
                      <MetricDetails propsEstado={objeto} />
                    </Styles.Column>
                  ))}
                </Styles.Table>
              ) : (
                <div key={id}></div>
              )}
            </div>
          ))}
        </Collapsible>
      ))} */}
      {sortedSections.map((section: DictionaryData) => (
        <Collapsible
          isTitle={true}
          title={isEnglish ? section.title_english : section.title}
          key={isEnglish ? section.title_english : section.title}
        >
          {section.content.map((content: MapPropsContentType, id) => (
            <div key={id}>
              {!content.nestedData &&
              content.title !== 'População Estimada em 2017' &&
              content.title !== 'População Estimada em 2018' &&
              content.title !== 'População Estimada em 2019' &&
              content.title !== 'População Estimada em 2020' &&
              content.title !== 'Estimated Population in 2017' &&
              content.title !== 'Estimated Population in 2018' &&
              content.title !== 'Estimated Population in 2019' &&
              content.title !== 'Estimated Population in 2020' &&
              content.title !== 'População' &&
              content.title !== 'Population' ? (
                <Styles.Table lineTableNumber={id}>
                  <Tooltip
                    title={
                      <div>
                        <div>{isEnglish ? content.description : content.description}</div>
                      </div>
                    }
                  >
                    <Styles.ColumnTitle>{isEnglish ? content.title : content.title}</Styles.ColumnTitle>
                  </Tooltip>
                  {filtredData.map((estado, index) => (
                    <Styles.Column gridColumnNumber={index + 2} key={index}>
                      <MetricDetails propsEstado={estado} />
                    </Styles.Column>
                  ))}
                </Styles.Table>
              ) : (
                <div key={id}></div>
              )}
            </div>
          ))}
        </Collapsible>
      ))}
    </>
  );
};

export default TableContent;
