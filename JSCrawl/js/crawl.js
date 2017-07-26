csss.onclick = function() { upd("csss").setAttribute("href", "../css/alt.css")};


var hero = { 
    "NAME": "Bob",
	"ava": "\O+==>",
	"TYPE": "Classless",
	"HP": 10, 
	"STR": 0, 
	"DEF": 0, 	
	"WEAPON": "Fists",
	"ARMOR": "Clothes",
	"ITEM": "Apple",
	"GOLD": 0
};

var monster = { 
    "NAME": "Nil",
	"TYPE": "lab rat",
	"HP": 0, 
	"STR": 0, 
	"DEF": 0, 
	"GOLD": 0,
	"ava": ".oO-'"
};

function item(name, image, type, effect, text) {
	this.NAME = name;
	this.ava = image;
	this.TYPE = type;
	this.EFFECT = effect;
	this.TEXT = text;
}

var apple = new item("Apple", "o.", "Healing", hero.HP += 2, "Yum! HP restored!");
var itemList = [apple];


var gameState = {
	"combat": false,
	"gameover": false,
	"SCORE": 0,
	"progress": 0,
	"goal": 10
};

var gameLog = [];
var gameLogMaxCount = 9;

function stateCheck() {
	if (gameState.gameover == true) gameover();
}

function heroType(named, type) {
    console.log(type);
	hero.NAME = named;
	hero.HP = 20;
	switch(type) {
	  case 0:
	    hero.ava = "\O+==>";
		hero.TYPE = "Fighter";
		hero.STR = 4;
		hero.DEF = 2;
		hero.GOLD = 0;
		hero.WEAPON = "Sword",
	    hero.ARMOR = "Leather",
	    hero.ITEM = "Nothing",
		hero.taunt = "Bring it on!"
	    break;
	  case 1:
	    hero.ava = "|-O`*";
	    hero.TYPE = "Wizard";
		hero.STR = 1;
		hero.DEF = 1;
		hero.GOLD = 30;
		hero.WEAPON = "Staff",
	    hero.ARMOR = "Clothes",
	    hero.ITEM = "F.Scroll",
		hero.taunt = "Shazam!"
		break;
	  case 2:
	    hero.ava = "+/O/+";
	    hero.TYPE = "Thief";
		hero.STR = 2;
		hero.DEF = 2;
		hero.GOLD = 50;
		hero.WEAPON = "TwinBlade",
	    hero.ARMOR = "Leather",
	    hero.ITEM = "Nothing",
		hero.taunt = "Ooh, shinies!"
		break;
	  default:
	}
}

function encType(type){
    switch (type) {
	  case 0:
	  case 1:
	  case 2:
	    monster.ava = ",,,,,";
		monster.taunt = "Nothing here!";
		monster.name = "Plains";
		gameState.combat = false;
		break; 
	  case 3:
	  case 4:
	  case 5:
	    monster.ava = ".oOo.";
	    monster.name = "Slime";
		monster.HP = 3;
		monster.STR = 1;
		monster.DEF = 0;
		monster.GOLD = 1;
		monster.taunt = "**borble**";
		monster.talk = "**burbble?**";
		monster.victory = "Slime wiped out!";
		monster.loss = "SLIME TIME - GAME OVER";
		combat();
		break;  
      case 6:
	  case 7:
	    monster.ava = "_.@.+"
	    monster.name = "Goblin";
		monster.HP = 10;
		monster.STR = 2;
		monster.DEF = 1;
		monster.GOLD = 2;
		monster.taunt = "Ya ha ha!";
		monster.talk = "hungry!";
		monster.victory = "Goblin squashed!";
		monster.loss = "GOBBLED UP - GAME OVER";
	    combat();
		break;
      case 8:
	    monster.ava = "(=&=)";
	    monster.name = "Orc";
		monster.HP = 20;
		monster.STR = 4;
		monster.DEF = 4;
		monster.GOLD = 10;
		monster.taunt = "Lok'tar Ogar!";
		monster.talk = "Cry Havoc!";
		monster.victory = "Orc slain!";
		monster.loss = "SLICED AND DICED - GAME OVER";
		combat();
		break;
	  case 9:
        monster.ava = "|-#-|";
		monster.name = "Chest";
		monster.HP = 1;
	    monster.STR = 0;
		monster.DEF = 0;
		monster.GOLD = 30;
		monster.taunt = "Nice find!";
		monster.talk = "(silence)";
		monster.victory = "$ Ch-Ching! $";
		monster.loss = "WHAT? HOW? - GAME OVER";
		combat();
		break;
	  case 10:
	    monster.ava = "-0-$#";
		monster.name = "Shop";
		monster.HP = 1;
		monster.STR = 0;
		monster.DEF = 0;
		monster.GOLD = 0;
		monster.talk = shop();
		monster.taunt = "Need sumthin'?";
		monster.victory = "You attacked?!";
		monster.loss = "Death to evil! - GAME OVER";
		break;
		
	  default:
	}
    
}

function roll(dice) {
	res = Math.floor(Math.random() * dice);
	console.log("Rolled a " + res);
	return res;
}


function upd(id) {
	return document.getElementById(id);
}


function newGame() {
	gameState.combat = false;
	gameState.gameover = false;
	heroType("Jim", roll(3));
	upd("worldButtons").removeAttribute("style");
	upd("combatButtons").removeAttribute("style");
	upd("exploreButton").removeAttribute("style");
	upd("gameMessage").innerHTML = "Starting a new game!";
	upd("monHP").innerHTML = "";
	updateStats();
}


function saveGame(){
	var savegameData = {
		"ID": Date.now(),
		"NAME": hero.NAME,
		"ava": hero.ava,
		"TYPE": hero.TYPE,
		"HP": hero.HP, 
		"STR": hero.STR, 
		"DEF": hero.DEF, 	
		"WEAPON": hero.WEAPON,
		"ARMOR": hero.ARMOR,
		"ITEM": hero.ITEM,
		"GOLD": hero.GOLD
    };
	upd("gameMessage").innerHTML = "Game saved to slot #1 on " + savegameData.ID;
	localStorage.setItem('savegame1', JSON.stringify(savegameData));
	console.log("game saved to slot #1!");
	console.log(localStorage.savegame1);
}


function loadGame() {
	gameState.combat = false;
	gameState.gameover = false;
	var sg = JSON.parse(localStorage.getItem("savegame1"));
	hero.NAME = sg.NAME;
	hero.ava = sg.ava;
	hero.TYPE = sg.TYPE;
	hero.HP = sg.HP;
	hero.STR = sg.STR;
	hero.DEF = sg.DEF;
	hero.WEAPON = sg.WEAPON;
	hero.ARMOR = sg.ARMOR;
	hero.ITEM = sg.ITEM;
	hero.GOLD = sg.GOLD;
	upd("gameMessage").innerHTML = "Game loaded!";
	updateAll();
}


function updateStats() {
	upd("NAME").innerHTML = hero.NAME;
	upd("TYPE").innerHTML = hero.TYPE;
	upd("HP").innerHTML = hero.HP;
	upd("STR").innerHTML = hero.STR;
	upd("DEF").innerHTML = hero.DEF;
	upd("GOLD").innerHTML = hero.GOLD;
	upd("WEAPON").innerHTML = hero.WEAPON;
	upd("ARMOR").innerHTML = hero.ARMOR;
	upd("ITEM").innerHTML = hero.ITEM;
	upd("SCORE").innerHTML = gameState.SCORE;
}


function updateAll() {
	upd("NAME").innerHTML = hero.NAME;
	upd("leftImage").innerHTML = hero.ava;
	upd("leftMessage").innerHTML = "";
	upd("TYPE").innerHTML = hero.TYPE;
	upd("HP").innerHTML = hero.HP;
	upd("STR").innerHTML = hero.STR;
	upd("DEF").innerHTML = hero.DEF;
	upd("GOLD").innerHTML = hero.GOLD;
	upd("WEAPON").innerHTML = hero.WEAPON;
	upd("ARMOR").innerHTML = hero.ARMOR;
	upd("ITEM").innerHTML = hero.ITEM;
	upd("monNAME").innerHTML = monster.NAME;
	upd("rightImage").innerHTML = monster.ava;
	upd("monHP").innerHTML = monster.HP;
	upd("rightMessage").innerHTML = monster.taunt;

}


function updateLog(text) {
	if (gameLog.length >= gameLogMaxCount) {
		gameLog.shift();
	}
	gameLog.push(text)
	upd("logWindow").innerHTML = "Game Log " + gameLog.length + " <br/><br/>";
	for (i = 0; i < gameLog.length; i++) {
	    upd("logWindow").insertAdjacentHTML("beforeend", gameLog[i] + "<br/>");
	}
}


function explore(){
	updateLog("Player clicked Explore.");
	encType(roll(10));
	upd("monNAME").innerHTML = monster.name;
	upd("rightImage").innerHTML = monster.ava;
	upd("rightMessage").innerHTML = monster.taunt;
	updateStats();
}


function shop() {
	
}


function combat() {
	gameState.combat = true;
	console.log("combat begins!");
	updateLog("Found a " + monster.name + ". Combat begins!");	
	upd("exploreButton").setAttribute("style", "visibility: hidden");
	upd("combatButtons").removeAttribute("style");
	monster.HP = roll(6) + 10;
    upd("monHP").innerHTML = monster.HP;
	upd("leftImage").innerHTML = hero.ava;
	upd("leftMessage").innerHTML = hero.taunt;
}

function combatState() {
	
}

function fight() {
    if (gameState.combat){
	updateLog("Player clicked Fight.");
	swing = roll(10) + 1;
	if (swing > 4){
		dmg = hero.STR + (roll(3));
		monster.HP -= dmg;
		console.log("damage value is " + dmg);
		upd("gameMessage").innerHTML = "Well struck! Caused " + dmg + " damage!";
		updateLog("Player strikes the " + monster.name + ".");
		if (monster.HP <= 0) {
			monster.HP = 0;
			
			victory();
		}
	} else {
		upd("gameMessage").innerHTML = "Bad luck! You missed!";
		updateLog("Player misses.");
	}
	
	if (monster.STR >= 1) {
	    dmg = ((monster.STR - hero.DEF) > 0) ? monster.STR - hero.DEF : 1;
		hero.HP -= dmg;
	    upd("leftMessage").innerHTML = "Ouch! " + dmg + " damage!";
	}
	
	if (hero.HP <= 0) {
		hero.HP = 0;
		gameOver();
	}
	
	upd("monHP").innerHTML = monster.HP;
	updateStats();
	}
	else {
		upd("gameMessage").innerHTML = "Nothing to fight!";
	}
}

function item() {
	
}

function run() {
    updateLog("Player clicked Run.");
    if (roll(10) > 4) {
		updateLog("Player escaped combat by running away.");
		gameState.combat = false;
		monster.HP = 0;
		monster.NAME = "";
		monster.ava = ",,,,,";
		monster.taunt = "Escaped!";
		monster.STR = 0;
		monster.DEF = 0;
		monster.GOLD = 0;
		upd("gameMessage").innerHTML = "Escaped!";
		upd("exploreButton").removeAttribute("style");
		upd("combatButtons").setAttribute("style", "visibility: hidden");
		upd("monHP").setAttribute("style", "visibility: hidden");
		upd("monNAME").innerHTML = "";
	}
	else {
		updateLog("Player failed to escape combat.");
		dmg = ((monster.STR - hero.DEF) > 0) ? monster.STR - hero.DEF : 1;
		hero.HP -= dmg;
	    upd("leftMessage").innerHTML = "Ouch! " + dmg + " damage!";
		if (hero.HP <= 0) {
		hero.HP = 0;
		gameOver();
	    }
	}
	
	upd("monHP").innerHTML = monster.HP;
	updateAll();
    	
}


function heal() {
	
}


function talk() {
	if (gameState.combat) {
		upd("rightMessage").innerHTML = monster.talk;
	}
	else {
		upd("rightMessage").innerHTML = "No response!";
	}
}


function victory() {
	gameState.combat = false;
	upd("gameMessage").innerHTML = "Victory!"
	upd("rightImage").innerHTML = "";
	upd("rightMessage").innerHTML = monster.victory;
	upd("leftMessage").innerHTML = "found " + monster.GOLD + " gold!";
	hero.GOLD += monster.GOLD;
	upd("exploreButton").removeAttribute("style");
	upd("combatButtons").setAttribute("style", "visibility: hidden");
	gameState.SCORE += 1;
	updateLog("Player defeated the " + monster.name + ".");
	updateStats();
}

function gameOver() {
	gameState.combat = false;
	gameState.gameover = true;
	upd("gameMessage").innerHTML = monster.loss;
	upd("leftImage").innerHTML = "R.I.P";
	upd("leftMessage").innerHTML = "Sorry, bud.";
	upd("worldButtons").setAttribute("style", "visibility: hidden");
	upd("combatButtons").setAttribute("style", "visibility: hidden");
	updateLog("Player slain by " + monster.name + ".  ** GAME ENDS **");
	updateStats();
	
}



 function toggledisplay(elementID)
    {
        (function(style) {
            style.display = style.display === 'none' ? '' : 'none';
        })(document.getElementById(elementID).style);
    }


	
console.log(hero);
console.log(monster);
