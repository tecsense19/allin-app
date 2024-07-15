// reducers/booleanReducer.js

const initialState = {
    isTrue: false,
    isExpire: false,

};


export const booleanReducer = (state = initialState, action) => {
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

export const TokenRefreshState = (state = initialState, action) => {

    switch (action.type) {
        case 'EXPIRE_TOKEN':
            return {
                ...state,
                isExpire: true,
            };

        default:
            return state;

    }

}

// export default { booleanReducer, TokenRefreshState };
