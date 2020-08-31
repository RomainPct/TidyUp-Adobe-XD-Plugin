import { Symbol } from '../../../utils/AssetModels'

const React = require('react')
require('./Row.css')
require('./SymbolRow.css')

export const SymbolRow = ({ symbol = new Symbol('unknown', {}) }) => {
    return (
        <p className="row symbolRow">
            {symbol.name}
            <span className="details"></span>
        </p>
    )
}