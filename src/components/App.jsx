const React = require('react')
const styles = require('./App.css')

const assets = require('assets')
const { Text, SymbolInstance, Artboard, Group:AdobeGroup } = require('scenegraph')
const { Group, Color, TextStyle, Symbol } = require('../utils/AssetModels')

const { NavigationBar } = require('./Nav/NavigationBar')
const { OrganizerView } = require('./Organizer/OrganizerView')

class App extends React.Component {
    constructor(props) {
        super(props);

        this.defaultSection = props.defaultSection

        this.state = {
            documentRoot  : null,
            selection     : null,
            colorAssets: null,
            fontStyles: null,
            symbols: null,
            currentSection: 0
        };
        
        ['documentStateChanged', 'handleNavigationTo'].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    orderAssets(assets, generateAssetCallback) {
        let orderedAssets = new Group('Root')
        assets.forEach(asset => {
            if (asset.name) {
                const parts = asset.name.split('/')
                let lastGroup = orderedAssets
                for (const i in parts) {
                    if (i == parts.length - 1) {
                        lastGroup.addChild(generateAssetCallback(asset, parts[i]))
                    } else {
                        lastGroup.addChild(new Group(parts[i]))
                        lastGroup = lastGroup.getChild(parts[i])
                    }
                }
            } else {
                orderedAssets.addChild(new Group('NotNamed'))
                orderedAssets.getChild('NotNamed').addChild(generateAssetCallback(asset))
            }
        })
        return orderedAssets
    }

    getOrderedFontStyles() {
        const fontStyles = this.orderAssets(assets.characterStyles.get(), (fontStyle, name = null) => {
            return new TextStyle(name, fontStyle.style)
        })
        return fontStyles
    }

    getOrderedColorAssets() {
        const colorAssets = this.orderAssets(assets.colors.get(), (color, name = null) => {
            if (color.gradientType) {
                return {}
            } else {
                return new Color(name, color.color.toHex())
            }
        })
        return colorAssets
    }

    iterateThroughElements(elements, addElement) {
        elements.forEach(elem => {
            if (elem instanceof SymbolInstance && elem.isMaster) {
                addElement(elem)
                this.iterateThroughElements(elem.children, addElement)
            }
            if (elem.children.length > 0) {
                this.iterateThroughElements(elem.children, addElement)
            }
        })
    }

    getOrderedSymbols(documentRoot) {
        let selectedSymbols = []
        this.iterateThroughElements(documentRoot.children, elem => { selectedSymbols.push(elem) })
        const symbols = this.orderAssets(selectedSymbols, (symbol, name = null) =>  new Symbol(name, symbol) )
        console.log(symbols)
        return symbols
    }

    defineSelectedSection(selection) {
        if (this.defaultSection !== null) {
            return this.defaultSection
        }
        this.defaultSection = null
        if (selection.items.length == 0) {
            return 2
        }
        if (selection.items[0] instanceof Text) {
            return 1
        }
        return 0
    }
    
    documentStateChanged(selection, documentRoot) {
        console.log(`======> documentStateChanged`)
        const currentSection = this.defineSelectedSection(selection)
        const colorAssets = this.getOrderedColorAssets()
        const fontStyles = this.getOrderedFontStyles()
        const symbols = this.getOrderedSymbols(documentRoot)
        this.setState({ documentRoot, selection, colorAssets, fontStyles, currentSection, symbols })
    }

    handleNavigationTo = (index) => {
        this.defaultSection = null
        this.setState({
            ...this.state,
            currentSection: index
        })
    }
    
    render() {
        return (
            <panel className={styles.panel}>
                <div className="panel-content-wrapper">
                    <NavigationBar currentSection={this.state.currentSection} navTo={this.handleNavigationTo} />
            
                    <div className="main-content-wrapper">
                        {this.state.currentSection == 0 ? <OrganizerView type="0" assets={this.state.colorAssets} /> : ''}
                        {this.state.currentSection == 1 ? <OrganizerView type="1" assets={this.state.fontStyles} /> : ''}
                        {this.state.currentSection == 2 ? <OrganizerView type="2" assets={this.state.symbols} /> : ''}
                    </div>
                </div>
            </panel>
        )
    }

}
    
module.exports = App