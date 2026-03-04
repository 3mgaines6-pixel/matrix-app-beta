/* ============================================================
   ROTATION V1 — 4-WEEK AUTO SWAP SYSTEM
============================================================ */

// Every 4 weeks, flip rotation block
export let rotationBlock =
  Number(localStorage.getItem("rotationBlock")) || 1;

// Call this manually or on Mondays if you want automation
export function advanceRotationBlock() {
  rotationBlock++;
  localStorage.setItem("rotationBlock", rotationBlock);
}

/* ============================================================
   ROTATION MAP — which machines rotate
============================================================ */

export const ROTATION_MAP = {
  12: 10,   // Seated Leg Curl → Prone Leg Curl
  13: 11    // Hip Adductor → Leg Extension
};

/* ============================================================
   ROTATION ENGINE — returns correct machine ID
============================================================ */

export function getRotatedMachine(id) {
  const isEvenBlock = rotationBlock % 2 === 0;

  // If this machine has a rotation partner
  if (ROTATION_MAP[id]) {
    return isEvenBlock ? ROTATION_MAP[id] : id;
  }

  // If this machine *is* the rotated version
  const original = Object.keys(ROTATION_MAP).find(
    key => ROTATION_MAP[key] === id
  );

  if (original) {
    return isEvenBlock ? id : Number(original);
  }

  // No rotation for this machine
  return id;
}

/* ============================================================
   ROTATION INFO — for UI display
============================================================ */

export function getRotationInfo() {
  const block = rotationBlock;
  const isEven = block % 2 === 0;

  const startWeek = (block - 1) * 4 + 1;
  const endWeek = block * 4;

  // FIX: week must exist or StrengthStudio crashes
  const week = startWeek;

  return {
    block,
    week,
    mode: isEven ? "SWAP MACHINES" : "PRIMARY MACHINES",
    range: `Weeks ${startWeek}–${endWeek}`
  };
}
