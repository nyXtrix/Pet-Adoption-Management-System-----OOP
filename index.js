"use strict";
class Pet {
    constructor(name, age) {
        if (new.target === Pet) {
            throw new Error("Cannot instantiate abstract class Pet.");
        }
        this.name = name;
        this.age = age;
        this.available = true;
    }
    adopt() {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    }
    returnPet() {
        this.available = true;
    }
}
class Dog extends Pet {
    constructor(name, age, breed) {
        super(name, age);
        this.breed = breed;
    }
    getDetails() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Type: Dog, Breed: ${this.breed}, Available: ${this.available ? "Yes" : "No"}`);
    }
}
class Cat extends Pet {
    constructor(name, age, color) {
        super(name, age);
        this.color = color;
    }
    getDetails() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Type: Cat, Color: ${this.color}, Available: ${this.available ? "Yes" : "No"}`);
    }
}
class Adopter {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.adoptedPets = [];
    }
    adopt(pet) {
        if (pet.adopt()) {
            this.adoptedPets.push(pet);
            console.log(`${this.name} adopted ${pet.name}`);
        }
        else {
            console.log(`${pet.name} is not available`);
        }
    }
    returnPet(petName) {
        const index = this.adoptedPets.findIndex((p) => p.name === petName);
        if (index >= 0) {
            const pet = this.adoptedPets[index];
            pet.returnPet();
            this.adoptedPets.splice(index, 1);
            console.log(`${this.name} returned ${petName}`);
        }
        else {
            console.log(`${this.name} has not adopted ${petName}`);
        }
    }
    getDetails() {
        console.log(`Adopter: ${this.name}, ID: ${this.id}`);
        if (this.adoptedPets.length > 0) {
            this.adoptedPets.forEach((pet) => {
                console.log(`- ${pet.name}`);
            });
        }
        else {
            console.log("No pets adopted");
        }
    }
}
class AdoptionCenter {
    constructor() {
        this.pets = [];
        this.adopters = [];
    }
    addPet(pet) {
        const existing = this.pets.find((p) => p.name === pet.name);
        if (!existing) {
            this.pets.push(pet);
            console.log(`${pet.name} is added`);
        }
        else {
            console.log(`${pet.name} is already added`);
        }
    }
    addAdopter(adopter) {
        const existing = this.adopters.find((a) => a.id === adopter.id);
        if (!existing) {
            this.adopters.push(adopter);
            console.log(`${adopter.name} is added`);
        }
        else {
            console.log(`${adopter.name} already exists`);
        }
    }
    listAllPets() {
        console.log("Available Pets:");
        if (this.pets.length > 0) {
            this.pets.forEach((pet) => pet.getDetails());
        }
        else {
            console.log("No pets available");
        }
    }
    listAllAdopters() {
        console.log("Adopters:");
        if (this.adopters.length > 0) {
            this.adopters.forEach((adopter) => adopter.getDetails());
        }
        else {
            console.log("No adopters found");
        }
    }
    findPetByName(name) {
        return this.pets.find((p) => p.name === name);
    }
    findAdopter(id) {
        return this.adopters.find((a) => a.id === id);
    }
}
const center = new AdoptionCenter();
const dog1 = new Dog("Buddy", 3, "Golden Retriever");
const dog2 = new Dog("Lucky", 2, "Labrador");
const cat1 = new Cat("Meow", 1, "Black");
const cat2 = new Cat("Kitty", 4, "White");
center.addPet(dog1);
center.addPet(dog2);
center.addPet(cat1);
center.addPet(cat2);
center.addPet(new Dog("Buddy", 5, "Poodle"));
const adopter1 = new Adopter(1, "Alice");
const adopter2 = new Adopter(2, "Bob");
center.addAdopter(adopter1);
center.addAdopter(adopter2);
center.addAdopter(new Adopter(1, "Alice"));
center.listAllPets();
center.listAllAdopters();
adopter1.adopt(dog1);
adopter1.adopt(cat1);
adopter2.adopt(dog1);
adopter2.adopt(cat2);
adopter1.returnPet("Meow");
center.listAllPets();
center.listAllAdopters();
