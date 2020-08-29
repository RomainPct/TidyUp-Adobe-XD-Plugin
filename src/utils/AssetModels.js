export class Group {

    constructor(name) {
        this.name = name
        this.children = []
    }

    addChild(child) {
        if (this.getChild(child.name) === null) {
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
        this.name = name
        this.hex = hex
    }

}