"use strict";
const validate = (validatableInput) => {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
};
class ProjectList {
    constructor(type) {
        this.type = type;
        this.renderContent = () => {
            const listId = `${this.type}-projects-list`;
            this.sectionElement.querySelector("ul").id = listId;
            this.sectionElement.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        };
        this.attach = () => {
            this.displayElement.insertAdjacentElement("beforeend", this.sectionElement);
        };
        this.templateElement = document.getElementById("project-list");
        this.displayElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importedNode.firstElementChild;
        this.sectionElement.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
}
class ProjectInput {
    constructor() {
        this.gatherUserInput = () => {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
            if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
                alert("Invalid input, please try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        };
        this.clearInputs = () => {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        };
        this.submitHandler = (event) => {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                this.clearInputs();
            }
        };
        this.configure = () => {
            this.formElement.addEventListener("submit", this.submitHandler);
        };
        this.attach = () => {
            this.displayElement.insertAdjacentElement("afterbegin", this.formElement);
        };
        this.templateElement = document.getElementById("project-input");
        this.displayElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.titleInputElement = this.formElement.querySelector("#title");
        this.descriptionInputElement = this.formElement.querySelector("#description");
        this.peopleInputElement = this.formElement.querySelector("#people");
        this.configure();
        this.attach();
    }
}
const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map