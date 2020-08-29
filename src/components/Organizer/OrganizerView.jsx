import { AssetsGroup } from './AssetsGroup'
import { ColorRow } from './Rows/ColorRow'
import { Group, Color } from '../../utils/AssetModels'

const React = require('react')
require('./OrganizerView.css')

export const OrganizerView = (props) => {

    return (
        <div className="organizerView">
            {((props.assets || {}).children || []).map(function(asset) {
                switch(asset.constructor) {
                    case Group:
                        return <AssetsGroup group={asset} />
                    case Color:
                        return <ColorRow color={asset} />
                    default:
                        return <h2>Unknown</h2>
                }
            })}
        </div>
    )
}