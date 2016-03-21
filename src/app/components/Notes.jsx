import React, { Component, PropTypes } from 'react';

import Note from './Note.jsx';

class Notes extends Component {
    static propTypes = {
        notes: PropTypes.array.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    render() {
        const { notes, onEdit, onDelete } = this.props;

        return (
            <ul className="notes">{notes.map(note =>
                <li className="note" key={note.id}>
                    <Note
                        id={note.id}
                        task={note.task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </li>
            )}</ul>
        );
    }
}

export default Notes;
