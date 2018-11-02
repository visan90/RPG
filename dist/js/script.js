'use strict';

//Player starting stats
var player = {
    health: 150,
    mana: 150,
    stamina: 150,
    intelligence: 5,
    strength: 6
};

//Empty object to asign enemies to
var currentEnemy = {};

//Object containing all the enemies
var enemies = {
    gnome: {
        health: 100,
        level: 1,
        resistance: 'earth',
        timeOut: 4000,
        damage: 20
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

var attacks = {
    magicarrow: {
        name: 'Magic Arrow',
        damage: 5,
        damageMultiplier: 0.2,
        type: 'air',
        mana: 10,
        cooldown: 5000
    },
    fireball: {
        name: 'Fireball',
        damage: 10,
        damageMultiplier: 0.2,
        type: 'fire',
        mana: 20,
        cooldown: 5000
    },
    icebolt: {
        name: 'Ice Bolt',
        damage: 10,
        damageMultiplier: 0.2,
        type: 'water',
        mana: 15,
        cooldown: 8000
    },
    earthquake: {
        name: 'Earthquake',
        damage: 15,
        damageMultiplier: 0.2,
        type: 'earth',
        mana: 25,
        cooldown: 8000
    },
    icerain: {
        name: 'Ice Rain',
        damage: 20,
        damageMultiplier: 0.2,
        type: 'water',
        mana: 28,
        cooldown: 9000
    },
    meteorstrike: {
        name: 'Meteor Strike',
        damage: 25,
        damageMultiplier: 0.2,
        type: 'earth',
        mana: 35,
        cooldown: 10000
    },
    combust: {
        name: 'Combust',
        damage: 25,
        damageMultiplier: 0.2,
        type: 'fire',
        mana: 30,
        cooldown: 12000
    },
    lightningbolt: {
        name: 'Lightning Bolt',
        damage: 30,
        damageMultiplier: 0.2,
        type: 'air',
        mana: 40,
        cooldown: 12000
    },
    blizzard: {
        name: 'Blizzard',
        damage: 35,
        damageMultiplier: 0.2,
        type: 'water',
        mana: 50,
        cooldown: 15000
    },
    tornado: {
        name: 'Tornado',
        damage: 35,
        damageMultiplier: 0.2,
        type: 'air',
        mana: 50,
        cooldown: 15000
    },
    firestorm: {
        name: 'Firestorm',
        damage: 40,
        damageMultiplier: 0.2,
        type: 'fire',
        mana: 65,
        cooldown: 18000
    },
    implosion: {
        name: 'Implosion',
        damage: 55,
        damageMultiplier: 0.2,
        type: 'earth',
        mana: 80,
        cooldown: 20000
    }

};

var weaponAttacks = {
    stick: {
        name: 'stick',
        damage: 5,
        damageMultiplier: 0.2,
        stamina: 10,
        cooldown: 5000
    },
    dagger: {
        name: 'dagger',
        damage: 7,
        damageMultiplier: 0.2,
        stamina: 15,
        cooldown: 5000
    },
    bow: {
        name: 'bow',
        damage: 10,
        damageMultiplier: 0.2,
        stamina: 20,
        cooldown: 7000
    },
    hammer: {
        name: 'hammer',
        damage: 15,
        damageMultiplier: 0.2,
        stamina: 30,
        cooldown: 10000
    },
    axe: {
        name: 'axe',
        damage: 20,
        damageMultiplier: 0.2,
        stamina: 35,
        cooldown: 14000
    },
    sword: {
        name: 'sword',
        damage: 25,
        damageMultiplier: 0.2,
        stamina: 35,
        cooldown: 18000
    }
};

//Variables
var playerHealth = document.getElementById("health");
var enemyHealth = document.getElementById("enemyHealth");
var playerMana = document.getElementById("mana");
var playerStamina = document.getElementById("stamina");
var playerIntelligence = document.getElementById("intelligence");
var playerStrength = document.getElementById("strength");
var spells = document.querySelectorAll(".spell");
var weapons = document.querySelectorAll(".weapon");
var displayChangeStats = document.getElementById("changeStats");
var enemyImage = document.getElementById("enemyImg");
var getFireball = document.getElementById("fireball");
var getCombust = document.getElementById("combust");
var getFirestorm = document.getElementById("firestorm");
var getIcebolt = document.getElementById("icebolt");
var getIcerain = document.getElementById("icerain");
var getBlizzard = document.getElementById("blizzard");
var getMagicArrow = document.getElementById("magicarrow");
var getLightningbolt = document.getElementById("lightningbolt");
var getTornado = document.getElementById("tornado");
var getEarthquake = document.getElementById("earthquake");
var getMeteorstrike = document.getElementById("meteorstrike");
var getImplosion = document.getElementById("implosion");
var getStick = document.getElementById("stick");
var getDagger = document.getElementById("dagger");
var getBow = document.getElementById("bow");
var getHammer = document.getElementById("hammer");
var getAxe = document.getElementById("axe");
var getSword = document.getElementById("sword");
var remainingPoints = 5;
var currentPlayerHealth = 150;
var currentPlayerMana = 150;
var currentPlayerStamina = 150;
var currentEnemyHealth = 100;

displayChangeStats.style.display = "none";

//Used before player starts game
function disableButtons() {
    spells.forEach(function (spell) {
        spell.disabled = true;
        spell.style.background = "rgba(0,0,0,0.4)";
    });
    weapons.forEach(function (weapon) {
        weapon.disabled = true;
        weapon.style.background = "rgba(0,0,0,0.4)";
    });
};

window.onload = disableButtons;

//Enables attacks when player clicks on start fight or when a new fight starts
function enableAttacks() {
    spells.forEach(function (spell) {
        spell.disabled = false;
        spell.style.background = "transparent";
    });
    weapons.forEach(function (weapon) {
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
    var currentIntelligence = document.getElementById("currentIntelligence");
    var currentStrength = document.getElementById("currentStrength");
    var addIntelligence = document.getElementById("addIntelligence");
    var addStrength = document.getElementById("addStrength");
    var addPoints = document.querySelectorAll(".addPoints");
    document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
    currentStrength.innerHTML = "Strength: " + player.strength;
    addIntelligence.onclick = function () {
        player.intelligence++;
        remainingPoints--;
        currentIntelligence.innerHTML = "Intelligence: " + player.intelligence;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    };
    addStrength.onclick = function () {
        player.strength++;
        remainingPoints--;
        currentStrength.innerHTML = "Strength: " + player.strength;
        document.getElementById("remainingPoints").innerHTML = "Remaining points: " + remainingPoints;
    };
    // resets the add attributes buttons to an enabled position for the next time the modal shows
    addIntelligence.disabled = false;
    addStrength.disabled = false;

    // disables the add attributes buttons when remaining points are 0
    addPoints.forEach(function (point) {
        point.addEventListener("click", function () {
            if (remainingPoints === 0) {
                addIntelligence.disabled = true;
                addStrength.disabled = true;
            }
        });
    });
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
        var damageEnemy = Math.floor(Math.random() * (currentEnemy.damage - currentEnemy.damage / 2 + 1)) + currentEnemy.damage / 2;
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
            });
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
            };
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
            };
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
                enemyImage.src = "dist/img/wind_elemental.png";
                player.mana = 250;
                player.health = 500;
                player.stamina = 200;
                refreshStats();
                enableAttacks();
                document.getElementById("damageReceived").innerHTML = "";
                document.getElementById("damageInfo").innerHTML = "";
                displayChangeStats.style.display = "none";
            };
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
            });
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
function castSpell(argType, argDamage, argName, argId, argCooldown, argMana, argMultiplier) {
    if (currentEnemy.resistance === argType) {
        currentEnemy.health = currentEnemy.health - Math.floor(argDamage / 2 + player.intelligence * argMultiplier);
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against " + argType + " magic so you do reduced damage. You did: " + Math.floor(argDamage / 2 + player.intelligence * argMultiplier) + " damage";
    } else {
        currentEnemy.health = currentEnemy.health - Math.floor(argDamage + player.intelligence * argMultiplier);
        document.getElementById("damageInfo").innerHTML = argName + " did: " + Math.floor(argDamage + player.intelligence * argMultiplier) + " damage";
    }
    var spellAttack = argId;
    spellAttack.disabled = true;
    spellAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        spellAttack.disabled = false;
        spellAttack.style.background = "transparent";
    }, argCooldown);
    displayEnemyHealth();
    player.mana = player.mana - argMana;
    displayPlayerMana();
}

function swingWeapon(argDamage, argName, argId, argCooldown, argStamina, argMultiplier) {
    currentEnemy.health = currentEnemy.health - Math.floor(argDamage + player.strength * argMultiplier);
    document.getElementById("damageInfo").innerHTML = "The " + argName + " did: " + Math.floor(argDamage + player.strength * argMultiplier) + " damage";
    var weaponAttack = argId;
    weaponAttack.disabled = true;
    weaponAttack.style.background = "rgba(0,0,0,0.4)";
    setTimeout(function () {
        weaponAttack.disabled = false;
        weaponAttack.style.background = "transparent";
    }, argCooldown);
    displayEnemyHealth();
    player.stamina = player.stamina - argStamina;
    displayPlayerStamina();
}

//Event listeners for the attacks
getFireball.addEventListener('click', function () {
    castSpell(attacks.fireball.type, attacks.fireball.damage, attacks.fireball.name, getFireball, attacks.fireball.cooldown, attacks.fireball.mana, attacks.fireball.damageMultiplier);
});
getCombust.addEventListener('click', function () {
    castSpell(attacks.combust.type, attacks.combust.damage, attacks.combust.name, getCombust, attacks.combust.cooldown, attacks.combust.mana, attacks.combust.damageMultiplier);
});
getFirestorm.addEventListener('click', function () {
    castSpell(attacks.firestorm.type, attacks.firestorm.damage, attacks.firestorm.name, getFirestorm, attacks.firestorm.cooldown, attacks.firestorm.mana, attacks.firestorm.damageMultiplier);
});
getIcebolt.addEventListener('click', function () {
    castSpell(attacks.icebolt.type, attacks.icebolt.damage, attacks.icebolt.name, getIcebolt, attacks.icebolt.cooldown, attacks.icebolt.mana, attacks.icebolt.damageMultiplier);
});
getIcerain.addEventListener('click', function () {
    castSpell(attacks.icerain.type, attacks.icerain.damage, attacks.icerain.name, getIcerain, attacks.icerain.cooldown, attacks.icerain.mana, attacks.icerain.damageMultiplier);
});
getBlizzard.addEventListener('click', function () {
    castSpell(attacks.blizzard.type, attacks.blizzard.damage, attacks.blizzard.name, getBlizzard, attacks.blizzard.cooldown, attacks.blizzard.mana, attacks.blizzard.damageMultiplier);
});
getMagicArrow.addEventListener('click', function () {
    castSpell(attacks.magicarrow.type, attacks.magicarrow.damage, attacks.magicarrow.name, getMagicArrow, attacks.magicarrow.cooldown, attacks.magicarrow.mana, attacks.magicarrow.damageMultiplier);
});
getLightningbolt.addEventListener('click', function () {
    castSpell(attacks.lightningbolt.type, attacks.lightningbolt.damage, attacks.lightningbolt.name, getLightningbolt, attacks.lightningbolt.cooldown, attacks.lightningbolt.mana, attacks.lightningbolt.damageMultiplier);
});
getTornado.addEventListener('click', function () {
    castSpell(attacks.tornado.type, attacks.tornado.damage, attacks.tornado.name, getTornado, attacks.tornado.cooldown, attacks.tornado.mana, attacks.tornado.damageMultiplier);
});
getEarthquake.addEventListener('click', function () {
    castSpell(attacks.earthquake.type, attacks.earthquake.damage, attacks.earthquake.name, getEarthquake, attacks.earthquake.cooldown, attacks.earthquake.mana, attacks.earthquake.damageMultiplier);
});
getMeteorstrike.addEventListener('click', function () {
    castSpell(attacks.meteorstrike.type, attacks.meteorstrike.damage, attacks.meteorstrike.name, getMeteorstrike, attacks.meteorstrike.cooldown, attacks.meteorstrike.mana, attacks.meteorstrike.damageMultiplier);
});
getImplosion.addEventListener('click', function () {
    castSpell(attacks.implosion.type, attacks.implosion.damage, attacks.implosion.name, getImplosion, attacks.implosion.cooldown, attacks.implosion.mana, attacks.implosion.damageMultiplier);
});
getStick.addEventListener('click', function () {
    swingWeapon(weaponAttacks.stick.damage, weaponAttacks.stick.name, getStick, weaponAttacks.stick.cooldown, weaponAttacks.stick.stamina, weaponAttacks.stick.damageMultiplier);
});
getDagger.addEventListener('click', function () {
    swingWeapon(weaponAttacks.dagger.damage, weaponAttacks.dagger.name, getDagger, weaponAttacks.dagger.cooldown, weaponAttacks.dagger.stamina, weaponAttacks.dagger.damageMultiplier);
});
getBow.addEventListener('click', function () {
    swingWeapon(weaponAttacks.bow.damage, weaponAttacks.bow.name, getBow, weaponAttacks.bow.cooldown, weaponAttacks.bow.stamina, weaponAttacks.bow.damageMultiplier);
});
getHammer.addEventListener('click', function () {
    swingWeapon(weaponAttacks.hammer.damage, weaponAttacks.hammer.name, getHammer, weaponAttacks.hammer.cooldown, weaponAttacks.hammer.stamina, weaponAttacks.hammer.damageMultiplier);
});
getAxe.addEventListener('click', function () {
    swingWeapon(weaponAttacks.axe.damage, weaponAttacks.axe.name, getAxe, weaponAttacks.axe.cooldown, weaponAttacks.axe.stamina, weaponAttacks.axe.damageMultiplier);
});
getSword.addEventListener('click', function () {
    swingWeapon(weaponAttacks.sword.damage, weaponAttacks.sword.name, getSword, weaponAttacks.sword.cooldown, weaponAttacks.sword.stamina, weaponAttacks.sword.damageMultiplier);
});

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