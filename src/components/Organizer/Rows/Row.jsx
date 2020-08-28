const React = require('react')
require('./Row.css')

export const Row = (props) => {
    return (
        <p className="row">
            {props.name}
            <span className="details">{props.details ? `(${props.details})` : ''}</span>
        </p>
    )
}