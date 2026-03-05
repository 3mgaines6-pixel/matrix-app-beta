import React from "react";
import "./styles.css";

export function GymFloor() { ... }

  return (
    <div className="gymfloor-screen">
      <div className="gymfloor-overlay" />

      <header className="gymfloor-header">
        <h1>Welcome to Matt’s Gym Floor</h1>
      </header>

      <div className="gymfloor-buttons">
        <button className="gymfloor-btn" onClick={() => navigate("strength")}>
          Strength Studio
        </button>

        <button className="gymfloor-btn" onClick={() => navigate("cardio")}>
          Cardio Studio
        </button>

        <button className="gymfloor-btn" onClick={() => navigate("stretch")}>
          Stretch Studio
        </button>

        <button className="gymfloor-btn" onClick={() => navigate("nutrition")}>
          Nutrition Guide
        </button>
      </div>
    </div>
  );
}
