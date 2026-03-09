/* ==========================================================
   FINAL MACHINE DEFINITIONS — ORIGINAL NUMBERING RESTORED
   Heavy/Light pairs match real gym flow
========================================================== */

export const MACHINES = {

  /* ============================
     LOWER BODY
  ============================ */

  "1": {
    emoji: "💪",
    name: "Dependent Curl",
    cue: "Control the eccentric and keep elbows pinned.",
    group: "Arms",
    suggestedLight: 40
  },

  "2": {
    emoji: "🔩",
    name: "Triceps Press",
    cue: "Lock elbows at your sides and extend fully.",
    group: "Arms",
    suggestedLight: 35
  },

  "3": {
    emoji: "🧱",
    name: "Ab Crunch",
    cue: "Exhale as you crunch and keep ribs down.",
    group: "Core",
    suggestedLight: 40
  },

  "4": {
    emoji: "🧘",
    name: "Back Extension",
    cue: "Hinge at hips and avoid hyperextension.",
    group: "Lower Back",
    suggestedLight: 25
  },

  "5": {
    emoji: "🏋️‍♂️",
    name: "Seated Row",
    cue: "Lead with elbows and squeeze shoulder blades.",
    group: "Back",
    handlePositions: ["Inner", "Outer"],
    defaultHandle: "Inner",
    tempoOptions: ["Normal", "Slow"],
    suggestedHeavy: 90
  },

  "6": {
    emoji: "🛡️",
    name: "Shoulder Press",
    cue: "Drive straight up and avoid arching your back.",
    group: "Shoulders",
    handlePositions: ["Neutral", "Wide"],
    defaultHandle: "Neutral",
    tempoOptions: ["Normal", "Slow"],
    suggestedLight: 55
  },

  "7": {
    emoji: "🔥",
    name: "Chest Press (Heavy)",
    cue: "Brace core and control the lowering phase.",
    group: "Chest",
    tempoOptions: ["Normal", "Slow"],
    suggestedHeavy: 120
  },

  "8": {
    emoji: "🦅",
    name: "Lat Pulldown",
    cue: "Pull to collarbone and avoid leaning back.",
    group: "Back",
    handlePositions: ["Inner", "Outer"],
    defaultHandle: "Inner",
    tempoOptions: ["Normal", "Slow"],
    suggestedHeavy: 110
  },

  "9": {
    emoji: "🪽",
    name: "Pec Fly / Rear Delt",
    cue: "Control the arc and squeeze at peak contraction.",
    group: "Chest / Shoulders",
    handlePositions: ["Inner", "Outer"],
    defaultHandle: "Inner",
    suggestedLight: 40
  },

  "10": {
    emoji: "🦿",
    name: "Prone Leg Curl",
    cue: "Smooth tempo, full stretch.",
    group: "Hamstrings",
    suggestedLight: 40
  },

  "11": {
    emoji: "📏",
    name: "Leg Extension",
    cue: "Pause at the top for quad activation.",
    group: "Quads",
    suggestedLight: 55
  },

  "12": {
    emoji: "🦿",
    name: "Seated Leg Curl (Light)",
    cue: "Smooth tempo, full stretch.",
    group: "Hamstrings",
    suggestedLight: 40
  },

  "13": {
    emoji: "↔️",
    name: "Hip Adductor",
    cue: "Control the inward squeeze; avoid rocking.",
    group: "Inner Thighs",
    suggestedLight: 40
  },

  "14": {
    emoji: "➡️",
    name: "Hip Abductor",
    cue: "Drive knees outward and pause briefly.",
    group: "Glutes",
    suggestedLight: 40
  },

  "15": {
    emoji: "🦵",
    name: "Leg Press (Heavy)",
    cue: "Push through heels and avoid locking knees.",
    group: "Quads / Glutes",
    tempoOptions: ["Normal", "Slow"],
    suggestedHeavy: 270
  },

  "107": {
    emoji: "🔥",
    name: "Chest Press (Light)",
    cue: "Smooth tempo, full range.",
    group: "Chest",
    tempoOptions: ["Normal", "Slow"],
    suggestedLight: 80
  },

  "115": {
    emoji: "🦵",
    name: "Leg Press (Light)",
    cue: "Controlled reps, knee‑safe depth.",
    group: "Quads / Glutes",
    tempoOptions: ["Normal", "Slow"],
    suggestedLight: 180
  }
};
