import { configureStore } from '@reduxjs/toolkit';
import estadosReducer from '../features/estadosSlice';
import estadoReducer from '../features/estadoSlice';
import cidadeReducer from '../features/cidadeSlice';
import estadosComparacaoReducer from 'src/features/estadosComparacaoSlice';
import cidadesComparacaoReducer from 'src/features/cidadesComparacaoSlice';

export const store = configureStore({
  reducer: {
    estadosReducer,
    estadoReducer,
    cidadeReducer,
    estadosComparacaoReducer,
    cidadesComparacaoReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
