'use client'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
//import { Montserrat } from //'next/font/google'
import { Layout } from 'antd';
import { HomeTitleComponent } from './components/homeTitle/homeTitle';
import HeaderComponent from './components/header/headerComponent';
import FooterComponent from './components/footer/footerComponent';
import { 
  GlobalStyle,
} from './antd_styled';
import { Providers } from './redux/provider';
import useWindowDimensions from './helper/useWindowDimension';
import "@/app/globals.css";

const { Content } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { width, height, ready } = useWindowDimensions();

  return (
    <html lang="pt">
      <Providers>
        <HomeTitleComponent />
        <body style={{ margin: 0 }}>          
          <GlobalStyle />
          <Layout className="layout">
            <HeaderComponent windows={[width, height]} />
            <Content style={{ width: '100%', height: '100%' }}>
              {children}              
            </Content>
            <FooterComponent windows={[width, height]} />
          </Layout>                  
        </body>
      </Providers>
    </html>
  )
}