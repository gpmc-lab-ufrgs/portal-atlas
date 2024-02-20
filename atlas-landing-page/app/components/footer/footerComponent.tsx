import React, { useState, useEffect } from "react";
import { Layout, Space, Button, Col, Row } from "antd";
import Image from 'next/image';
import Link from 'next/link';
import logoFinal_pt from '@/public/ico/pt/LOGO_logo_final.png';
import logoFinal_en from '@/public/ico/en/LOGO_logo_final.png';
import {
    DivMenu,
    StyledDivFooter,
    StyledDivFooterContent,
    StyledDivDireitosReservados,
} from "@/app/antd_styled";
const { Footer } = Layout;
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LocaleLang, changeLocale, langSelector } from "@/app/features/localeSlice";
import { MenuSelected, changePage, menuSelector } from '@/app/features/menuSlice';
import MenuComponent from "@/app/components/menu/menu";
import en from "@/public/static/locales/en.json";
import pt from "@/public/static/locales/pt.json";
import en_pu from "@/public/static/publications/en.json";
import pt_pu from "@/public/static/publications/pt.json";

export default function FooterComponent(props: any) {
    const [localeSel, setLocaleSel] = useState<LocaleLang>();
    const [menuS, setMenuS] = useState<MenuSelected>();
    const selectedLang = useAppSelector(langSelector);
    const menuSel = useAppSelector(menuSelector);

    // useEffect(() => {
    //     setLocaleSel(selectedLang);
    // }, [selectedLang]);

    useEffect(() => {
        setMenuS(menuSel!);   
        if(menuSel.language === "en"){
            setLocaleSel({
                language : 'en',
                languageJson : en,
                publish: en_pu
            });
        } else {
            setLocaleSel({
                language : 'pt',
                languageJson : pt,
                publish: pt_pu
            });
        }
    }, [menuSel]);

    const retornaConteudoFooter = () => {
        var quant = 3;
        var flexSize = "33.33%";
        if (props.windows[0] >= 1296) {
            quant = 3;
            flexSize = "33.33%";
        } else if (props.windows[0] < 1295 && props.windows[0] >= 782) {
            quant = 2;
            flexSize = "50%";
        } else {
            quant = 1;
            flexSize = "100%";
        }

        var columnsFooter = [
            <Col key={"colmain1"}>
                <Image
                    src={(localeSel?.language === 'en'? logoFinal_en.src : logoFinal_pt.src)}
                    width={0}
                    height={0}
                    style={{ width: "auto", height: 198 }}
                    alt="Logo atlas oportunidades"
                />
            </Col>,
            <Col key={"colmain2"}>
                <Space direction="vertical" size="small">
                    <Space size="middle">
                        <div style={{ height: 18, width: 18 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                viewBox="0 0 384 512"
                                style={{ fill: "transparent" }}
                            >
                                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                        </div>
                        <p style={{ textTransform: "uppercase" }}>{localeSel?.languageJson.footer_contato}</p>
                    </Space>
                    <Space size="middle">
                        <div style={{ height: 18, width: 18 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                viewBox="0 0 384 512"
                                style={{ fill: "#0a6ea6", margin: "auto" }}
                            >
                                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                        </div>
                        <Space className="classEnd" direction="vertical" size="small">
                            <p style={{ fontWeight: 800 }}>
                                {localeSel?.languageJson.address_pt_1}
                            </p>
                            <p>{localeSel?.languageJson.address_pt_2}</p>
                            <p>{localeSel?.languageJson.address_pt_3}</p>
                        </Space>
                    </Space>
                    <Space size="middle">
                        <div style={{ height: 18, width: 18 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                viewBox="0 0 512 512"
                                style={{ fill: "#0a6ea6" }}
                            >
                                <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                            </svg>
                        </div>
                        <Space direction="vertical" size="small">
                            <p style={{ fontWeight: 800 }}>www.ufrgs.br/gpmc</p>
                        </Space>
                    </Space>
                    <Space size="middle" align="center">
                        <div style={{ height: 18, width: 18 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.25em"
                                viewBox="0 0 512 512"
                                style={{ fill: "#0a6ea6" }}
                            >
                                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                        </div>
                        <Space direction="vertical" size="small">
                            <p style={{ fontWeight: 800 }}>gpmc-ea@ufrgs.br</p>
                        </Space>
                    </Space>
                </Space>
            </Col>,
            <Col key={"colmain3"} style={{ alignItems: "right", marginLeft: 'auto' }}>
                <Space direction="vertical" size="small">
                    <DivMenu>
                        <MenuComponent
                            keySel={(menuS === undefined? '0' : menuS!.keyName!)}
                            modo={"vertical"}
                        />
                    </DivMenu>
                    <Link href="http://3.92.188.34:3000/" rel="noopener noreferrer" target="_blank">
                        <Button
                            style={{
                            background: "#0A74A6",
                            textTransform: "uppercase",
                            color: "#fff",
                            border: 0,
                            paddingLeft: 30,
                            paddingRight: 30,
                            fontSize: 13,
                            }}
                        >
                            {localeSel?.languageJson.btn_ir_atlas}
                        </Button>
                    </Link>
                </Space>
            </Col>,
        ];

        return columnsFooter.slice(3 - quant, 3);
    };

    return (
        <Footer style={{ padding: 0 }}>
            <StyledDivFooter>
                <StyledDivFooterContent>
                    <Row
                        gutter={40}
                        style={{ margin: 0 }}
                        align="middle"
                        justify={"space-between"}
                    >
                        {retornaConteudoFooter()}
                    </Row>
                </StyledDivFooterContent>
                <StyledDivDireitosReservados>
                    <p>{localeSel?.languageJson.footer_rights}</p>
                </StyledDivDireitosReservados>
            </StyledDivFooter>
        </Footer>
    );
}
