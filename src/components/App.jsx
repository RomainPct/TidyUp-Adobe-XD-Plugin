const React = require('react')
const styles = require('./App.css')

const assets = require('assets')
const { editDocument } = require('application')
const { shell } = require('uxp')
const viewport = require('viewport')

const { NavigationBar } = require('./Nav/NavigationBar')
const { OrganizerView } = require('./Organizer/OrganizerView')

const BottomSection = (props) => {
    return (<div className="bottom-section">
    <button onClick={props.onAboutClick}>About</button>
    </div>);
};

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            documentRoot  : null,
            selection     : null,
            colorAssets: null,
            currentSection: 0
        };
        
        ['documentStateChanged', 'handleAboutClick', 'handleNavigationTo'].forEach((fn) => {
            this[fn] = this[fn].bind(this);
        });
    }
    
    documentStateChanged(selection, documentRoot) {
        console.log(`documentStateChanged`)
        let colorAssets = {
            type: "parent",
            children: {
                NotNamed: {
                    type: "group",
                    children: {
    
                    }
                }
            }
        }
        assets.colors.get().forEach((color) => {
            if (color.name) {
                const parts = color.name.split('/')
                let lastGroup = colorAssets
                for (const i in parts) {
                    if (i == parts.length - 1) {
                        console.log(`-----------`)
                        console.log(`-> add color ${parts[i]} to ${JSON.stringify(lastGroup)} || ${parts}`)
                        lastGroup.children[parts[i]] = {
                            type: "color",
                            value: color.color.toHex()
                        }
                        console.log(colorAssets)
                        console.log(`-----------`)
                    } else {
                        if (lastGroup.children[parts[i]] === undefined) {
                            lastGroup.children[parts[i]] = {
                                type: "group",
                                children: {}
                            }
                        }
                        lastGroup = lastGroup.children[parts[i]]
                    }
                }
            } else {
                colorAssets.children["NotNamed"]["children"][color.color.toHex()] = {
                    type: "color",
                    value: color.color.toHex()
                }
            }
        })
        console.log(`===============`)
        console.log(JSON.stringify(colorAssets))
        this.setState({ documentRoot, selection, colorAssets });
    }
    
    handleAboutClick = (event) => {
        shell.openExternal('https://github.com/de-ai/xd-blog-expo/blob/master/README.md');
    };

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
                    {/* <MainContent onZoomSelection={this.handleZoomSelection} /> */}
                        {this.state.currentSection == 0 ? <OrganizerView type="0" assets={this.state.colorAssets} /> : ''}
                        {/* {this.state.currentSection == 1 ? <OrganizerView type="1" /> : ''}
                        {this.state.currentSection == 2 ? <OrganizerView type="2" /> : ''} */}
                    </div>
            
                    <BottomSection onAboutClick={this.handleAboutClick} />
                </div>
            </panel>
        )
    }

}
    
module.exports = App