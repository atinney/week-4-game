//need to add in random multiplier to your player's firing ability
//need to dry up the repeated printing to divs....can consolidate this into a function



//Create 4 characters, each one has a name, an image, a starting # of health points, and a damage

//Create a new object
function Player(charName, startingHealth, attackPower, image){
	this.charName = charName;
	this.startingHealth = startingHealth;
	this.attackPower = attackPower;
	this.image = image;
}

var ahab = new Player('Captain Ahab', 100, 10, 'assets/images/ahab.png');
var nemo = new Player('Captain Nemo', 100, 20, 'assets/images/nemo.png');
var davy = new Player('Davy Jones', 100, 30, 'assets/images/davy.png');
var kraken = new Player('The Kraken', 100, 40, 'assets/images/kraken.png');

var availablePlayers = ["ahab","nemo","davy","kraken"];
var gameInProgress = false;
var playerOnePicked = false;
var yourPlayer = 0;
var enemy = 0;
var yourPowerMult = 0;
var lost = false;

 $(document).ready(function() {

 	$("#button-clear").on("click", function reStart() {
 		//clear variables
 		$("#players").empty();
 		$("#battle").empty();
 		$("#defeated").empty();
 		playerOnePicked = false;
 		$('.players #instruction').empty();
 		$('.battle #instruction').empty();
 		yourPlayer = 0;
 		enemy = 0;
 		yourPowerMult = 0;

 		//reset player stats
 		ahab = new Player('Captain Ahab', 100, 10, 'assets/images/ahab.png');
		nemo = new Player('Captain Nemo', 100, 20, 'assets/images/nemo.png');
		davy = new Player('Davy Jones', 100, 30, 'assets/images/davy.png');
		kraken = new Player('The Kraken', 100, 40, 'assets/images/kraken.png');



 		//Give the user the instruction to pick a player
		$('.players #instruction').append("<div class='text-center'>Pick your player to continue</div>")

 		//initialize the board
 		for (i = 0; i < availablePlayers.length; i++ ){
	 		//Print all characters to the players div
	 		var tempName = availablePlayers[i];

	 		//Retrieve character name from it's object
			$('#players').append("<div class='col-md-2 individual-player' id='" + tempName + "'>" + "<img src='" + eval(tempName).image + "' width='100px'>" + "<p>" + "Name: " + eval(tempName).charName + "<br>" + "Attack power: " + eval(tempName).attackPower + "<p id='health'>Health:" + eval(tempName).startingHealth + "</p></div>"); 

 		}


 		// alert ("Players are initialized, pick your player!");


	 	$(".individual-player").on("click", function loadBattle() {


	 		//add some code here to determine if this is the first character being picked (make it your character) 
	 		if (yourPlayer === 0){
		 		yourPlayer = ($(this).attr('id'));

		 		//Add your player to the Battle div
				$('#battle').append("<div class='col-md-2 battle-player your-player' id='" + yourPlayer + "'>" + "<img src='" + eval(yourPlayer).image + "' width='100px'>" + "<p>" + "Name: " + eval(yourPlayer).charName + "<br>" + "Attack power: " + eval(yourPlayer).attackPower + "<p id='health'>Health:" + eval(yourPlayer).startingHealth + "</div>"); 

				// //Remove your player from the players div
				$(".individual-player#" + yourPlayer).remove();

				//remove our pick instruction too
				$('.players #instruction').remove();

				//add a new instruction
				$('.battle #instruction').append("<div class='text-center'>Pick a player to battle</div>")
	 		}

	 		// or the second character being picked (make it the enemy)
	 		else if (enemy ===0){
	 			enemy = ($(this).attr('id'));

	 			$('#battle').append("<div class='col-md-2 battle-player enemy' id='" + enemy + "'>" + "<img src='" + eval(enemy).image + "' width='100px'>" + "<p>" + "Name: " + eval(enemy).charName + "<br>" + "Attack power: " + eval(enemy).attackPower + "<p id='health'>Health:" + eval(enemy).startingHealth + "</div>"); 

				// //Remove your player from the players div
				$(".individual-player#" + enemy).remove();

				//remove our enemy pick instruction too
				$('.battle #instruction').remove();

				//add an attack button
				$('#battle').append("<button id='attack' class='btn btn-default text-center'><h4>Attack</h4></button>");

	 		}

	 		//check if the game is over (your player is in defeated)

	 		else if (lost=true){
	 			alert("Your ship sank! Start a new game or wallow in your salty grave.");

	 		}

	 		//or if both are full, alert the user they need to battle first to clear the enemy
	 		else {
	 			alert ("Captains have readied their ships! Click attack to begin your battle!")
	 		}


	 		$("#attack").on("click", function battlePlayers() {
	 			var yourPower = eval(yourPlayer).attackPower;
	 			var enemyPower = eval(enemy).attackPower;


	 			if (eval(yourPlayer).startingHealth >= 0 && eval(enemy).startingHealth >= 0){
	 				//variable that slowly increases your player's attack capabilities
	 				// yourPowerMult = yourPowerMult + (Math.random() * 2);
	 				// console.log(yourPowerMult);

		 			//calculate new health
		 			eval(yourPlayer).startingHealth = eval(yourPlayer).startingHealth - enemyPower;
		 			eval(enemy).startingHealth = eval(enemy).startingHealth - (yourPower);

		 			//re-print stats
		 			$(".enemy #health").html("Health: " + eval(enemy).startingHealth);	 			
		 			$(".your-player #health").html("Health: " + eval(yourPlayer).startingHealth);
	 			}


	 			//you lose
	 			if (eval(yourPlayer).startingHealth <= 0) {
	 				alert("Your ship sank! Start a new game or wallow in your salty grave.");

	 				//add your player to defeated list
	 				$('#defeated').append("<div class='col-md-2 defeated-player'>" + "<img src='" + eval(yourPlayer).image + "' width='100px'>" + "<p>" + "Name: " + eval(yourPlayer).charName + "<p id='health'>Health: grave, I'm afraid</p></div>"); 

	 				//clear the attack button
	 				$("#attack").remove();

	 				//remove character from battle
					$(".battle #" + yourPlayer).remove();

					lost = true;
	 			}

	 			if (eval(enemy).startingHealth <=0) {
	 				alert("You've defeated: " + eval(enemy).charName);

	 				//add the enemy to defeated list
	 				$('#defeated').append("<div class='col-md-2 defeated-player'>" + "<img src='" + eval(enemy).image + "' width='100px'>" + "<p>" + "Name: " + eval(enemy).charName + "<p id='health'>Health: grave, I'm afraid</p></div>"); 

	 				//remove character from battle
					$(".battle #" + enemy).remove();

	 				//clear the enemy to allow to select another
	 				enemy = 0;

	 				//clear the attack button
	 				$("#attack").remove();

					//add a new instruction
					$('.battle #instruction').append("<div class='text-center'>Pick a player to battle</div>")

	 			}


	 		//end of attack function
	 		});


	 	//end of loading battle players
	 	});


 	});


});




