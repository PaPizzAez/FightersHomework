import controls from "../../constants/controls";


export async function fight(firstFighter, secondFighter) {
  let playerOneLastCriticalHitTime = 0;
  let playerTwoLastCriticalHitTime = 0;

  return new Promise((resolve) => {
    window.addEventListener("keydown", (event) => {
      const key = event.code;

      if (key === controls.PlayerOneBlock) {
        firstFighter.isBlocking = true;
      } else if (key === controls.PlayerTwoBlock) {
        secondFighter.isBlocking = true;
      } else if (key === controls.PlayerOneAttack && !firstFighter.isBlocking) {
        const currentTime = new Date().getTime();
        if (isCriticalHitAvailable(currentTime, playerOneLastCriticalHitTime, firstFighter)) {
          playerOneLastCriticalHitTime = currentTime;
          applyDamage(secondFighter, 2 * firstFighter.attack);
        } else {
          const damage = getDamage(firstFighter, secondFighter);
          applyDamage(secondFighter, damage);
        }
      } else if (key === controls.PlayerTwoAttack && !secondFighter.isBlocking) {
        const currentTime = new Date().getTime();
        if (isCriticalHitAvailable(currentTime, playerTwoLastCriticalHitTime, secondFighter)) {
          playerTwoLastCriticalHitTime = currentTime;
          applyDamage(firstFighter, 2 * secondFighter.attack);
        } else {
          const damage = getDamage(secondFighter, firstFighter);
          applyDamage(firstFighter, damage);
        }
      }
    });

    window.addEventListener("keyup", (event) => {
      const key = event.code;

      if (key === controls.PlayerOneBlock) {
        firstFighter.isBlocking = false;
      } else if (key === controls.PlayerTwoBlock) {
        secondFighter.isBlocking = false;
      }
    });

    function applyDamage(fighter, damage) {
      fighter.health -= damage;
      updateHealthBar(fighter);

      if (fighter.health <= 0) {
        resolve(fighter === firstFighter ? secondFighter : firstFighter);
      }
    }

    function updateHealthBar(fighter) {
      let healthBar1 = document.getElementById("left-fighter-indicator");
      let healthBar2 = document.getElementById("right-fighter-indicator");
      healthBar1.style.width = firstFighter.health + "%";
      healthBar2.style.width = secondFighter.health + "%";
    }

    function isCriticalHitAvailable(currentTime, lastCriticalHitTime) {
      return currentTime - lastCriticalHitTime >= 10000; // 10 seconds (10,000 milliseconds)
    }
  });
}

export function getDamage(attacker, defender) {
  let strikePower = getHitPower(attacker);
  let blockPower = getBlockPower(defender);

  if (blockPower >= strikePower) {
    return 0; // The strike was completely blocked
  } else {
    return strikePower - blockPower;
  }

  // return damage
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
  // return hit power
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
  // return block power
}
