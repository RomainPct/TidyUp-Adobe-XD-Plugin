import { AssetsGroup } from './AssetsGroup'
import { ColorRow } from './Rows/ColorRow'
import { Group, Color, TextStyle, Symbol } from '../../utils/AssetModels'
import { TextStyleRow } from './Rows/TextStyleRow'
import { SymbolRow } from './Rows/SymbolRow'

const React = require('react')
require('./OrganizerView.css')

export const OrganizerView = ({ assets = {}}) => {

    return (
        <div className="organizerView">
            {((assets || {}).children || []).map(function(asset) {
                switch(asset.constructor) {
                    case Group: return <AssetsGroup key={asset.id} group={asset} />
                    case Color: return <ColorRow key={asset.id} color={asset} />
                    case TextStyle: return <TextStyleRow key={asset.id} textStyle={asset} />
                    case Symbol: return <SymbolRow key={asset.id} symbol={asset} />
                    default: return <h2>Unknown</h2>
                }
            })}
        </div>
    )
}