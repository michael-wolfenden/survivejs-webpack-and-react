import React, { Component } from 'react';
import uuid from 'node-uuid';

import Notes from './Notes.jsx';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn Webpack',
                },
                {
                    id: uuid.v4(),
                    task: 'Learn React',
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry',
                },
            ],
        };
    }

    addNote = () => {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'New task',
            }]),
        });
    }

    editNote = (id, task) => {
        if (!task.trim()) {
            return;
        }

        const notes = this.state.notes.map(note => {
            if (note.id === id && task) {
                return {
                    ...note,
                    task,
                };
            }

            return note;
        });

        this.setState({ notes });
    }

    deleteNote = (id) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id),
        });
    };

    render() {
        const notes = this.state.notes;

        return (
            <div>
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes
                    notes={notes}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote}
                />
            </div>
        );
    }
}

export default App;
