import { TextStyle } from '../../../utils/AssetModels'

const React = require('react')
require('./Row.css')
require('./TextStyleRow.css')

export const TextStyleRow = ({ textStyle = new TextStyle("unknown", {})}) => {
    return (
        <p className="row textStyleRow" style={{'borderColor' : textStyle.getHex()}}>
            {textStyle.name}
            <span className="details">{`${textStyle.style.fontSize}pt ${textStyle.style.fontStyle}`}</span>
        </p>
    )
}