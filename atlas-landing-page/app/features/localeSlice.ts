import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../app/store";
import pt from "./../../public/static/locales/pt.json";
import pu_pt from "./../../public/static/publications/pt.json";

export interface LocaleLang {
    language: string;
    languageJson: any;
    publish: any;
}

const initialState: LocaleLang = {
    language: 'pt',
    languageJson: pt,
    publish: pu_pt
}

export const localeSlice = createSlice({
    name: "localeLang",
    initialState,    
    reducers: {
        changeLocale: (state, action: PayloadAction<LocaleLang>) => {
            state.language = action.payload.language;
            state.languageJson = action.payload.languageJson;
            state.publish = action.payload.publish;
        },
    },
});

export const { changeLocale } = localeSlice.actions;
export const langSelector = (state: RootState) => state.localeReducer;
export default localeSlice.reducer;