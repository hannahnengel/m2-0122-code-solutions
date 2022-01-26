function ExampleConstructor() {

}

console.log('ExampleConstructor.prototype', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor.prototype', typeof ExampleConstructor.prototype);

var newExampleConstructor = new ExampleConstructor();
var isInstanceOfExampleConstructor = newExampleConstructor instanceof ExampleConstructor;
console.log('isInstanceOfExampleConstructor', isInstanceOfExampleConstructor);
