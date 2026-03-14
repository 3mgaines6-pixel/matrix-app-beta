export const DAY_KEYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export function computeTodayKey() {
  return DAY_KEYS[new Date().getDay()];
}

export function getSelectedDay() {
  const stored = localStorage.getItem("selectedDay");
  if (stored && typeof stored === "string") return stored;

  const today = computeTodayKey();
  localStorage.setItem("selectedDay", today);
  return today;
}

export function setSelectedDay(key) {
  if (!key) return;
  localStorage.setItem("selectedDay", key);
  window.dispatchEvent(
    new CustomEvent("selectedDayChanged", { detail: { day: key } })
  );
}
