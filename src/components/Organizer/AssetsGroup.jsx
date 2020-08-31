const React = require('react')
require('./AssetsGroup.css')

import { Group, Color, TextStyle, Symbol } from '../../utils/AssetModels'
import { TextStyleRow } from './Rows/TextStyleRow'
import { SymbolRow } from './Rows/SymbolRow'

const { Row } =  require('./Rows/Row')
const { ColorRow } =  require('./Rows/ColorRow')

export const AssetsGroup = ({group}) => {
    return (
        <div className="assetsGroup">
            <Row name={group.name} details={group.children.length} />
            <div className="childrenContainer">
                {group.children.map(function(asset) {
                    switch(asset.constructor) {
                        case Group: return <AssetsGroup key={asset.name} group={asset} />
                        case Color: return <ColorRow key={asset.name} color={asset} />
                        case TextStyle: return <TextStyleRow key={asset.name} textStyle={asset} />
                        case Symbol: return <SymbolRow key={asset.name} symbol={asset} />
                        default: return <h2>Unknown</h2>
                    }
                })}
            </div>
        </div>
    )
}