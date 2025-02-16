/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  //this constructor is used to construct the pt class
  constructor(coordinateX, coordinateY) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); 
    }
    this.startingPoint = startingPoint;
    this.width = width; 
    this.height = height; 
  }

  // ***************
  // METHODS
  // ***************

  area() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }


  updateMyHeight(height) {
    if (height && height > 0) {
      this.height = height;
    }
  }

  update({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in cas of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  //function that print the endPoints
  endPoints() {
    const topRight = this.startingPoint.coordinateX + this.width;
    const bottomLeft = this.startingPoint.coordinateY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }

  getWidth() {
    return this.width;
  }
}

function buildRectangle(Width, x, Height, y) {
  const mainPoint = new Point(x, y);
  const rectangle = new Rectangle(mainPoint, Width, Height);
  return rectangle;
}

function constructSquare(coordinateX, coordinateY, SquareHeight) {
    if (!SquareHeight || SquareHeight <= 0) {
      alert("Invalid Square Height");
    }
  const square = buildRectangle(squareHeight, coordinateX, squareHeight, coordinateY); 
  const squareArea = square.area();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", squareArea);
  console.log("square Perimeter ", squarePerimeter);
}

const myRectangle = buildObject(2, 3, 5, 4);
const square = constructSquare();

console.log(sq.calculatePerimeter());
square.endPoints();

myRectangle.updateMyHeight(3);
