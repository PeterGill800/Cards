var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var play = [];
var canvasColour = "#d1f3ff";
var index = 8;
var highest = 0;
var time = 1;
var leading = [];
var aiii = 0;
var lowest = 15;
var selected = 0;
var winners = [];
var possible = 0;
var suits = [];
var values = [];
var deck = [];
var shuffleDeck = [];
var hands = [];
var roundNumber = 0;
var enter = 1;

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

var players = 0;
while(players < 2 || players > 7 || players != parseInt(players, 10))
players = prompt("Please enter number of players between 2 and 7:");
var who = 0;

makeDeck();
function makeDeck(){
	suits = ["Diamonds","Hearts","Spades","Clubs"];
	values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
	deck = [];
	shuffleDeck = [];
	hands = [];
	for (var i = 0; i < 4; i++){
		for (var x = 0; x < 13; x++){
			var y = new makeCard(suits[i],values[x]);
			deck.push(y);
		}
	}
	for (var i = 0; i < 52; i++){
		shuffle();
	}
	for (var i = 0; i < players; i++){
		hands.push([]);
	}	
	for (i = 0; i < 7-roundNumber; i++){
		for (x = 0; x < players; x++){
			hands[x].push(shuffleDeck[0]);
			shuffleDeck.splice(0,1);
		}
	}
	render();
}

document.addEventListener('keydown', function(event){
		if(event.keyCode == 40){
			selected++;
			if(selected >= hands[0].length){
				selected = 0;
			}
		}
		if(event.keyCode == 38){
			selected--;
			if(selected < 0){
				selected = hands[0].length-1;
			}
		}
		if(event.keyCode == 13 && enter == 1 &&(play.length == players || play.length == 0)){
			console.log(players);
			if(leading.length == 0){
				enter = 0;
				leading.push(hands[0][selected]);
				play.splice(0,1,hands[0][selected]);
				hands[0].splice(selected,1);
				time = 1;
				ai();
			}
			else{
				x = choosePlayerCard();
				if(x == true){
					enter = 0;
					play.splice(0,1,hands[0][selected]);
					hands[0].splice(selected,1);
					time = 1;
					ai();	
				}
			}
		}
		if(event.keyCode != null && aiii == 1){
			aiii = 0;
			aii();
		}
		render();
	}
);

var first = [];
var trump = [];
function winner(){
	for(var i = 0; i < play.length; i++){
		if(play[i].suit == shuffleDeck[0].suit){
			trump.push(play[i]);
		}
		else if(play[i].suit == leading[0].suit){
			first.push(play[i]);
		}
	}
	if(trump.length != 0){
		check(trump);
	}
	else{
		check(first);
	}
}

function checkHighest(type){
	for(var i = 0; i < type.length; i++){
		if(type[i].value == "10" && 10 > highest){
			highest = 10;
			index = i;
		}
		else if(type[i].value == "J" && 11 > highest){
			highest = 11;
			index = i;
		}
		else if(type[i].value == "Q" && 12 > highest){
			highest = 12;
			index = i;
		}
		else if(type[i].value == "K" && 13 > highest){
			highest = 13;
			index = i;
		}
		else if(type[i].value == "A" && 14 > highest){
			highest = 14;
			index = i;
		}
		else if(type[i].value > highest){
			highest = type[i].value;
			index = i;
		}
	}
	return(index);
}

function checkLowest(type){
	for(var i = 0; i < type.length; i++){
		if(type[i].value == "10" && 10 < lowest){
			lowest = 10;
			index = i;
		}
		else if(type[i].value == "J" && 11 < lowest){
			lowest = 11;
			index = i;
		}
		else if(type[i].value == "Q" && 12 < lowest){
			lowest = 12;
			index = i;
		}
		else if(type[i].value == "K" && 13 < lowest){
			lowest = 13;
			index = i;
		}
		else if(type[i].value == "A" && 14 < lowest){
			lowest = 14;
			index = i;
		}
		else if(type[i].value < lowest && type[i].value != "10" && type[i].value != "J" && type[i].value != "Q" && type[i].value != "K"){
			lowest = type[i].value;
			index = i;
		}
	}
	return(index);
}

function check(type){
	setTimeout(function(){
		highest = 0;
		index = checkHighest(type);
		for(var i = 0; i < play.length; i ++){
			if(type[index] == play[i]){
				who = i;
				winners.push(who);
				play = [];
				trump = [];
				first = [];
				highest = 0;
				leading = [];
				for(var x = 0; x < who ; x++){
					play.push([]);
				}
				time = who;
				ctx.fillStyle="blue";
				ctx.fillRect(280, 40+(20*i),10,10);
				ctx.font = "18px Arial";
				ctx.fillText("Press any key to continue", 250, 250);
				console.log(winners);
				if(winners.length == 7 - roundNumber){
					round();
				}
				else{
					aiii = 1;
				}
			}
		}
	},500);
}

function round(){
	for(var i = 0; i < winners.length; i++){
		if(winners[i] == 0){
			possibleCard.push(winners[i]);
			console.log("p "+possibleCard);
		}
		else{
			console.log(winners[i]);
			for(var x = 0; x < imimpossibleCard.length; x++){
				if(winners[i] == imimpossibleCard[x]){
					impossibleCard.push(winners[i]);
					console.log("im "+impossibleCard);
				}
			}
			if(impossibleCard.length == 0){
				imimpossibleCard.push(winners[i]);
				console.log("imim "+imimpossibleCard);
			}
			impossibleCard = [];
			console.log("im "+impossibleCard);
		}
	}
	if(possibleCard.length == 0){
		possible = 1;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.font = "72px Arial";
		ctx.fillText("Game Over", 100, 300);
	}
	else{
		players = imimpossibleCard.length + 1;
		if(players == 1){
			possible = 1;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "white";
			ctx.font = "72px Arial";
			ctx.fillText("You Win!", 100, 300);
		}
		imimpossibleCard = [];
		possibleCard = [];
		roundNumber++;
		enter = 1;
		play = [];
		winners = [];
		who = 0;
		makeDeck();
	}
}

function aii(){
	if(who != 0){
		setTimeout(function(){
			if(time == who){
				x = chooseFirstCard(time);
				play.splice(time, 1, hands[time][x]);
				leading.push(hands[time][x]);
				hands[time].splice(x,1);
			}
			else{
				x = chooseCard(time);
				play.splice(time, 1, hands[time][x]);
				hands[time].splice(x,1);
			}
			time++;
			render();
			if(time < players){
				aii();
			}
			else{
				enter = 1;
			}
		}, 500);
	}
	else{
		enter = 1;
	}
}

function ai() {
    if(who != 1){
		setTimeout(function() {
			x = chooseCard(time);
			play.splice(time, 1, hands[time][x]);
			hands[time].splice(x,1);
			time++;
			render();
			if(time < who || (who == 0 && time < players)) {
				ai(); 
			}
			else{
					winner();
			}
		}, 500)
	}
	else{
		winner();
	}
}

function choosePlayerCard(){
	if(hands[0][selected].suit == leading[0].suit){
		return(true);
	}
	else{
		for(var i = 0; i < hands[0].length; i++){
			if(hands[0][i].suit == leading[0].suit){
				possibleCard.push(hands[0][i]);
			}
		}
		if(possibleCard.length == 0){
			possibleCard = [];
			return(true);
		}
		else{
			possibleCard = [];
			return(false);
		}
	}
	
}

function chooseFirstCard(hand){
	for(var i = 0; i < hands[hand].length; i++){
		if(hands[hand][i].suit != shuffleDeck[0].suit){
			possibleCard.push(hands[hand][i]);
		}
		else{
			impossibleCard.push(hands[hand][i]);
		}
	}
	if(possibleCard.length != 0){
		x = checkHighest(possibleCard);
		for(var i = 0; i < hands[hand].length; i++){
			if(hands[hand][i] == possibleCard[x]){
				possibleCard = [];
				impossibleCard = [];
				return(i);
			}
		}
	}
	else{
		x = checkHighest(impossibleCard);
		for(var i = 0; i < hands[hand].length; i++){
			if(hands[hand][i] == impossibleCard[x]){
				possibleCard = [];
				impossibleCard = [];
				return(i);
			}
		}
	}
}

var imimpossibleCard = [];
var impossibleCard = [];
var possibleCard = [];
function chooseCard(hand){
	for(var i = 0; i < hands[hand].length; i++){
		if(hands[hand][i].suit == leading[0].suit){
			for(var a = 0; a < play.length; a++){
				if(play[a].suit == leading[0].suit){
					first.push(play[a]);
				}
			}
			highest = 0;
			x = checkHighest(first);
			highest = 0;
			if(1 == checkHighest([first[x],hands[hand][i]])){
				for(var a = 0; a < play.length; a++){
					if(play[a].suit == shuffleDeck[0].suit){
						imimpossibleCard.push(play[a]);
					}
				}
				if(imimpossibleCard.length == 0){
					possibleCard.push(hands[hand][i]);	
				}
				else{
					impossibleCard.push(hands[hand][i]);
				}
			}
			else{
				impossibleCard.push(hands[hand][i]);
			}
		}
		first = [];
		imimpossibleCard = [];
	}
	lowest = 15;
	if(possibleCard.length != 0){
		x = checkLowest(possibleCard);
		for (var i = 0; i < hands[hand].length; i++){
			if(hands[hand][i] == possibleCard[x]){
				possibleCard = [];
				impossibleCard = [];
				return(i);
			}
		}
	}
	else if(impossibleCard.length != 0){
		x = checkLowest(impossibleCard);
		for (var i = 0; i < hands[hand].length; i++){
			if(hands[hand][i] == impossibleCard[x]){
				possibleCard = [];
				impossibleCard = [];
				return(i);
			}
		}
	}
	else{
		for(var i = 0; i < hands[hand].length; i++){
			if(hands[hand][i].suit == shuffleDeck[0].suit){				
				for(var a = 0; a < play.length; a++){
					if(play[a].suit == shuffleDeck[0].suit){
						trump.push(play[a]);
					}
				}
				if(trump.length != 0){
					highest = 0;
					x = checkHighest(trump);
					highest = 0;
					if(1 == checkHighest([trump[x],hands[hand][i]])){
						possibleCard.push(hands[hand][i]);
					}
					else{
						imimpossibleCard.push(hands[hand][i]);
					}
				}
				else{
					possibleCard.push(hands[hand][i]);
				}
			}
			else{
				impossibleCard.push(hands[hand][i]);
			}
			trump = [];
		}
		if(possibleCard.length != 0){
			x = checkLowest(possibleCard);
			for (var i = 0; i < hands[hand].length; i++){
				if(hands[hand][i] == possibleCard[x]){
					possibleCard = [];
					impossibleCard = [];
					imimpossibleCard = [];
					return(i);
				}
			}
		}
		else if(impossibleCard.length != 0){
			x = checkLowest(impossibleCard);
			for (var i = 0; i < hands[hand].length; i++){
				if(hands[hand][i] == impossibleCard[x]){
					possibleCard = [];
					impossibleCard = [];
					imimpossibleCard = [];
					return(i);
				}
			}
		}
		else{
			x = checkLowest(imimpossibleCard);
			for (var i = 0; i < hands[hand].length; i++){
				if(hands[hand][i] == imimpossibleCard[x]){
					possibleCard = [];
					impossibleCard = [];
					imimpossibleCard = [];
					return(i);
				}
			}
		}
	}
}

function render(){
	if(possible == 0){
		ctx.fillStyle = canvasColour;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle="blue";
		ctx.fillRect(10, 40+(20*selected),10,10);
		for(var i = 0; i < hands[0].length; i++){
			if (hands[0][i].suit == "Hearts" || hands[0][i].suit == "Diamonds"){
				ctx.fillStyle = "red";
			}
			else{
				ctx.fillStyle = "black";
			}
			ctx.font = "18px Arial";
			ctx.fillText(""+hands[0][i].value+" of "+hands[0][i].suit, 30, 50+(20*i));
		}
		for(var i = 0; i < play.length; i++){
			if(play[i].suit != undefined){
				if(play[i].suit == "Hearts" || play[i].suit == "Diamonds"){
					ctx.fillStyle = "red";
				}
				else{
					ctx.fillStyle = "black";
				}
				ctx.font = "18px Arial";
				ctx.fillText(""+play[i].value+" of "+play[i].suit, 300, 50+(20*i));
			}
		}
		if (shuffleDeck[0].suit == "Hearts" || shuffleDeck[0].suit == "Diamonds"){
			ctx.fillStyle = "red";
		}
		else{
			ctx.fillStyle = "black";
		}
		ctx.font = "18px Arial";
		ctx.fillText("Trump suit:", 30, 550);
		ctx.fillText(""+shuffleDeck[0].suit, 30, 570);
	}
}

function makeCard(suit, value) {
	this.suit = suit;
	this.value = value;
}

function shuffle(){
	var foo = randomNum(deck.length);
	shuffleDeck.push(deck[foo]);
	deck.splice(foo,1);
}

function randomNum(upper) {
	var foo = Math.random();
	foo *= upper;
	var bar = Math.floor(foo);
	return bar;
}