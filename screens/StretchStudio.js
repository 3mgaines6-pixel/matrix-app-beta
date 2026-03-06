/* =========================================
   STRETCH STUDIO (DOM VERSION)
========================================= */

export default function StretchStudio() {
  const container = document.createElement("div");
  container.className = "stretch-studio";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Stretch Studio";
  container.appendChild(header);

  /* SIMPLE LIST OF STRETCHES */
  const list = document.createElement("div");
  list.className = "stretch-list";
  container.appendChild(list);

  const stretches = [
    "Hamstring Stretch",
    "Quad Stretch",
    "Hip Flexor Stretch",
    "Calf Stretch",
    "Chest Stretch",
    "Shoulder Stretch"
  ];

  stretches.forEach((name) => {
    const item = document.createElement("div");
    item.className = "stretch-item";
    item.textContent = name;
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
