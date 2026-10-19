// Objects

////////////////////////////////////////////////////////
// Use getters and setters
// bad
function makeBankAccount() {
    // ...

    return {
        balance: 0,
        // ...
    };
}

const account = makeBankAccount();
account.balance = 100;

// good
function makeBankAccount1() {
    let balance = 0;

    function getBalance() {
        return balance;
    }

    function setBalance(amount) {
        balance = amount;
    }

    return {
        getBalance,
        setBalance,
    };
}

const account1 = makeBankAccount1();
account.setBalance(100);
console.log(account.getBalance());

///////////////////////////////////////////////////////
// Make objects have private members
// bad
const Employee = function (name) {
    this.name = name;
};

Employee.prototype.getName = function getName() {
    return this.name;
};

const employee = new Employee("John Doe");
delete employee.name;

// good
const EmployeeGood = function (name) {
    return {
        getName() {
            return name;
        },
    };
};
