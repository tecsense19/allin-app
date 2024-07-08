// reducers/booleanReducer.js

const initialState = {
    isTrue: false,
};

const booleanReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TRUE':
            return {
                ...state,
                isTrue: true,
            };
        case 'SET_FALSE':
            return {
                ...state,
                isTrue: false,
            };
        default:
            return state;
    }
};

export default booleanReducer;
