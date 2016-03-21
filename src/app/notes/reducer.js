import t from './actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.CREATE:
            return [...state, action.payload.note];

        case t.UPDATE:
            return state.map((note) => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        ...action.payload,
                    };
                }

                return note;
            });

        case t.DELETE:
            return state.filter((note) => note.id !== action.payload.id);

        default:
            return state;
    }
};

export default reducer;
