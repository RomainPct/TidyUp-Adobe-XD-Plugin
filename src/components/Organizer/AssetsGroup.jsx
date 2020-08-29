const React = require('react')
require('./AssetsGroup.css')

import { Group, Color, TextStyle } from '../../utils/AssetModels'
import { TextStyleRow } from './Rows/TextStyleRow'

const { Row } =  require('./Rows/Row')
const { ColorRow } =  require('./Rows/ColorRow')

export const AssetsGroup = ({group}) => {
    return (
        <div className="assetsGroup">
            <Row name={group.name} details={group.children.length} />
            <div className="childrenContainer">
                {group.children.map(function(asset) {
                    switch(asset.constructor) {
                        case Group: return <AssetsGroup group={asset} />
                        case Color: return <ColorRow color={asset} />
                        case TextStyle: return <TextStyleRow textStyle={asset} />
                        default: return <h2>Unknown</h2>
                    }
                })}
            </div>
        </div>
    )
}