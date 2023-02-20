const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const generatedField = [];

class Field {
  constructor(field) {
    this.field = field;
  }

  // Prints the current field of the class instance
  print() {
    for (let line of this.field) {
      line = line.join("");
      console.log(line);
    }
  }

  // Generates a field and checks if its playable or not
  static generateField(width, height) {
    // Creates a random field
    const createField = () => {
      const characters = [fieldCharacter, hole];
      for (let h = 0; h < height; h++) {
        let line = [];
        for (let w = 0; w < width; w++) {
          const randomNumber = Math.floor(Math.random() * characters.length);
          line.push(characters[randomNumber]);
        }
        generatedField.push(line);
      }
    };
    // Inserts the path character in the top left corner of the field
    const insertPathCharacter = () => {
      generatedField[0].splice(0, 1, pathCharacter);
    };
    // Inserts the hat in a random position within the last two lines of the field to make the game a bit challenging
    const insertHat = () => {
      const randomVerticalPosition =
        height - (Math.floor(Math.random() * 2) + 1);
      const randomHorizontalPosition = Math.floor(Math.random() * width);
      generatedField[randomVerticalPosition].splice(
        randomHorizontalPosition,
        1,
        hat
      );
    };

    createField();
    insertPathCharacter();
    insertHat();

    return generatedField;
  }
  // Initiates game and keeps game active until the game is finished because the player won or a game rule has been broken
  play() {
    let horizontalPosition = 0;
    let verticalPosition = 0;

    do {
      const userInput = prompt("Which way? (r, l, u, d) ");

      const moveRight = () => {
        horizontalPosition++;
        this.field[verticalPosition].splice(
          horizontalPosition,
          1,
          pathCharacter
        );
        this.print();
      };

      const moveLeft = () => {
        horizontalPosition--;
        this.field[verticalPosition].splice(
          horizontalPosition,
          1,
          pathCharacter
        );
        this.print();
      };

      const moveUp = () => {
        verticalPosition--;
        this.field[verticalPosition].splice(
          horizontalPosition,
          1,
          pathCharacter
        );
        this.print();
      };

      const moveDown = () => {
        verticalPosition++;
        this.field[verticalPosition].splice(
          horizontalPosition,
          1,
          pathCharacter
        );
        this.print();
      };

      // Examines the user input and the next character in the field to determin if the chosen move is possible and breaks out of the game when the player wins or loses
      if (userInput === "r") {
        if (
          this.field[verticalPosition][horizontalPosition + 1] ===
            fieldCharacter ||
          this.field[verticalPosition][horizontalPosition + 1] === pathCharacter
        ) {
          moveRight();
        } else if (
          this.field[verticalPosition][horizontalPosition + 1] === hat
        ) {
          console.log("You Won!");
          break;
        } else {
          console.log("You Lost!");
          break;
        }
      } else if (userInput === "l") {
        if (
          this.field[verticalPosition][horizontalPosition - 1] ===
            fieldCharacter ||
          this.field[verticalPosition][horizontalPosition - 1] === pathCharacter
        ) {
          moveLeft();
        } else if (
          this.field[verticalPosition][horizontalPosition - 1] === hat
        ) {
          console.log("You Won!");
          break;
        } else {
          console.log("You Lost!");
          break;
        }
      } else if (userInput === "u") {
        if (
          this.field[verticalPosition - 1][horizontalPosition] ===
            fieldCharacter ||
          this.field[verticalPosition - 1][horizontalPosition] === pathCharacter
        ) {
          moveUp();
        } else if (
          this.field[verticalPosition - 1][horizontalPosition] === hat
        ) {
          console.log("You Won!");
          break;
        } else {
          console.log("You Lost!");
          break;
        }
      } else if (userInput === "d") {
        if (
          this.field[verticalPosition + 1][horizontalPosition] ===
            fieldCharacter ||
          this.field[verticalPosition + 1][horizontalPosition] === pathCharacter
        ) {
          moveDown();
        } else if (
          this.field[verticalPosition + 1][horizontalPosition] === hat
        ) {
          console.log("You Won!");
          break;
        } else {
          console.log("You Lost!");
          break;
        }
      } else {
        console.log("Invalid input!");
      }
    } while (1 == 1);
  }
}

const myField = new Field(Field.generateField(50, 20));

myField.print();
myField.play();
