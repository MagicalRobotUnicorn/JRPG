var Ability = function(abilityName, action, manaCost) {
  this.action = action;
  this.manaCost = manaCost;
  this.abilityName = abilityName;
}

var Animation = function(animationName, executeAnimation) {
  this.animationName = animationName;
  this.executeAnimation = executeAnimation;
}

var Unit = function(hp, atk, def, spd, mana, img, DOMelement) {
  this.maxHP = hp;
  this.currentHP = hp;
  this.atk = atk;
  this.def = def;
  this.spd = spd;
  this.maxMana = mana;
  this.currentMana = mana;
  this.img = img;
  this.DOMelement = DOMelement;

  this.abilities = {};

  this.applyAbility = function(abilityName, targetUnit) {
    let ability = this.abilities[abilityName];
    if (!ability) {
      return "nothing right now";
    }
    else if (this.currentMana < ability.manaCost){
      return "Not enough mana."
    }
    else {
      ability.action(this, targetUnit);
      return "Blam!";
    }
  }

  this.addAbility = function(ability) {
    this.abilities[ability.abilityName] = ability;
  }
  
  this.removeAbility = function(abilityName) {
    if (this.abilities[abilityName]) {
      delete this.abilities[abilityName];
    }
  }

  this.updateHPBar = function() {
    let hpBar = this.DOMelement.find('#playerHealthbar');
    hpBar.attr({"aria-valuenow":(this.currentHP/this.maxHP * 100)});
    hpBar.text(this.currentHP + "/" + this.maxHP);
  }

  this.isDead = function() {
    if (this.currentHP <= 0) {
      return true;
    }
    else {
      return false
    };
  }
  
}

$("document").ready(() => {
  var attacking = false;

  let basicAttack = new Ability("basicAttack", (user, target) => {
    let damage = Math.max(0, user.atk - target.def);
    target.currentHP -= damage;
  }, 0);
  
  let player = new Unit(10, 2, 1, 2, 5, "", $('#playerdisplay'));
  let enemy =  new Unit(5, 1, 1, 1, 3, "", $('#enemydisplay'));
  
  player.addAbility(basicAttack);
  enemy.addAbility(basicAttack);
  
  let shake = new Animation("Shake", (DOMelement, callback = () => {}) => {
    console.log(DOMelement)
    DOMelement.animate({marginLeft: "5px"}, 100, 'swing', () => {
      DOMelement.animate({marginLeft: "-5px"}, 100, 'swing', () => {
        DOMelement.animate({marginLeft: "0"}, 100, 'swing', callback)
      })
    });
  });

  $('#atk-button').on('click', () => {
    if (!attacking) {
      //attacking = true;
      player.applyAbility("basicAttack", enemy);
      enemy.updateHPBar();
      enemy.applyAbility("basicAttack", player);
      player.updateHPBar();
      /*shake.executeAnimation(enemy.DOMelement.find("#enemyphoto"), () => {
        enemy.updateHPBar();
        enemy.applyAbility("basicAttack", player);
        shake.executeAnimation(player.DOMelement.find("#playerphoto"), () => {
          player.updateHPBar();
        });
        attacking = false;
      });*/
    }
  });
});