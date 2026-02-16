/* =========================================
   ==========  CARDIO LOGGING  =============
   ========================================= */

export function loadCardio(key) {
  const raw = localStorage.getItem(`cardio-${key}`);
  return raw ? JSON.parse(raw) : [];
}

/* ---------- LOAD PR DATA ---------- */
export function loadCardioPR(key) {
  const raw = localStorage.getItem(`cardio-${key}-pr`);
  return raw ? JSON.parse(raw) : { mile1: null, mile2: null };
}

/* ---------- UPDATE PR DATA ---------- */
export function updateCardioPR(key, entry) {
  const prKey = `cardio-${key}-pr`;
  const pr = loadCardioPR(key);

  // 1 Mile PR
  if (entry.miles >= 1) {
    if (!pr.mile1 || entry.minutes < pr.mile1) {
      pr.mile1 = entry.minutes;
    }
  }

  // 2 Mile PR
  if (entry.miles >= 2) {
    if (!pr.mile2 || entry.minutes < pr.mile2) {
      pr.mile2 = entry.minutes;
    }
  }

  localStorage.setItem(prKey, JSON.stringify(pr));
}

/* ---------- SAVE CARDIO ENTRY ---------- */
export function saveCardio(key, entry) {
  const history = loadCardio(key);

  history.push({
    ...entry,
    date: Date.now()
  });

  localStorage.setItem(`cardio-${key}`, JSON.stringify(history));
}

