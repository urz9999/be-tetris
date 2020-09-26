// We first need to define two constants for our game canvas:
// The canvas itself which is saved to a constant and the 2d
// context in which we will be drawing the elements of our game
// Using document.getElementById("id_value") we can get every element
// in the html page that has a particular id, see the tetris object in
// index.html as a reference. To do this the script must be included in
// that specific pageas we have done with index.html
const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
// We also save the score graphic element
const scoreElement = document.getElementById("score");

// The number of rows and the number of columns. Remember when
// we talk about constants? Here we are defining some of them.
// They can be changed ONLY before starting the game and ONLY
// by the programmer. The idea behind these is to customize your
// game somehow!
const ROW = 20;
const COL = COLUMN = 10;

// Since the board and the pieces are both made of squares, we will
// use a constant called SQ (for square) = 20, as a unit.
// We can make also what I call a double association of a variable
// as we can assign the same value to two element.
const SQ = squareSize = 20;

// A VACANT (empty) square has a white (#FFF) color
const VACANT = "#FFF";

// The score value is a let because it will change during the game
let score = 0;

// Now we define the board array. 'let' is a way to say a variable
// in JS Ecmascript 6 (another way for old JS is 'var').
// By assigning a [] to a variable we are defining an empty array
let board = [ ];

// We create the board as a Matrix: as we said before the idea is making
// an Array of Arrays.
// let's create the rows.
// This is how we define an increasing for loop:
// for(let index = 0; index < something; index++) {}
// This is how we define a decreasing for loop:
// for(let index = something; index > 0; index--) {}
// Sooo we start from 0 and we make all the rows...
for ( let r = 0; r < ROW; r++) {
      // every single row is an empty array. note that array[index] is
      // the way to access or set its value in that position
      board[r] = [ ];
      // let's create the columns
      for( let c = 0; c < COL; c++){
        // This is how we access a multi dimensional array: array[first_index][second_index].
        // Like we do with real matrices
        board[r][c] = VACANT;
        // when we first draw the board all the square are empty, so every square has the value "#FFF".
      }
}
// As you can see the code can be operated as stand alone by simply writing it in the page but a more elegant
// way is to put it inside functions. This is also important if we want to do the same thing more than one time!

// draw a square: this is an helper function; whenever we need to tidy our code we use a function
// that group some common operations. In this case the function accepts 2 coordinates and a color
// as parameters and use special canvas functions to draw a square on the canvas
function drawSquare(x,y,color) {
    // We set the color for drawing
    ctx.fillStyle = color;
    // we draw a filled rectangle with this method note that the position
    // of the element in the grid is multiplied by our unit the SQUARE
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ); // x, y, width, height
    // The stroke color for the borders
    ctx.strokeStyle = "BLACK"; // this is what is called a "magic string", or a string that remains in a
                               // part of the code not specifically controlled by the programmer and thus
                               // is prone to possible errors and can't in general be reused. A solution is
                               // to put that value in a constant at the top of our code as the rest of our
                               // constants and set the constant here instead, try it!
    // Then we stroke the same square element insted of filling it
    // the result is a colored square with a black border
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

// draw the board: to draw the board to the screen we use a function:
// as we said before a function is a set of operation that we can call
// at a specific time to do something specific; in this case for every
// element of the game board: we draw a square taking the coordinate and
// the board value into account.
function drawBoard() {
   // As we have seen before we cycle through the entire board with 2 for loops
    for( r = 0; r <ROW; r++){
        for(c = 0; c < COL; c++){
            // Then we draw a square by using another function.
            // And yes of course one function can call another one.
            // This approach can help use organize and tidy up our code
            drawSquare(c,r,board[r][c]);
        }
    }
}

// After the declaration we can draw the board. This is how we call a function.
// functionName(); if a function requires parameter at launch you will pass those
// parameters inside the parenthesis.
drawBoard();

// Sooo the board is drawn with all basic white squares because we defined our
// board as all white elements in the beginning.

// Let's define the pieces and their colors. We prepare a constant array that includes
// all of our pieces with a specific color. Note that we are calling the tetrominous from the other file
// tetrominoes.js which need to be called in the index.html page as well. Also plese remember the order in which
// you call the js file to be sure that the variables, object and functions are all called AFTER they are defined
// in your code. Otherwise you'll face errors in your browser.
const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];

// Ok in the function randomPiece we will call new Piece(....) BUT, what is new Piece, we have
// to define it. It is a complex element of our game and it is a collection of properties and functions. Soooo
// as we have learned from the README file, a structure with some properties and methods is an OBJECT or in our case
// a class which is more elegant. Let's build it!

// The class Piece
class Piece {
  // Constructor is as the name implies the master method of the class and is called when we do new Piece(piece, color)
  // remember the random piece generator function? When we add elements to the constructor we use the keyword "this"
  // This special word means that we are assigning something to the object itself and, inside this object code, we can always
  // retrieve all the elements and properties saved in this! Remember when we talk in the README about variable scope? (public or private)
  // this.something is another way of giving a scope to a variable which is called "instance variable" or a variable
  // that is accessible inside the whole object
  constructor(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // we start from the first pattern, the first type of rotation
    // We access the piece by extracting it from a what? Surprise an array, what else?
    this.activeTetromino = this.tetromino[this.tetrominoN];
    // We need to control the start position the pieces by setting the globla coordinate of the piece itself.
    // If we imagine that our start is at 0,0 (left, top) these coordinates means to go up of 2 and right of 3
    this.x = 3;
    this.y = -2;
  }

  // The fill function
  fill(color) {
      // We are using the same length for rows and columns just because our matrix are squared so nrows = ncolumns
      for(r = 0; r < this.activeTetromino.length; r++){
          for(c = 0; c < this.activeTetromino.length; c++){
              // we draw only occupied squares: remember if works with true,
              // but in programs 1 value is also treated as true and 0 as false
              if(this.activeTetromino[r][c]){
                  // Remember drawSquare? We are using it now here! So we are drawing a colored
                  // square for every one inside the tetromino
                  drawSquare(this.x + c, this.y + r, color);
              }
          }
      }
  }
  // Now we define two method that are extensions of the previous one, which is de facto an helper of these two
  // draw a piece to the board
  draw() {
      this.fill(this.color);
  }

  // undraw a piece from the board
  unDraw() {
      this.fill(VACANT);
  }

  // collision function
  collision(x, y, piece) {
      for(let r = 0; r < piece.length; r++){
          for(let c = 0; c < piece.length; c++){
              // if the square is empty, we skip it
              if(!piece[r][c]) {
                  continue; // note that continue means skip this step of the for loop and go on!
              }

              // coordinates of the piece after movement
              let newX = this.x + c + x;
              let newY = this.y + r + y;

              // conditions
              if(newX < 0 || newX >= COL || newY >= ROW) {
                  // over the corners? so collision! Return true and stop the method!
                  return true;
              }
              // skip newY < 0; board[-1] will crush our game: because an array always start from 0!!!!!
              // negative values as index are called outOfBoundExceptions!
              if(newY < 0){
                  continue;
              }
              // check if there is a locked piece already in the same place
              if( board[newY][newX] != VACANT) {
                  // collision stop and return!
                  return true;
              }
          }
      }
      // Free to go!
      return false;
  }

  // move Down the piece
  moveDown() {
      // If the piece is free move down otherwise lock it
      if(!this.collision(0, 1, this.activeTetromino)) {
         // We undraw before moving to avoid artifact on screen because
         // basically we don't have "layers" we draw everything on the board
          this.unDraw();
          this.y++;
          this.draw();
      } else {
          // we lock the piece and generate a new one
          this.lock();
          p = randomPiece();
      }
  }

  // move Right the piece: see how after we defined many functions creating a
  // new one is just a matter to put them togheter to make the action. That is why we need to always
  // put our code inside functions, and as I said before, creating a program is just a matter to divide
  // a bigger problem in smaller ones and make a function for every piece of it!
  moveRight() {
      if(!this.collision(1, 0, this.activeTetromino)) {
          this.unDraw();
          this.x++;
          this.draw();
      }
  }

  // move Left the piece: same as right but we change the x with a minus
  // Note that the collision algorithm basically try to see if the next
  // position is empty or not before actually moving to it!
  moveLeft() {
      if(!this.collision(-1,0,this.activeTetromino)){
          this.unDraw();
          this.x--;
          this.draw();
      }
  }

  // rotate the piece: we get the next tetromino in the sequence but with a nice touch:
  // if we go past the length of the array we start again from 0 with a single line of code.
  rotate() {
      // Let's see how: (this.tetrominoN + 1) % this.tetromino.length
      // We access the next piece n + 1 and we check for the remnant of the division so let's try it:
      // 0 --> 0 + 1 = 1 --> 1 % 4 = 1
      // 1 --> 1 + 1 = 2 --> 2 % 4 = 2
      // 2 --> 2 + 1 = 3 --> 3 % 4 = 3
      // 3 --> 3 + 1 = 4 --> 4 % 4 = 0
      // Nice, isn't it? The beauty of code
      let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
      let kick = 0;
      // When we rotate we need to check for walls, position is the same but different rotation
      if(this.collision( 0, 0, nextPattern)) {
          if(this.x > COL/2){
              // it's the right wall
              kick = -1; // we need to move the piece to the left
          } else {
              // it's the left wall
              kick = 1; // we need to move the piece to the right
          }
      }
      // check the new collision with the offset value
      if(!this.collision( kick, 0, nextPattern)) {
          // We are ok soooo undraw
          this.unDraw();
          // Shift a little
          this.x += kick;
          // Get the new one
          this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1) % 4 => 1
          // Set it
          this.activeTetromino = this.tetromino[this.tetrominoN];
          // Draw it!
          this.draw();
      }
  }

  // Lock the piece in position and make some calculation for the game
  lock() {
      // For the active tetromino we check all its colored squares
      for(let r = 0; r < this.activeTetromino.length; r++){
          for(let c = 0; c < this.activeTetromino.length; c++){
              // we skip the vacant squares, we use continue to be faster,
              // because less operation will be done by the browser
              if( !this.activeTetromino[r][c] ) {
                  continue; // this is a way to ask for the next for loop step without doing anything else
              }
              // pieces to lock on top = game over: the condition is saying
              // if the piece is over 0 so the top most value of the game screen
              if(this.y + r < 0){
                  alert("Game Over");
                  // stop request animation frame
                  gameOver = true;
                  // break is used to force an exit from a for loop! because we don't need any other analysis!
                  break;
              }
              // if there is no problem we lock the piece: we set the color of the board to NOT white!
              // Note how we are accessing the board matrix
              board[this.y + r][this.x + c] = this.color;
          }
      }

      // Remove full rows and give points: check the entire board by going from 0 to ROW
      for(let r = 0; r < ROW; r++){
          let isRowFull = true;
          // and all the columns for that row
          for(let c = 0; c < COL; c++) {
              // isRowFull starts from true because this is an invalidating condition:
              // we set the value of the variable to itself AND (&&) the color of that board position is NOT white?
              // Sooo we will have something like this: imagine that Y, B, R are colors and 0 is white
              // R R B 0 R R B B B Y Y B R Y Y 0, when we check all the columns here the value of the isRowFull will be
              // isRowFull = true && (R != W) = true && true = true
              // isRowFull = true && (R != W) = true && true = true
              // isRowFull = true && (B != W) = true && true = true
              // isRowFull = true && (W != W) = true && false = false
              // after that the value will always remain false no matter what because:
              // True AND True = True
              // True AND False = False
              // False AND True = False
              // False AND False = False
              // So the only way to have true in the end is to have a full row!
              isRowFull = isRowFull && (board[r][c] != VACANT);
          }
          // If the row is full
          if(isRowFull) {
              // We move down all the rows above it
              for(let y = r; y > 1; y--){
                  for(let c = 0; c < COL; c++){
                      board[y][c] = board[y-1][c]; // note y - 1!!!
                  }
              }
              // the top row board[0][..] has no row above it, because we move everything down by 1!
              for(let c = 0; c < COL; c++){
                  board[0][c] = VACANT;
              }
              // increment the score
              score += 10;
          }
      }
      // update the board
      drawBoard();

      // update the score: innerHTML is a way of writing inside a tag element in the page
      scoreElement.innerHTML = score;
  }
}

// We have prepared all of our pieces prototypes, let's make a function that calls for a
// random piece form the list; this piece will be the current controllable piece
// Generate random piece function
function randomPiece() {
    // r will be our random piece chosen from our array of piece over this function
    // we call a mathematical function Math.random() to produce a number between 0 and 1 but we
    // want to select a number between 0 and 6 because the number of pieces are 7 and arrays are 0
    // indexed which means that they start from position 0. So let's add a little operation that helps achieve this result
    // we all know from math that to get a Random Arbitrary Value between a min and a max we do
    // Math.random() * (max - min) + min; BUT in this case the minimum is 0 so random * (max - 0) + 0 or simply:
    let r = Math.floor(Math.random() * PIECES.length) // from 0 to 6
    // now we can return a piece. To do so a function can use the special word: return which can return every object
    // we want, in this case a piece. infact we call new Piece to define a new Object of type Piece passing the
    // tetrominoe definition and its color; in fact if we check our array of arrays with the first index, the random one we
    // select a row for example, imagine that r = 3 so we get this row [O,"blue"], then with 0 as the second index we get O piece and
    // with 1 as the index we get "blue"
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

// Get the current random piece for the start of the game. Note that this
// way of putting code in a file is not particularly elegant as we are using random
// pieces of code outside functions. Nonetheless we are creating the piecies of our game as we go so
// this approach is more "natural" for a begineer
let p = randomPiece();

// CONTROL the piece: this is an interesting part. We are calling a JS specific function
// which is document.addEventListener(event, function_what_to_do_when_occurs). We are saying
// that when a key on the keyboard is pressed call the Controls function
document.addEventListener("keydown", controls);
// This is the function that defines our movements as per specification every function
// passed to addEventListener accept an event parameter. When a function is defined by other programmers like this one and when
// you code it you have to abide to a specific method signature (a list of parameters specific to that function) then you are probably
// facing a callback! A callback is a function that is called on specific moment by the program itself and not directly by you!
// A good example is if you have a dog or a cat (our program) and he/she suddenly start calling for your attention  not by your
// specific command. He/she is doing it in response to something internal to Him/Herself; this is the same
function controls(event) {
    // Here we are making adjustments to the piece position and rotation based on which key the user pressed
    // We also change the value of dropStart because we have change the board and we need to purge a refresh,
    // thus changing this value. We don't need to call for the drop method below because it is called in a loop
    // so the value of dropStart is always recovered there
    if(event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    // Note the use of else if construct that basically say us to make a chain of conditions: if is not this one
    // is this other one and so on
    } else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    } else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    } else if(event.keyCode == 40){
        p.moveDown();
    }
}

// drop the piece every 1 sec
// Get a time event as Now, usually this means that the computer
// will get the time as the interpreter read this specific line.
// Is used as a way to get the current datetime on a machine. Imagine
// that you want to make a clock in JS, this could simplify a lot your code,
// just get this value every second and display it!
let dropStart = Date.now();
// We are not a loser now, put this variable to false
let gameOver = false;

// This function create a basic game loop to run our game: we ask for the "requestAnimationFrame"
// which is a specific function of the browser and we pass our drop function as a parameter to it.
// It tells the browser to let the program draw something on screen using the browser capabilities
// to communicate with the video card of the computer, assuring that we get a constant framerate and
// other useful improvement to the quality of the result.
function drop() {
    // Get another instant time
    let now = Date.now();
    // Check how many milliseconds are passed between our start time and now
    let delta = now - dropStart;
    // If 1 sec (1000 millisec) is passed
    if(delta > 1000) {
        // Move the piece down a row in the screen
        p.moveDown();
        // Get a new current time for the next time difference, so we can define an "infinite loop" of checks
        // You can see that we are overriding the value of dropStart so next time this variable will have this value
        dropStart = Date.now();
    }
    // If we are NOT in game over (! is a simple way to turn false to true and true to false)
    // We are doing this because "if" only works with true values so we are negating the gameOver false to make it true for the if
    // condition
    if(!gameOver) {
        // request a game frame
        requestAnimationFrame(drop);
    }
}

// Start the game! Calling drop function we basically start the game loop: by
// doing this all the functions will be called at the right moment thus giving
// life to the program itself
drop();
