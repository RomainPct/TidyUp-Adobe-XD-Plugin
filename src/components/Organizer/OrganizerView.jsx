import { AssetsGroup } from './AssetsGroup'
import { ColorRow } from './Rows/ColorRow'
import { Group, Color, TextStyle } from '../../utils/AssetModels'
import { TextStyleRow } from './Rows/TextStyleRow'

const React = require('react')
require('./OrganizerView.css')

export const OrganizerView = ({ assets = {}}) => {

    return (
        <div className="organizerView">
            {((assets || {}).children || []).map(function(asset) {
                switch(asset.constructor) {
                    case Group: return <AssetsGroup group={asset} />
                    case Color: return <ColorRow color={asset} />
                    case TextStyle: return <TextStyleRow textStyle={asset} />
                    default: return <h2>Unknown</h2>
                }
            })}
        </div>
    )
}