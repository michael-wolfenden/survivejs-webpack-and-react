import uuid from 'node-uuid';

import t from './actionTypes';

const createNote = (note) => ({
    type: t.CREATE,
    payload: {
        note: {
            id: uuid.v4(),
            ...note,
        },
    },
});

const updateNote = (updatedNote) => ({
    type: t.UPDATE,
    payload: {
        ...updatedNote,
    },
});

const deleteNote = (id) => ({
    type: t.DELETE,
    payload: {
        id,
    },
});

export { createNote, updateNote, deleteNote };
