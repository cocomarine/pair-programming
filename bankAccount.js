class BankAccount {
    static #nextAccountNumber = 100000;

    constructor(customerName, accountNumber = null, balance = 0.00) {
        this._customerName = customerName;
        this._accountNumber = accountNumber || BankAccount.#nextAccountNumber++;
        this._balance = Number(balance.toFixed(2));
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = Number(value.toFixed(2));
    }

    deposit(amount) {
        if (amount > 0) {
            this._balance += Number(amount.toFixed(2));
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= Number(amount.toFixed(2));
            return true;
        }
        return false;
    }
}

class CurrentAccount extends BankAccount {
    constructor(customerName, accountNumber = null, balance = 0.00, overdraftLimit = 0.00) {
        super(customerName, accountNumber, balance);
        this._overdraftLimit = Number(overdraftLimit.toFixed(2));
    }

    get overdraftLimit() {
        return this._overdraftLimit;
    }

    set overdraftLimit(value) {
        this._overdraftLimit = Number(value.toFixed(2));
    }

    withdraw(amount) {
        if (amount > 0 && amount <= (this._balance + this._overdraftLimit)) {
            this._balance -= Number(amount.toFixed(2));
            return true;
        }
        return false;
    }
}

class SavingsAccount extends BankAccount {
    constructor(customerName, accountNumber = null, balance = 0.00, interestRate = 0.0) {
        super(customerName, accountNumber, balance);
        this._interestRate = interestRate;
    }

    get interestRate() {
        return this._interestRate;
    }

    set interestRate(value) {
        this._interestRate = value;
    }

    addInterest() {
        const interest = this._balance * (this._interestRate / 100);
        this._balance += Number(interest.toFixed(2));
        return interest;
    }
}