/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import geojsonURL from '@data/BR_UF_2020_009.json';
import { useSelectedState } from '@context/state/selectedContext';
import { useHighlightedState } from '@context/state/highlightedContext';
import { useSelectedDistrict } from '@context/district/selectedContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  highlightState,
  clickState,
  isStateLayerVisible,
  isStateLayerVisible2,
  cleanStateActions,
  fitStateCenter,
  addPopup,
} from './stateActions';
import { stateColors } from './const';
import { fitCenter } from '../../utils/actions';
import { lineOpacity, lineWidth, fillOpacity } from '../../utils/const';
import { isDistrictLayerVisible } from '../useDistrictLayer/districtActions';
import { useSidebar } from '@context/sidebarContext';
import { Estado } from 'src/interfaces/Estado.type';
import { useAppDispatch, useAppSelector } from '@hook/hooks';
import { estadosSelected, changeEstados } from 'src/features/estadosSlice';
import { estadoSelected, changeEstado } from 'src/features/estadoSlice';
import { ReturnEstadoPorId, groupBy } from 'src/helpers/Helpers';

const useStateLayer = () => {
  const isEnglish = window.location.href.includes('/en');

  const [stateReference, setStateReference] = useState<mapboxgl.Map>();
  const [latLng, setLatLng] = useState<mapboxgl.LngLat>();

  const { setHighlighted: setHighlightedState, highlighted: highlightedState } = useHighlightedState();
  const { setSelected: setSelectedState, selected: selectedState } = useSelectedState();
  const { selected: selectedDistrict } = useSelectedDistrict();

  const { setIsSidebarOpen } = useSidebar();

  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const dispatch = useAppDispatch();
  const selectedEstados = useAppSelector(estadosSelected);
  const [lstEstados, setLstEstados] = useState<Estado[]>([]);
  const [cdEstado, setCdEstado] = useState<number>();

  useEffect(() => {
    setLstEstados([...selectedEstados]);
  }, [selectedEstados]);

  useEffect(() => {
    if(lstEstados && cdEstado){
      const estadoSel: Estado[] = ReturnEstadoPorId(cdEstado, lstEstados);
      dispatch(changeEstado(estadoSel)); 
    }
  }, [lstEstados, cdEstado]);

  function initLayers(reference: mapboxgl.Map) {
    reference.on('load', () => {
      reference.addSource('state', {
        type: 'geojson',
        //@ts-ignore
        data: geojsonURL,
        promoteId: 'CD_UF',
      });

      reference.addLayer({
        id: 'fill-state',
        type: 'fill',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'fill-color': {
            property: 'POPULATION',
            stops: stateColors,
          },
          //@ts-ignore
          'fill-opacity': fillOpacity,
        },
      });

      reference.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'state',
        layout: {
          visibility: 'visible',
        },
        paint: {
          'line-color': '#ffffff',
          //@ts-ignore
          'line-width': lineWidth,
          //@ts-ignore
          'line-opacity': lineOpacity,
        },
      });
    });
  }

  function initActions(reference: mapboxgl.Map) {
    reference.on('click', 'fill-state', (e: any) => {
      if (e.features.length > 0) {
        console.log(e.features[0].id);
        const id: number = e.features[0].id;
        setCdEstado(id);
        setSelectedState(e.features[0]);
        setLatLng(e.lngLat);
      }
      if (window.location.href.includes('/en')) {
        navigate('/en/state');
      } else {
        navigate('/state');
      }
    });

    reference.on('mousemove', 'fill-state', (e: any) => {
      if (e.features.length > 0) {
        setHighlightedState(e.features[0]);
        setLatLng(e.lngLat);
      }
    });

    reference.on('mouseleave', 'fill-state', () => {
      setHighlightedState(null);
    });
  }

  useEffect(() => {
    if (stateReference) {
      initLayers(stateReference);
      initActions(stateReference);
    }
  }, [stateReference]);

  useEffect(() => {
    if (stateReference) {
      highlightState(highlightedState, stateReference);
      if (latLng) addPopup(highlightedState, stateReference, latLng, 'Hover');
    }
  }, [highlightedState]);

  useEffect(() => {
    if (stateReference && !selectedDistrict) {
      clickState(selectedState, stateReference);

      if (selectedState) {
        setIsSidebarOpen(true);
        fitStateCenter(selectedState, stateReference);
        if (latLng) addPopup(selectedState, stateReference, latLng, 'Click');
      } else {
        fitCenter(stateReference);

        isDistrictLayerVisible(stateReference, false);
        isStateLayerVisible(stateReference, true);
        isStateLayerVisible2(stateReference, true);

        cleanStateActions();
      }
    }
  }, [selectedState, stateReference]);

  return {
    initLayers,
    initActions,
    setStateReference,
    stateReference,
  };
};

export default useStateLayer;
