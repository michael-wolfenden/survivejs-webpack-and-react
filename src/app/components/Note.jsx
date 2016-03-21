import React, { Component, PropTypes } from 'react';

class Note extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        };
    }

    onEdit = (task) => {
        this.props.onEdit(this.props.id, task);
    }

    onDelete = (e) => {
        // Avoid bubbling to edit
        e.stopPropagation();

        this.props.onDelete(this.props.id);
    }

    checkEnter = (e) => {
        // The user hit *enter*, let's finish up.
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    }

    edit = () => {
        // Enter edit mode.
        this.setState({
            editing: true,
        });
    }

    finishEdit = (e) => {
        // `Note` will trigger an optional `onEdit` callback once it
        // has a new value. We will use this to communicate the change to
        // `App`.
        //
        // A smarter way to deal with the default value would be to set
        // it through `defaultProps`.
        //
        // See the *Typing with React* chapter for more information.
        const value = e.target.value;

        this.onEdit(value);

       // Exit edit mode.
        this.setState({
            editing: false,
        });
    }

    renderEdit = () => (
        <input type="text"
            autoFocus
            defaultValue={this.props.task}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
        />
    )

    renderNote = () => (
        // If the user clicks a normal note, trigger editing logic.
        <div onClick={this.edit}>
          <span className="task">{this.props.task}</span>
          <button className="delete-note" onClick={this.onDelete}>x</button>
        </div>
    )

    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }

        return this.renderNote();
    }
}

export default Note;
