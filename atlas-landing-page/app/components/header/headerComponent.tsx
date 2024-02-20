import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Layout, Space, Button } from 'antd';
import { 
    DivHeader,
    StyledMenu,
    StyledDrawer,
} from '@/app/antd_styled';
const { Header } = Layout;
import headerIconPt from '@/public/ico/pt/LOGO_TOPO_BRANCA.png'
import headerIconEn from '@/public/ico/en/LOGO_TOPO_BRANCA.png';
import ptIcon from "@/public/ico/icon_pt.png";
import enIcon from "@/public/ico/icon_en.png";
import Icon, { GithubOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LocaleLang, changeLocale, langSelector } from "@/app/features/localeSlice";
import { MenuSelected, changePage, menuSelector } from '@/app/features/menuSlice';
import en from "@/public/static/locales/en.json";
import pt from "@/public/static/locales/pt.json";
import en_pu from "@/public/static/publications/en.json";
import pt_pu from "@/public/static/publications/pt.json";
import MenuComponent from '@/app/components/menu/menu';

export default function HeaderComponent(props: any){
    const pathname_src = usePathname();
    const [pathName, setPathName] = useState<string>('');
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [localeSel, setLocaleSel] = useState<LocaleLang>();
    const [menuS, setMenuS] = useState<MenuSelected>();
    const [linkMenu, setLinkMenu] = useState<string>('');
    const selectedLang = useAppSelector(langSelector);
    const menuSel = useAppSelector(menuSelector);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     setLocaleSel(selectedLang);
    // }, [selectedLang]);

    useEffect(() => {
        setMenuS(menuSel!);   
        if(menuSel.language === "en"){
            setLocaleSel({
                ...localeSel,
                language : 'en',
                languageJson : en,
                publish: en_pu
            });
        } else {
            setLocaleSel({
                ...localeSel,
                language : 'pt',
                languageJson : pt,
                publish: pt_pu
            });
        }        
    }, [menuSel]);

    useEffect(() => {
        setPathName(pathname_src);
    }, [pathname_src])

    useEffect(() => {
        setLinkMenu(retornaPage());
    }, [localeSel])

    const onClickChangeLocale = () => {
        if(localeSel?.language === 'en'){
            const loc: LocaleLang = {
                language : 'pt',
                languageJson : pt,
                publish: pt_pu
            };
            dispatch(changeLocale(loc));
        } else {
            const loc: LocaleLang = {
                language : 'en',
                languageJson : en,
                publish: en_pu
            };
            dispatch(changeLocale(loc));
        }
    }

    const retornaPage = () => {
        const raiz = pathname_src!.substring(0, pathname_src!.lastIndexOf("/") + 1);
        var pagina = pathname_src!.substring(pathname_src!.lastIndexOf("/") + 1);
        if(pagina === "" || pagina === "/" || pagina.includes("index_en") || pagina.includes("index.html")){
            if(menuS?.language === 'pt'){
                pagina = `index_en${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : ".html")}`;
            } else {
                pagina = `/${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? "" : "index.html")}`;
            }
        } else {
            pagina = `${pagina.replace('_en', '').replace('.html', '')}${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? (menuS?.language === "pt"? "_en" : "") : (menuS?.language === "pt"? "_en.html" : ".html"))}`
        }
        return `${raiz}${pagina}`.replace('//', '/');
    }

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                background: "transparent",
                width: "100%",
                height: 120,
                padding: 0,
                position: "absolute",
                zIndex: 999,
            }}
        >
            <DivHeader>
                <a href={`${pathName!.substring(0, pathName!.lastIndexOf("/") + 1)}${(process.env.NEXT_PUBLIC_IS_LOCAL === "true"? `${(menuS?.language === "en"? "index_en" : "")}` : `index${(menuS?.language === "en"? "_en" : "")}.html`)}`}>
                    <Image
                        src={(localeSel?.language === 'en'? headerIconEn.src : headerIconPt.src)}
                        width={159}
                        height={80}
                        style={{ marginRight: 0 }}
                        alt="Logo header"
                    />
                </a>
                <Space size={"middle"}>
                {
                    props.windows[0] > 1300 ? (
                    <>
                        <MenuComponent
                            keySel={menuS!.keyName}
                            modo={"horizontal"}
                        />
                        <Link href="https://github.com/gpmc-lab-ufrgs/atlas-of-opportunity" rel="noopener noreferrer" target="_blank">
                            <Button
                                style={{ background: "#0A74A638", border: 0 }}
                                icon={<GithubOutlined style={{ color: "#fff" }} />}
                            />
                        </Link>
                        <a href={linkMenu}>
                            <Button
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: "#0A74A638",
                                    border: 0,
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                //onClick={onClickChangeLocale}
                            >
                                <Image
                                    src={(localeSel?.language === 'en'? enIcon.src : ptIcon.src)}
                                    width={21}
                                    height={18.7}
                                    style={{ 
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                    alt="Logo header"
                                />
                            </Button>
                        </a>  
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
                    </>
                    ) : ( <></> )
                }
                {
                    props.windows[0] <= 1300 ? (
                    <>
                        <Button
                            icon={<MenuOutlined style={{ color: "#fff" }} />}
                            style={{ background: "transparent" }}
                            onClick={() => setOpenMenu(true)}
                        />
                        <StyledDrawer
                            width={500}
                            onClose={() => setOpenMenu(false)}
                            open={openMenu}
                            headerStyle={{ backgroundColor: "#0d3559" }}
                            closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
                            onClick={(e:any) => console.log(e)}
                            extra={
                                <Space size="middle">
                                    <Link href="https://github.com/gpmc-lab-ufrgs/atlas-of-opportunity" rel="noopener noreferrer" target="_blank">
                                        <Button
                                            style={{ background: "#0A74A638", border: 0 }}
                                            icon={<GithubOutlined style={{ color: "#fff" }} />}
                                        />
                                    </Link>
                                    <a href={linkMenu}>
                                        <Button
                                            style={{
                                                width: 32,
                                                height: 32,
                                                background: "#0A74A638",
                                                border: 0,
                                                padding: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                            //onClick={onClickChangeLocale}
                                        >
                                            <Image
                                                src={(localeSel?.language === 'en'? enIcon.src : ptIcon.src)}
                                                width={21}
                                                height={18.7}
                                                style={{ 
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }}
                                                alt="Logo header"
                                            />
                                        </Button>
                                    </a>                                    
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
                            }
                        >
                            <MenuComponent
                                keySel={menuS!.keyName}
                                modo={"vertical"}
                            />
                        </StyledDrawer>
                    </>
                    ) : (
                    <></>
                    )
                }                    
                </Space>
            </DivHeader>
        </Header>
    );
}