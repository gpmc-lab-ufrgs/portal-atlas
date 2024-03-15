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
  estadosData: Array<Estado>;
}
interface DictionaryData {
  title: string;
  content: Array<MapPropsContentType>;
  title_english: string; // Added property for English title
}

const TableContent: React.FC<Props<State> | Props<District>> = ({ comparison, estadosData }) => {
  const [dictionaryData, setDictionaryData] = useState<Array<DictionaryData>>([]);

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

  useEffect(() => {
    console.log('estadosData:', estadosData);
  }, [estadosData]);

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

  return (
    <>
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
                  {/* {estadosData.map(
                    (estado, index) => (
                      console.log('ESTADO ENVIADO:', estado), // Add a closing parenthesis ')' after the console.log statement
                      (
                        <Styles.Column gridColumnNumber={index + 2} key={index}>
                          <MetricDetails propsEstado={estado} />
                        </Styles.Column>
                      )
                    ),
                  )} */}
                  {estadosData.map((estado, index) => (
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
