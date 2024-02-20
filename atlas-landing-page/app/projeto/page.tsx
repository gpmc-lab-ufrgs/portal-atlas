'use client'
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
    DivTelaInicialColaboradores,
    DivTelaInicialProjeto,
    StyledCol,
    StyledRow,
    DivTelaInicialCenter,
    DivTelaInicial
} from "@/app/antd_styled";
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MenuSelected, changePage, menuSelector } from '@/app/features/menuSlice';
import { LocaleLang, langSelector } from "@/app/features/localeSlice";
import RetornaFoto from '../helper/returnFotoById';
import { Button, Space } from 'antd';
import bg_fundo_projeto from '@/public/ico/fundo_projeto.png';
import ft_brasil_pt from '@/public/ico/ft_brasil_pt.png';
import ft_brasil_en from '@/public/ico/ft_brasil_en.png';
import ft_nova_york_pt from '@/public/ico/ft_nova_york_pt.png';
import ft_nova_york_en from '@/public/ico/ft_nova_york_en.png';
import ft_sul_australia_pt from '@/public/ico/ft_sul_australia_pt.png';
import ft_sul_australia_en from '@/public/ico/ft_sul_australia_en.png';
import bg_fundo_instituicoes from '@/public/ico/fundo_instituicoes.png';
import ico_instituicoes_pt from '@/public/ico/ico_instituicoes_pt.png';
import ico_instituicoes_en from '@/public/ico/ico_instituicoes_pt.png';

import useWindowDimensions from "@/app/helper/useWindowDimension";

import en from "@/public/static/locales/en.json";
import pt from "@/public/static/locales/pt.json";
import en_pu from "@/public/static/publications/en.json";
import pt_pu from "@/public/static/publications/pt.json";

export default function Projeto(){
    const pathname_src = usePathname();
    const [pathName, setPathName] = useState<string>('');
    const { width, height } = useWindowDimensions();
    const [localeSel, setLocaleSel] = useState<LocaleLang>();    
    const selectedLocale = useAppSelector(langSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const m: MenuSelected = {
            idMenu: 1,
            keyName: 'projeto',
            language: 'pt',
            link: `${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}projeto_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`
        };
        dispatch(changePage(m));
    }, [])

    useLayoutEffect(() => {
        setLocaleSel({
            language : 'pt',
            languageJson : pt,
            publish: pt_pu
        });
    }, [selectedLocale]);

    useEffect(() => {
        setPathName(pathname_src);
    }, [pathname_src])

    return (
        <>
            <DivTelaInicialColaboradores />
            <DivTelaInicialProjeto
                key={"main"}
                style={{
                    background: width! > 1588? `no-repeat center right / contain url(${bg_fundo_projeto.src}), linear-gradient(90deg, #fff 80%, #44a192 20%)` : `linear-gradient(90deg, #fff 80%, #fff 20%)`,
                }}
            >
                <DivTelaInicialCenter>
                    <StyledRow 
                        gutter={[64, 16]}                        
                    >
                        <StyledCol
                            flex={(width! > 1588? "60%" : "100%")}
                            style={{
                                margin: 0,
                            }}
                        >
                            <h1 key={"h1Main"} style={{color: '#0A74A6', marginBottom: 20 }}>{localeSel?.languageJson.page_4_title_1}</h1>
                            <h2
                                key={"h2Main"} 
                                style={{
                                    color: '#4E4E4E',
                                    textAlign: "justify",
                                    lineHeight: 1.5,
                                    fontSize: 18,
                                    marginBottom: 20 
                                }}
                            >
                                {localeSel?.languageJson.page_4_t1_content_1}
                            </h2>
                            <h2
                                key={"h22Main"} 
                                style={{
                                    color: '#4E4E4E',
                                    textAlign: "justify",
                                    lineHeight: 1.5,
                                    fontSize: 18,
                                    marginBottom: 10
                                }}
                            >
                                {localeSel?.languageJson.page_4_t1_content_2_pt1}
                                <Link href="https://opportunity.mit.edu/" rel="noopener noreferrer" target="_blank">
                                    <span>{localeSel?.languageJson.page_4_t1_content_2_label_1}</span>
                                </Link>
                                {localeSel?.languageJson.page_4_t1_content_2_pt2}
                                <Link href="https://mtb.mit.edu/explore/rochester#map=9.6/43.1556/-77.685" rel="noopener noreferrer" target="_blank">
                                    <span>{localeSel?.languageJson.page_4_t1_content_2_label_2}</span>
                                </Link>
                                {localeSel?.languageJson.page_4_t1_content_2_pt3}
                                <Link href="https://github.com/gpmc-lab-ufrgs/atlas-of-opportunity" rel="noopener noreferrer" target="_blank">
                                    <span>{localeSel?.languageJson.page_4_t1_content_2_label_3}</span>
                                </Link>
                                {localeSel?.languageJson.page_4_t1_content_2_pt4}                       
                            </h2>
                            <h2
                                key={"h23Main"} 
                                style={{
                                    color: '#4E4E4E',
                                    textAlign: "justify",
                                    lineHeight: 1.5,
                                    fontSize: 18,
                                    marginBottom: 10
                                }}
                            >
                                {localeSel?.languageJson.page_4_t1_content_3}
                            </h2>
                        </StyledCol>
                        <StyledCol
                            key={"ColMain2"}
                            flex="40%"
                        >
                            <></>
                        </StyledCol>
                    </StyledRow>
                    <StyledRow
                        style={{ marginTop: 20 }}
                        gutter={[16, 16]}
                    >
                        <StyledCol
                            key={"ColMain21"}
                            flex="33.33%"
                        >
                            <Image
                                src={(localeSel?.language === 'en'? ft_brasil_en.src : ft_brasil_pt.src)}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%'}} 
                                alt="Mapa brasil"
                            />
                        </StyledCol>
                        <StyledCol
                            key={"ColMain22"}
                            flex="33.33%"
                        >
                            <Image
                                src={(localeSel?.language === 'en'? ft_nova_york_en.src : ft_nova_york_pt.src)}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%'}} 
                                alt="Mapa Nova York"
                            />
                        </StyledCol>
                        <StyledCol
                            key={"ColMain23"}
                            flex="33.33%"
                        >
                            <Image
                                src={(localeSel?.language === 'en'? ft_sul_australia_en : ft_sul_australia_pt.src)}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%'}} 
                                alt="Mapa Sul Australia"
                            />
                        </StyledCol>
                    </StyledRow>
                </DivTelaInicialCenter>
            </DivTelaInicialProjeto>
            <DivTelaInicial
                key={"dimensoes"}
                style={{
                    backgroundImage: `url(${bg_fundo_instituicoes.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    padding: 0,
                    paddingTop: 30,
                    paddingBottom: 30
                }}                
            >
                <DivTelaInicialCenter
                    key={"dimensoesTelaInicial"}
                    style={{ verticalAlign: 'center', marginBottom: 0 }}
                >
                    <Image
                        src={(localeSel?.language === 'en'? ico_instituicoes_en.src : ico_instituicoes_pt.src)}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%'}} 
                        alt="Instituicoes"
                    />
                    
                </DivTelaInicialCenter>
                <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}colaboradores${(localeSel?.language === "en"? "_en" : "")}${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`}>                
                    <Button 
                        style={{
                            textTransform: 'uppercase',
                            borderColor: '#fff',
                            marginTop: 30,
                            fontSize: 14,
                            fontWeight: 500,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'block'
                        }}
                        type="primary" ghost
                    >
                        <span
                            style={{
                                color: '#fff',
                            }}
                        >
                            {localeSel?.languageJson.page_4_t2}
                        </span>                        
                    </Button>
                </a>
            </DivTelaInicial>
            
        </>
    );

}