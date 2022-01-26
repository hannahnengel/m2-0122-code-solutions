/* exported Bank */

function Bank() {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if ((Math.sign(balance) === 1) && (balance % 1 === 0)) {
    var account = new Account(this.nextAccountNumber, holder);
    account.deposit(balance);
    this.accounts.push(account);
    this.nextAccountNumber++;
    return account.number;
  } else return null;
};

Bank.prototype.getAccount = function (number) {
  for (var i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i].number === number) {
      return this.accounts[i];
    }
  }
  return null;
};

Bank.prototype.getTotalAssets = function () {
  var sumOfAllBalances = 0;
  if (this.accounts.length === 0) {
    return sumOfAllBalances;
  } else {
    for (var i = 0; i < this.accounts.length; i++) {
      sumOfAllBalances += this.accounts[i].getBalance();
    }
    return sumOfAllBalances;
  }
};
