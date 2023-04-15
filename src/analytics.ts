console.log("===> Sending analytics data...");console.log("app.ts first line!");

const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj.hobbies);

type Lengthy = string[];

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Hi there!", "Hello!"]));
// console.log(countAndDescribe("Hi there!")); // Error

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Max" }, "name"));
// console.log(extractAndConvert({}, "name")); // Error

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createCourseGoal = (title: string, description: string, date: Date): CourseGoal => {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

console.log(createCourseGoal("Understanding TypeScript", "Learn TypeScript with Max", new Date()));

// const Logger = (constructor: Function) => {
//     console.log("Logging...");
//     console.log(constructor);
// };

const Logger = (logString: string) => {
  console.log("LOGGER FACTORY");
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  }
}

const WithTemplate = (template: string, hookId: string) => {
  console.log("TEMPLATE FACTORY");
  return (constructor: any) => {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  }
}

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Jinook";

  constructor() {
    console.log("Creating person object...")
  }
}

const person = new Person();

console.log(person);

const Log = (target: any, propertyName: string | Symbol) => {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  get price() {
    return this._price;
  }
  
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}