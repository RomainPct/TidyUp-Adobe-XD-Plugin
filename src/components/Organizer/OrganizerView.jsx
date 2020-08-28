import { AssetsGroup } from './AssetsGroup'
import { ColorRow } from './Rows/ColorRow'

const React = require('react')
require('./OrganizerView.css')

export const OrganizerView = (props) => {

    return (
        <div className="organizerView">
            {Object.keys((props.assets || {}).children || {}).map(function(key, _) {
                switch(props.assets.children[key].type) {
                    case 'group':
                        return <AssetsGroup key={key} name={key} assets={props.assets.children[key].children} />
                    case 'color':
                        return <ColorRow name={key} hex={props.assets.children[key].value} />
                    default:
                        return <h2>Unknown</h2>
                }
            })}
        </div>
    )
}