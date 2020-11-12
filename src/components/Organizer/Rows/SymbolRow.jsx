import { Symbol } from '../../../utils/AssetModels'

const React = require('react')
const application = require('application')
const scenegraph = require('scenegraph')
const commands = require('commands')
require('./Row.css')
require('./SymbolRow.css')

export const SymbolRow = ({ symbol = new Symbol('unknown', {}) }) => {

    const clickAction = () => {
        console.log(`click action`)
        application.editDocument(selection => {
            const originalSelectionItems = scenegraph.selection.items
            console.log(`1 originalSelectionItems : ${originalSelectionItems}`)
            // Select master symbol
            scenegraph.selection.items = symbol.instance
            // Duplicate symbol
            commands.duplicate()
            // Remove selection from parents
            console.log(`2 selection.items : ${scenegraph.selection.items}`)
            const newInstance = scenegraph.selection.items[0]
            console.log(`3 newInstance : ${newInstance}`)
            console.log(newInstance.children)
            newInstance.removeFromParent()
            console.log(`4 newInstance : ${newInstance}`)
            // Paste selection
            if (originalSelectionItems.length <= 0) {
                console.log(`-> empty original selection`)
            } else if (selection.items.length === 1) {
                console.log(`-> single original selection`)
                console.log(newInstance.children)
                const children = newInstance.children
                // newInstance.removeAllChildren()
                originalSelectionItems[0].addChild(newInstance)
                // console.log(children)
                // children.forEach(child => {
                //     console.log(`add child ${child}`)
                //     newInstance.addChild(child)
                // })
            } else {
                console.log(`-> multiple original selection`)
            }
        })
    }

    return (
        <p className="row symbolRow" onClick={clickAction}>
            {symbol.name}
            <span className="details"></span>
        </p>
    )
}