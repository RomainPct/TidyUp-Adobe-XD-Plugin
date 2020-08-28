import { AssetsGroup } from './AssetsGroup'
import { ColorRow } from './Rows/ColorRow'

const React = require('react')
require('./OrganizerView.css')

export const OrganizerView = (props) => {

    console.log('=== OrganizerView ===')
    console.log(props.assets)
    return (
        <div className="organizerView">
            {
                Object.keys((props.assets || {}).children || {}).map(function(key, _) {
                    {/* console.log('--->')
                    console.log(props.assets.children[key]) */}
                    if (props.assets.children[key].type == 'group') {
                        return <AssetsGroup key={key} name={key} assets={props.assets.children[key].children} />
                    }
                })
            }
        </div>
    )
}