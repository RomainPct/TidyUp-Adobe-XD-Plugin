const React = require('react')
require('./AssetsGroup.css')

import { Row } from './Rows/Row'
import { ColorRow } from './Rows/ColorRow'

export const AssetsGroup = ({key, name, assets}) => {
    // console.log(`----`)
    // console.log(Object.keys(assets || []).length)
    return (
        <div className="assetsGroup">
            <Row name={name} details={Object.keys(assets || []).length} />
            <div className="childrenContainer">
                {Object.keys(assets || []).map(function(key, _) {
                    switch (assets[key].type) {
                        case 'group':
                            return <AssetsGroup key={key} name={key} assets={assets[key].children} />
                        case 'color':
                            return <ColorRow name={key} hex={assets[key].value} />
                        default:
                            return <h2>Unknown</h2>
                    }
                })}
            </div>
        </div>
    )
}