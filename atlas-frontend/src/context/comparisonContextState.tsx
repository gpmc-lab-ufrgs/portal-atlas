import React, { useState, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { State as Estado } from '@customTypes/state';
import { estadoSelected } from 'src/features/estadoSlice';

export type ComparisonContext = {
  comparison: Array<Estado>;
  addComparisonState: (addValue: Estado[]) => void;
  removeComparisonState: (removeValue: Estado) => void;
  removeAllComparisons: () => void;
};

const DEFAULT_VALUE: ComparisonContext = {
  comparison: [],
  addComparisonState: () => {},
  removeComparisonState: () => {},
  removeAllComparisons: () => {},
};

export const comparisonContext = createContext<ComparisonContext>(DEFAULT_VALUE);

export function ComparisonProviderState({ children }: any) {
  const comparisonFromRedux = useSelector(estadoSelected);

  const [comparison, setComparison] = useState<Estado[]>(comparisonFromRedux);

  const addComparisonState = (addValue: Estado[]) => {
    const newComparison = [...comparison, ...addValue];
    setComparison(newComparison);
  };

  const removeComparisonState = (removeValue: Estado) => {
    const newComparison = comparison.filter(state => state.id !== removeValue.id);
    setComparison(newComparison);
  };

  const removeAllComparisons = () => {
    setComparison([]);
  };

  return (
    <comparisonContext.Provider value={{ comparison, addComparisonState, removeComparisonState, removeAllComparisons }}>
      {children}
    </comparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(comparisonContext);
  const { comparison, addComparisonState, removeComparisonState, removeAllComparisons } = context;
  return { comparison, addComparisonState, removeComparisonState, removeAllComparisons };
}
