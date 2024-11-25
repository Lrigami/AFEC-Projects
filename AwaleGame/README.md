# Awalé Game
## Initialisation 

Clone this depository, then launch the index.html file.

## How to play

Aim of the game: The aim is to capture more seeds than your opponent. The player who has captured the most seeds at the end of game wins.
The board is divided in two areas of six holes each. The area of the player is the six holes at the bottom of the board, and the area of the opponent is the six other holes at the top of the board. 
At the beginning, 4 seeds are distributed in each holes.
A rotation direction is determined before playing.

Rules :
1. The players plays alternately. The first to play is chosen at random. The player takes all the seeds in a single hole of his area and distributes them depending on the rotation direction, one in each hole.
2. If there are more than 12 seeds to distribute, the starting hole is left out everytime, and therefore always left empty. The player continues to feed the next holes depending on the rotation direction. A hole containing enough seeds to loop is called a 'Kroo'. 
3. If the last seed to be distributed falls into one of the opponent's holes containing already one or two seeds, the player captures the two or three seeds. The captured seeds are taken off the board (the hole is left empty) and collected into the player's loft. 
4. If a player captures two or three seeds in a hole, and the preceeding hole also contains two or three seeds, they are captured too, and so on. 
5. If your opponent has no seeds in his territory, you must play so that at least one seed is planted in his territory. In general, you always have to play so that one seed is always available on your opponent's board.
6. The game ends when one of the player can't make a move. The remaining seeds in the holes are distributed to the player to whom they belong.
7. The winner is the player who has the most seeds at the end.

## To-do list 

- [x] initialise the holes;
- [x] manage the loop moves;
- [x] manage the collect of the seeds;
- [x] manage the starving moves;
- [x] manage the players turns;
- [x] manage the end of the game.