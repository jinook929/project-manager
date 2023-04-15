"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
console.log("===> Sending analytics data...");
console.log("app.ts first line!");
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj.hobbies);
const countAndDescribe = (element) => {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
};
console.log(countAndDescribe(["Hi there!", "Hello!"]));
// console.log(countAndDescribe("Hi there!")); // Error
const extractAndConvert = (obj, key) => {
    return "Value: " + obj[key];
};
console.log(extractAndConvert({ name: "Max" }, "name"));
const createCourseGoal = (title, description, date) => {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
};
console.log(createCourseGoal("Understanding TypeScript", "Learn TypeScript with Max", new Date()));
// const Logger = (constructor: Function) => {
//     console.log("Logging...");
//     console.log(constructor);
// };
const Logger = (logString) => {
    console.log("LOGGER FACTORY");
    return (constructor) => {
        console.log(logString);
        console.log(constructor);
    };
};
const WithTemplate = (template, hookId) => {
    console.log("TEMPLATE FACTORY");
    return (constructor) => {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
};
let Person = class Person {
    constructor() {
        this.name = "Jinook";
        console.log("Creating person object...");
    }
};
Person = __decorate([
    Logger("LOGGING - PERSON"),
    WithTemplate("<h1>My Person Object</h1>", "app")
], Person);
const person = new Person();
console.log(person);
const Log = (target, propertyName) => {
    console.log("Property decorator!");
    console.log(target, propertyName);
};
const Log2 = (target, name, descriptor) => {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const Log4 = (target, name, position) => {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
};
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price - should be positive!");
        }
    }
    get price() {
        return this._price;
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
//# sourceMappingURL=analytics.js.map