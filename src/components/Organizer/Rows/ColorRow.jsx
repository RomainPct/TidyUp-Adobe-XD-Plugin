import { Color } from '../../../utils/AssetModels'

const React = require('react')
const application = require('application')
require('./Row.css')
require('./ColorRow.css')

export const ColorRow = ({ color = new Color('NoName','#ffffff') }) => {

    const clickAction = (e) => {
        application.editDocument(selection => {
            selection.items.forEach(item => {
                if (e.metaKey) {
                    item.stroke = color.color
                } else {
                    item.fill = color.color
                }
            })
        })
    }

    return (
        <p
            className="row colorRow"
            style={{'borderColor' : color.hex}}
            onClick={clickAction}
            >
            {color.name}
            <span className="details">{color.hex}</span>
        </p>
    )
}