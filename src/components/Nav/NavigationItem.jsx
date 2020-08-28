const React = require('react')

export const NavigationItem = (props) => {
    return (
        <button uxp-variant={props.currentSection == props.index ? 'cta' : ''} onClick={() => props.navTo(props.index)}>
            {props.name}
        </button>
    )
}