var name = 'Yannis';
console.log(name);

var secondName = 'Pistolas';
console.log(secondName);

name = 'Other';
console.log(secondName);

var person = {
    age: 28,
    name: 'Yannis',
    hobbies: ['Sports', 'Cooking']
};

var thirdPerson = {
    age: 28,
    name: 'Yannis',
    hobbies: ['Sports', 'Cooking']
};
//var secondPerson = person;
var secondPerson = Object.assign({},person);
console.log(secondPerson);

person.name = 'Chris';
person.hobbies.push('Reading');
console.log(secondPerson);

console.log(thirdPerson);