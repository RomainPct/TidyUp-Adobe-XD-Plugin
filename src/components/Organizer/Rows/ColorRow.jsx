const React = require('react')
require('./Row.css')
require('./ColorRow.css')

export const ColorRow = ({hex = '#ffffff', name = 'NoName'}) => {
    return (
        <p className="row colorRow" style={{'borderColor' : hex}} >
            {name}
            <span className="details">{hex}</span>
        </p>
    )
}