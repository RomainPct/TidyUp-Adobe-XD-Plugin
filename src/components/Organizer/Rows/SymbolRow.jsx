import { Symbol } from '../../../utils/AssetModels'

const React = require('react')
const application = require('application')
require('./Row.css')
require('./SymbolRow.css')

export const SymbolRow = ({ symbol = new Symbol('unknown', {}) }) => {

    const clickAction = () => {
        console.log(`click action`)
        application.editDocument(selection => {
            console.log(selection.items)
        })
    }

    return (
        <p className="row symbolRow" onClick={clickAction}>
            {symbol.name}
            <span className="details"></span>
        </p>
    )
}