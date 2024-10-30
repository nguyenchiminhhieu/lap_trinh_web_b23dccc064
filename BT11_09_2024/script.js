// import { helloWorld } from "./package"; // Chua import duoc package6

const globalVar = 10; // es6 var


class Felidae {
  constructor(){
    this.species = "Felidae";
  }

  sleep(){
    console.log("ZZZ");
  }
}

class Cat extends Felidae  { // es6 class
  constructor(name, color, age){
    super();
    this.name = name;
    this.color = color; 
    this.age = age;
  }

  catIntroduce(){
    console.log(`I am ${this.name} from ${this.species}, I am ${this.age} years old and I am ${this.color}`);
  }

  sayMeow(){
    console.log("Meow Meow");
  }
}

const catto = new Cat("Catto", "Orange", 2);
const copyCat = {name: "CopyCat", ...catto}; // es6 spread operator

const {name, color, age} = catto; // es6 destructuring

const sum = (para = 50, ...other) => { // es6 arrow function
  let localVar = 20
  return localVar + para + other.reduce((acc, val) => acc + val, 0);
}

console.log("without para", sum()); // default para
console.log("with para", sum(100));
console.log("with para and other", sum(100, 10, 20, 30)); // rest parameter
console.log("global var", globalVar);
catto.catIntroduce();
// helloWorld();