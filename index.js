class Computer {
    constructor() {
        this.name = name
    }
} 
  run () {
    console.log("running...")

  }
}

class Laptop extends Computer {
    constructor(name, company) {
        super(name)
        this.company = company
    }