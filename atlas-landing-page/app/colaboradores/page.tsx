'use client'
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
    DivTelaInicialColaboradores,
    DivColaboradoresCenter,
    DivColaborador
} from "@/app/antd_styled";
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Icon, { LinkedinFilled, MailFilled } from '@ant-design/icons';
import ico_lattes from '@/public/ico/ico_lattes.png';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MenuSelected, changePage, menuSelector } from '@/app/features/menuSlice';
import { LocaleLang, langSelector } from "@/app/features/localeSlice";
import RetornaFoto from '../helper/returnFotoById';
import { Button, Space } from 'antd';

interface Colaboradores {
    id: string;
    nome_col: string;
    funcao_col: string;
    instituicao_col: string;
    link_linkedin: string;
    cv_col: string;
    email_col: string;
    posicao: string;
    foto_src: string;
}

import ListaColaboradores from "@/public/colaboradores.json";

import en from "@/public/static/locales/en.json";
import pt from "@/public/static/locales/pt.json";
import en_pu from "@/public/static/publications/en.json";
import pt_pu from "@/public/static/publications/pt.json";

export default function Colaboradores(){
    const pathname_src = usePathname();
    const [pathName, setPathName] = useState<string>('');
    const [localeSel, setLocaleSel] = useState<LocaleLang>();
    const selectedLocale = useAppSelector(langSelector);
    const dispatch = useAppDispatch();
    const [hoverId, setHoverId] = useState<string>("0");

    const lstColaboradoresAtuais = () => {
        var l: Colaboradores[] = ListaColaboradores as Colaboradores[];
        l = l.filter((obj) => {
            return (obj.posicao === "atual" && obj.foto_src !== "");
        });
        return l;
    }

    const lstColaboradoresEx = () => {
        var l: Colaboradores[] = ListaColaboradores as Colaboradores[];
        l = l.filter((obj) => {
            return (obj.posicao === "ex" && obj.foto_src !== "");
        });
        return l;
    }
    
    useEffect(() => {
        const m: MenuSelected = {
            idMenu: 2,
            keyName: 'colaboradores',
            language: 'pt',
            link: `${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}colaboradores_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`
        };
        dispatch(changePage(m));
    }, [])

    useEffect(() => {
        setPathName(pathname_src);
    }, [pathname_src]);

    useLayoutEffect(() => {
        setLocaleSel({
            language : 'pt',
            languageJson : pt,
            publish: pt_pu
        });
    }, [selectedLocale]);

    return (
      <>
        <DivTelaInicialColaboradores />
        <div style={{ background: '#fff', paddingBottom: 25 }}>
            <DivColaboradoresCenter>
                <div>
                    <div 
                        className="mx-auto"
                        style={{ paddingTop: 25 }}
                    >
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            {localeSel?.languageJson.page_2_title_1}
                        </h1>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            lstColaboradoresAtuais().map((colaborador: Colaboradores) => (
                                <DivColaborador key={`M${colaborador.id}`}>
                                    <div key={colaborador.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none"
                                            style={{ 
                                                height: 340,
                                                borderTopRightRadius: 6,
                                                borderTopLeftRadius: 6,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 0
                                            }}
                                        >   
                                            <div
                                                onMouseEnter={e => setHoverId(colaborador.id)}
                                                onMouseLeave={e => setHoverId("0")}
                                                style={{ 
                                                    width: '100%',
                                                    display: 'flex', 
                                                    flexDirection: 'row',
                                                    position: 'absolute',
                                                    zIndex: 999,
                                                    paddingTop: 290,
                                                }}
                                            >
                                                {
                                                    hoverId === colaborador.id?
                                                    <div
                                                        className='bg-gradient-to-t from-blue-500 from-15%'
                                                        style={{ 
                                                            width: '100%',                                                        
                                                            position: 'absolute',
                                                            height: 50,
                                                        }}
                                                    />
                                                    :
                                                    <></>
                                                }
                                                <Space style={{ marginBottom: 20, marginLeft: 20 }}>                                               
                                                {
                                                    colaborador.link_linkedin !== "" && hoverId === colaborador.id?
                                                    <Link href={colaborador.link_linkedin} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{ background: "transparent", border: 0, padding: 0 }}
                                                            icon={<LinkedinFilled style={{ color: "#fff", fontSize: '25px' }} />}
                                                        />
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    colaborador.cv_col !== "" && hoverId === colaborador.id?
                                                    <Link href={colaborador.cv_col} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{
                                                                width: 32,
                                                                height: 32,
                                                                background: "transparent",
                                                                border: 0,
                                                                padding: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Image
                                                                src={ico_lattes}
                                                                width={22}
                                                                height={22}
                                                                style={{ 
                                                                    marginLeft: 'auto',
                                                                    marginRight: 'auto'
                                                                }}
                                                                alt="Logo header"
                                                            />
                                                        </Button>     
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    colaborador.email_col !== "" && hoverId === colaborador.id?
                                                    <Link href={`mailto:${colaborador.email_col}`} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{ background: "transparent", border: 0, padding: 0 }}
                                                            icon={<MailFilled style={{ color: "#fff", fontSize: '25px'}} />}
                                                        />
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                </Space>
                                            </div>
                                            <Image
                                                src={RetornaFoto(colaborador.id)!.src}
                                                alt={`Foto ${colaborador.nome_col}`}
                                                width={0}
                                                height={0}
                                                className="h-full w-full object-cover object-top lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div style={{ height: 94, background: '#FBFBFB' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    paddingTop: 18,
                                                    paddingLeft: 15                                                    
                                                }}
                                            >
                                                <h2>
                                                    {colaborador.nome_col}
                                                </h2>
                                                <span>
                                                    {colaborador.funcao_col}
                                                </span>
                                                <span>
                                                    {colaborador.instituicao_col}
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </DivColaborador>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </DivColaboradoresCenter>
            <DivColaboradoresCenter>
                <div>
                    <div 
                        className="mx-auto"
                        style={{ paddingTop: 25 }}
                    >
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            {localeSel?.languageJson.page_2_title_2}
                        </h1>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {
                            lstColaboradoresEx().map((colaborador: Colaboradores) => (
                                <DivColaborador key={`M${colaborador.id}`}>
                                    <div key={colaborador.id} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none"
                                            style={{ 
                                                height: 340,
                                                borderTopRightRadius: 6,
                                                borderTopLeftRadius: 6,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 0
                                            }}
                                        >   
                                            <div
                                                onMouseEnter={e => setHoverId(colaborador.id)}
                                                onMouseLeave={e => setHoverId("0")}
                                                style={{ 
                                                    width: '100%',
                                                    display: 'flex', 
                                                    flexDirection: 'row',
                                                    position: 'absolute',
                                                    zIndex: 999,
                                                    paddingTop: 290,
                                                }}
                                            >
                                                {
                                                    hoverId === colaborador.id?
                                                    <div
                                                        className='bg-gradient-to-t from-blue-500 from-15%'
                                                        style={{ 
                                                            width: '100%',                                                        
                                                            position: 'absolute',
                                                            height: 50,
                                                        }}
                                                    />
                                                    :
                                                    <></>
                                                }
                                                <Space style={{ marginBottom: 20, marginLeft: 20 }}>                                               
                                                {
                                                    colaborador.link_linkedin !== "" && hoverId === colaborador.id?
                                                    <Link href={colaborador.link_linkedin} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{ background: "transparent", border: 0, padding: 0 }}
                                                            icon={<LinkedinFilled style={{ color: "#fff", fontSize: '25px' }} />}
                                                        />
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    colaborador.cv_col !== "" && hoverId === colaborador.id?
                                                    <Link href={colaborador.cv_col} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{
                                                                width: 32,
                                                                height: 32,
                                                                background: "transparent",
                                                                border: 0,
                                                                padding: 0,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Image
                                                                src={ico_lattes}
                                                                width={22}
                                                                height={22}
                                                                style={{ 
                                                                    marginLeft: 'auto',
                                                                    marginRight: 'auto'
                                                                }}
                                                                alt="Logo header"
                                                            />
                                                        </Button>     
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                {
                                                    colaborador.email_col !== "" && hoverId === colaborador.id?
                                                    <Link href={`mailto:${colaborador.email_col}`} rel="noopener noreferrer" target="_blank">
                                                        <Button
                                                            style={{ background: "transparent", border: 0, padding: 0 }}
                                                            icon={<MailFilled style={{ color: "#fff", fontSize: '25px'}} />}
                                                        />
                                                    </Link>
                                                    :
                                                    <></>
                                                }
                                                </Space>
                                            </div>
                                            <Image
                                                src={RetornaFoto(colaborador.id)!.src}
                                                alt={`Foto ${colaborador.nome_col}`}
                                                width={0}
                                                height={0}
                                                className="h-full w-full object-cover object-top lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div style={{ height: 94, background: '#FBFBFB' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    paddingTop: 18,
                                                    paddingLeft: 15                                                    
                                                }}
                                            >
                                                <h2>
                                                    {colaborador.nome_col}
                                                </h2>
                                                <span>
                                                    {colaborador.funcao_col}
                                                </span>
                                                <span>
                                                    {colaborador.instituicao_col}
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </DivColaborador>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </DivColaboradoresCenter>
        </div>        
        
      </>
    );
}