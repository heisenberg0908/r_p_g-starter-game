// now we will be wriring the main driver function of the game
// step 1) firstly we will be initializing all the variables we will be using in our game

let xp=0;
let health=100;
let gold=50;
let fighting;
let inventory=['stick'];
let currentWeapon=0;
let monsterHealth;
// here we are referencing all the variables from index.html , either they won't be functioning
const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const goldText=document.querySelector("#goldText");
const healthText=document.querySelector("#healthText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");
const weapons=[
    {
        name:"stick",
        power:5
    },
    {
        name:"dagger",
        power:30
    },
    {
        name: "claw hammer",
        power:50
    },
    {
        name:"power hammer",
        power:100
    }
];

const monsters=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
];
const locations=[
    {
        name: "go to town",
        "button text":["go to store","go to cave","fight dragon"],
        "button function":[goStore,goCave,fightDragon],
        text:["you are in the town square"]
},
{
        name: "go to store",
        "button text":["buy 10 health(10 gold","buy weapon(30 gold)","go to town square"],
        "button function":[buyHealth,buyWeapon,goTown],
        text:"to entered the store"
},
{
        name: "cave",
        "button text":["fight slime","fight fanged beast","go to townsquare"],
        "button function":[fightSlime,fightBeast,goTown],
        text:"you are in the cave, now fight dragons..."
},
{
        name: "fight",
        "button text":["attack","dodge","run"],
        "button function":[attack,dodge,goTown],
        text:"u are fighting the dragon"
},
{
        name: "kill monster",
        "button text":["go to town","go to town","go to town"],
        "button function":[goTown,goTown,goTown],
        text:"u have successfully defeated the monster , u have gained experience and gold.."
},
{
        name: "lose",
        "button text":["replay","replay","replay"],
        "button functions":[restart,restart,restart],
        text:"u dies"
},
{
        name: "win",
        "button text":["replay","replay","replay"],
        "button functions":[restart,restart,restart],
        text:"u won , u are the true defeater .... yahhh .... congratulations....."
}

]


// now we will be initializing the buttons: by setting te onclick property:

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(location){
    monsterStats.style.display=none;
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick=location["button function"][0];
    button2.onclick=location["button function"][1];
    button3.onclick=location["button function"][2];
    text.innerText=location.text
}

function goTown(){
    update(locations[0])
}

// now we will be cresting goStore,goCave and fightDragon functions
function goStore (){
    update(locations[1])

}

function goCave(){
    update(locations[2])
}


function buyHealth(){
    if(gold>=10){
        gold-=10;
        health+=10;
        gold.innerText=gold;
        health.innerText=health;
    }else{
        text.innerText="you don't have enough gold ...."
    }
}

function buyWeapon(){
    if(currentWeapon<weapons.length-1){
        if(gold>=30){
            gold-=30;
            currentWeapon++;
            gold.innerText=gold;
            let newWeapon=weapons[currentWeapon].name;
            text.innerText="you now have a" + newWeapon +".";
            inventory.push(newWeapon)
        }else{
            text.innerText("u don't have enough gold to buy a weapon..")
        }
    }else{
        text.innerText("u currently have the strongest weapon...");
        button2.innerText="sell weapon for 15 gold";
        button2.onclick=sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        gold.innerText=gold;
        let currentWeapon=inventory.shift();
        text.innerText="u sold a " + currentWeapon + ".";
        text.innerText="u have currently" + inventory + "weapons in ur inventory"
    }else{
        text.innerText="don't sell ur only weapon.."
    }
}


function fightSlime(){
    fighting=0;
    goFight()
}

function fightBeast(){
    fighting=1;
    goFight()
}
function fightDragon(){
    fighting=2;
    goFight()
}

function goFight(){
    update(locations[3]),
    monsterHealth=monsters[fighting].health,
    monsterStats.style.display="block",
    monsterNameText.innerText=monsters[fighting].name,
    monsterHealthText.innerText=monsterHealth
}

function attack(){
    text.innerText="the " + monsters[fighting].name + "attacks";
    text.innerText="you attack with ur" + weapons[currentWeapon].name + ".";
    health -=monsters[fighting].level;
    monsterHealth-=weapons[currentWeapon].power + Math.floor(Math.random() * xp)+1;
    health.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
        fighting==2 ? winGame() : defeatMonster();
    }
}

function dodge(){
    text.innerText="u have dodged the attack from"+ monsters[fighting].name + "."
}
    
function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level * 6.7);
    xp+=monsters[fighting].level;
    gold.innerText=gold;
    xp.innerText=xp;
    update(locations[4])
}

function lose(){
    update(locations[5])
}

function winGame(){
    update(locations[6])
}

function restart(){
    xp=0;
    gold=50;
    health=100;
    currentWeapon=0;
    inventory=["stick"];
    gold.innerText=gold;
    health.innerText=health;
    xp.innerText=xp;
    goTown();

}



