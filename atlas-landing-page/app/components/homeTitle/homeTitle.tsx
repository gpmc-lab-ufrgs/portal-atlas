import Head from 'next/head'
import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { LocaleLang, changeLocale, langSelector } from "@/app/features/localeSlice";
import ico from "@/public/favicon.ico";

 
export function HomeTitleComponent() {
    const [localeSel, setLocaleSel] = useState<LocaleLang>();
    const selectedLocale = useAppSelector(langSelector);

    useEffect(() => {
        setLocaleSel(selectedLocale);
    }, [selectedLocale]);

    return (
        <Head>
            <link rel="shortcut icon" href={ico.src} />
            <title>{localeSel?.languageJson.app_title}</title>
        </Head>
    )
}