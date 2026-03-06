/* =========================================
   NUTRITION GUIDE (DOM VERSION)
========================================= */

export default function NutritionGuide() {
  const container = document.createElement("div");
  container.className = "nutrition-guide";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Nutrition Guide";
  container.appendChild(header);

  /* SECTION TITLE */
  const title = document.createElement("div");
  title.className = "nutrition-title";
  title.textContent = "Simple Daily Guidelines";
  container.appendChild(title);

  /* GUIDELINES LIST */
  const list = document.createElement("div");
  list.className = "nutrition-list";
  container.appendChild(list);

  const guidelines = [
    "Prioritize lean protein at each meal",
    "Drink plenty of water throughout the day",
    "Include fruits and vegetables daily",
    "Choose whole grains when possible",
    "Limit added sugars and processed foods",
    "Aim for balanced meals, not perfection"
  ];

  guidelines.forEach((tip) => {
    const item = document.createElement("div");
    item.className = "nutrition-item";
    item.textContent = tip;
    list.appendChild(item);
  });

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
