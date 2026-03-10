import React from "react";
import { useNavigate } from "react-router-dom";
import { M } from "../data/MACHINES.js";
import { WEEKLY } from "../data/WEEKLY.js";
import "./StrengthStudio.css";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

// Get today's weekday key ("Mon", "Tue", etc.)
function getTodayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

// Determine if this is a primary or swap week
function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber === 3 || weekNumber === 4 ? "swap" : "primary";
}

// Find machine object by its real Matrix number
function findMachineByNumber(num) {
  return Object.values(M).find(m => m.number === num);
}

// Apply swap logic for Weeks 3–4
function applySwap(machine) {
  switch (machine.number) {
    case 12: return M.PLC;      // Seated Leg Curl → Prone Leg Curl
    case 7:  return M.CHEST_L;  // Heavy Chest → Light Chest
    case 15: return M.PRESS_L;  // Heavy Leg Press → Light Leg Press
    default: return machine;
  }
}

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function StrengthStudio() {
  const navigate = useNavigate();

  const today = getTodayName();
  const weekType = getWeekType();

  // Machine numbers for today from WEEKLY.js
  const machineNumbers = WEEKLY[today] || [];

  // Convert numbers → machine objects (with swap logic)
  const machines = machineNumbers.map(num => {
    let machine = findMachineByNumber(num);
    if (!machine) return null; // safety fallback
    if (weekType === "swap") machine = applySwap(machine);
    return machine;
  }).filter(Boolean); // remove nulls just in case

  return (
    <div className="strength-screen">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h1 className="strength-title">Strength Studio</h1>

      <div className="machine-list">
        {machines.map(m => (
          <div key={m.id} className="machine-card">
            <div className="machine-name">{m.name}</div>
            <div className="machine-muscle">{m.muscle}</div>
            <div className="machine-baseline">
              Baseline: {m.baseline !== null ? `${m.baseline} lbs` : "—"}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
