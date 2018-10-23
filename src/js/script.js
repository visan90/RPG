//Player starting stats
let player = {
    health: 150,
    mana: 150,
    stamina: 150,
    intelligence: 5,
    strength: 6,
};

//Empty object to asign enemies to
let currentEnemy = {};

//Object containing all the enemies
let enemies = {
    gnome: {
        health: 100,
        level: 1,
        resistance: 'earth',
        timeOut: 4000,
        damage: 20,
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
        resistance: 'water',
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
};

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

};

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
        damage: 20,
        stamina: 35,
        cooldown: 14000
    },
    sword: {
        damage: 25,
        stamina: 35,
        cooldown: 18000
    }
};

//Variables
const playerHealth = document.getElementById("health");
const enemyHealth = document.getElementById("enemyHealth");
const playerMana = document.getElementById("mana");
const playerStamina = document.getElementById("stamina");
const playerIntelligence = document.getElementById("intelligence");
const playerStrength = document.getElementById("strength");
const spells = document.querySelectorAll(".spell");
const weapons = document.querySelectorAll(".weapon");
const displayChangeStats = document.getElementById("changeStats");
const enemyImage = document.getElementById("enemyImg");
let remainingPoints = 5;
let currentPlayerHealth = 150;
let currentPlayerMana = 150;
let currentPlayerStamina = 150;
let currentEnemyHealth = 100;

displayChangeStats.style.display = "none";

//Used before player starts game
function disableButtons() {
    spells.forEach(spell => {
        spell.disabled = true;
        spell.style.background = "rgba(0,0,0,0.4)";
    });
    weapons.forEach(weapon => {
        weapon.disabled = true;
        weapon.style.background = "rgba(0,0,0,0.4)";
    });
};

window.onload = disableButtons;

//Enables attacks when player clicks on start fight or when a new fight starts
function enableAttacks() {
    spells.forEach(spell => {
        spell.disabled = false;
        spell.style.background = "transparent";
    });
    weapons.forEach(weapon => {
        weapon.disabled = false;
        weapon.style.background = "transparent";
    });
}

//Functions for displaying stats
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

//Show change stats modal after winning fight
function changeStats() {
    displayChangeStats.style.display = "block";
    const currentIntelligence = document.getElementById("currentIntelligence");
    const currentStrength = document.getElementById("currentStrength");
    const addIntelligence = document.getElementById("addIntelligence");
    const addStrength = document.getElementById("addStrength");
    const addPoints = document.querySelectorAll(".addPoints");
    document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
    currentStrength.innerHTML = "Strength: " + player.strength;
    addIntelligence.onclick = function () {
        player.intelligence++;
        remainingPoints--;
        currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    }
    addStrength.onclick = function () {
        player.strength++;
        remainingPoints--;
        currentStrength.innerHTML = "Strength: " + player.strength;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    }
    // resets the add attributes buttons to an enabled position for the next time the modal shows
    addIntelligence.disabled = false;
    addStrength.disabled = false;

    // disables the add attributes buttons when remaining points are 0
    addPoints.forEach(point => {
        point.addEventListener("click", function () {
            if (remainingPoints === 0) {
                addIntelligence.disabled = true;
                addStrength.disabled = true;
            }
        })
    })
}

function refreshStats() {
    displayEnemyHealth();
    displayPlayerMana();
    displayPlayerHealth();
    displayPlayerStamina();
    displayPlayerIntelligence();
    displayPlayerStrength();
}

//Fight starts
document.getElementById("fight").addEventListener("click", function () {
    document.getElementById("fight").style.display = "none";
    currentEnemy = enemies.gnome; //assigning the first enemy to the empty object
    document.querySelector("#mask").style.display = "none";
    refreshStats();
    enableAttacks();

    //Interval and math calculations for enemies damage
    setInterval(function () {
        let damageEnemy = (Math.floor(Math.random() * (currentEnemy.damage - currentEnemy.damage / 2 + 1)) + currentEnemy.damage / 2);
        player.health = player.health - damageEnemy;
        document.getElementById("damageReceived").innerHTML = "The enemy did: " + damageEnemy + " damage";
        displayPlayerHealth();
        document.getElementById("health").style.width = player.health * (500 / currentPlayerHealth) + "px";

        //Condition if player loses
        if (currentEnemy.health > 0 && player.health <= 0) {
            Object.assign(document.getElementById("mask").style, {
                display: "block",
                backgroundImage: "url('dist/img/background.jpg')"
            });
            document.getElementById("lost").style.display = "block";
            document.getElementById("fight").style.display = "block";
            document.getElementById("fight").innerHTML = "Play Again";
            document.getElementById("fight").addEventListener("click", function () {
                window.location.reload();
            }, {
                once: true
            })

        }
    }, currentEnemy.timeOut);

    //Checks if the first enemy dies and pushes the next one
    document.addEventListener("click", gnomeCondition);

    function gnomeCondition() {
        if (enemies.gnome.health <= 0) {
            //variables for proper displayed length of status bars
            currentPlayerHealth = 300;
            currentPlayerMana = 150;
            currentPlayerStamina = 150;
            currentEnemyHealth = 200;

            changeStats();
            document.removeEventListener("click", gnomeCondition);
            document.getElementById("close").onclick = function () {
                currentEnemy = enemies.fire_lizard;
                enemyImage.src = "dist/img/fire_lizard.png";
                player.mana = 150;
                player.health = 300;
                player.stamina = 150;
                refreshStats();
                enableAttacks();
                document.getElementById("damageReceived").innerHTML = "";
                document.getElementById("damageInfo").innerHTML = "";
                displayChangeStats.style.display = "none";
            }
        }
    }
    //Checks if the second enemy dies and pushes the next one
    document.addEventListener("click", lizardCondition);

    function lizardCondition() {
        if (enemies.fire_lizard.health <= 0) {
            currentPlayerHealth = 400;
            currentPlayerMana = 250;
            currentPlayerStamina = 200;
            currentEnemyHealth = 300;
            remainingPoints = 5; //resets remaining points

            changeStats();
            document.removeEventListener("click", lizardCondition);
            document.getElementById("close").onclick = function () {
                currentEnemy = enemies.ice_elemental;
                enemyImage.src = "dist/img/ice_elemental.png";
                player.mana = 250;
                player.health = 400;
                player.stamina = 200;
                refreshStats();
                enableAttacks();
                document.getElementById("damageReceived").innerHTML = "";
                document.getElementById("damageInfo").innerHTML = "";
                displayChangeStats.style.display = "none";
            }
        }
    }
    //Checks if the third enemy dies and pushes the next one
    document.addEventListener("click", iceCondition);

    function iceCondition() {
        if (enemies.ice_elemental.health <= 0) {
            currentPlayerHealth = 500;
            currentEnemyHealth = 400;
            remainingPoints = 5;
            changeStats();
            document.removeEventListener("click", iceCondition);
            document.getElementById("close").onclick = function () {
                currentEnemy = enemies.wind_elemental;
                player.mana = 250;
                player.health = 500;
                player.stamina = 200;
                refreshStats();
                enableAttacks();
                document.getElementById("damageReceived").innerHTML = "";
                document.getElementById("damageInfo").innerHTML = "";
                displayChangeStats.style.display = "none";
            }
        }
    }
    //Check if the fourth enemy is dead and finish game
    document.addEventListener("click", airCondition);

    function airCondition() {
        if (enemies.wind_elemental.health <= 0) {
            document.removeEventListener("click", airCondition);
            document.getElementById("fight").style.display = "block";
            document.getElementById("fight").innerHTML = "Play Again";
            document.querySelector(".wrap").style.display = "none";
            document.getElementById("finalMessage").innerHTML = "Congratulations, you won!";
            document.getElementById("fight").addEventListener("click", function () {
                window.location.reload();
            }, {
                once: true
            })
        }
    }
}, {
    once: true
});

//Updates the status bars
document.addEventListener("click", function () {
    document.getElementById("mana").style.width = player.mana * (500 / currentPlayerMana) + "px";
    document.getElementById("stamina").style.width = player.stamina * (500 / currentPlayerStamina) + "px";
    document.getElementById("enemyHealth").style.width = currentEnemy.health * (500 / currentEnemyHealth) + "px";
    document.getElementById("health").style.width = player.health * (500 / currentPlayerHealth) + "px";
});

//Functions with all the attacks
function magicarrow() {
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.magicarrow.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage. You did: " + Math.floor((attacks.magicarrow.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.magicarrow.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Magic Arrow did: " + Math.floor(attacks.magicarrow.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.fireball.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage. You did: " + Math.floor((attacks.fireball.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.fireball.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Fireball did: " + Math.floor(attacks.fireball.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.icebolt.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage. You did: " + Math.floor((attacks.icebolt.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.icebolt.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Ice Bolt did: " + Math.floor(attacks.icebolt.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.earthquake.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage. You did: " + Math.floor((attacks.earthquake.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.earthquake.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Earthquake did: " + Math.floor(attacks.earthquake.damage + player.intelligence * 0.2) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.icerain.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage. You did: " + Math.floor((attacks.icerain.damage) / 2 + (player.intelligence * 0.2)) + " damage"
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.icerain.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Ice Rain did: " + Math.floor(attacks.icerain.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.combust.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage. You did: " + Math.floor((attacks.combust.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.combust.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Combust did: " + Math.floor(attacks.combust.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.meteorstrike.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage. You did: " + ((attacks.meteorstrike.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.meteorstrike.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Meteor Strike did: " + Math.floor(attacks.meteorstrike.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.lightningbolt.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage. You did: " + Math.floor((attacks.lightningbolt.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.lightningbolt.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Lightning Bolt did: " + Math.floor(attacks.lightningbolt.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.tornado.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage. You did: " + Math.floor((attacks.tornado.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.tornado.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Tornado did: " + Math.floor(attacks.tornado.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.blizzard.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage. You did: " + Math.floor((attacks.blizzard.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.blizzard.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Blizzard did: " + Math.floor(attacks.blizzard.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.firestorm.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage. You did: " + Math.floor((attacks.firestorm.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.firestorm.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Firestorm did: " + Math.floor(attacks.firestorm.damage + (player.intelligence * 0.2)) + " damage";
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
        currentEnemy.health = currentEnemy.health - Math.floor((attacks.implosion.damage) / 2 + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage. You did: " + Math.floor((attacks.implosion.damage) / 2 + (player.intelligence * 0.2)) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(attacks.implosion.damage + (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "Implosion did: " + Math.floor(attacks.implosion.damage + (player.intelligence * 0.2)) + " damage";
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
    const weaponAttack = document.getElementById("stick");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.stick.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The stick did: " + Math.floor(weaponAttacks.stick.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.stick.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.stick.stamina;
    displayPlayerStamina();
}

function dagger() {
    const weaponAttack = document.getElementById("dagger");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.dagger.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The dagger did: " + Math.floor(weaponAttacks.dagger.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.dagger.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.dagger.stamina;
    displayPlayerStamina();
}

function bow() {
    const weaponAttack = document.getElementById("bow");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.bow.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The bow did: " + Math.floor(weaponAttacks.bow.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.bow.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.bow.stamina;
    displayPlayerStamina();
}

function hammer() {
    const weaponAttack = document.getElementById("hammer");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.hammer.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The hammer did: " + Math.floor(weaponAttacks.hammer.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.hammer.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.hammer.stamina;
    displayPlayerStamina();
}

function axe() {
    const weaponAttack = document.getElementById("axe");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.axe.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The axe did: " + Math.floor(weaponAttacks.axe.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.axe.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.axe.stamina;
    displayPlayerStamina();
}

function sword() {
    const weaponAttack = document.getElementById("sword");
    currentEnemy.health = currentEnemy.health - Math.floor(weaponAttacks.sword.damage + (player.strength * 0.2));
    document.getElementById("damageInfo").innerHTML = "The sword did: " + Math.floor(weaponAttacks.sword.damage + (player.strength * 0.2)) + " damage";
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, weaponAttacks.sword.cooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - weaponAttacks.sword.stamina;
    displayPlayerStamina();
}

//If conditions to disable attacks when not enough mana/stamina
setInterval(function () {

    if (player.mana < attacks.implosion.mana) {
        document.getElementById("implosion").disabled = true;
        document.getElementById("implosion").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.fireball.mana) {
        document.getElementById("fireball").disabled = true;
        document.getElementById("fireball").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.blizzard.mana) {
        document.getElementById("blizzard").disabled = true;
        document.getElementById("blizzard").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.icerain.mana) {
        document.getElementById("icerain").disabled = true;
        document.getElementById("icerain").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.earthquake.mana) {
        document.getElementById("earthquake").disabled = true;
        document.getElementById("earthquake").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.lightningbolt.mana) {
        document.getElementById("lightningbolt").disabled = true;
        document.getElementById("lightningbolt").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.icebolt.mana) {
        document.getElementById("icebolt").disabled = true;
        document.getElementById("icebolt").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.magicarrow.mana) {
        document.getElementById("magicarrow").disabled = true;
        document.getElementById("magicarrow").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.meteorstrike.mana) {
        document.getElementById("meteorstrike").disabled = true;
        document.getElementById("meteorstrike").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.combust.mana) {
        document.getElementById("combust").disabled = true;
        document.getElementById("combust").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.tornado.mana) {
        document.getElementById("tornado").disabled = true;
        document.getElementById("tornado").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.mana < attacks.firestorm.mana) {
        document.getElementById("firestorm").disabled = true;
        document.getElementById("firestorm").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.stick.stamina) {
        document.getElementById("stick").disabled = true;
        document.getElementById("stick").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.dagger.stamina) {
        document.getElementById("dagger").disabled = true;
        document.getElementById("dagger").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.bow.stamina) {
        document.getElementById("bow").disabled = true;
        document.getElementById("bow").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.hammer.stamina) {
        document.getElementById("hammer").disabled = true;
        document.getElementById("hammer").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.axe.stamina) {
        document.getElementById("axe").disabled = true;
        document.getElementById("axe").style.background = "rgba(0,0,0,0.4)";
    }

    if (player.stamina < weaponAttacks.sword.stamina) {
        document.getElementById("sword").disabled = true;
        document.getElementById("sword").style.background = "rgba(0,0,0,0.4)";
    }

}, 10);