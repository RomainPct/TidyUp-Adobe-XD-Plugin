export class AssetBase {

    constructor(asset, type) {
        const stringifiedAsset = type == 'mastersymbol' ? asset.symbolId : JSON.stringify(asset)
        let hash = 0, i, chr
        for (i = 0; i < stringifiedAsset.length; i++) {
            chr   = stringifiedAsset.charCodeAt(i)
            hash  = ((hash << 5) - hash) + chr
            hash |= 0 // Convert to 32bit integer
        }
        this.id = `${hash}_${type}`
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

    constructor(name, color) {
        super(color, 'color')
        this.color = color.color
        this.hex = color.color.toHex()
        this.name = name || this.hex
    }

}

export class TextStyle extends AssetBase {

    constructor(name, fs) {
        super(fs, 'textstyle')
        this.name = name || `${fs.style.fontFamily} ${fs.style.fontSize} ${fs.style.fontStyle}`
        this.style = fs.style
    }

    getHex() {
        return this.style.fill.toHex()
    }

}

export class Symbol extends AssetBase {

    constructor(name, masterSymbol) {
        super(masterSymbol, 'mastersymbol')
        this.name = name
        this.instance = masterSymbol
    }

}