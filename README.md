## TypeScript

#### Why TypeScript? 

Take a look at the JS code below. It doesn't throw an error and gives us a valid output even when we perform invalid operations. To solve such problems TypeScript comes to our rescue by introducing types.

```js
console.log(null * 100) // 0 
console.log(undefined * 340);// Nan
```

- TS helps you show errors before runtime, i.e. it does something called static typing which means checking for any type errors before the execution of the program. 
- The same TS program is compiled into the JS program later.

#### Type Annotation Basics

1. String

```ts
// syntax -> let varName:type = 'xyz'
let movieTitle: string = 'Imitation Game'; 
movieTitle = 34; // assigning a number will throw an error.
```

2. Number

```ts
let phoneNo: number = 123456789;
number = 'xy234' // assigning a string will throw an error.
```
3. Type Inference

```ts
// Type inference refers to the TypeScript compiler's ability to infer types from specific values in your code.

let x = 37; // Typescript will infer that the value will always be a number.
x = 'shubham'; // This will throw an error. 
```
4. Any

```ts
//Any type lets you to be able to reassign with any kind of data to a variable.
let myThing: any = "shubham";
myThing = false;
myThing = 34;
```

#### Delayed Initialisation and Inferred any

```ts
const movies = ['blade runner','source code','rambo'];

let foundMovie:string; // It is important to initialize variables with their intended type to avoid TypeScript from defaulting to "any".

for(let movie of movies ){
	if(movie === 'rambo'){
		foundMovie='rambo'
	}
}
```

#### Functions
```ts
// We define the type of parameters in the function.
function greet(name:string){
	return `Hello ${name}`;
}
```
```ts
// Notice we are mentioning the return type after the parameter brackets.
function namaste(name:string):string{
	return `Namaste ${name}`;
}
```

##### Anonymous Function Contextual Typing

```ts
const colors = ['red','black','blue']

colors.map((color)=> color.toUpperCase()); // The color parameter in the map function will implicitly be string and not deafult to any.
```

##### The Void Type

```ts
// Notice that the function doesn't return anything, so it's better to explicitly set its return type to void.
function printTwice(message:string):void { 
	console.log(message);
  console.log(message);
}
```

##### The Never Type 

The never type represents the value that NEVER occurs. We might use it to annotate a function that always throws an exception or a function that never finishes executing.

```ts
// Let's say you have a function that never finishes executing or rather an endless loop.
// for such functions that never return any value we use never type.
function gameLoop(message:string):never{  
  while(true){
    console.log(message);
  }
}

// another example 
function makeError(msg:string):never{
  throw new Error(msg);
}

// Note: Don't confuse this with void, void returns undefined or null which is technically still a type of value. With never, a function doesn't even finish executing.

```

#### Objects

```ts
function printName(person:{first:string, last:string}):void{
  console.log(`${person.first} ${person.last}`);
}
printName({first:"Shubham", last:"Kadam"});
```

Objects can be typed by declaring what the object should look like in the annotation.

```ts
// More examples
let coordinate : {x:number, y:number} = {x:34, y:45};

// return type of object
function randomCoordinate():{x:number,y:number} {
  return {x:Math.random(), y:Math.random()};
}
```

##### Type Alias 

Instead of writing object types in an annotation, we can declare them separately in a type alias, which is simply the desired shape of the object.

This allows us to make our code more readable and even reuse the types elsewhere in our code.

```ts
type point = {
  x:number;
  y:number;
}

let coordinate:point = {x:34,y:45};

function randomCoordinate():point{
  return {x : Math.random(), y:Math.random()};
}

function doublePoint(coordinate:point):point{
  return {x : coordinate.x * 2 , y: coordinate.y *2}
}
```

##### Nested Objects

```ts
type Song = {
  title:string;
  artist:string;
  numStreams:number;
  credits:{
    producer:string;
    writer:string
  };
};

const mySong:Song ={
  title:"birds",
  artist:"Imagine Dragons",
  numStreams:3435535,
  credits:{
    producer:"xyz",
    writer:"abc"
  }
}

function calculatePayout(song:Song):number{
  return song.numStreams * 0.0033;
}

function printSong(song:Song):void{
  console.log(`The title of the song is ${song.title}`);
  console.log(`The artist of the song is ${song.artist}`);
}
```

