const prompt = require('prompt-sync')()

//Stringify
let firstName = prompt('Enter your trainer name: ');
let gender = prompt('Enter your gender [F/M]: ');
let age = prompt('What is your age? ');

let trainerInfo = JSON.stringify({
	trainerName: firstName,
	trainerGender: gender,
	trainerAge: age
})

console.log("\n" + "Trainer Info:");
console.log(trainerInfo);

//Trainer object
let myTrainer = ({
	name: firstName,
	age: age,
	gender: gender,
	hometown: 'Littleroot town',
	action: function(){
		console.log(myTrainer.name + ' walked 10 kilometers');
		console.log(myTrainer.name + ' encountered a wild Rattata!');
	},
	fight: function(){
		console.log(myTrainer.name + " chose to fight!");
		console.log(myTrainer.name + " is now in a battle!")
	}
})

let pokemonList = [{
	name: 'Prinplup',
	type: 'Water',
	LVL: 20
},
{
	name: 'Fennekin',
	type: 'Fire',
	LVL: 23
},
{
	name: 'Jirachi',
	type: 'Psychic',
	LVL: 45
}]

myTrainer.action();
myTrainer.fight();

console.log("\n" + 'Choose a Pokemon!');
console.log("|  Name    |  Type  |  Level |");
console.log(" ", pokemonList[0].name, "  ", pokemonList[0].type, "   ", pokemonList[0].LVL);
console.log(" ", pokemonList[1].name, "  ", pokemonList[1].type, "    ", pokemonList[1].LVL);
console.log(" ", pokemonList[2].name, " ",pokemonList[2].type, "   ", pokemonList[2].LVL);

console.log();
let choose = prompt("Which pokemon will you choose? ").toLowerCase();

let pokemonStats = [{
	Name: 'Fennekin',
	Level: 23,
	Defense: 33,
	Health: 46,
	Damage: 23,
	specialATK: "Flamethrower"
},
{	Name: 'Prinplup',
	Level: 20,
	Defense: 30,
	Health: 40,
	Damage: 20,
	specialATK: "Bubble Beam"
},
{ 	Name: 'Jirachi',
	Level: 45,
	Defense: 55,
	Health: 90,
	Damage: 45,
	specialATK: "Doom Desire"
}]

console.log("Pokemon's Stats:");
if (choose == "fennekin"){
	console.log(pokemonStats[0]);
} else if (choose == "prinplup"){
	console.log(pokemonStats[1]);
} else if (choose == "jirachi"){
	console.log(pokemonStats[2]);
}

function Pokemon(name, level, spATK){
	//Properties
	this.name = name;
	this.defense = level + 10;
	this.level = level;
	this.health = 2 * level;
	this.attack = level;
	this.specialATK = this.attack * 2;
	this.currentHealth = this.health;
	this.spATK = this.spATK;

	//Methods
	this.tackle = function(target){
		console.log(`${this.name} attacked ${target.name}`);
		target.currentHealth -= this.attack;
		if (target.currentHealth >= 0){
			console.log(`${target.name} received ${this.attack} damage.`);
			console.log(`${target.name}'s health: ${target.currentHealth} HP.`);
		}else{
			target.faint();
			this.lvlUp();
		}
	};
	this.faint = function(){
		console.log(`${this.name} fainted.`);
	};
	this.lowerDefense = function(target){
		target.defense = target.defense - 5;
		console.log(`${target.name}'s defense was lowered by ${this.name}`);
		console.log(`${target.name}'s defense: ${target.defense}`);
	};
	this.heal = function(){
		maxHealth = level;
		if (this.currentHealth >= this.level){
			console.log("Health is still full!");
		}else{
			this.currentHealth = this.currentHealth + 30;
			console.log(`${this.name} used heal!`);
			if (this.currentHealth >= this.level){ //incase healed health goes beyond the health bar
				console.log(`${this.name}'s health is now at full HP!`);
				console.log(`${this.name}'s health: ${this.health} HP.`);
			}else{
				console.log(`${this.name}'s health is now at ${this.currentHealth} HP.`);
			}
		}
	};
	this.specialATTACK = function(target){
		console.log(`${this.name} used ${spATK} on ${target.name}`);
		console.log(`${target.name} received ${this.specialATK} damage.`);
		target.currentHealth = target.currentHealth - this.specialATK;
		console.log(`${target.name}'s health is at ${target.currentHealth} HP.`);
		if (target.currentHealth <= 0){
			target.faint();
			this.lvlUp();
		}
	};
	this.lvlUp = function(){
		console.log(`${this.name} won the battle!`);
		this.level = this.level += 1;
		console.log(`${this.name} gained 85 EXP.`);
		console.log(`${this.name} is now level ${this.level}!`);
		process.exit(0);
	};
	this.Run = function(){
		console.log(`${this.name} ran away safely.`);
		process.exit(0);
	};
}
//pokemon
let rattata = new Pokemon("Rattata", 30, "Bide");
let prinplup = new Pokemon("Prinplup", 20, "Bubble Beam");
let fennekin = new Pokemon("Fennekin", 23, "Flame Thrower");
let jirachi = new Pokemon("Jirachi", 45, "Doom Desire");
	
switch (choose){

case "prinplup":
	let prinplupMove = prompt("What will Prinplup do? [Fight/Run]: ").toLowerCase();
	if (prinplupMove == 'fight'){
		while (rattata.health && prinplup.health > 0) {
			console.log();
			let movesList = [
				"Peck", 
				"Aqua Ring",
				"Bubble Beam",
				"Leer"
			];
			console.log(movesList);
			console.log();
			let choice1 = prompt("What attack will Prinplup choose? ").toLowerCase();
			if (choice1 == "peck"){
				console.log("Prinplup used Peck.")
				prinplup.tackle(rattata);
				if (rattata.level < rattata.health){
					rattata.tackle(prinplup);
				}
			}if (choice1 == "aqua ring"){
				prinplup.heal();
			}if (choice1 == "bubble beam"){
				prinplup.specialATTACK(rattata);
				if (rattata.health > 0){
					console.log("Rattata used Leer.")
					rattata.lowerDefense(prinplup);
				}
			}if (choice1 == "leer"){
				prinplup.lowerDefense(rattata);
				rattata.specialATTACK(prinplup);		
			}
	}if (rattata.health <= 0) {
		rattata.faint();
		prinplup.lvlUp();
	}else if (prinplup.health <=0) {
		prinplup.faint();
		rattata.lvlUp();
	}
	}if (prinplupMove == "run"){
		console.log("Prinplup ran away safely.");
	}
	break;

case "fennekin":
	let fennekinMove = prompt("What will Fennekin do? [Fight/Run]: ").toLowerCase();
	if (fennekinMove == 'fight'){
		while (rattata.health && fennekin.health > 0) {
			console.log();
			let movesList = [
				"Cut", 
				"Recover",
				"Flamethrower",
				"Leer"
			];
			console.log(movesList);
			console.log();
			let choice1 = prompt("What attack will Fennekin choose? ").toLowerCase();
			if (choice1 == "cut"){
				console.log("Fennekin used Cut.")
				fennekin.tackle(rattata);
				if (rattata.health < rattata.level){
					rattata.tackle(fennekin);
				}
			}if (choice1 == "recover"){
				fennekin.heal();
			}if (choice1 == "flamethrower"){
				fennekin.specialATTACK(rattata);
				if (rattata.health > 0){
					console.log("Rattata used Leer.")
					rattata.lowerDefense(fennekin);
				}
			}if (choice1 == "leer"){
				fennekin.lowerDefense(rattata);
				rattata.specialATTACK(fennekin);		
			}
	}if (rattata.health <= 0) {
		rattata.faint();
		fennekin.lvlUp();
	}else if (fennekin.health <=0) {
		fennekin.faint();
		rattata.lvlUp();
	}
	}if (fennekinMove == "run"){
		console.log("Fennekin ran away safely.");
	}
	break;


case "jirachi":
	let jirachiMove = prompt("What will Jirachi do? [Fight/Run]: ").toLowerCase();
	if (jirachiMove == 'fight'){
		while (rattata.health && jirachi.health > 0) {
			console.log();
			let movesList = [
				"Aerial Ace", 
				"Heal Pulse",
				"Doom Desire",
				"Leer"
			];
			console.log(movesList);
			console.log();
			let choice1 = prompt("What attack will Jirachi choose? ").toLowerCase();
			if (choice1 == "aerial ace"){
				console.log("Jirachi used Aerial Ace.")
				jirachi.tackle(rattata);
				if (rattata.health < rattata.level){
					rattata.tackle(jirachi);
				}
			}if (choice1 == "heal pulse"){
				jirachi.heal();
			}if (choice1 == "doom desire"){
				jirachi.specialATTACK(rattata);
				if (rattata.health > 0){
					console.log("Rattata used Leer.")
					rattata.lowerDefense(jirachi);
				}
			}if (choice1 == "leer"){
				jirachi.lowerDefense(rattata);
				rattata.specialATTACK(jirachi);		
			}
	}if (rattata.health <= 0) {
		rattata.faint();
		jirachi.lvlUp();
	}else if (jirachi.health <=0) {
		jirachi.faint();
		rattata.lvlUp();
	}
	}if (jirachiMove == "run"){
			console.log("Jirachi ran away safely.");
	}
	break;

default:
	console.log("Input does not exist. Please choose among the Pokemon.")
}