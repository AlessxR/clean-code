// Use method chaining
// Bad
class Car {
    constructor() {
        this.make = "Honda";
        this.model = "Accord";
        this.color = "white";
    }

    setMake(make) {
        this.make = make;
        // Return for chaining
        return this;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    save() {
        console.log(this.make, this.model, this.color);
        return this;
    }
}

const car1 = new Car();
car1.setColor("pink");
car1.setMake("ford");
car1.setModel("F-150");
car1.save();

// Good
const car2 = new Car()
    .setColor("pink")
    .setMake("Ford")
    .setModel("F-150")
    .save();

/////////////////////////////////////////////////////////////
// Prefer composition over inheritance
// bad
class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // ...
}

// bad because Employees have tax data, employeetadata is not a type of employee
class EmployeeTaxData extends Employee {
    constructor(ssn, salary) {
        super();
        this.ssn = ssn;
        this.salary = salary;
    }

    // ...
}

// good
class EmployeeTaxData1 {
    constructor(ssn, salary) {
        this.ssn = ssn;
        this.salary = salary;
    }

    // ...
}

class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    setTaxData(ssn, salary) {
        this.taxData = new EmployeeTaxData1(ssn, salary);
    }
}
