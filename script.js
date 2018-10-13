let player = {
    health: 150,
    mana: 150,
    stamina: 150,
    intelligence: 5,
    strength: 6,
    xp: 0,
    level: 1,
}

let currentEnemy = {};

let enemies = {
    gnome: {
        health: 100,
        level: 1,
        resistance: 'earth',
        xp_given: 100,
        timeOut: 4000,
        damage: 10,


    },
    fire_lizard: {
        health: 200,
        level: 2,
        resistance: 'fire',
        xp_given: 100,
        timeOut: 3000,
        damage: 40
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

const playerHealth = document.getElementById("health");
const enemyHealth = document.getElementById("enemy_health");
const playerMana = document.getElementById("mana");
const spells = document.querySelectorAll(".spell");

function disableButtons(){
    spells.forEach(spell => {
        spell.disabled = true;
    })
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



document.getElementById("fight").addEventListener("click", function () {
    currentEnemy = enemies.gnome;
    displayPlayerHealth();
    displayPlayerMana();
    spells.forEach(spell => {
        spell.disabled = false;
    })
    var gnomeFight =setInterval(function () {
        let damageEnemy = (Math.floor(Math.random() * currentEnemy.damage) + 1);
        player.health = player.health - damageEnemy;
        document.getElementById("damageReceived").innerHTML = "The enemy did: " + damageEnemy + " damage";
        displayPlayerHealth();
    }, currentEnemy.timeOut);
    displayEnemyHealth();

    
        document.addEventListener("click", gnomeCondition)
        
        function gnomeCondition() {
            if( enemies.gnome.health < 0 ){
                alert("you won");
                // clearInterval(gnomeFight);
                currentEnemy = enemies.fire_lizard;
                player.mana = 150;
                player.health = 300;
                displayEnemyHealth();
                displayPlayerMana();
                document.removeEventListener("click", gnomeCondition );
                document.getElementById("damageReceived").innerHTML = "";
                document.getElementById("damageInfo").innerHTML = "";



                
                
            }}
     
 
   
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
   
    document.getElementById("magicarrow").disabled = true;
    setTimeout(function () {
        document.getElementById("magicarrow").disabled = false;
    }, attacks.magicarrow.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.magicarrow.mana;
    displayPlayerMana();
}

function fireball() {
    disableButtons();
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.fireball.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.fireball.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.fireball.damage + (player.intelligence * 0.2)) + " damage";
    }
   
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("fireball").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("fireball").disabled = false;
    }, attacks.fireball.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.fireball.mana;
    displayPlayerMana();
}

function icebolt() {
    disableButtons();
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.icebolt.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.icebolt.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.icebolt.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("icebolt").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("icebolt").disabled = false;
    }, attacks.icebolt.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.icebolt.mana;
    displayPlayerMana();
}


function earthquake() {
    disableButtons();
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.earthquake.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.earthquake.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.earthquake.damage + player.intelligence * 0.2) + " damage";
    }

    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("earthquake").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("earthuake").disabled = false;
    }, attacks.earthquake.cooldown);
    displayEnemyHealth();
    player.mana = player.mana - attacks.earthquake.mana;
    displayPlayerMana();
}

function icerain() {
    disableButtons();
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.icerain.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.icerain.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.icerain.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("icerain").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("icerain").disabled = false;
    }, attacks.icerain.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.icerain.mana;
    displayPlayerMana();
}

function combust() {
    disableButtons();
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.combust.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.combust.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.combust.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("combust").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("combust").disabled = false;
    }, attacks.combust.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.combust.mana;
    displayPlayerMana();
}

function meteorstrike() {
    disableButtons();
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.meteorstrike.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.meteorstrike.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.meteorstrike.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("meteorstrike").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("meteorstrike").disabled = false;
    }, attacks.meteorstrike.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.meteorstrike.mana;
    displayPlayerMana();
}

function lightningbolt() {
    disableButtons();
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.lightningbolt.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.lightningbolt.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.lightningbolt.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("lightningbolt").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("lightningbolt").disabled = false;
    }, attacks.lightningbolt.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.lightningbolt.mana;
    displayPlayerMana();
}

function tornado() {
    disableButtons();
    if (currentEnemy.resistance === "air") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.tornado.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against air magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.tornado.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.tornado.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("tornado").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("tornado").disabled = false;
    }, attacks.tornado.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.tornado.mana;
    displayPlayerMana();
}

function blizzard() {
    disableButtons();
    if (currentEnemy.resistance === "water") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.blizzard.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against water magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.blizzard.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.blizzard.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("blizzard").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("blizzard").disabled = false;
    }, attacks.blizzard.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.blizzard.mana;
    displayPlayerMana();
}

function firestorm() {
    disableButtons();
    if (currentEnemy.resistance === "fire") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.firestorm.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against fire magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.firestorm.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.firestorm.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("firestorm").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("firestorm").disabled = false;
    }, attacks.firestorm.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.firestorm.mana;
    displayPlayerMana();
}

function implosion() {
    disableButtons();
    if (currentEnemy.resistance === "earth") {
        currentEnemy.health = Math.floor(currentEnemy.health - (attacks.implosion.damage) / 2 - (player.intelligence * 0.2));
        document.getElementById("damageInfo").innerHTML = "It seems the creature has a resistance against earth magic so you do reduced damage"
    } else {
        currentEnemy.health = currentEnemy.health - attacks.implosion.damage - (player.intelligence * 0.2);
        document.getElementById("damageInfo").innerHTML = "You did: " + (attacks.implosion.damage + (player.intelligence * 0.2)) + " damage";
    }
    setTimeout(function () {
        spells.forEach(spell => {
            spell.disabled = false;
            document.getElementById("implosion").disabled = true;
        })
    }, 2000);

    setTimeout(function () {
        document.getElementById("implosion").disabled = false;
    }, attacks.implosion.cooldown);

    displayEnemyHealth();
    player.mana = player.mana - attacks.implosion.mana;
    displayPlayerMana();
}