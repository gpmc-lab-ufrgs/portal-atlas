/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import type { CidadeComparacao } from 'src/interfaces/CidadeComparacao.type';

const initialState: CidadeComparacao[] = [];

export const cidadesComparacaoSlice = createSlice({
  name: 'cidadesComparacao',
  initialState,
  reducers: {
    changeCidadesComparacao: (state: CidadeComparacao[], action: PayloadAction<CidadeComparacao[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

export const { changeCidadesComparacao } = cidadesComparacaoSlice.actions;
export const cidadesComparacaoSelected = (state: RootState) => state.cidadesComparacaoReducer;
export default cidadesComparacaoSlice.reducer;
