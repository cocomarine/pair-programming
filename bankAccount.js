class BankAccount {
    static nextAccountNumber = 100000;

    constructor(customerName, accountNumber = null, balance = 0) {
        this.customerName = customerName;
        this.accountNumber = accountNumber || BankAccount.nextAccountNumber++;
        this.balance = Number(balance.toFixed(2));
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance = Number((this.balance + amount).toFixed(2));
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance = Number((this.balance - amount).toFixed(2));
            return true;
        }
        return false;
    }
}

class CurrentAccount extends BankAccount {
    constructor(customerName, accountNumber = null, balance = 0, overdraftLimit = 0) {
        super(customerName, accountNumber, balance);
        this.overdraftLimit = Number(overdraftLimit.toFixed(2));
    }

    withdraw(amount) {
        if (amount > 0 && amount <= (this.balance + this.overdraftLimit)) {
            this.balance = Number((this.balance - amount).toFixed(2));
            return true;
        }
        return false;
    }
}

class SavingsAccount extends BankAccount {
    constructor(customerName, accountNumber = null, balance = 0, interestRate = 0) {
        super(customerName, accountNumber, balance);
        this.interestRate = interestRate;
    }

    addInterest() {
        const interest = this.balance * (this.interestRate / 100);
        this.balance = Number((this.balance + interest).toFixed(2));
        return interest;
    }
}

let account = new BankAccount('John Doe');
account.deposit(100);
console.log(account.balance); // 100

let currentAccount = new CurrentAccount('John Doe', 100, 100, 50);
currentAccount.withdraw(150);
console.log(currentAccount.balance); // -50

let savingsAccount = new SavingsAccount('John Doe', 100, 100, 10);
savingsAccount.addInterest();
console.log(savingsAccount.balance); // 110