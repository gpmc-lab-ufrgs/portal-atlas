import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import districtProps from '@config/district';
import { State } from '@customTypes/state';
import { District } from '@customTypes/district';

import Header from './Header';
import TableContent from './TableContent';

import * as Styles from './styles';
import { Estado } from 'src/interfaces/Estado.type';

interface Props<T> {
  comparison: T[];
  estadosData: Estado[];
  // cidadesData: Cidades[];
}

const isState = window.location.href.includes('/comparison_states');

const TableMode: React.FC<Props<State> | Props<District>> = ({ comparison, estadosData }) => {
  useEffect(() => {
    console.log('estadosData:', estadosData);
  }, [estadosData]);

  return (
    <Styles.TablerContainer>
      <Header comparison={comparison} />
      {isState ? (
        <Box>
          <TableContent comparison={comparison} estadosData={estadosData} />
        </Box>
      ) : (
        <div></div>
      )}
    </Styles.TablerContainer>
  );
};

export default TableMode;
