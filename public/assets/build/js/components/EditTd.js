import React, { Component, PropTypes } from 'react';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    method: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    data: PropTypes.object.isRequired,
}

class EditTd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            value: props.value,
            error: false,
            submitting: false,
        }

        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDoubleClick() {
        this.setState({
            editing: true
        }, () => {
            this.refs.input.focus();
        })
    }

    handleSubmit(e) {
        let { name, action, method, data, value } = this.props;

        const text = e.target.value.trim();
        if (text === '' || text === value) {
            return this.setState({
                editing: false,
            })
        }
        // ajax 提交
        if (!method) method = 'POST';
        data[name] = text;

        $.ajax({
            url: action,
            type: method,
            data,
            dataType: 'json'
        })
            .done(() => {

            })
            .fail((error) => {
                console.log(error);

                this.setState({
                    error: true
                })
            });
    }

    render() {
        // 对象的解构需要 babel-preset-stage 支持，stage-1 可以
        const { name, action, method, type, value, data,  ...props } = this.props;
        let element;

        if (this.state.editing) {
            element = <input
                className="form-control"
                defaultValue={ value }
                onBlur={ this.handleSubmit }
                ref="input"
            />
        } else {
            element = <p>{ value }</p>;
        }

        return (
            <td
                { ...props }
                onDoubleClick={ this.handleDoubleClick }
            >
                { element }
            </td>
        )
    }
}

EditTd.propTypes = propTypes;

export default EditTd;