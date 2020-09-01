const React = require('react')
require('./AssetsGroup.css')

import { Group, Color, TextStyle, Symbol } from '../../utils/AssetModels'
import { TextStyleRow } from './Rows/TextStyleRow'
import { SymbolRow } from './Rows/SymbolRow'
import { useState } from 'react'

const { Row } =  require('./Rows/Row')
const { ColorRow } =  require('./Rows/ColorRow')

export const AssetsGroup = ({group}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
        className={isOpen ? 'assetsGroup open' : 'assetsGroup'}
        onMouseEnter={_ => setIsOpen(true)}
        onMouseLeave={_ => setIsOpen(false)}
        >
            <Row name={group.name} details={group.children.length} />
            <div className="childrenContainer">
                {group.children.map(function(asset) {
                    switch(asset.constructor) {
                        case Group: return <AssetsGroup key={asset.id} group={asset} />
                        case Color: return <ColorRow key={asset.id} color={asset} />
                        case TextStyle: return <TextStyleRow key={asset.id} textStyle={asset} />
                        case Symbol: return <SymbolRow key={asset.id} symbol={asset} />
                        default: return <h2>Unknown</h2>
                    }
                })}
            </div>
        </div>
    )
}