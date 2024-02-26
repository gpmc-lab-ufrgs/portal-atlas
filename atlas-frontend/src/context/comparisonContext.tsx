import React, { useState, createContext, useContext } from 'react';

// Import type District from module called '@customTypes/district';
import { District } from '@customTypes/district';

// Define the type of the comparison context
export type ComparisonContext = {
  comparison: Array<District>; // An array of objetct of type District
  addComparisonDistrict: React.Dispatch<React.SetStateAction<any>>; // Function to add an specific district to the comparison
  removeComparisonDistrict: React.Dispatch<React.SetStateAction<any>>; // Function to remove an specific district from the comparison
  removeAllComparisons: () => void; // Function to remove all of the districts from the comparison
};

// Define de default value for the comparison context
const DEFAULT_VALUE: ComparisonContext = {
  comparison: [], // Empty array as default
  addComparisonDistrict: () => {}, // Empty function as default
  removeComparisonDistrict: () => {}, // Empty function as default
  removeAllComparisons: () => {}, // Empty function as default
};

// Create the context comparison
export const comparisonContext = createContext<ComparisonContext>(DEFAULT_VALUE);

// Provider component for the comparison context
export function ComparisonProvider({ children }: any) {
  // State to store the current comparison. It's an array of objects of type District. The initial value is an empty array. The function to update the state is setComparison
  const [comparison, setComparison] = useState<District[]>(DEFAULT_VALUE.comparison);

  // Function to add a district to the compartion. It recieves an array of districts and add all of them to the comparation
  const addComparisonDistrict = (addValue: District[]) => {
    setComparison([...comparison, ...addValue]);
  };

  // Function to remove a specific district from the comparison
  const removeComparisonDistrict = (removeValue: District) => {
    setComparison(
      comparison.filter(
        (district: District) =>
          //@ts-ignore
          district.properties['NM_MUN'] !== removeValue.properties['NM_MUN'], // Filtra os distritos com base no nome do município
      ),
    );
  };

  // Function to remove all of the districts from the comparison
  const removeAllComparisons = () => {
    setComparison([]);
  };

  // Return the provider comparation context with the values and funcions to add, remove and clear the comparison. Render do chiuldren components
  return (
    <comparisonContext.Provider
      value={{ comparison, addComparisonDistrict, removeComparisonDistrict, removeAllComparisons }}
    >
      {children}
    </comparisonContext.Provider>
  );
}

// Hook to use the comparison context in other components
export function useComparison() {
  const context = useContext(comparisonContext);
  const { comparison, addComparisonDistrict, removeComparisonDistrict, removeAllComparisons } = context;
  return { comparison, addComparisonDistrict, removeComparisonDistrict, removeAllComparisons };
}
