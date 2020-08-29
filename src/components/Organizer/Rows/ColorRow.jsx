import { Color } from '../../../utils/AssetModels'

const React = require('react')
require('./Row.css')
require('./ColorRow.css')

export const ColorRow = ({ color = new Color('NoName','#ffffff') }) => {
    return (
        <p className="row colorRow" style={{'borderColor' : color.hex}} >
            {color.name}
            <span className="details">{color.hex}</span>
        </p>
    )
}