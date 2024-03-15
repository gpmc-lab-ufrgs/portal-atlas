import React, { useState, useEffect } from 'react';
import Component from 'react-collapsible';
import { CollapsibleType, CollapsibleNames } from './type';
import './styles.css';
import * as Styles from './styles';

// Images
import demograficaImage from './assets/demografico.png';
import economiaImage from './assets/economia.png';
import educacaoImage from './assets/educacao.png';
import tiImage from './assets/ti.png';
import mobilidadeImage from './assets/mobilidade.png';
import meioambienteImage from './assets/meioambiente.png';
import saudeImage from './assets/saude.png';
import segurancaImage from './assets/seguranca.png';
import urbanismoImage from './assets/urbanismo.png';
import empreendedorismoImage from './assets/empreendedorismo.png';

// Const for the default value of the collapsible
const CollapsibleDefaultValue: Record<CollapsibleNames, boolean> = {
  'Locations to Compare': true,
  'Demographic Summary': true,
  'Economic Summary': false,
  'Growth Summary': false,
  'Residential Housing Summary': false,
  'Financial Transactions': false,
  'Business Counts': false,
  'Turnover vs. Cost of Sales': false,
  'Business Rental Costs': false,
};

interface Props {
  isTitle?: boolean;
  children: React.ReactNode;
  title: string;
}

// Auxiliar functions
const isOpen = (key: string, openedCollapsibles: string[]) => openedCollapsibles.includes(key);

const updateIsOpen = (
  key: string,
  value: boolean,
  collapsible: CollapsibleType,
  setOpenedCollapsibles: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const newValue = { ...collapsible, [key]: value };
  setOpenedCollapsibles((prevOpenedCollapsibles) =>
    value ? [...prevOpenedCollapsibles, key] : prevOpenedCollapsibles.filter((item) => item !== key),
  );
  return newValue;
};

const onOpen = (
  key: string,
  collapsible: CollapsibleType,
  openedCollapsibles: string[],
  setOpenedCollapsibles: React.Dispatch<React.SetStateAction<string[]>>,
) => updateIsOpen(key, true, collapsible, setOpenedCollapsibles);

const onClose = (
  key: string,
  collapsible: CollapsibleType,
  openedCollapsibles: string[],
  setOpenedCollapsibles: React.Dispatch<React.SetStateAction<string[]>>,
) => updateIsOpen(key, false, collapsible, setOpenedCollapsibles);

// Function to render the trigger based on the title
const renderTrigger = (title: string) => (
  <div className="flex flex-row items-center">
    {renderImage(title)}
    <span>{title}</span>
  </div>
);

// Function to render the image based on the title
const renderImage = (title: string) => {
  const images: Record<string, any> = {
    Demográfica: demograficaImage,
    Demographic: demograficaImage,
    Economia: economiaImage,
    Economy: economiaImage,
    Empreendedorismo: empreendedorismoImage,
    Entrepreneurship: empreendedorismoImage,
    Educação: educacaoImage,
    Education: educacaoImage,
    'Tecnologia e Inovação': tiImage,
    'Technology and Inovation': tiImage,
    Mobilidade: mobilidadeImage,
    Mobility: mobilidadeImage,
    'Meio Ambiente': meioambienteImage,
    Environment: meioambienteImage,
    Saúde: saudeImage,
    Health: saudeImage,
    Segurança: segurancaImage,
    Safety: segurancaImage,
    Urbanismo: urbanismoImage,
    Urbanism: urbanismoImage,
  };

  const image = images[title]; // Get the image based on the title

  return image && <img src={image} alt={`${title} image`} className="max-w-35 h-auto mr-5" />; // Render the image if it exists
};

// Collapsible component
const Collapsible = ({ children, title, isTitle = false }: Props) => {
  const initialOpenedCollapsibles = [
    'Demographic Summary',
    'Demographic Summary',
    'Locations to Compare',
    'Locations to Compare',
  ];
  const storedOpenedCollapsibles = localStorage.getItem('openedCollapsibles');
  const parsedOpenedCollapsibles = storedOpenedCollapsibles ? JSON.parse(storedOpenedCollapsibles) : null;
  const [openedCollapsibles, setOpenedCollapsibles] = useState<string[]>(
    parsedOpenedCollapsibles || initialOpenedCollapsibles,
  );
  const [collapsible, setCollapsible] = useState<CollapsibleType>({} as CollapsibleType);

  useEffect(() => {
    const initialCollapsibleState: CollapsibleType = {} as CollapsibleType;

    // Inicializa o estado collapsible com base nos valores padrão
    Object.keys(CollapsibleDefaultValue).forEach((key) => {
      initialCollapsibleState[key as CollapsibleNames] = isOpen(key, openedCollapsibles);
    });

    setCollapsible(initialCollapsibleState);
  }, [openedCollapsibles]);

  useEffect(() => {
    localStorage.setItem('openedCollapsibles', JSON.stringify(openedCollapsibles));
  }, [openedCollapsibles]);

  return (
    <Styles.CollapsibleContainer isTitle={isTitle} title={title}>
      <Component
        trigger={renderTrigger(title)}
        onOpening={() => onOpen(title, collapsible, openedCollapsibles, setOpenedCollapsibles)}
        onClosing={() => onClose(title, collapsible, openedCollapsibles, setOpenedCollapsibles)}
        lazyRender={true}
        open={collapsible[title as CollapsibleNames]} // Passando o estado do collapsible como `open`
        className={title}
      >
        {children}
      </Component>
    </Styles.CollapsibleContainer>
  );
};

export default Collapsible;
