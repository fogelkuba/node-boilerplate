// szkolenie3

const types = {
    array: 'array',
    integer: 'integer',
    float: 'float',
    string: 'string'
};

class Strategy {
    constructor(value = 'dupa', type) {
        this.value = value;
        this.type = type;

        this.init()
    }

    init() {
        try {
            this[this.type + 'Driver']()

        } catch(err) {
            console.log(`UNHANDLED TYPE ${this.type}`);
        }
    }

    //
    arrayDriver() {
        const result = this.join();
        new Print(result)
    }
    integerDriver() {
        const result = this.strong();
        new Print(result)
    }
    floatDriver() {
        const result = this.italic();
        new Print(result)
    }
    stringDriver() {
        const result = this.paragraph();
        new Print(result)
    }

    //
    join() {
        return this.value.join('.')
    }
    strong() {
        return `<strong>${this.value}</strong>`
    }
    italic() {
        return `<i>${this.value}</i>`
    }
    paragraph() {
        return `<p>${this.value}</p>`
    }
}

class Print {
    constructor(val) {
        this.init(val);
    }

    init(val) {
        console.log(`RESULT:  ${val}`)
    }
}

new Strategy([192, 168, 0, 1], types.array);
new Strategy(123, types.integer);
new Strategy(3.14, types.float);
new Strategy('dupa', types.string);
new Strategy('dupa', 'test');
