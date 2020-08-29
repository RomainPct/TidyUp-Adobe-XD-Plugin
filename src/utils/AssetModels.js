export class Group {

    constructor(name) {
        this.name = name
        this.children = []
    }

    addChild(child) {
        if (child.name && !(child instanceof Group && this.getChild(child.name) !== null)) {
            this.children.push(child)
        }
    }

    getChild(name) {
        for (const child of this.children) {
            if (child.name == name) {
                return child
            }
        }
        return null
    }

}

export class Color {

    constructor(name, hex) {
        this.name = name || hex
        this.hex = hex
    }

}

export class TextStyle {

    constructor(name, style) {
        this.name = name || `${style.fontFamily} ${style.fontSize} ${style.fontStyle}`
        this.style = style
    }

    getHex() {
        return this.style.fill.toHex()
    }

}