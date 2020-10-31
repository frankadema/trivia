exports = typeof window !== "undefined" ? window : global;

exports.Game = function() {
  var players = [];
  var places = [];
  var purses = [];
  var inPenaltyBox = [];
  
  var array = [];
  var popQuestions = [];
  var scienceQuestions = [];
  var sportsQuestions = [];
  var rockQuestions = []

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var currentCategory = () => {
    if(places[currentPlayer] == 0 || places[currentPlayer] == 4 || places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1 || places[currentPlayer] == 5 || places[currentPlayer] == 9)
      return 'Science';
    if(places[currentPlayer] == 2 || places[currentPlayer] == 6 || places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  for(var i = 0; i < 50; i++){
    array.push('Pop Question' +i, 'Science Question' +i, 'Sports Question' +i, 'Rock Question' +i)
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question "+i);
  };

  this.add = async (persons) => {
    await persons.forEach((player, index) => {
      players.push(player);
      places[index] = 0;
      purses[index] = 0;
      inPenaltyBox[index] = false;
      
      let number = index + 1;
      console.log(player + " was added, They are player number " + number);
    });
  };

  const askQuestion = (catt) => {
    switch (catt) {
      default:
        break;
      case 'Pop':
        console.log(popQuestions.shift());
        break;
      case 'Science':
        console.log(scienceQuestions.shift());
        break;
      case 'Sports':
        console.log(sportsQuestions.shift());
        break;
      case 'Rock':
        console.log(rockQuestions.shift());
        break;
    };
  };

  this.roll = (roll) => {
    console.log(players[currentPlayer] + " is the current player, They have rolled a " + roll);

    places[currentPlayer] = places[currentPlayer] + roll;

    if(places[currentPlayer] > 11) {
      places[currentPlayer] = places[currentPlayer] - 12;
    }
    
    if(inPenaltyBox[currentPlayer]){
      console.log(players[currentPlayer] + " is getting out of the penalty box, new location is " + places[currentPlayer] + " The category is " + currentCategory());

      if(roll % 2 > 0){
        isGettingOutOfPenaltyBox = true;
        askQuestion(currentCategory());
      }else{
        isGettingOutOfPenaltyBox = false;
      }
    }else{
      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer] + " The category is " + currentCategory());
      askQuestion(currentCategory());
    }
  };

  this.answer = (input) => {
    if(input) {
      console.log('Answer was correct!!!!');
      purses[currentPlayer]++;
      console.log(players[currentPlayer] + " now has " + purses[currentPlayer]  + " Gold Coins.");
  
      var winner = !(purses[currentPlayer] == 6);
      currentPlayer++;
      if(currentPlayer == players.length)
        currentPlayer = 0;
      return winner;

    } else {
      console.log('Question was incorrectly answered');
      console.log(players[currentPlayer] + " was sent to the penalty box");
      inPenaltyBox[currentPlayer] = true;
    }
      
    currentPlayer++;
    if(currentPlayer == players.length)
      currentPlayer = 0;
    return true;
  };
};

var notAWinner = false;
var game = new Game();

game.add(['Chet', 'Pat', 'Sue']);

this.getNumber = (e) => {
  const number = Math.floor(Math.random() * e);
  return number;
};

do {
  game.roll(this.getNumber(6) + 1);
  if (this.getNumber(10) == 7) {
    notAWinner = game.answer('correct');
  } else {
    notAWinner = game.answer();
  }
} while (notAWinner);
