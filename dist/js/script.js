let player = {
    health: 150,
    mana: 150,
    stamina: 150,
    intelligence: 5,
    strength: 6,
    level: 1,
}

let currentEnemy = {};

let enemies = {
    gnome: {
        health: 100,
        level: 1,
        resistance: 'earth',
        timeOut: 4000,
        damage: 10,


    },
    fire_lizard: {
        health: 200,
        level: 2,
        resistance: 'fire',
        timeOut: 3000,
        damage: 40
    },
    ice_elemental: {
        health: 300,
        level: 3,
        resistance: 'ice',
        timeOut: 3000,
        damage: 60
    },
    wind_elemental: {
        health: 400,
        level: 4,
        resistance: 'air',
        timeOut: 2000,
        damage: 100
    }
}

let attacks = {
    magicarrow: {
        damage: 5,
        type: 'air',
        mana: 10,
        cooldown: 5000
    },
    fireball: {
        damage: 10,
        type: 'fire',
        mana: 20,
        cooldown: 5000
    },
    icebolt: {
        damage: 10,
        type: 'water',
        mana: 15,
        cooldown: 8000
    },
    earthquake: {
        damage: 15,
        type: 'earth',
        mana: 25,
        cooldown: 8000
    },
    icerain: {
        damage: 20,
        type: 'water',
        mana: 28,
        cooldown: 9000
    },
    meteorstrike: {
        damage: 25,
        type: 'earth',
        mana: 35,
        cooldown: 10000
    },
    combust: {
        damage: 25,
        type: 'fire',
        mana: 30,
        cooldown: 12000
    },
    lightningbolt: {
        damage: 30,
        type: 'air',
        mana: 40,
        cooldown: 12000
    },
    blizzard: {
        damage: 35,
        type: 'water',
        mana: 50,
        cooldown: 15000
    },
    tornado: {
        damage: 35,
        type: 'air',
        mana: 50,
        cooldown: 15000
    },
    firestorm: {
        damage: 40,
        type: 'fire',
        mana: 65,
        cooldown: 18000
    },
    implosion: {
        damage: 55,
        type: 'earth',
        mana: 80,
        cooldown: 20000
    }

}

let weaponAttacks = {
    stick: {
        damage: 5,
        stamina: 10,
        cooldown: 5000
    },
    dagger: {
        damage: 7,
        stamina: 15,
        cooldown: 5000
    },
    bow: {
        damage: 10,
        stamina: 20,
        cooldown: 7000
    },
    hammer: {
        damage: 15,
        stamina: 30,
        cooldown: 10000
    },
    axe: {
        damage: 52000,
        stamina: 35,
        cooldown: 14000
    },
    sword: {
        damage: 52222,
        stamina: 35,
        cooldown: 18000
    }
}

const playerHealth = document.getElementById("health");
const enemyHealth = document.getElementById("enemy_health");
const playerMana = document.getElementById("mana");
const playerStamina = document.getElementById("stamina");
const playerIntelligence = document.getElementById("intelligence");
const playerStrength = document.getElementById("strength");
const spells = document.querySelectorAll(".spell");
const weapons = document.querySelectorAll(".weapon");
const displayChangeStats = document.getElementById("changeStats");
let remainingPoints = 5;
displayChangeStats.style.display = "none";



function disableButtons(){
    spells.forEach(spell => {
        spell.disabled = true;
        spell.style.background = "rgba(0,0,0,0.4)"
    });
    weapons.forEach(weapon => {
        weapon.disabled = true;
    });
}

window.onload = disableButtons;

function displayPlayerHealth() {
    playerHealth.innerHTML = "Health: " + player.health;
}

function displayEnemyHealth() {
    enemyHealth.innerHTML = "Enemy Health: " + currentEnemy.health;
}

function displayPlayerMana() {
    playerMana.innerHTML = "Mana: " + player.mana;
}

function displayPlayerStamina() {
    playerStamina.innerHTML = "Stamina: " + player.stamina;
}

function displayPlayerIntelligence() {
    playerIntelligence.innerHTML = "Intelligence: " + player.intelligence;
}

function displayPlayerStrength() {
    playerStrength.innerHTML = "Strength: " + player.strength;
}

function changeStats(){
    displayChangeStats.style.display = "block";
    const currentIntelligence = document.getElementById("currentIntelligence");
    const currentStrength = document.getElementById("currentStrength");
    const addIntelligence = document.getElementById("addIntelligence");
    const addStrength = document.getElementById("addStrength");
    const addPoints = document.querySelectorAll(".addPoints");
    document.getElementById("remainingPoints").innerHTML ="Remaining points: " + remainingPoints;
    
    currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
    currentStrength.innerHTML = "Strength: " + player.strength;
    
    addIntelligence.onclick = function (){
        player.intelligence++;
        remainingPoints--;
        currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    }
    
    addStrength.onclick = function (){
        player.strength++;
        remainingPoints--;
        currentStrength.innerHTML = "Strength: " + player.strength;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    }
    // resets the add attributes buttons to an enabled position
    addIntelligence.disabled = false;
    addStrength.disabled = false;
    
    // disables the add attributes buttons when remaining points are 0
    addPoints.forEach(point => {
        point.addEventListener("click", function (){
            if (remainingPoints === 0){
                addIntelligence.disabled = true;
                addStrength.disabled = true;
            }
        })
    })
}

function refreshStats(){
    displayEnemyHealth();
    displayPlayerMana();
    displayPlayerHealth();
    displayPlayerStamina();
    displayPlayerIntelligence();
    displayPlayerStrength();
}


document.getElementById("fight").addEventListener("click", function () {
    currentEnemy = enemies.gnome;
    refreshStats(); // am dat refresh si la enemy health
    spells.forEach(spell => {
        spell.disabled = false;
        spell.style.background = "transparent"
    })
    weapons.forEach(weapon => {
        weapon.disabled = false;
    })
    var enemyFight =setInterval(function () {
        let damageEnemy = (Math.floor(Math.random() * currentEnemy.damage) + 1);
        player.health = player.health - damageEnemy;
        document.getElementById("damageReceived").innerHTML = "The enemy did: " + damageEnemy + " damage";
        displayPlayerHealth();
    }, currentEnemy.timeOut);
        displayEnemyHealth();

    
        document.addEventListener("click", gnomeCondition);
        function gnomeCondition() {
            if(enemies.gnome.health <= 0){
                changeStats();
                document.removeEventListener("click", gnomeCondition ); // de revizuit
                document.getElementById("close").onclick = function (){
                    currentEnemy = enemies.fire_lizard;
                    player.mana = 150;
                    player.health = 300;
                    player.stamina = 150;
                    refreshStats();
                    document.getElementById("damageReceived").innerHTML = "";
                    document.getElementById("damageInfo").innerHTML = "";
                    displayChangeStats.style.display = "none";
                }
            }         
        }

        document.addEventListener("click", lizardCondition);
        function lizardCondition() {
            if(enemies.fire_lizard.health <= 0){
                remainingPoints = 5;
                changeStats();
                document.removeEventListener("click", lizardCondition ); // de revizuit
                document.getElementById("close").onclick = function (){
                    currentEnemy = enemies.ice_elemental;
                    player.mana = 250;
                    player.health = 400;
                    player.stamina = 200;
                    refreshStats();
                    document.getElementById("damageReceived").innerHTML = "";
                    document.getElementById("damageInfo").innerHTML = "";
                    displayChangeStats.style.display = "none";
                }
            }   
        }
        document.addEventListener("click", iceCondition);
        function iceCondition() {
            if(enemies.ice_elemental.health <= 0){
                remainingPoints = 5;
                changeStats();
                document.removeEventListener("click", iceCondition ); // de revizuit
                document.getElementById("close").onclick = function (){
                    currentEnemy = enemies.wind_elemental;
                    player.mana = 250;
                    player.health = 500;
                    player.stamina = 200;
                    refreshStats();
                    document.getElementById("damageReceived").innerHTML = "";
                    document.getElementById("damageInfo").innerHTML = "";
                    displayChangeStats.style.display = "none";

                    

                }
            }   
        }

        document.addEventListener("click", airCondition);
        function airCondition(){
            if(enemies.wind_elemental.health <= 0){
                document.removeEventListener("click", airCondition ); 
                document.getElementById("fight").innerHTML = "Play Again";
                document.querySelector(".wrap").style.display = "none";
                document.getElementById("finalMessage").innerHTML = "Congratulations, you won!";
                document.getElementById("fight").addEventListener("click", function (){
                    window.location.reload();
                }, {once:true})
            }
        }
     
 
   
}, {
    once: true
});


function magicarrow() {
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.magicarrow.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.magicarrow.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.magicarrow.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("magicarrow");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent";  
    }, attacks.magicarrow.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.magicarrow.mana;
    displayPlayerMana();
}

function fireball() {
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.fireball.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.fireball.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.fireball.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("fireball");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent";  
    }, attacks.fireball.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.fireball.mana;
    displayPlayerMana();
}

function icebolt() {
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.icebolt.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.icebolt.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.icebolt.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("icebolt");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.icebolt.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.icebolt.mana;
    displayPlayerMana();
}


function earthquake() {
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.earthquake.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.earthquake.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.earthquake.damage + player.intelligence * 0.2) + " damage";
    }
    const spellAttack = document.getElementById("earthquake");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.earthquake.cooldown);
    displayEnemyHealth();
    player.mana = player.mana - attacks.earthquake.mana;
    displayPlayerMana();
}

function icerain() {
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.icerain.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.icerain.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.icerain.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("icerain");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.icerain.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.icerain.mana;
    displayPlayerMana();
}

function combust() {
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.combust.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.combust.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.combust.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("combust");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.combust.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.combust.mana;
    displayPlayerMana();
}

function meteorstrike() {
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.meteorstrike.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.meteorstrike.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.meteorstrike.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("meteorstrike");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.meteorstrike.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.meteorstrike.mana;
    displayPlayerMana();
}

function lightningbolt() {
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.lightningbolt.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.lightningbolt.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.lightningbolt.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("lightningbolt");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.lightningbolt.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.lightningbolt.mana;
    displayPlayerMana();
}

function tornado() {
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.tornado.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.tornado.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.tornado.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("tornado");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.tornado.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.tornado.mana;
    displayPlayerMana();
}

function blizzard() {
 
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.blizzard.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.blizzard.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.blizzard.damage + (player.intelligence * 0.2)) + " damage";
    }

    const spellAttack = document.getElementById("blizzard");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.blizzard.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.blizzard.mana;
    displayPlayerMana();
}

function firestorm() {
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.firestorm.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.firestorm.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.firestorm.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("firestorm");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.firestorm.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.firestorm.mana;
    displayPlayerMana();
}

function implosion() {
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.implosion.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.implosion.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.implosion.damage + (player.intelligence * 0.2)) + " damage";
    }
    const spellAttack = document.getElementById("implosion");
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent"; 
    }, attacks.implosion.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.implosion.mana;
    displayPlayerMana();
}

function stick() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.stick.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.stick.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("stick").disabled = true;
    setTimeout(function () {
        document.getElementById("stick").disabled = false;
    }, weaponAttacks.stick.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.stick.stamina;
    displayPlayerStamina();
}

function dagger() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.dagger.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.dagger.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("dagger").disabled = true;
    setTimeout(function () {
        document.getElementById("dagger").disabled = false;
    }, weaponAttacks.dagger.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.dagger.stamina;
    displayPlayerStamina();
}

function bow() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.bow.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.bow.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("bow").disabled = true;
    setTimeout(function () {
        document.getElementById("bow").disabled = false;
    }, weaponAttacks.bow.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.bow.stamina;
    displayPlayerStamina();
}

function hammer() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.hammer.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.hammer.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("hammer").disabled = true;
    setTimeout(function () {
        document.getElementById("hammer").disabled = false;
    }, weaponAttacks.hammer.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.hammer.stamina;
    displayPlayerStamina();
}

function axe() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.axe.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.axe.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("axe").disabled = true;
    setTimeout(function () {
        document.getElementById("axe").disabled = false;
    }, weaponAttacks.axe.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.axe.stamina;
    displayPlayerStamina();
}

function sword() {
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.sword.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "You did: " + Math.floor(weaponAttacks.sword.damage + (player.strength * 0.2)) + " damage";
    document.getElementById("sword").disabled = true;
    setTimeout(function () {
        document.getElementById("sword").disabled = false;
    }, weaponAttacks.sword.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.sword.stamina;
    displayPlayerStamina();
}


