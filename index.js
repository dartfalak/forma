
import { Computer } from './comp.js'


class Computer {
    constructor() {
        this.name = name
    }
} 
  run () {
    console.log("running...")

  }


class Laptop extends Computer {
    constructor(name, company) {
        super(name)
        this.company = company
    }

    logInfo() {
        console.log(`This is a ${this.name} laptop from ${this.company}.`)
    }
}
