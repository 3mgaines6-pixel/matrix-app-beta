export function NutritionGuide() {
  const container = document.createElement("div");
  container.className = "nutrition-screen";

  const title = document.createElement("h1");
  title.textContent = "Nutrition Guide";
  container.appendChild(title);

  const tips = document.createElement("div");
  tips.className = "nutrition-tips";
  tips.innerHTML = `
    <h2>Simple Nutrition Strategy</h2>
    <ul>
      <li>Eat a mix of proteins, carbs, and healthy fats.</li>
      <li>Aim for protein at every meal.</li>
      <li>Drink water throughout the day.</li>
    </ul>
  `;
  container.appendChild(tips);
/* ---------- HYDRATION CALCULATOR ---------- */
const waterHeader = document.createElement("h2");
waterHeader.textContent = "Hydration Calculator";
container.appendChild(waterHeader);

const weightInputWater = document.createElement("input");
weightInputWater.type = "number";
weightInputWater.placeholder = "Your weight (lbs)";
weightInputWater.className = "nutrition-input";
container.appendChild(weightInputWater);

const waterResult = document.createElement("div");
waterResult.className = "nutrition-result";
container.appendChild(waterResult);

const waterBtn = document.createElement("button");
waterBtn.textContent = "Calculate Water Intake";
waterBtn.onclick = () => {
  const lbs = Number(weightInputWater.value || 0);
  const oz = lbs * 0.5;
  waterResult.textContent = `Minimum: ${oz.toFixed(0)} oz per day`;
};
container.appendChild(waterBtn);


/* ---------- PROTEIN CALCULATOR ---------- */
const proteinHeader = document.createElement("h2");
proteinHeader.textContent = "Protein Calculator";
container.appendChild(proteinHeader);

const weightInputProtein = document.createElement("input");
weightInputProtein.type = "number";
weightInputProtein.placeholder = "Your weight (lbs)";
weightInputProtein.className = "nutrition-input";
container.appendChild(weightInputProtein);

const goalSelect = document.createElement("select");
goalSelect.className = "nutrition-input";
goalSelect.innerHTML = `
  <option value="loss">Weight Loss (1.2–1.6 g/kg)</option>
  <option value="hybrid">Hybrid Training (1.4–1.8 g/kg)</option>
  <option value="gain">Muscle Gain (1.6–2.2 g/kg)</option>
`;
container.appendChild(goalSelect);


const proteinResult = document.createElement("div");
proteinResult.className = "nutrition-result";
container.appendChild(proteinResult);

const proteinBtn = document.createElement("button");
proteinBtn.textContent = "Calculate Protein";
proteinBtn.onclick = () => {
  const lbs = Number(weightInputProtein.value || 0);
  const kg = lbs / 2.20462;

  let low, high;

  if (goalSelect.value === "loss") {
    low = kg * 1.2;
    high = kg * 1.6;
  } 
  else if (goalSelect.value === "hybrid") {
    low = kg * 1.4;
    high = kg * 1.8;
  }
  else {
    low = kg * 1.6;
    high = kg * 2.2;
  }

  proteinResult.textContent = `Daily Protein: ${low.toFixed(0)}–${high.toFixed(0)} g`;
};
container.appendChild(proteinBtn);

  const backBtn = document.createElement("button");
  backBtn.className = "nutrition-back-btn";
  backBtn.textContent = "Back to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
