export class AssetBase {

    constructor(fullname, type) {
        this.id = `${fullname}_${type}`
    }

}

export class Group extends AssetBase {

    constructor(name) {
        super(name, 'group')
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

    reorder() {
        this.children.sort((a, b) => {
            if (a instanceof Group && !(b instanceof Group) )  return -1
            if (a.name > b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
        this.children.forEach(child => {
            if (child instanceof Group) child.reorder()
        })
    }

}

export class Color extends AssetBase {

    constructor(name, hex) {
        super(name, 'color')
        this.name = name || hex
        this.hex = hex
    }

}

export class TextStyle extends AssetBase {

    constructor(name, style) {
        const textStyleName = name || `${style.fontFamily} ${style.fontSize} ${style.fontStyle}`
        super(textStyleName, 'textstyle')
        this.name = textStyleName
        this.style = style
    }

    getHex() {
        return this.style.fill.toHex()
    }

}

export class Symbol extends AssetBase {

    constructor(name, masterSymbol) {
        super(masterSymbol.name, 'mastersymbol')
        this.name = name
        this.infos = masterSymbol
    }

}