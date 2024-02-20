'use client'
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { useRouter, usePathname } from 'next/navigation';
import { Button, Card, Row, Col, Space } from 'antd';
import Icon, { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { 
  DivTelaInicial,
  DivTelaInicialCenter,
  DivMap,
  StyledRow,
  StyledCol,
  StyledComposableMap,
  DivTelaSplit,
  StyledDivTwoColors,
  StyledDivPublicacoes,
  StyledDivImg
} from '@/app/antd_styled';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MenuSelected, changePage, menuSelector } from '@/app/features/menuSlice';
import { LocaleLang, langSelector } from "@/app/features/localeSlice";

import bg from '@/public/ico/IMAGEM-BANNER-INICIAL.png';
import logoFinalPt from '@/public/ico/pt/LOGO_logo_final.png';
import ColaboradoresPt from "@/public/ico/pt/COLABORADORES.png";
import VideoPt from "@/public/ico/pt/VIDEO.png";
import ApoioPt from "@/public/ico/pt/apoio.png";
import logoFinalEn from '@/public/ico/en/LOGO_logo_final.png';
import ColaboradoresEn from "@/public/ico/en/COLABORADORES.png";
import VideoEn from "@/public/ico/en/VIDEO.png";
import ApoioEn from "@/public/ico/en/apoio.png";
import {
  Geographies, 
  Geography,
  Marker
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import Mit_cambridge from "@/public/ico/MIT.png";
import Ufrgs_porto_alegre from "@/public/ico/UFRGS.png";
import Fgv_rio_de_janeiro from "@/public/ico/FGV.png";
import Ubn_brasilia from "@/public/ico/UNB.png";
import Ufg_goiania from "@/public/ico/UFG.png";
import Bocconi_milan from "@/public/ico/BOCCONI.png";
import Bologna from "@/public/ico/BOLOGNA.png";
import Sabanci_tuzla from "@/public/ico/SABANCI.png";
import Sul_australia_adelaide from "@/public/ico/SUL-AUSTRALIA.png";

import useWindowDimensions from '@/app/helper/useWindowDimension';
import geoUrl from '@/public/features_old.json';

const fatorMultPrinc: number = 0.40;
const fatorMultSecond: number = 0.35;

const Mit_cambridge_pt: string = 'Instituto de Tecnologia de Massachusetts - USA';
const Ufrgs_porto_alegre_pt: string = 'Universidade Federal do Rio Grande do Sul - BR';
const Fgv_rio_de_janeiro_pt: string = 'Fundação Getúlio Vargas - BR';
const Ubn_brasilia_pt: string = 'Universidade de Brasília - BR';
const Ufg_goiania_pt: string = 'Universidade Federal de Goiás - BR';
const Bocconi_milan_pt: string = 'Universidade Comercial Luigi Bocconi - IT';
const Bologna_pt: string = 'Universidade de Bolonha - IT';
const Sabanci_tuzla_pt: string = 'Universidade Sabanci - TR';
const Sul_australia_adelaide_pt: string = 'Governo do Sul da Austrália - AU';

const Mit_cambridge_en: string = 'Massachusetts Institute of Technology - USA';
const Ufrgs_porto_alegre_en: string = 'Federal University of Rio Grande do Sul - BR';
const Fgv_rio_de_janeiro_en: string = 'Fundation Getúlio Vargas - BR';
const Ubn_brasilia_en: string = 'University of Brasilia - BR';
const Ufg_goiania_en: string = 'Federal University of Goiás - BR';
const Bocconi_milan_en: string = 'Bocconi University - IT';
const Bologna_en: string = 'University of Bologna - IT';
const Sabanci_tuzla_en: string = 'Sabancı University - TR';
const Sul_australia_adelaide_en: string = 'Government of South Australia - AU';

import en from "@/public/static/locales/en.json";
import en_pu from "@/public/static/publications/en.json";


function Home_En() {
  const pathname_src = usePathname();
  const [pathName, setPathName] = useState<string>('');
  const { width, height } = useWindowDimensions();
  const mapRef = React.useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
  const [heightMap, setHeightMap] = useState<number | null>(null);
  const [widthMap, setWidthMap] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [localeSel, setLocaleSel] = useState<LocaleLang>();
  const selectedLocale = useAppSelector(langSelector);
  const dispatch = useAppDispatch();
  const [menuS, setMenuS] = useState<MenuSelected>();
  const menuSel = useAppSelector(menuSelector);
  
  useEffect(() => {
    const m: MenuSelected = {
      idMenu: 0,
      keyName: 'inicio',
      language: 'en',
      link: `${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? `${(menuS?.language === "en"? "" : "index_en")}` : `index${(menuS?.language === "en"? "" : "_en")}.html`)}`
    };
    dispatch(changePage(m));
  }, [])

  useEffect(() => {
    setLocaleSel({
      language : 'en',
      languageJson : en,
      publish: en_pu
    });
  }, [selectedLocale]);

  useEffect(() => {
    if(mapRef.current !== undefined ){
      setHeightMap(mapRef.current.clientHeight!);
      setWidthMap(mapRef.current.clientWidth!);
      setPosition(mapRef.current.clientHeight!*(-1));
    }    
  }, [width, height]);

  useEffect(() => {
    setPathName(pathname_src);
  }, [pathname_src]);

  const RetornaConteudoInicial = () => {
    if(width! > 1030){
      return (
        <StyledRow 
          gutter={[ 64, 16 ]}
          style={{}}
        >
          <StyledCol 
            flex="50%"
            style={{
              marginRight: 0
            }}
          >
            <h1 style={{ marginBottom: 15 }}>{localeSel?.languageJson.page_1_header}</h1>
            <h2
              style={{
                textAlign: 'justify',
                lineHeight: 1.50,
              }}
            >
              {localeSel?.languageJson.page_1_header_sub}
            </h2>
            <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}projeto_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`}>
              <Button 
                style={{
                  textTransform: 'uppercase',
                  marginTop: 20,
                  color: '#0A74A6',
                  borderColor: '#0A74A6',
                  fontSize: 14,
                  fontWeight: 500,
                }}
                type="primary" ghost
              >
                <span
                  style={{
                      color: '#0A74A6',
                  }}
                >
                  {localeSel?.languageJson.btn_saiba_mais}
                </span>                
              </Button>
            </a>
          </StyledCol>
          <StyledCol
            flex="50%"
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row-reverse'
            }}
          >
            <Image
              src={(localeSel?.language === 'en'? logoFinalEn.src : logoFinalPt.src)}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', maxWidth: 489, height: 'auto', marginRight: 0 }} 
              alt="Logo atlas oportunidades"
            />
          </StyledCol>
        </StyledRow>
      );

    } else {
      return (
        <StyledRow>
          <StyledCol 
            flex="100%"
            style={{
              marginRight: 0
            }}
          >
            <h1>{localeSel?.languageJson.page_1_header}</h1>
            <h2
              style={{
                textAlign: 'justify',
                lineHeight: 1.50,
              }}
            >
              {localeSel?.languageJson.page_1_header_sub}
            </h2>
            <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}projeto_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`}>
              <Button 
                style={{
                  textTransform: 'uppercase',
                  marginTop: 20,
                  color: '#0A74A6',
                  borderColor: '#0A74A6',
                  fontSize: 14,
                  fontWeight: 500,
                }}
                type="primary" ghost
              >
                <span
                  style={{
                      color: '#0A74A6',
                  }}
                >
                  {localeSel?.languageJson.btn_saiba_mais}
                </span>                
              </Button>
            </a>
          </StyledCol>
        </StyledRow>
      );
    }
  }

  const RetornaSaibaMais = () => {
    if(width! > 1030){
      return (  
        <DivTelaInicialCenter style={{ marginBottom: 0}}>
          <StyledRow style={{ paddingTop: 20, paddingBottom: 20 }}>
            <StyledCol 
              flex="50%"
              style={{
                paddingRight: '65px',
              }}
            >
              <h1
                style={{ color: '#1DC0A9', marginBottom: 80 }}
              >
                {localeSel?.languageJson.menu_3}
              </h1>
              <h2
                style={{
                  textAlign: 'justify',
                  color: '#fff',
                  lineHeight: 1.50,
                }}
              >
                {localeSel?.languageJson.page_1_perfil_title_1}
              </h2>
              <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}perfil_dados_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`}>
                <Button 
                  style={{
                    textTransform: 'uppercase',
                    marginTop: 20,
                    color: '#0A74A6',
                    borderColor: '#0A74A6',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  type="primary" ghost
                >
                  <span
                    style={{
                        color: '#0A74A6',
                    }}
                  >
                    {localeSel?.languageJson.btn_saiba_mais}
                  </span>                
                </Button>
              </a>              
            </StyledCol>
            <StyledCol
              flex="50%"
              style={{
                height: '100%',
                paddingLeft: 0,
                paddingRight: 0
              }}
            >
              <StyledDivImg>
                <Image
                  src={(localeSel?.language === 'en'? ColaboradoresEn.src : ColaboradoresPt.src)}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', maxWidth: 637, height: 'auto', marginRight: 0 }} 
                  alt="Logo atlas oportunidades"
                />
              </StyledDivImg>
            </StyledCol>
          </StyledRow>
        </DivTelaInicialCenter>        
      );
    } else {
      return (
        <DivTelaInicialCenter style={{ marginBottom: 0}}>
          <StyledRow 
            style={{ backgroundColor: '#01273C'}}
          >
            <StyledCol 
              flex="100%"
              style={{
                marginTop: '10%',
                marginBottom: '10%',
              }}
            >
              <h1 style={{ color: '#1DC0A9' }}>
              {localeSel?.languageJson.menu_3}
              </h1>
              <h2
                style={{
                  textAlign: 'justify',
                  color: '#fff',
                  lineHeight: 1.50
                }}
              >
                {localeSel?.languageJson.page_1_perfil_title_1}
              </h2>
              <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}perfil_dados_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`}>
                <Button 
                  style={{
                    textTransform: 'uppercase',
                    marginTop: 20,
                    color: '#0A74A6',
                    borderColor: '#0A74A6',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  type="primary" ghost
                >
                  <span
                    style={{
                        color: '#0A74A6',
                    }}
                  >
                    {localeSel?.languageJson.btn_saiba_mais}
                  </span>                
                </Button>
              </a>
            </StyledCol>
          </StyledRow>
        </DivTelaInicialCenter>
        
      );
    }
  }

  const RetornaCor = (country: string) => {
    if (
      country === "Australia" ||
      country === "Turkey" ||
      country === "Italy" ||
      country === "Brazil" ||
      country === "United States" ||
      country === "United States of America"
    )
      return "#2c73a5";
    else 
      return "#0d3559";
  }

  const [ positionMobile, setPositionMobile ] = useState<number>(0);

  const onClickPublish = (increment: number) => {
    console.log(positionMobile + increment);
    if( 
        ((positionMobile + increment) < localeSel?.publish.length - 1) &&
        (positionMobile + increment) > 0    
    ){
      console.log('entrou');
      console.log('pos', (positionMobile + increment))
      setPositionMobile((positionMobile + increment))
    }
  }

  const RetornaCardsPublicacoes = () => {
    var init = 0;
    var quant = localeSel?.publish.length;
    var limit = 3;
    var flexSize = "33.33%";
    if(widthMap! >= 1250){
      init = 0;
      limit = 3;
      flexSize = "33.33%";
    } else if (widthMap! >= 830 && widthMap! <= 1249){
      init = positionMobile;
      limit = 2;
      flexSize = "50%";
    } else {
      init = positionMobile;
      limit = 1;
      flexSize = "100%";
    }

    var listCards = [];
    for (var i = init; i < quant; i++){
      listCards.push(
        <Col flex={flexSize} key={`card${i}`}>
          <Card style={{ width: '100%', height: 340 }}>
            <p>{localeSel?.publish[i].title_publish}</p>
            <span>{localeSel?.publish[i].description_publish}</span>
            {
              localeSel?.publish[i].link_publish !== ""?
              <Link href={localeSel?.publish[i].link_publish} rel="noopener noreferrer" target="_blank">
                <Button
                  style={{
                    background: '#0A74A6',
                    textTransform: 'uppercase',
                    color: '#fff',
                    border: 0,
                    fontSize: 13,
                    marginTop: 20,
                    marginBottom: 'auto',
                    position: 'absolute',
                    left: 24,
                    bottom: 24
                  }}
                >
                  {localeSel?.languageJson.btn_saiba_mais}
                </Button> 
              </Link>
            :
            <></>
          }          
          </Card>
        </Col>
      );

      if(listCards.length === limit){
        break;
      }
    }

    return listCards;
  }

  return (
    <>
      <DivTelaInicial
        style={{
          backgroundImage: `url(${bg.src}) `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <DivTelaInicialCenter>
          {RetornaConteudoInicial()}
        </DivTelaInicialCenter>
      </DivTelaInicial>
      <DivMap
        ref={mapRef}
      >
        <div
          style={{ 
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            //height: heightMap!,
          }}
        >
          <h1>{localeSel?.languageJson.page_1_rede_title}</h1>          
        </div>
        <div
          style={{
            width: '100%',
            textAlign: 'center', 
            position: 'absolute',  
            marginTop: `calc(${heightMap!}px - 6vh)`,  
          }}
        >
          <Image
            src={(localeSel?.language === 'en'? ApoioEn.src : ApoioPt.src)}
            width={0}
            height={0}
            style={{ 
              width: '60%',
              maxWidth: 500,
              height: 'auto',
              bottom: 0,
              marginLeft: 'auto',
              marginRight: 'auto'
            }} 
            alt="apoio"
          />
        </div>

        <Tooltip 
          id="my-tooltip" 
          arrowColor="transparent"
        />
        <StyledComposableMap          
          style={{ backgroundColor: "#00406e", width: '100%' }}
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [5, 25],
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography 
                    key={geo.rsmKey} 
                    geography={geo}
                    fill={RetornaCor(geo.properties.name)}
                    stroke="#00406e"
                    enableBackground={1}
                  />
                );
              })
            }
          </Geographies> 

          <Marker
            key="marker1"
            data-tooltip-id="my-tooltip" 
            data-tooltip-content={(localeSel?.language === 'en'? Mit_cambridge_en : Mit_cambridge_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ -71.1185 - 74, 42.3759 + 2 ]}
          >   
            <svg xmlns="/#pattern">              
              <image
                href={Mit_cambridge.src}
                height={312*fatorMultPrinc}
                width={465*fatorMultPrinc}
              />
                        
            </svg>
          </Marker>          
          <Marker
            key="marker2"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Ufrgs_porto_alegre_en : Ufrgs_porto_alegre_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ -51.2300 - 96, -30.0331 + 29 ]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Ufrgs_porto_alegre.src}
                height={312*fatorMultPrinc}
                width={603*fatorMultPrinc}
              />
            </svg>
          </Marker>          
          <Marker
            key="marker3"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Fgv_rio_de_janeiro_en : Fgv_rio_de_janeiro_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ -43.2056 - 25, -22.9111 + 2]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Fgv_rio_de_janeiro.src}
                height={256*fatorMultSecond}
                width={214*fatorMultSecond}
              />
            </svg>
          </Marker>
          <Marker
            key="marker4"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Ubn_brasilia_en : Ubn_brasilia_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ -47.8825 - 1, -15.7942 + 2]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Ubn_brasilia.src}
                height={296*fatorMultSecond}
                width={238*fatorMultSecond}
              />
            </svg>
          </Marker>                 
          <Marker
            key="marker5"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Ufg_goiania_en : Ufg_goiania_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ -49.2500 - 1, -16.6667 + 1 ]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Ufg_goiania.src}
                height={278*fatorMultSecond}
                width={417*fatorMultSecond}
              />
            </svg>
          </Marker>           
          <Marker
            key="marker6"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Bocconi_milan_en : Bocconi_milan_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ 9.1900 - 32, 45.4669 + 380 ]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Bocconi_milan.src}
                height={260*fatorMultSecond}
                width={231*fatorMultSecond}
              />
            </svg>
          </Marker>
          <Marker
            key="marker7"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Bologna_en : Bologna_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ 11.3428 - 5, 44.4939 + 381 ]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Bologna.src}
                height={282*fatorMultSecond}
                width={196*fatorMultSecond}
              />
            </svg>
          </Marker>
          <Marker
            key="marker8"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Sabanci_tuzla_en : Sabanci_tuzla_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ 29.3006 + 0, 40.8161 + 384.5]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Sabanci_tuzla.src}
                height={313*fatorMultSecond}
                width={211*fatorMultSecond}
              />
            </svg>
          </Marker>
          <Marker
            key="marker9"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={(localeSel?.language === 'en'? Sul_australia_adelaide_en : Sul_australia_adelaide_pt)}
            data-tooltip-place="top-start"
            data-tooltip-offset="-10"
            coordinates={[ 138.6000 - 35, -34.9275 + 4 ]}
          > 
            <svg xmlns="/#pattern">
             <image
                href={Sul_australia_adelaide.src}
                height={206*fatorMultSecond}
                width={267*fatorMultSecond}
              />
            </svg>
          </Marker>
        </StyledComposableMap>
      </DivMap>
      <DivTelaSplit style={{ marginBottom: 0 }}>
        {RetornaSaibaMais()}
      </DivTelaSplit>
      {/* <StyledDivTwoColors>
        <DivTelaInicialCenter style={{ marginBottom: 0 }}>
          <Image
            src={(localeSel?.language === 'en'? VideoEn.src : VideoPt.src)}
            width={0}
            height={0}
            sizes="100vw"
            style={{ 
              width: '100%', 
              height: 'auto', 
              paddingTop: 30,
              paddingBottom: 30
            }} 
            alt="Logo atlas oportunidades"
          />
        </DivTelaInicialCenter>        
      </StyledDivTwoColors> */}
      <div style={{ background: '#fff', paddingBottom: 20 }}>
        <StyledDivPublicacoes>
            <h1>{localeSel?.languageJson.page_1_publications}</h1>
            <Row gutter={24}>
              {RetornaCardsPublicacoes()}
            </Row>
            <Row gutter={[16, 16]}>
              <Col flex="80%">
                <Link href="https://www.ufrgs.br/gpmc/papers-in-journals/" rel="noopener noreferrer" target="_blank">
                  <Button 
                    style={{
                      marginTop: 30,
                      textTransform: 'uppercase',                  
                      color: '#0A74A6',
                      borderColor: '#0A74A6',
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    type="primary" ghost
                  >
                    {localeSel?.languageJson.btn_ver_todos}
                  </Button>
                </Link>
              </Col>
              <Col flex="20%"
                style={{ marginTop: 30 }}
              >
                <Space 
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 0
                  }}
                >
                  <Button 
                    style={{ 
                      background: '#fff', 
                      borderColor: '#0A74A6', 
                      padding: 7 
                    }}
                    icon={
                      <LeftOutlined 
                        style={{ color: '#0A74A6' }}
                      />
                    }
                    onClick={() => onClickPublish(-1)}
                  />
                  <Button 
                    style={{ 
                      background: '#fff', 
                      borderColor: '#0A74A6', 
                      padding: 7 
                    }}
                    icon={
                      <RightOutlined
                        style={{ color: '#0A74A6' }}
                      />
                    }
                    onClick={() => onClickPublish(1)}
                  />
                </Space>
              </Col>
            </Row>
        </StyledDivPublicacoes>
      </div>      
    </>
  )
}

export default Home_En;