# TypeScript

### Why TypeScript?

Take a look at the JS code below. It doesn't throw an error and gives us a valid output even when we perform invalid operations. To solve such problems TypeScript comes to our rescue by introducing types.

```js
console.log(null * 100); // 0
console.log(undefined * 340); // Nan
```

- TS helps you show errors before runtime, i.e. it does something called static typing which means checking for any type errors before the execution of the program.
- The same TS program is compiled into the JS program later.

## Type Annotation Basics

1. String

```ts
// syntax -> let varName:type = 'xyz'
let movieTitle: string = "Imitation Game";
movieTitle = 34; // assigning a number will throw an error.
```

2. Number

```ts
let phoneNo: number = 123456789;
number = "xy234"; // assigning a string will throw an error.
```

3. Type Inference

```ts
// Type inference refers to the TypeScript compiler's ability to infer types from specific values in your code.

let x = 37; // Typescript will infer that the value will always be a number.
x = "shubham"; // This will throw an error.
```

4. Any

```ts
//Any type lets you to be able to reassign with any kind of data to a variable.
let myThing: any = "shubham";
myThing = false;
myThing = 34;
```

### Delayed Initialisation and Inferred any

```ts
const movies = ["blade runner", "source code", "rambo"];

let foundMovie: string; // It is important to initialize variables with their intended type to avoid TypeScript from defaulting to "any".

for (let movie of movies) {
  if (movie === "rambo") {
    foundMovie = "rambo";
  }
}
```

## Functions

```ts
// We define the type of parameters in the function.
function greet(name: string) {
  return `Hello ${name}`;
}
```

```ts
// Notice we are mentioning the return type after the parameter brackets.
function namaste(name: string): string {
  return `Namaste ${name}`;
}
```

### Anonymous Function Contextual Typing

```ts
const colors = ["red", "black", "blue"];

colors.map((color) => color.toUpperCase()); // The color parameter in the map function will implicitly be string and not deafult to any.
```

### The Void Type

```ts
// Notice that the function doesn't return anything, so it's better to explicitly set its return type to void.
function printTwice(message: string): void {
  console.log(message);
  console.log(message);
}
```

### The Never Type

The never type represents the value that NEVER occurs. We might use it to annotate a function that always throws an exception or a function that never finishes executing.

```ts
// Let's say you have a function that never finishes executing or rather an endless loop.
// for such functions that never return any value we use never type.
function gameLoop(message: string): never {
  while (true) {
    console.log(message);
  }
}

// another example
function makeError(msg: string): never {
  throw new Error(msg);
}

// Note: Don't confuse this with void, void returns undefined or null which is technically still a type of value. With never, a function doesn't even finish executing.
```

## Objects

```ts
function printName(person: { first: string; last: string }): void {
  console.log(`${person.first} ${person.last}`);
}
printName({ first: "Shubham", last: "Kadam" });
```

Objects can be typed by declaring what the object should look like in the annotation.

```ts
// More examples
let coordinate: { x: number; y: number } = { x: 34, y: 45 };

// return type of object
function randomCoordinate(): { x: number; y: number } {
  return { x: Math.random(), y: Math.random() };
}
```

### Type Alias

Instead of writing object types in an annotation, we can declare them separately in a type alias, which is simply the desired shape of the object.

This allows us to make our code more readable and even reuse the types elsewhere in our code.

```ts
type point = {
  x: number;
  y: number;
};

let coordinate: point = { x: 34, y: 45 };

function randomCoordinate(): point {
  return { x: Math.random(), y: Math.random() };
}

function doublePoint(coordinate: point): point {
  return { x: coordinate.x * 2, y: coordinate.y * 2 };
}
```

### Nested Objects

```ts
type Song = {
  title: string;
  artist: string;
  numStreams: number;
  credits: {
    producer: string;
    writer: string;
  };
};

const mySong: Song = {
  title: "birds",
  artist: "Imagine Dragons",
  numStreams: 3435535,
  credits: {
    producer: "xyz",
    writer: "abc",
  },
};

function calculatePayout(song: Song): number {
  return song.numStreams * 0.0033;
}

function printSong(song: Song): void {
  console.log(`The title of the song is ${song.title}`);
  console.log(`The artist of the song is ${song.artist}`);
}

// You can have optional property in your object
type Coordinate = {
  x: number;
  y: number;
  z?: number; // by placing '?' right after the property key will make the property optional.
};
```

### The readonly modifier

The readonly modifier is a typescript keyword.

```ts
type User = {
  readonly id: number; // Notice the readonly keyword which preceeds the id.
  username: string;
};

let user: User = {
  id: 1,
  username: "shubham",
};

console.log(user.id); // 1
user.id = 343; // This will throw an error.
```

### The Intersection Types

```ts
type Circle = {
  radius: number;
};

type Colorful = {
  color: string;
};

type ColorfulCircle = Circle & Colorful; // Notice we are intersecting two different types into a single type.

const happyFace: ColorfulCircle = {
  radius: 5,
  color: "yellow",
};
```

## Arrays

```ts
const activeUsers: string[] = []; // activeUsers is an array of strings
activeUsers.push("Shubham");

const ages: number[] = [45, 34, 23]; // ages is an array of numbers
ages[2] = 32;
ages[1] = "45"; // this will throw an error
```

### More Array Syntax

```ts
// This is an alternate syntax for declaring arrays in typescript.
const arr: Array<string> = ["hello", "world"];
const ages: Array<number> = [34, 23];
```

### Multidimensional Arrays

```ts
// Notice we add [][] 2 square brackets after the type to indicate it's 2d Array.
const board: string[][] = [
  ["x", "0", "x"],
  ["x", "x", "0"],
  ["0", "x", "x"],
];
```

## Unions

Union types allows us to give a value a few different possible types.

We can create a union type by using a single | (pipe character) to seperate the types we want to include.

```ts
type Point = {
  x: number;
  y: number;
};

type Loc = {
  lat: number;
  long: number;
};

let coordinates: Point | Loc = { x: 34, y: 58 };

// we can update the coordinates to use Loc
coordinates = { lat: 34.56, long: 56.768 };
```

### Type narrowing with Union types

Narrowing the Type is simply doing a type check before working with the value. Since unions allow multiple types of value, it's good to check what came through before working with it.

```ts
function calculateTax(price: number | string, tax): number {
  // Notice we are handling the type condition
  if (typeof price === "string") {
    price = price.replace("$", "");
    price = parseFloat(price);
  }
  return price * tax;
}

console.log(calculateTax("$45", 2)); // 90
console.log(calculateTax(45, 2)); // 90
```

## Union Types and Arrays

```ts
// Let's say we want to add multiple types of data in a variable, we can combine unions with arrays
const stuff: (number | string)[] = [1, 2, "shubham"];

// Another example, Note: refer to the previous code for types.
const coordinates: (Point | Loc)[] = [];
coordinates.push({ lat: 34.56, long: 56.768 });
coordinates.push({ x: 34, y: 34 });
```

### Literal Types

Literal types are not just types - but the value themselves too!
On its own, that's not very helpful. But combine it with something like unions and you can have very fine-tuned type options for typescript to enforce.

```ts
let zero: 0 = 0; // one small example

// example 1
let mood: "Happy" | "Sad" | "Angry" = "Happy";
mood = "Sad";
mood = "Frustrated"; // will show an error because it's not one of the type.

// example 2
type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

let myDay: DayOfWeek = "Monday"; // this is valid
myDay = "Wed"; // this is not valid and typescript will show an error
```

## Tuples

Tuples are special type exclusive to TypeScript ( they don't exist in JS).
Tuples are arrays of fixed lengths and ordered with specific types - like super rigid arrays.

```ts
// Creating a tuple with it's type definition
let myTuple : [number,string];

// Can assign it values per it specs
myTuple = [10,'shubham'];

myTuple = ['shubham',10]; ❌ Incorrect

const color:[number,number,number] = [250,0,125];
```

```ts
type HTTPResponse = [number,string]

const goodResp:HTTPResponse = [200,"OK"]

// limitation of tuple
// we can push any type of data and it won't throw any kind of warning
// we can also pop.
```

## Enums

Enums allow us to define a set of named constants. We can give these constants numeric or string values.

```ts
enum Responses {
  no, // 0
  yes, // 1
  maybe // 2
}

enum Responses {
  no=2,
  yes, // 3
  maybe // 4
}

enum Responses {
  no=2,
  yes=10,
  maybe=24 
}
```

```ts
// another example
enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
  RETURNED,
}

const myStatus = OrderStatus.DELIVERED;

function isDelivered(status:OrderStatus){
  return status===OrderStatus.DELIVERED;
}

isDelivered(OrderStatus.RETURNED);
```

