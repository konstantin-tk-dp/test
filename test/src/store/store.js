import { createStore } from 'redux';
import { TOGGLE_ACCORDION } from './actions/actions';

export const initialState = { isAccordion: true };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ACCORDION:
            return { ...state, isAccordion: !state.isAccordion };
        default:
            return state;
    }
};

export const store = createStore(reducer);