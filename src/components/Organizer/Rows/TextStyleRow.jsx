import { TextStyle } from '../../../utils/AssetModels'

const React = require('react')
const application = require('application')
require('./Row.css')
require('./TextStyleRow.css')

export const TextStyleRow = ({ textStyle = new TextStyle("unknown", {})}) => {

    const clickAction = () => {
        application.editDocument(selection => {
            selection.items.forEach(item => {
                for (const [key, value] of Object.entries(textStyle.style)) {
                    item[key] = value
                }
            })
        })
    }

    return (
        <p className="row textStyleRow" style={{'borderColor' : textStyle.getHex()}} onClick={clickAction}>
            {textStyle.name}
            <span className="details">{`${textStyle.style.fontSize}pt ${textStyle.style.fontStyle}`}</span>
        </p>
    )
}