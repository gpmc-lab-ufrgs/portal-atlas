import React, { useState, createContext, useContext } from 'react';

// Import type District from module called '@customTypes/district';
import { State } from '@customTypes/state';

// Define the type of the comparison context
export type ComparisonContext = {
  comparison: Array<State>;
  addComparisonState: React.Dispatch<React.SetStateAction<any>>;
  removeComparisonState: React.Dispatch<React.SetStateAction<any>>;
  removeAllComparisons: () => void; // Add the removeAllComparisons function declaration
};

// Define de default value for the comparison context
const DEFAULT_VALUE: ComparisonContext = {
  comparison: [], // An array of objetct of type State
  addComparisonState: () => {}, // Function to add an specific state to the comparison
  removeComparisonState: () => {}, // Function to remove an specific state from the comparison
  removeAllComparisons: () => {}, //Function to remove all of the states from the comparison
};

// Create the context comparison
export const comparisonContext = createContext<ComparisonContext>(DEFAULT_VALUE);

// Provider component for the comparison context
export function ComparisonProviderState({ children }: any) {
  // State to store the current comparison. It's an array of objects of type States. The initial value is an empty array. The function to update the state is setComparison
  const [comparison, setComparison] = useState<State[]>(DEFAULT_VALUE.comparison);
  console.log('ComparisonProviderState - Initial comparison:', comparison); // Added this line to log the initial comparison value

  // Function to add a State to the comparasion. It recieves an array of districts and add all of them to the comparation
  const addComparisonState = (addValue: State[]) => {
    const newComparison = [...comparison, ...addValue];
    console.log('addComparisonState - New comparison:', newComparison); // Added this line to log the new comparison value
    setComparison(newComparison);
  };

  // Function to remove a specific State from the comparison
  const removeComparisonState = (removeValue: State) => {
    const newComparison = comparison.filter(
      (state: State) =>
        //@ts-ignore
        state.properties['NM_UF'] !== removeValue.properties['NM_UF'],
    );
    console.log('removeComparisonState - New comparison:', newComparison); // Add this line to log the new comparison value
    setComparison(newComparison);
  };

  // Function to remove all of the States from the comparison
  const removeAllComparisons = () => {
    console.log('removeAllComparisons - Clearing comparison');
    setComparison([]);
  };

  // Return the provider comparation context with the values and funcions to add, remove and clear the comparison. Render do children components
  return (
    <comparisonContext.Provider value={{ comparison, addComparisonState, removeComparisonState, removeAllComparisons }}>
      {children}
    </comparisonContext.Provider>
  );
}

// Hook to use the comparison context in other components
export function useComparison() {
  const context = useContext(comparisonContext);
  const { comparison, addComparisonState, removeComparisonState, removeAllComparisons } = context;
  return { comparison, addComparisonState, removeComparisonState, removeAllComparisons };
}
