/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export interface currentLanguageState {
    currentLanguage: string;
}

const initialState: currentLanguageState = {
    currentLanguage: '',
};
const currentLanguageReducer = (state: currentLanguageState = initialState, action: any) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, currentLanguage: action.payload };
        default:
            return state;
    }
};

export { currentLanguageReducer };
