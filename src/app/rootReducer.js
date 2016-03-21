import { combineReducers } from 'redux';
import notes from './notes';

const reducers = combineReducers({
    [notes.constants.NAME]: notes.reducer,
});

export default reducers;
