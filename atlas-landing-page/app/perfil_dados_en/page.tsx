"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    MenuSelected,
    changePage,
    menuSelector,
} from "@/app/features/menuSlice";
import { LocaleLang, langSelector } from "@/app/features/localeSlice";
import {
    DivTelaInicial,
    DivTelaInicialCenter,
    DivMap,
    StyledRow,
    StyledCol,
    DivDimensoesDados,
    StyledComposableMap,
    DivTelaSplit,
    StyledDivTwoColors,
    StyledDivPublicacoes,
    StyledDivImg,
} from "@/app/antd_styled";
import bg_perfil_dados from "@/public/ico/header_perfil_dados.png";
import bg_perfil_dados_sem_foto from "@/public/ico/header_perfil_dados_sem_foto.png";
import bg_fundo_dimensoes from "@/public/ico/fundo_dimensoes.png";
import ico_demografico from "@/public/ico/ico_demografico.png";
import bg_demografico from "@/public/ico/fundo_demografico.png";
import ico_economia from "@/public/ico/ico_economia.png";
import bg_economia from "@/public/ico/fundo_economia.png";
import ico_empreend from "@/public/ico/ico_empreendorismo.png";
import bg_empreend from "@/public/ico/fundo_empreendedorismo.png";
import ico_urbanismo from "@/public/ico/ico_urbanismo.png";
import bg_urbanismo from "@/public/ico/fundo_urbanismo.png";
import ico_tecnologia from "@/public/ico/ico_tecnologia_informacao.png";
import bg_tecnologia from "@/public/ico/fundo_tecnologia_informacao.png";
import ico_educacao from "@/public/ico/ico_educacao.png";
import bg_educacao from "@/public/ico/fundo_educacao.png";
import ico_saude from "@/public/ico/ico_saude.png";
import bg_saude from "@/public/ico/fundo_saude.png";
import ico_mobilidade from "@/public/ico/ico_mobilidade.png";
import bg_mobilidade from "@/public/ico/fundo_mobilidade.png";
import ico_seguranca from "@/public/ico/ico_seguranca.png";
import bg_seguranca from "@/public/ico/fundo_seguranca.png";
import ico_meio_ambiente from "@/public/ico/ico_meio_ambiente.png";
import bg_meio_ambiente from "@/public/ico/fundo_meio_ambiente.png";

import useWindowDimensions from "@/app/helper/useWindowDimension";

import en from "@/public/static/locales/en.json";
import pt from "@/public/static/locales/pt.json";
import en_pu from "@/public/static/publications/en.json";
import pt_pu from "@/public/static/publications/pt.json";

function PerfilDados() {
    const pathname_src = usePathname();
    const { width, height } = useWindowDimensions();
    const [localeSel, setLocaleSel] = useState<LocaleLang>();
    const [pathName, setPathName] = useState<string>('');
    const dispatch = useAppDispatch();
    const [menuS, setMenuS] = useState<MenuSelected>();
    const menuSel = useAppSelector(menuSelector);
    const selectedLocale = useAppSelector(langSelector);

    useEffect(() => {
        setPathName(pathname_src);
    }, [pathname_src]);

    useEffect(() => {
        const m: MenuSelected = {
            idMenu: 3,
            keyName: "perfil_dados",
            language: 'en',
            link: `${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}perfil_dados${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`
        };
        dispatch(changePage(m));
    }, []);

    useLayoutEffect(() => {
        setLocaleSel({
            language : 'en',
            languageJson : en,
            publish: en_pu
        });
    }, [selectedLocale]);

    const RetornaConteudoInicial = () => {
        if (width! > 1386) {
            return (
                <StyledRow 
                    key={"RowMain"}
                    gutter={[64, 16]}
                >
                    <StyledCol
                        key={"ColMain1"}
                        flex="50%"
                        style={{
                            marginRight: 0,
                        }}
                    >
                        <h1 key={"h1Main"} style={{color: '#1DC0A9', marginBottom: 20 }}>{localeSel?.languageJson.page_3_title_1}</h1>
                        <h2
                            key={"h2Main"} 
                            style={{
                                textAlign: "justify",
                                lineHeight: 1.5,
                                fontSize: 18,
                                marginBottom: 20 
                            }}
                        >
                            {localeSel?.languageJson.page_3_t1_content_1}
                        </h2>
                        <h2
                            key={"h22Main"} 
                            style={{
                                textAlign: "justify",
                                lineHeight: 1.5,
                                fontSize: 18,
                                marginBottom: 10
                            }}
                        >
                            {localeSel?.languageJson.page_3_t1_content_2}
                        </h2>
                    </StyledCol>
                    <StyledCol
                        key={"ColMain2"}
                        flex="50%"
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    >
                        <></>
                    </StyledCol>
                </StyledRow>
            );
        } else {
            return (
                <StyledRow
                    key={"RowMain"}
                >
                    <StyledCol
                        key={"ColMain1"}
                        flex="100%"
                        style={{
                            marginRight: 0,
                        }}
                    >
                        <h1 key={"h1Main"} style={{color: '#1DC0A9', marginBottom: 20 }}>{localeSel?.languageJson.page_3_title_1}</h1>
                        <h2
                            key={"h2Main"} 
                            style={{
                                textAlign: "justify",
                                lineHeight: 1.5,
                                fontSize: 18,
                                marginBottom: 20 
                            }}
                        >
                            {localeSel?.languageJson.page_3_t1_content_1}
                        </h2>
                        <h2
                            key={"h22Main"} 
                            style={{
                                textAlign: "justify",
                                lineHeight: 1.5,
                                fontSize: 18,
                                marginBottom: 10
                            }}
                        >
                            {localeSel?.languageJson.page_3_t1_content_2}
                        </h2>
                    </StyledCol>
                </StyledRow>
            );
        }
    };

    interface InfoDimensao {
        position: string;
        ico_title: StaticImageData;
        title: string;
        title_color: string;
        bg_col: StaticImageData;
        content: string;
    } 

    const lstInfoDimensoes: InfoDimensao[] = [
        {
            position: 'L', 
            ico_title: ico_demografico, 
            title: localeSel?.languageJson.page_3_demo_title,
            title_color: '#7B4BB2',
            bg_col: bg_demografico,
            content: localeSel?.languageJson.page_3_demo_content
        },
        {
            position: 'R', 
            ico_title: ico_economia, 
            title: localeSel?.languageJson.page_3_economia_title,
            title_color: '#147A99',
            bg_col: bg_economia,
            content: localeSel?.languageJson.page_3_economia_content
        },
        {
            position: 'L', 
            ico_title: ico_empreend, 
            title: localeSel?.languageJson.page_3_empreendedorismo_title,
            title_color: '#F9B180',
            bg_col: bg_empreend,
            content: localeSel?.languageJson.page_3_empreendedorismo_content
        },
        {
            position: 'R', 
            ico_title: ico_urbanismo, 
            title: localeSel?.languageJson.page_3_urbanismo_title,
            title_color: '#104799',
            bg_col: bg_urbanismo,
            content: localeSel?.languageJson.page_3_urbanismo_content
        },
        {
            position: 'L', 
            ico_title: ico_tecnologia, 
            title: localeSel?.languageJson.page_3_tecnologia_title,
            title_color: '#64ACED',
            bg_col: bg_tecnologia,
            content: localeSel?.languageJson.page_3_tecnologia_content
        },
        {
            position: 'R', 
            ico_title: ico_educacao, 
            title: localeSel?.languageJson.page_3_educacao_title,
            title_color: '#BB8BEA',
            bg_col: bg_educacao,
            content: localeSel?.languageJson.page_3_educacao_content
        },
        {
            position: 'L', 
            ico_title: ico_saude, 
            title: localeSel?.languageJson.page_3_saude_title,
            title_color: '#58DBAC',
            bg_col: bg_saude,
            content: localeSel?.languageJson.page_3_saude_content
        },
        {
            position: 'R', 
            ico_title: ico_mobilidade, 
            title: localeSel?.languageJson.page_3_mobilidade_title,
            title_color: '#CC6262',
            bg_col: bg_mobilidade,
            content: localeSel?.languageJson.page_3_mobilidade_content
        },
        {
            position: 'L', 
            ico_title: ico_seguranca, 
            title: localeSel?.languageJson.page_3_seguranca_title,
            title_color: '#157243',
            bg_col: bg_seguranca,
            content: localeSel?.languageJson.page_3_seguranca_content
        },
        {
            position: 'R', 
            ico_title: ico_meio_ambiente, 
            title: localeSel?.languageJson.page_3_meio_ambiente_title,
            title_color: '#B9DD58',
            bg_col: bg_meio_ambiente,
            content: localeSel?.languageJson.page_3_meio_ambiente_content
        },
        
    ];

    const RetornaDadosDimensoes = (infoDimensao: InfoDimensao) => {
        if (width! > 0){
            if (width! > 1030) {
                return (
                    <div 
                        key={`divMainDimensoes${infoDimensao.title}`} 
                        style={{ backgroundColor: (infoDimensao.position === 'L'? '#fff' : '#f7f7f7')}}
                    >
                        <DivDimensoesDados key={`DD${infoDimensao.title}`}>
                            <StyledRow 
                                key={`R${infoDimensao.title}`}
                                gutter={[64, 16]}
                                style={{ margin: 0, padding: 0 }}
                            >
                                {
                                    infoDimensao.position === 'L'? 
                                    <>
                                        <StyledCol 
                                            key={`R1${infoDimensao.title}`}
                                            flex="50%"
                                            style={{ 
                                                margin: 0, 
                                                paddingLeft: 0,
                                                paddingTop: 0,
                                                paddingRight: 30,
                                                display: 'flex',                                    
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <div
                                                key={`D1${infoDimensao.title}`}   
                                            >
                                                <div
                                                    key={`D2${infoDimensao.title}`}   
                                                    style={{ 
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        marginBottom: 20,
                                                        verticalAlign: 'center'
                                                    }}
                                                >
                                                    <Image
                                                        key={`I1${infoDimensao.title}`}   
                                                        src={infoDimensao.ico_title.src}
                                                        width={100}
                                                        height={100}
                                                        alt="Logo header"
                                                    />
                                                    <h1
                                                        style={{
                                                            color: infoDimensao.title_color,
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            marginLeft: 20,
                                                            height: 25,
                                                            paddingTop: 35
                                                        }}    
                                                    >
                                                        {infoDimensao.title}
                                                    </h1>
                                                </div>                        
                                                <h2>{infoDimensao.content}</h2>
                                            </div>                        
                                        </StyledCol>
                                        <StyledCol flex="50%"
                                            key={`R2${infoDimensao.title}`}
                                            style={{ padding: 0 }}
                                        >
                                            <Image
                                                key={`I2${infoDimensao.title}`}   
                                                src={infoDimensao.bg_col.src}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ 
                                                    width: '100%', 
                                                    height: 'auto',
                                                    backgroundSize: 'cover'
                                                }} 
                                                alt="Logo atlas oportunidades"
                                            />
                                        </StyledCol>
                                    </> 
                                    : 
                                    <>                                    
                                        <StyledCol flex="50%"
                                            key={`R1${infoDimensao.title}`}
                                            style={{ padding: 0 }}
                                        >
                                            <Image
                                                key={`I1${infoDimensao.title}`}   
                                                src={infoDimensao.bg_col.src}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ 
                                                    width: '100%', 
                                                    height: 'auto',
                                                    backgroundSize: 'cover'
                                                }} 
                                                alt="Logo atlas oportunidades"
                                            />
                                        </StyledCol>  
                                        <StyledCol 
                                            key={`R2${infoDimensao.title}`}
                                            flex="50%"
                                            style={{ 
                                                margin: 0, 
                                                paddingRight: 0,
                                                paddingTop: 0,
                                                paddingLeft: 30,
                                                display: 'flex',                                    
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <div
                                                key={`D1${infoDimensao.title}`}   
                                            >
                                                <div
                                                    key={`D2${infoDimensao.title}`}   
                                                    style={{ 
                                                        display: 'flex',
                                                        flexDirection: 'row-reverse',
                                                        marginBottom: 20,
                                                        verticalAlign: 'center'
                                                    }}
                                                >
                                                    <Image
                                                        key={`I1${infoDimensao.title}`}   
                                                        src={infoDimensao.ico_title.src}
                                                        width={100}
                                                        height={100}
                                                        alt="Logo header"
                                                    />
                                                    <h1
                                                        style={{
                                                            color: infoDimensao.title_color,
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            marginRight: 20,
                                                            height: 25,
                                                            paddingTop: 35
                                                        }}    
                                                    >
                                                        {infoDimensao.title}
                                                    </h1>
                                                </div>                        
                                                <h2>{infoDimensao.content}</h2>
                                            </div>                        
                                        </StyledCol>                              
                                    </>
                                }
                            </StyledRow>
                        </DivDimensoesDados>
                    </div>                
                );
            } else {
                return (
                    <div 
                        key={`divMainDimensoes${infoDimensao.title}`}
                        style={{ backgroundColor: (infoDimensao.position === 'L'? '#fff' : '#f7f7f7')}}
                    >
                        <DivDimensoesDados key={`DD${infoDimensao.title}`}>
                            <StyledRow 
                                key={`R${infoDimensao.title}`}
                                gutter={[64, 16]}
                                style={{
                                    margin: 0, 
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 30,
                                    paddingBottom: 30
                                }}
                            >
                                <StyledCol 
                                    key={`R1${infoDimensao.title}`}
                                    flex="100%"
                                    style={{ 
                                        margin: 0, 
                                        padding: 0,
                                        display: 'flex',                                    
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div
                                        key={`D1${infoDimensao.title}`}                                
                                    >
                                        <div
                                            key={`D2${infoDimensao.title}`}   
                                            style={{ 
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginBottom: 20,
                                                verticalAlign: 'center'
                                            }}
                                        >
                                            <Image
                                                key={`I1${infoDimensao.title}`}   
                                                src={infoDimensao.ico_title.src}
                                                width={50}
                                                height={50}
                                                alt="Logo header"
                                            />
                                            <h1
                                                style={{
                                                    color: infoDimensao.title_color,
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    marginLeft: 20,
                                                    height: 25,
                                                    paddingTop: 10,
                                                }}    
                                            >
                                                {infoDimensao.title}
                                            </h1>
                                        </div>                        
                                        <h2>{infoDimensao.content}</h2>
                                        <Image
                                            key={`I2${infoDimensao.title}`}   
                                            src={infoDimensao.bg_col.src}
                                            width="0"
                                            height="0"
                                            style={{
                                                marginTop: 20,
                                                width: '100%',
                                                height: '240px',
                                                objectFit: 'cover',
                                                objectPosition: 'center center',                                            
                                            }}                                        
                                            alt="Logo atlas oportunidades"
                                        /> 
                                    </div>               
                                </StyledCol>
                            </StyledRow>
                        </DivDimensoesDados>
                    </div>
                );
            }
        }
        
    }

    return (
        <>
            <DivTelaInicial
                key={"main"}
                style={{
                    backgroundColor: "#001228",
                    backgroundImage: width! > 1386? `url(${bg_perfil_dados.src})` : `linear-gradient(278deg, rgba(0,3,9,1) 0%, rgba(0,14,30,1) 100%)`,
                    backgroundSize:  width! > 1386? "1440px 862px" : "100%",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <DivTelaInicialCenter key={"mainTelaInicial"}>{RetornaConteudoInicial()}</DivTelaInicialCenter>
            </DivTelaInicial>
            <DivTelaInicial
                key={"dimensoes"}
                style={{
                    backgroundImage: `url(${bg_fundo_dimensoes.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    height: 100,
                    padding: 0
                }}                
            >
                <DivTelaInicialCenter
                    key={"dimensoesTelaInicial"}
                    style={{ verticalAlign: 'center', paddingTop: 35 }}
                >
                    <h1 
                        style={{ 
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        {localeSel?.languageJson.page_3_title_2}
                    </h1>
                </DivTelaInicialCenter>
            </DivTelaInicial>
            {lstInfoDimensoes.map(d => (RetornaDadosDimensoes(d)))}
        </>
    );
}

export default PerfilDados;
