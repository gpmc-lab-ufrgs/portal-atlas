/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import type { EstadoComparacao } from 'src/interfaces/EstadoComparacao.type';

const initialState: EstadoComparacao[] = [];

export const estadosComparacaoSlice = createSlice({
  name: 'estadosComparacao',
  initialState,
  reducers: {
    changeEstadosComparacao: (state: EstadoComparacao[], action: PayloadAction<EstadoComparacao[]>) => {
      state = [...action.payload];
      return state;
    },
  },
});

export const { changeEstadosComparacao } = estadosComparacaoSlice.actions;
export const estadosComparacaoSelected = (state: RootState) => state.estadosComparacaoReducer;
export default estadosComparacaoSlice.reducer;
