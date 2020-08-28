const React = require('react')
const { NavigationItem } = require('./NavigationItem')


export const NavigationBar = (props) => {
    return (
        <div className="navigationBar">
            <NavigationItem {...props} name="Colors" index={0} />
            <NavigationItem {...props} name="Texts" index={1} />
            <NavigationItem {...props} name="Components" index={2} />
        </div>
    )
}