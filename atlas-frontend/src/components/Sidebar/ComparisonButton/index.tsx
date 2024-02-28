/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { District } from '@customTypes/district';
import { State } from '@customTypes/state';

interface Props {
  state: State;
  district: District;
  onItemClicked: (item: State | District) => void;
}

function ComparisonButton({ state, district, onItemClicked }: Props) {
  const pathname = window.location.pathname; // Get the current path
  
  // Function to handle the click on the button
  const handleAddToComparison = (item) => { 
    if (pathname.includes('/state')) {
      if (state && state.properties) {
        console.log(`Add to comparison state: ${item.state.properties.NM_UF}`);
      } else {
        console.log('State object is undefined or does not have properties');
      }
    } else {
      if (district && district.geometry) {
        console.log(`Add to comparison district: ${item.district.properties.NM_MUN}`);
      } else {
        console.log('District object is undefined or does not have geometry');
      }
    }
  };

  return (
    <>
      <button onClick={handleAddToComparison}>Comparar</button>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state.estadosReducer);
  return {
    state: state.estadosReducer,
    district: state.cidadeReducer,
  };
};

export default connect(mapStateToProps)(ComparisonButton);

// import { Box } from '@mui/material';

// import { useComparison } from '@context/comparisonContext';
// import { useComparison as useComparisonState } from '@context/comparisonContextState';

// import { useSelectedDistrict } from '@context/district/selectedContext';
// import { useSelectedState } from '@context/state/selectedContext';

// import { District } from '@customTypes/district';

// import { ReactComponent as CompareIcon } from '../../../assets/utils/compare.svg';
// import * as Styles from './styles';
// import { useLocation } from 'react-router-dom';

// const ComparisonButton = () => {
//   const isState = window.location.href.includes('/state');
//   const isDistrict = window.location.href.includes('/district');

//   let comparison, selected, addComparisonDistrict, removeComparisonDistrict, addComparisonState, removeComparisonState;

//   if (isState) {
//     const {
//       comparison: mainComparison,
//       addComparisonState: mainComparison2,
//       removeComparisonState: mainComparison3,
//     } = useComparisonState();
//     const { selected: selectedMain } = useSelectedState();

//     comparison = mainComparison;
//     addComparisonState = mainComparison2;
//     removeComparisonState = mainComparison3;
//     selected = selectedMain;
//   } else {
//     const {
//       comparison: mainComparison,
//       addComparisonDistrict: mainComparison2,
//       removeComparisonDistrict: mainComparison3,
//     } = useComparison();
//     const { selected: selectedMain } = useSelectedDistrict();

//     comparison = mainComparison;
//     addComparisonDistrict = mainComparison2;
//     removeComparisonDistrict = mainComparison3;
//     selected = selectedMain;
//   }

//   const isButtonOn = comparison.length >= 4;

//   let isSelectedOnComparison;

//   if (isState) {
//     isSelectedOnComparison = comparison.some((region) => region.properties.CD_UF === selected?.properties.CD_UF);
//   } else {
//     isSelectedOnComparison = comparison.some((region) => region.properties.CD_MUN === selected?.properties.CD_MUN);
//   }

//   const comparisonClick = (feature: District | null) => {
//     if (isState) {
//       if (isSelectedOnComparison) {
//         removeComparisonState(feature);
//       } else {
//         addComparisonState([feature]);
//       }
//     } else {
//       if (isSelectedOnComparison) {
//         removeComparisonDistrict(feature);
//       } else {
//         addComparisonDistrict([feature]);
//       }
//     }
//   };

//   const location = useLocation();
//   const { pathname } = location;
//   const isEnglish = pathname.includes('/en');

//   return (
//     <Styles.ComparisonButton>
//       <Styles.ButtonWrapper disabled={!isSelectedOnComparison && isButtonOn} onClick={() => comparisonClick(selected)}>
//         <Box mr="12px">
//           <CompareIcon />
//         </Box>
//         {isSelectedOnComparison
//           ? isEnglish
//             ? 'Remove from comparison'
//             : 'Remover da comparação'
//           : isEnglish
//           ? 'Add to comparison'
//           : 'Adicionar a comparação'}
//       </Styles.ButtonWrapper>
//     </Styles.ComparisonButton>
//   );
// };

// export default ComparisonButton;
