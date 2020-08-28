const React = require('react')
require('./AssetsGroup.css')

const { AssetType } = require('../../utils/AssetType')
const { Row } =  require('./Rows/Row')
const { ColorRow } =  require('./Rows/ColorRow')

export const AssetsGroup = ({key, name, assets}) => {
    return (
        <div className="assetsGroup">
            <Row name={name} details={Object.keys(assets || []).length} />
            <div className="childrenContainer">
                {Object.keys(assets || []).map(function(key, _) {
                    switch (assets[key].type) {
                        case AssetType.Group:
                            return <AssetsGroup key={key} name={key} assets={assets[key].children} />
                        case AssetType.Color:
                            return <ColorRow key={key} name={key} hex={assets[key].value} />
                        default:
                            return <h2>Unknown</h2>
                    }
                })}
            </div>
        </div>
    )
}