const React = require('react')
const styles = require('./App.css')

const assets = require('assets')
const { Group, Color } = require('../utils/AssetModels')

const { NavigationBar } = require('./Nav/NavigationBar')
const { OrganizerView } = require('./Organizer/OrganizerView')

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            documentRoot  : null,
            selection     : null,
            colorAssets: null,
            currentSection: 0
        };
        
        ['documentStateChanged', 'handleNavigationTo'].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }

    getOrderedColorAssets() {
        let colorAssets = new Group('Root')
        assets.colors.get().forEach((color) => {
            if (color.name) {
                const parts = color.name.split('/')
                let lastGroup = colorAssets
                for (const i in parts) {
                    if (i == parts.length - 1) {
                        console.log(color)
                        if (color.gradientType) {
                            // gérer l'ajout d'un gradient
                        } else {
                            lastGroup.addChild(new Color(parts[i], color.color.toHex()))
                        }
                    } else {
                        lastGroup.addChild(new Group(parts[i]))
                        lastGroup = lastGroup.getChild(parts[i])
                    }
                }
            } else {
                colorAssets.addChild(new Group('NotNamed'))
                colorAssets.getChild('NotNamed').addChild(new Color(color.color.toHex(), color.color.toHex()))
            }
        })
        return colorAssets
    }
    
    documentStateChanged(selection, documentRoot) {
        console.log(`======> documentStateChanged`)
        const colorAssets = this.getOrderedColorAssets()
        console.log(JSON.stringify(colorAssets))
        this.setState({ documentRoot, selection, colorAssets });
    }

    handleNavigationTo = (index) => {
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
                        {/* {this.state.currentSection == 1 ? <OrganizerView type="1" /> : ''}
                        {this.state.currentSection == 2 ? <OrganizerView type="2" /> : ''} */}
                    </div>
                </div>
            </panel>
        )
    }

}
    
module.exports = App