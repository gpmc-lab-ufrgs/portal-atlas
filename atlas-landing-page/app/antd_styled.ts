import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { 
    Menu,
    Drawer,
    Row,
    Col,
} from 'antd';
import { 
    ComposableMap, 
    Geographies, 
    Geography,
    Marker
} from 'react-simple-maps';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
`

export const DivHeader = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1522px;
    border-bottom: 1px solid #1DC0A9;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const DivMenu = styled.div`
    width: 167px;
    .ant-menu-item-selected{
        background: #0A74A6 !important;
    }
    .goRgDq{
        max-width: 167px;
        min-width: 167px;
    }
    .ant-menu-vertical .ant-menu-item{
        width: 167px;
        height: 30px;
        line-height: 30px;
        border-radius: 0px;
        padding: 0px 0px 0px 5px !important;
        margin: 0px !important;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        font-family: 'Montserrat', sans-serif;
    }
`;

export const StyledMenu = styled(Menu)`
    margin-top: auto;
    margin-bottom: auto;
    background-color: transparent;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    color: #fff;
    border-bottom: 0px solid transparent !important;
    min-width: 560px;

    .ant-btn-icon{
        margin-top: 10px;
    }
    .ant-menu-item:hover{
        color: #fff !important;
    }
`
export const StyledDrawer = styled(Drawer)`
    background: #00406F;
    .ant-drawer-header.ant-drawer-header-close-only,
    .ant-drawer-body{
        background: #00406F;
    }
`;

export const DivTelaInicial = styled.div`
    height: auto;
    padding: 150px 0 20px 0;
    margin: 0;
`;

export const DivTelaInicialProjeto = styled.div`
    height: auto;
    padding: 92px 0 20px 0;
    margin: 0;
`;

export const DivTelaInicialColaboradores = styled.div`
    height: auto;
    background: #00406F;
    padding: 92px 0 20px 0;
    margin: 0;
`;

export const DivTelaSplit = styled.div`
    @media (min-width: 1031px) {
        background: linear-gradient(90deg, #01273C 50%, #fff 50%);   
    }

    @media (max-width: 1030px) {
        background: #01273C;   
    }     
`;

export const DivColaboradoresCenter = styled.div`
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1522px;

    h1{
        color: #0A74A6;
        font-family: 'Montserrat', sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: center;
    }

    h2{
        color: #00406F;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 800;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;

    }
    span{
        color: #00406F;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 19.5px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

export const DivColaborador = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const DivTelaInicialCenter = styled.div`
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1522px;

    h1{
        text-transform: uppercase;
        font-weight: 700;
        font-size: 23px;
        font-family: 'Montserrat', sans-serif;
        line-height: 26.82px;
    }

    h2{
        text-align: justify !important;        
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 17.07px;
    }

    span{
        font-family: 'Montserrat', sans-serif;
        font-weight: 800;
        font-size: 18px;
        line-height: 17.07px;
        color: #1DC0A9;
    }
`;

export const StyledRow = styled(Row)`
    margin: auto;
`;

export const StyledCol = styled(Col)`
    margin: auto auto;
`;

export const StyledRowDimensoes = styled(Row)`
    margin: 0 !important;
    padding: 0;
`;

export const StyledColDimensoes = styled(Col)`
    margin: 0 !important;
    padding: 0;
`;

export const StyledDivImg = styled.div`
    display: flex;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
`;

export const DivMap = styled.div`
    width: 100%;
    height: auto;
    max-height: 650px;
    display: flex;

    h1{
        color: #fff;
        text-transform: uppercase;
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
        margin-top: 2vh;
    }
`;

export const StyledComposableMap = styled(ComposableMap)`
`;

export const StyledDivTwoColors = styled.div`
    background: linear-gradient(180deg, #0A74A6 50%, #fff 50%);
    height: auto;
`;

export const StyledDivPublicacoes = styled.div`
    width: 100%;
    max-height: 650px;
    background: #fff;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1522px;
    h1{
        color: #0A74A6;
        text-transform: uppercase;
        width: 100%;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Montserrat', sans-serif;
        padding-top: 2%;
        margin: 0 0 2% 0;
    }
    .ant-card-body{
        height: 100%;
    }
    p {
        color: #0A74A6;
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 24.38px;
        margin-top: 0px;
        text-align: justify;
    }
    span{
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 17.07px;
        display: flex;
        text-align: justify;
    }
`;

export const StyledDivFooter = styled.div`
    background: #01273C;
    display: flex;
    flex-direction: column;
`;

export const StyledDivFooterContent = styled.div`
    height: 320px;
    margin: 0 auto;
    width: 80%;
    max-width: 1522px;
    align-items: center;
    padding: 50px 0;

    p{
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 500;
        margin: 0;
    }
    .classEnd{
        gap: 0px !important;
    }
`;

export const StyledDivDireitosReservados = styled.div`
    text-align: center;
    height: 100px;
    background: #0A74A6;
    display: flex;
    align-items: center;
    p {
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-size: 12px;
        font-weight: 500;
        margin: 0;
        width: 100%;
    }
`;

export const DivDimensoesDados = styled.div`
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1522px;

    h1{
        color: #0A74A6;
        font-family: 'Montserrat', sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        text-transform: uppercase;
    }

    h2{
        color: #4E4E4E;
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: justify;
    }

    span{
        color: #4E4E4E;
        text-align: justify;
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`;


