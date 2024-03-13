import React from 'react';

import { Box } from '@mui/material';

import districtProps from '@config/district';
import { State } from '@customTypes/state';
import { District } from '@customTypes/district';

import Header from './Header';
import TableContent from './TableContent';

import * as Styles from './styles';

interface Props<T> {
  comparison: T[];
}

const isState = window.location.href.includes('/comparison_states');

const TableMode: React.FC<Props<State> | Props<District>> = ({ comparison }) => {
  return (
    <Styles.TablerContainer>
      <Header comparison={comparison} />
      <Box>
        {districtProps.map((section, id) => (
          <TableContent key={id} section={section} comparison={comparison} />
        ))}
      </Box>
    </Styles.TablerContainer>
  );
};

export default TableMode;
