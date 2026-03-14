export const DAY_KEYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
];

export function computeTodayKey() {
  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday

  // If weekend → default to Monday
  if (today === 0 || today === 6) return "Monday";

  return DAY_KEYS[today - 1]; // Monday = index 1 → DAY_KEYS[0]
}

export function getSelectedDay() {
  const stored = localStorage.getItem("selectedDay");
  if (stored && typeof stored === "string") return stored;

  const today = computeTodayKey();
  localStorage.setItem("selectedDay", today);
  return today;
}

export function setSelectedDay(day) {
  if (!day) return;
  localStorage.setItem("selectedDay", day);
  window.dispatchEvent(
    new CustomEvent("selectedDayChanged", { detail: { day } })
  );
}
