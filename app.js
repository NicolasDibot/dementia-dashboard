const state = {
  data: null,
  geo: null,
  map: null,
  geoLayer: null,
  selected: new Set(),
  view: "Total",
  sex: "both",
  language: readStoredLanguage(),
  additive: false,
  activeCountry: null,
  focusCountry: null,
  rankingSort: "Total",
  rankingDirection: "desc",
};

const ACCESS_PASSWORD = "corossol";
const ACCESS_SESSION_KEY = "dementiaDashboardUnlocked";

const groupColors = {
  "Adulthood": "#2563eb",
  "Early life": "#dc2626",
  "Occupation": "#047857",
  "Total": "#6d28d9",
};

const palettes = {
  "Adulthood": ["#dbeafe", "#2563eb"],
  "Early life": ["#fee2e2", "#dc2626"],
  "Occupation": ["#d1fae5", "#047857"],
  "Total": ["#ede9fe", "#6d28d9"],
};

const translations = {
  fr: {
    ui: {
      documentTitle: "Tableau de bord de la démence en Europe",
      appTitle: "Tableau de bord de la démence en Europe",
      factors: "Facteurs",
      selected: "sélectionnés",
      selectedSingular: "sélectionné",
      quickActionsAria: "Sélection rapide",
      sidebarAria: "Contrôles du dashboard",
      pafEyebrow: "Fractions attribuables en population",
      mapViewAria: "Carte affichée",
      additiveSum: "Somme additive",
      summaryAria: "Résumé",
      europeTotalCard: "Total Europe",
      europeEarlyCard: "Enfance",
      europeAdultCard: "Adulte",
      europeWorkCard: "Travail",
      mapAria: "Carte des fractions attribuables en population par pays",
      sexAria: "Sexe affiché",
      languageAria: "Langue",
      contributors: "Variables sélectionnées",
      ranking: "Classement pays",
      totalEurope: "Total Europe",
      totalEuropeCaption: "Ensemble européen · {sex}",
      methodTitle: "Méthode",
      partnersAria: "Institutions partenaires",
      creditsText: "Ces travaux ont été réalisés par l'équipe TRACeR dirigée par le Pr. Philippe Rémy, dans le cadre d'un projet sur la démence dirigé par le Dr. Laurent Cleret de Langavant. Contributeurs: Dr. Nicolas Dibot, Dr. Amin Gharbi-Meliani, Pr. Eléonore Bayen, Pr. Kristin Yaffe",
      additiveCaption: "somme des contributions",
      multiplicativeCaption: "combinaison multiplicative",
      noPositiveFactor: "Aucune variable sélectionnée.",
      loadingError: "Erreur de chargement",
      closeEurope: "Revenir à la carte Europe",
      closeEuropeFrom: "Revenir à la carte Europe depuis {country}",
      notAvailable: "n.d.",
      legendAdditive: "additif",
      legendMultiplicative: "multiplicatif",
      lowRank: "rang bas",
      highRank: "rang haut",
      legendCaption: "Contraste relatif accentué pour cette carte; valeurs observées {range}",
    },
    views: {
      "Total": "Fraction attribuable totale en population sélectionnée",
      "Early life": "Fraction attribuable enfance en population sélectionnée",
      "Adulthood": "Fraction attribuable adulte en population sélectionnée",
      "Occupation": "Fraction attribuable professionnelle en population sélectionnée",
    },
    groups: {
      "Total": "Total",
      "Adulthood": "Adulte",
      "Early life": "Enfance",
      "Occupation": "Travail",
    },
    sex: {
      both: "Deux sexes",
      women: "Femmes",
      men: "Hommes",
    },
    actions: {
      all: "Tous",
      early: "Enfance",
      adult: "Adulte",
      work: "Travail",
      none: "Aucun",
    },
    table: {
      country: "Pays",
      total: "Total",
      early: "Enfance",
      adult: "Adulte",
      work: "Travail",
      top: "Top facteur",
      factor: "Variable",
      category: "Catégorie",
      populationAttributableFraction: "Fraction attribuable en population",
    },
    countries: {
      "Austria": "Autriche",
      "Belgium": "Belgique",
      "Croatia": "Croatie",
      "Czech Republic": "République tchèque",
      "Denmark": "Danemark",
      "Estonia": "Estonie",
      "France": "France",
      "Germany": "Allemagne",
      "Greece": "Grèce",
      "Israel": "Israël",
      "Italy": "Italie",
      "Luxembourg": "Luxembourg",
      "Poland": "Pologne",
      "Portugal": "Portugal",
      "Slovenia": "Slovénie",
      "Spain": "Espagne",
      "Sweden": "Suède",
      "Switzerland": "Suisse",
    },
    factors: {
      tabagisme_w6: "Tabagisme actuel",
      depression_w6: "Dépression",
      diabete_w6: "Diabète",
      drinking_w6: "Alcool excessif",
      hypercholesterolemie: "Hypercholestérolémie",
      hypertension_w6: "Hypertension",
      obese_w6: "Obésité",
      phactiv_w6: "Inactivité physique",
      bonne_audition_w6: "Mauvaise audition",
      inactif_social_w6: "Inactivité sociale",
      books_ord_c_wq: "Contexte culturel défavorisé dans l’enfance",
      score_finance_enf_wq: "Difficultés financières dans l’enfance",
      score_sante_enf_wq: "Santé défavorable dans l’enfance",
      score_logement_enf_wq: "Logement défavorable dans l’enfance",
      score_violences_enf_wq: "Violences dans l’enfance",
      annees_educ_ge9: "Faible niveau d’éducation",
      parental_discrimination_any: "Discrimination parentale",
      occ_high_psychosocial_q4: "Exposition psychosociale professionnelle élevée",
      occ_high_burden_q4: "Pénibilité physique professionnelle élevée",
      occ_low_cognitive_enrichment_q1: "Faible enrichissement cognitif professionnel",
    },
    method: [
      {
        title: "Objectif et interprétation",
        body: "Ce tableau de bord présente des fractions attribuables en population pour explorer la contribution relative de facteurs adultes, de conditions de vie dans l’enfance et d’expositions professionnelles au risque de démence. Les valeurs sont des contributions populationnelles agrégées. Elles ne sont pas des prédictions individuelles et ne doivent pas être interprétées comme l’effet causal direct d’une intervention isolée.",
      },
      {
        title: "Population cible et pondération",
        body: "Les estimations sont projetées sur une population cible européenne issue de SHARE, principalement la vague 7 lorsque les informations rétrospectives sur l’enfance et les poids individuels sont disponibles. Les prévalences des facteurs de risque sont estimées avec les poids personnels SHARE afin de mieux représenter la population cible observée. Les cartes par pays utilisent les prévalences et communalités disponibles pour chaque pays.",
      },
      {
        title: "Estimations de risque",
        body: "Les risques relatifs proviennent des modèles harmonisés des analyses démence, avec âge contrôlé selon la spécification de sensibilité retenue, et des modèles harmonisés des analyses professionnelles pour les expositions au travail. Les facteurs adultes et enfance utilisent les définitions binaires ou quartiles défavorables utilisées dans l’article. Les facteurs non retenus ou non informatifs pour l’interface ont été masqués.",
      },
      {
        title: "Calcul par facteur",
        body: "Pour un facteur donné, la fraction brute est calculée à partir de la prévalence pondérée p et du risque relatif RR selon p × (RR − 1) / [1 + p × (RR − 1)]. Cette valeur est ensuite pondérée par la communalité, c’est-à-dire la part de variance partagée avec les autres expositions, afin de limiter le double comptage entre facteurs corrélés. La contribution affichée est donc une fraction attribuable en population pondérée par 1 − communalité.",
      },
      {
        title: "Totaux interactifs",
        body: "Les totaux affichés recombinent les contributions des variables cochées. Par défaut, la combinaison est multiplicative: 100 × [1 − produit(1 − contribution/100)], ce qui évite de sommer mécaniquement des fractions qui peuvent se chevaucher. L’option additive affiche la somme simple des contributions sélectionnées. Les cartes et les quatre cases Europe sont recalculées immédiatement selon la sélection courante.",
      },
      {
        title: "Cartes, sexe et limites",
        body: "Les valeurs par sexe utilisent les prévalences et communalités pays-sexe lorsqu’elles sont disponibles; sinon, le tableau de bord reprend la meilleure valeur agrégée disponible pour le facteur. Les couleurs des cartes accentuent les contrastes relatifs entre pays dans la vue active et ne constituent pas une échelle absolue commune à toutes les cartes. Les territoires ultramarins ont été retirés du fond cartographique afin de centrer l’affichage sur l’Europe continentale.",
      },
    ],
  },
  en: {
    ui: {
      documentTitle: "European dementia dashboard",
      appTitle: "European dementia dashboard",
      factors: "Factors",
      selected: "selected",
      selectedSingular: "selected",
      quickActionsAria: "Quick selection",
      sidebarAria: "Dashboard controls",
      pafEyebrow: "Population attributable fractions",
      mapViewAria: "Displayed map",
      additiveSum: "Additive sum",
      summaryAria: "Summary",
      europeTotalCard: "Europe total",
      europeEarlyCard: "Early life",
      europeAdultCard: "Adulthood",
      europeWorkCard: "Work",
      mapAria: "Map of population attributable fractions by country",
      sexAria: "Displayed sex",
      languageAria: "Language",
      contributors: "Selected variables",
      ranking: "Country ranking",
      totalEurope: "Europe total",
      totalEuropeCaption: "All Europe · {sex}",
      methodTitle: "Method",
      partnersAria: "Partner institutions",
      creditsText: "This work was conducted by the TRACeR team, led by Prof. Philippe Rémy, as part of a dementia project led by Dr. Laurent Cleret de Langavant. Contributors: Dr. Nicolas Dibot, Dr. Amin Gharbi-Meliani, Prof. Eléonore Bayen, Prof. Kristin Yaffe",
      additiveCaption: "sum of contributions",
      multiplicativeCaption: "multiplicative combination",
      noPositiveFactor: "No selected variable.",
      loadingError: "Loading error",
      closeEurope: "Return to Europe map",
      closeEuropeFrom: "Return to Europe map from {country}",
      notAvailable: "n/a",
      legendAdditive: "additive",
      legendMultiplicative: "multiplicative",
      lowRank: "low rank",
      highRank: "high rank",
      legendCaption: "Relative contrast enhanced for this map; observed values {range}",
    },
    views: {
      "Total": "Selected total population attributable fraction",
      "Early life": "Selected early-life population attributable fraction",
      "Adulthood": "Selected adulthood population attributable fraction",
      "Occupation": "Selected occupational population attributable fraction",
    },
    groups: {
      "Total": "Total",
      "Adulthood": "Adulthood",
      "Early life": "Early life",
      "Occupation": "Occupation",
    },
    sex: {
      both: "Both sexes",
      women: "Women",
      men: "Men",
    },
    actions: {
      all: "All",
      early: "Early life",
      adult: "Adulthood",
      work: "Work",
      none: "None",
    },
    table: {
      country: "Country",
      total: "Total",
      early: "Early life",
      adult: "Adulthood",
      work: "Work",
      top: "Top factor",
      factor: "Variable",
      category: "Category",
      populationAttributableFraction: "Population attributable fraction",
    },
    countries: {},
    factors: {},
    method: [
      {
        title: "Aim and interpretation",
        body: "This dashboard displays population attributable fractions to explore the relative contribution of adult risk factors, early-life conditions, and occupational exposures to dementia risk. Values are aggregate population contributions. They are not individual predictions and should not be interpreted as the direct causal effect of removing one exposure in isolation.",
      },
      {
        title: "Target population and weighting",
        body: "Estimates are projected to a European target population from SHARE, mainly wave 7, where retrospective childhood information and individual weights are available. Risk-factor prevalences are estimated with SHARE personal weights to better represent the observed target population. Country maps use the available country-specific prevalences and communalities.",
      },
      {
        title: "Risk estimates",
        body: "Relative risks come from the harmonised dementia models, with age controlled according to the retained sensitivity specification, and from harmonised occupational models for work exposures. Adult and early-life factors use the binary definitions or most adverse quartiles used in the manuscript. Factors not retained or not informative for this interface are hidden.",
      },
      {
        title: "Factor-level calculation",
        body: "For a given factor, the raw fraction is computed from weighted prevalence p and relative risk RR as p × (RR − 1) / [1 + p × (RR − 1)]. This value is then weighted by communality, the variance shared with other exposures, to reduce double counting between correlated factors. The displayed contribution is therefore a communality-weighted population attributable fraction, weighted by 1 − communality.",
      },
      {
        title: "Interactive totals",
        body: "Displayed totals recombine the contributions of selected variables. The default combination is multiplicative: 100 × [1 − product(1 − contribution/100)], which avoids mechanically summing fractions that may overlap. The additive option shows the simple sum of selected contributions. Maps and the four Europe summary cards are recalculated immediately from the current selection.",
      },
      {
        title: "Maps, sex layers, and limitations",
        body: "Sex-specific values use country-by-sex prevalences and communalities when available; otherwise, the dashboard uses the best available aggregate value for that factor. Map colours enhance relative contrasts between countries within the active view and are not a fixed absolute scale shared by all maps. Overseas territories were removed from the map geometry to keep the display centred on continental Europe.",
      },
    ],
  },
};

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem("dashboardLanguage");
    return stored === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

function setupAccessGate() {
  const gate = document.getElementById("access-gate");
  const form = document.getElementById("access-form");
  const input = document.getElementById("access-password");
  const error = document.getElementById("access-error");
  const app = document.querySelector(".app-shell");
  if (!gate || !form || !input || !app) return;

  const unlock = (storeSession = true) => {
    if (storeSession) {
      try {
        sessionStorage.setItem(ACCESS_SESSION_KEY, "1");
      } catch {
        // Static GitHub Pages gate: if sessionStorage is unavailable, unlock only for this page load.
      }
    }
    document.body.classList.remove("is-locked");
    gate.hidden = true;
    app.removeAttribute("aria-hidden");
  };

  try {
    if (sessionStorage.getItem(ACCESS_SESSION_KEY) === "1") {
      unlock(false);
      return;
    }
  } catch {
    // Keep the gate visible if storage cannot be read.
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() === ACCESS_PASSWORD) {
      unlock();
      return;
    }
    error.hidden = false;
    input.select();
  });

  requestAnimationFrame(() => input.focus());
}

function currentLocale() {
  return translations[state.language] || translations.fr;
}

function t(key) {
  return currentLocale().ui[key] || translations.en.ui[key] || key;
}

function localizedFrom(section, key, fallback = key) {
  return currentLocale()[section]?.[key] || translations.en[section]?.[key] || fallback;
}

function groupLabel(groupId) {
  return localizedFrom("groups", groupId, groupId);
}

function viewTitle(viewId) {
  return localizedFrom("views", viewId, viewId);
}

function sexLabel(sexId = state.sex) {
  return localizedFrom("sex", sexId, sexId);
}

function countryLabel(country) {
  return localizedFrom("countries", country, country);
}

function factorLabel(factor) {
  return localizedFrom("factors", factor.id, factor.label);
}

function actionLabel(action) {
  return localizedFrom("actions", action, action);
}

function tableLabel(column) {
  return localizedFrom("table", column, column);
}

function groupClass(groupId) {
  return String(groupId || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function methodSections() {
  return currentLocale().method || translations.en.method || [];
}

function pct(value, digits = 1) {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(digits)}%`;
}

function pLabel(value) {
  if (!Number.isFinite(value)) return `p ${t("notAvailable")}`;
  if (value < 0.001) return "p < .001";
  return `p ${value.toFixed(3)}`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixColor(low, high, t) {
  const a = hexToRgb(low);
  const b = hexToRgb(high);
  return rgbToHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

function factorById(id) {
  return state.data.factors.find((factor) => factor.id === id);
}

function isSelectableFactor(factor) {
  if (factor.id === "hypertension_w6") return false;
  return factor.methodFlag !== "not_retained";
}

function selectedFactorsForView(view = state.view) {
  return state.data.factors.filter((factor) => {
    if (!state.selected.has(factor.id)) return false;
    return view === "Total" || factor.group === view;
  });
}

function factorPayload(country, factorId) {
  return (
    state.data.valuesBySexCountry?.[state.sex]?.[country]?.[factorId]
    || state.data.valuesByCountry?.[country]?.[factorId]
    || null
  );
}

function factorValue(country, factorId) {
  return factorPayload(country, factorId)?.value || 0;
}

function factorMeanValue(factorId) {
  const values = state.data.countries
    .map((country) => factorValue(country, factorId))
    .filter((value) => Number.isFinite(value));
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function europeFactorValue(factor) {
  const sexValue = factor.europePafBySex?.[state.sex];
  if (Number.isFinite(sexValue)) return sexValue;
  if (state.sex !== "both") return factorMeanValue(factor.id);
  const bothValue = factor.europePafBySex?.both;
  if (Number.isFinite(bothValue)) return bothValue;
  if (Number.isFinite(factor.interactivePaf)) return factor.interactivePaf;
  return factorMeanValue(factor.id);
}

function europeValueForView(view = "Total") {
  const factors = state.data.factors.filter((factor) => {
    if (!isSelectableFactor(factor) || !state.selected.has(factor.id)) return false;
    return view === "Total" || factor.group === view;
  });
  return combine(factors.map((factor) => europeFactorValue(factor)));
}

function combine(values) {
  const clean = values.map((value) => Math.max(0, value)).filter((value) => Number.isFinite(value));
  if (state.additive) {
    return clean.reduce((sum, value) => sum + value, 0);
  }
  const product = clean.reduce((acc, value) => acc * (1 - Math.min(value, 99.9) / 100), 1);
  return 100 * (1 - product);
}

function countryValue(country, view = state.view) {
  const factors = selectedFactorsForView(view);
  return combine(factors.map((factor) => factorValue(country, factor.id)));
}

function groupValue(country, group) {
  const factors = state.data.factors.filter((factor) => factor.group === group && state.selected.has(factor.id));
  return combine(factors.map((factor) => factorValue(country, factor.id)));
}

function countryRows(view = state.view) {
  return state.data.countries
    .map((country) => {
      const groups = Object.fromEntries(state.data.groups.map((group) => [group.id, groupValue(country, group.id)]));
      const contributors = selectedFactorsForView("Total")
        .map((factor) => ({
          factor,
          value: factorValue(country, factor.id),
          source: factorPayload(country, factor.id)?.source || "",
          methodFlag: factorPayload(country, factor.id)?.methodFlag || factor.methodFlag,
        }))
        .filter((row) => row.value > 0)
        .sort((a, b) => b.value - a.value);
      return {
        country,
        value: countryValue(country, view),
        total: countryValue(country, "Total"),
        groups,
        contributors,
      };
    })
    .sort((a, b) => b.value - a.value);
}

function detailVariableRows(country) {
  const groupOrder = Object.fromEntries(state.data.groups.map((group, index) => [group.id, index]));
  const factorOrder = Object.fromEntries(state.data.factors.map((factor, index) => [factor.id, index]));
  return selectedFactorsForView("Total")
    .map((factor) => ({
      factor,
      value: factorValue(country, factor.id),
    }))
    .sort((a, b) => {
      if (state.view !== "Total") {
        const aSelectedGroup = a.factor.group === state.view ? 0 : 1;
        const bSelectedGroup = b.factor.group === state.view ? 0 : 1;
        if (aSelectedGroup !== bSelectedGroup) return aSelectedGroup - bSelectedGroup;
      }
      if (state.view === "Total") {
        return b.value - a.value || (factorOrder[a.factor.id] ?? 999) - (factorOrder[b.factor.id] ?? 999);
      }
      const aGroup = groupOrder[a.factor.group] ?? 999;
      const bGroup = groupOrder[b.factor.group] ?? 999;
      if (aGroup !== bGroup) return aGroup - bGroup;
      return (factorOrder[a.factor.id] ?? 999) - (factorOrder[b.factor.id] ?? 999);
    });
}

function totalEuropeRows() {
  const groupOrder = Object.fromEntries(state.data.groups.map((group, index) => [group.id, index]));
  const factorOrder = Object.fromEntries(state.data.factors.map((factor, index) => [factor.id, index]));
  return state.data.factors
    .filter(isSelectableFactor)
    .map((factor) => ({
      factor,
      value: europeFactorValue(factor),
    }))
    .sort((a, b) => {
      if (state.view !== "Total") {
        const aSelectedGroup = a.factor.group === state.view ? 0 : 1;
        const bSelectedGroup = b.factor.group === state.view ? 0 : 1;
        if (aSelectedGroup !== bSelectedGroup) return aSelectedGroup - bSelectedGroup;
      }
      if (state.view === "Total") {
        return b.value - a.value || (factorOrder[a.factor.id] ?? 999) - (factorOrder[b.factor.id] ?? 999);
      }
      const aGroup = groupOrder[a.factor.group] ?? 999;
      const bGroup = groupOrder[b.factor.group] ?? 999;
      if (aGroup !== bGroup) return aGroup - bGroup;
      return (factorOrder[a.factor.id] ?? 999) - (factorOrder[b.factor.id] ?? 999);
    });
}

function rankingValue(row, sortKey = state.rankingSort) {
  if (sortKey === "Total") return row.total;
  return row.groups[sortKey] || 0;
}

function rankingRows() {
  const rows = countryRows("Total");
  const direction = state.rankingDirection === "asc" ? 1 : -1;
  return rows.sort((a, b) => {
    const diff = rankingValue(a) - rankingValue(b);
    if (diff !== 0) return direction * diff;
    const totalDiff = b.total - a.total;
    if (totalDiff !== 0) return totalDiff;
    return countryLabel(a.country).localeCompare(countryLabel(b.country), state.language);
  });
}

function colorDomain(rows) {
  const values = rows
    .map((row) => row.value)
    .filter((value) => Number.isFinite(value) && value > 0)
    .sort((a, b) => a - b);
  if (!values.length) {
    return { rawMin: 0, rawMax: 0, values, relative: false };
  }
  const rawMin = values[0];
  const rawMax = values[values.length - 1];
  return { rawMin, rawMax, values, relative: rawMin !== rawMax };
}

function relativeRank(value, values) {
  if (values.length <= 1) return 0.72;
  const lower = values.filter((candidate) => candidate < value).length;
  const equal = values.filter((candidate) => candidate === value).length;
  return (lower + Math.max(0, equal - 1) / 2) / (values.length - 1);
}

function colorForValue(value, domain, view) {
  if (!Number.isFinite(value) || value <= 0 || domain.rawMax <= 0) return "#f8fafc";
  const [low, high] = palettes[view] || palettes.Total;
  if (domain.rawMin === domain.rawMax) return mixColor(low, high, 0.72);
  const t = Math.max(0, Math.min(1, relativeRank(value, domain.values)));
  return mixColor(low, high, 0.04 + 0.96 * t);
}

function renderFactors() {
  const container = document.getElementById("factor-list");
  container.innerHTML = "";
  for (const group of state.data.groups) {
    const factors = state.data.factors.filter((factor) => factor.group === group.id && isSelectableFactor(factor));
    const groupEl = document.createElement("section");
    groupEl.className = "factor-group";
    const header = document.createElement("h3");
    header.innerHTML = `<span><span class="group-dot" style="background:${group.color}"></span>${groupLabel(group.id)}</span><span>${factors.length}</span>`;
    groupEl.appendChild(header);

    for (const factor of factors) {
      const row = document.createElement("label");
      row.className = "factor-item";
      const checked = state.selected.has(factor.id) ? "checked" : "";
      row.innerHTML = `
        <input type="checkbox" data-factor="${factor.id}" ${checked} />
        <span>
          <span class="factor-label">${factorLabel(factor)}</span>
          <span class="factor-meta">
            RR ${factor.rr ? factor.rr.toFixed(2) : t("notAvailable")} · ${pLabel(factor.pValue)}
          </span>
        </span>
        <span class="factor-value">${pct(factorMeanValue(factor.id))}</span>
      `;
      row.querySelector("input").addEventListener("change", (event) => {
        if (event.target.checked) state.selected.add(factor.id);
        else state.selected.delete(factor.id);
        update();
      });
      groupEl.appendChild(row);
    }
    container.appendChild(groupEl);
  }
}

function renderStats() {
  document.getElementById("stat-europe-total").textContent = pct(europeValueForView("Total"));
  document.getElementById("stat-europe-early").textContent = pct(europeValueForView("Early life"));
  document.getElementById("stat-europe-adult").textContent = pct(europeValueForView("Adulthood"));
  document.getElementById("stat-europe-work").textContent = pct(europeValueForView("Occupation"));
  document.getElementById("selected-count").textContent = `${state.selected.size} ${state.selected.size === 1 ? t("selectedSingular") : t("selected")}`;
  document.getElementById("ranking-caption").textContent = state.additive ? t("additiveCaption") : t("multiplicativeCaption");
}

function tooltipHtml(country) {
  const row = countryRows(state.view).find((item) => item.country === country);
  if (!row) return `<strong>${countryLabel(country)}</strong>`;
  const top = row.contributors.slice(0, 3).map((item) => `${factorLabel(item.factor)}: ${pct(item.value)}`).join("<br>");
  return `
    <strong>${countryLabel(country)}</strong><br>
    ${sexLabel()}<br>
    ${groupLabel(state.view)}: <strong>${pct(row.value)}</strong><br>
    ${top ? `<span>${top}</span>` : ""}
  `;
}

function renderMap(rows) {
  const domain = colorDomain(rows);
  const byCountry = Object.fromEntries(rows.map((row) => [row.country, row.value]));

  if (!state.map) {
    state.map = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: true,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      doubleClickZoom: false,
      attributionControl: false,
    }).setView([49, 11], 4);
    state.geoLayer = L.geoJSON(state.geo, {
      style: (feature) => countryStyle(feature, byCountry, domain),
      onEachFeature: (feature, layer) => {
        const country = feature.properties.country;
        layer.bindTooltip(() => tooltipHtml(country), { sticky: true });
        layer.on("click", () => {
          state.activeCountry = country;
          updateDetail(rows);
          state.geoLayer.setStyle((feat) => countryStyle(feat, byCountry, domain));
        });
        layer.on("dblclick", (event) => {
          L.DomEvent.stop(event);
          setCountryFocus(country);
        });
      },
    }).addTo(state.map);
    fitEuropeOnMap();
  } else {
    state.geoLayer.setStyle((feature) => countryStyle(feature, byCountry, domain));
    state.geoLayer.eachLayer((layer) => {
      const country = layer.feature.properties.country;
      layer.setTooltipContent(tooltipHtml(country));
      applyLayerInteractivity(layer, country);
    });
  }
  state.geoLayer.eachLayer((layer) => {
    const country = layer.feature.properties.country;
    applyLayerInteractivity(layer, country);
  });
  renderFocusControl();
  renderLegend(domain);
  requestAnimationFrame(() => {
    if (!state.map) return;
    state.map.invalidateSize();
    if (state.focusCountry) fitCountryOnMap(state.focusCountry);
    else fitEuropeOnMap();
  });
}

function countryStyle(feature, byCountry, domain) {
  const country = feature.properties.country;
  const hiddenByFocus = state.focusCountry && state.focusCountry !== country;
  const value = byCountry[country] || 0;
  const active = state.activeCountry === country;
  if (hiddenByFocus) {
    return {
      fillColor: "transparent",
      color: "transparent",
      weight: 0,
      opacity: 0,
      fillOpacity: 0,
    };
  }
  return {
    fillColor: colorForValue(value, domain, state.view),
    color: active ? "#111827" : "#ffffff",
    weight: active ? 2.4 : 1.1,
    opacity: 1,
    fillOpacity: active ? 0.94 : 0.86,
  };
}

function applyLayerInteractivity(layer, country) {
  const hiddenByFocus = state.focusCountry && state.focusCountry !== country;
  const element = layer.getElement?.();
  if (element) {
    element.style.pointerEvents = hiddenByFocus ? "none" : "auto";
  }
  if (hiddenByFocus) {
    layer.closeTooltip();
  }
}

function fitCountryOnMap(country) {
  if (!state.geoLayer || !state.map) return;
  state.geoLayer.eachLayer((layer) => {
    if (layer.feature.properties.country === country) {
      state.map.fitBounds(layer.getBounds(), { padding: [42, 42], maxZoom: 7 });
    }
  });
}

function fitEuropeOnMap() {
  if (!state.geoLayer || !state.map) return;
  state.map.invalidateSize();
  const bounds = state.geoLayer.getBounds();
  if (bounds.isValid()) {
    state.map.fitBounds(bounds, { padding: [6, 6] });
  }
}

function setCountryFocus(country) {
  state.focusCountry = country;
  state.activeCountry = country;
  update();
  requestAnimationFrame(() => fitCountryOnMap(country));
}

function clearCountryFocus() {
  state.focusCountry = null;
  update();
  requestAnimationFrame(fitEuropeOnMap);
}

function renderFocusControl() {
  const close = document.getElementById("focus-close");
  close.hidden = !state.focusCountry;
  const title = state.focusCountry
    ? t("closeEuropeFrom").replace("{country}", countryLabel(state.focusCountry))
    : t("closeEurope");
  close.title = title;
  close.setAttribute("aria-label", title);
}

function renderLegend(domain) {
  const [low, high] = palettes[state.view] || palettes.Total;
  const title = viewTitle(state.view);
  document.getElementById("legend").innerHTML = `
    <div class="legend-row"><strong>${title}</strong><span>${sexLabel()}</span></div>
    <div class="legend-row"><span>${state.additive ? t("legendAdditive") : t("legendMultiplicative")}</span><span></span></div>
    <div class="legend-strip" style="background: linear-gradient(90deg, ${low}, ${high})"></div>
    <div class="legend-row"><span>${t("lowRank")}</span><span>${t("highRank")}</span></div>
    <div class="legend-caption">${t("legendCaption").replace("{range}", `${pct(domain.rawMin)}-${pct(domain.rawMax)}`)}</div>
  `;
}

function renderDetail(rows) {
  if (!state.activeCountry && rows.length) state.activeCountry = rows[0].country;
  updateDetail(rows);
}

function updateDetail(rows) {
  const row = rows.find((item) => item.country === state.activeCountry) || rows[0];
  if (!row) return;
  state.activeCountry = row.country;
  document.getElementById("detail-country").textContent = `${countryLabel(row.country)} · ${sexLabel()}`;
  document.getElementById("detail-total").textContent = pct(row.total);

  const maxGroup = Math.max(...Object.values(row.groups), 1);
  const bars = state.data.groups.map((group) => {
    const value = row.groups[group.id] || 0;
    return `
      <div class="bar-row">
        <span>${groupLabel(group.id)}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${Math.min(100, (value / maxGroup) * 100)}%;background:${group.color}"></span></span>
        <span>${pct(value)}</span>
      </div>
    `;
  });
  document.getElementById("group-bars").innerHTML = bars.join("");

  const contributors = detailVariableRows(row.country).map((item) => {
    return `
      <div class="mini-row">
        <div class="mini-factor mini-factor-${groupClass(item.factor.group)}"><strong>${factorLabel(item.factor)}</strong><br><span>${groupLabel(item.factor.group)}</span></div>
        <strong>${pct(item.value)}</strong>
      </div>
    `;
  });
  document.getElementById("country-contributors").innerHTML = contributors.join("") || `<p class='subtle'>${t("noPositiveFactor")}</p>`;
}

function renderRanking(rows) {
  const body = document.getElementById("ranking-body");
  body.innerHTML = rows.map((row) => {
    const top = row.contributors[0];
    return `
      <tr>
        <td><strong>${countryLabel(row.country)}</strong></td>
        <td class="numeric ranking-col-total">${pct(row.total)}</td>
        <td class="numeric ranking-col-early">${pct(row.groups["Early life"] || 0)}</td>
        <td class="numeric ranking-col-adult">${pct(row.groups["Adulthood"] || 0)}</td>
        <td class="numeric ranking-col-work">${pct(row.groups["Occupation"] || 0)}</td>
        <td>${top ? `${factorLabel(top.factor)} (${pct(top.value)})` : "-"}</td>
      </tr>
    `;
  }).join("");
}

function renderRankingSortControls() {
  document.querySelectorAll("[data-ranking-sort]").forEach((button) => {
    const active = button.dataset.rankingSort === state.rankingSort;
    button.classList.toggle("active", active);
    button.dataset.sortDirection = active ? state.rankingDirection : "none";
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderTotalEuropeTable() {
  document.getElementById("total-europe-caption").textContent = t("totalEuropeCaption").replace("{sex}", sexLabel());
  const body = document.getElementById("total-europe-body");
  body.innerHTML = totalEuropeRows().map((row) => {
    return `
      <tr>
        <td class="total-factor total-factor-${groupClass(row.factor.group)}"><strong>${factorLabel(row.factor)}</strong></td>
        <td>${groupLabel(row.factor.group)}</td>
        <td class="numeric">${pct(row.value)}</td>
      </tr>
    `;
  }).join("");
}

function renderMethod() {
  document.getElementById("method-heading").textContent = t("methodTitle");
  document.getElementById("method-content").innerHTML = methodSections().map((section) => {
    return `
      <section class="method-block">
        <h3>${section.title}</h3>
        <p>${section.body}</p>
      </section>
    `;
  }).join("");
}

function renderViewControls() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  document.getElementById("view-title").textContent = viewTitle(state.view);
}

function renderSexControls() {
  document.querySelectorAll("[data-sex]").forEach((button) => {
    button.classList.toggle("active", button.dataset.sex === state.sex);
    button.textContent = sexLabel(button.dataset.sex);
  });
}

function renderStaticText() {
  document.documentElement.lang = state.language;
  document.title = t("documentTitle");
  document.querySelector(".sidebar").setAttribute("aria-label", t("sidebarAria"));
  document.querySelector(".quick-actions").setAttribute("aria-label", t("quickActionsAria"));
  document.querySelector(".segmented").setAttribute("aria-label", t("mapViewAria"));
  document.querySelector(".stats-row").setAttribute("aria-label", t("summaryAria"));
  document.getElementById("map").setAttribute("aria-label", t("mapAria"));
  document.querySelector(".sex-map-control").setAttribute("aria-label", t("sexAria"));
  document.querySelector(".language-switch").setAttribute("aria-label", t("languageAria"));
  document.querySelector(".logos-panel").setAttribute("aria-label", t("partnersAria"));

  document.getElementById("app-title").textContent = t("appTitle");
  document.getElementById("factors-heading").textContent = t("factors");
  document.getElementById("paf-eyebrow").textContent = t("pafEyebrow");
  document.getElementById("formula-label").textContent = t("additiveSum");
  document.querySelector('[data-stat-label="total"]').textContent = t("europeTotalCard");
  document.querySelector('[data-stat-label="early"]').textContent = t("europeEarlyCard");
  document.querySelector('[data-stat-label="adult"]').textContent = t("europeAdultCard");
  document.querySelector('[data-stat-label="work"]').textContent = t("europeWorkCard");
  document.getElementById("contributors-heading").textContent = t("contributors");
  document.getElementById("ranking-heading").textContent = t("ranking");
  document.getElementById("total-europe-heading").textContent = t("totalEurope");
  document.getElementById("credits-text").textContent = t("creditsText");

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.textContent = actionLabel(button.dataset.action);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.textContent = groupLabel(button.dataset.view);
  });
  document.querySelectorAll("[data-table-header]").forEach((cell) => {
    cell.textContent = tableLabel(cell.dataset.tableHeader);
  });
  document.querySelectorAll("[data-ranking-sort-label]").forEach((cell) => {
    cell.textContent = tableLabel(cell.dataset.rankingSortLabel);
  });
  document.querySelectorAll("[data-total-header]").forEach((cell) => {
    cell.textContent = tableLabel(cell.dataset.totalHeader);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle("active", button.dataset.language === state.language);
    button.setAttribute("aria-pressed", String(button.dataset.language === state.language));
  });
}

function update() {
  renderStaticText();
  renderFactors();
  const rows = countryRows(state.view);
  renderViewControls();
  renderSexControls();
  renderStats(rows);
  renderMap(rows);
  renderDetail(rows);
  renderRankingSortControls();
  renderRanking(rankingRows());
  renderTotalEuropeTable();
  renderMethod();
}

function setupActions() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      update();
    });
  });

  document.querySelectorAll("[data-sex]").forEach((button) => {
    button.addEventListener("click", () => {
      state.sex = button.dataset.sex;
      update();
    });
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language === "en" ? "en" : "fr";
      try {
        localStorage.setItem("dashboardLanguage", state.language);
      } catch {
        // Ignore storage failures; the in-page language switch still works.
      }
      update();
    });
  });

  document.querySelectorAll("[data-ranking-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextSort = button.dataset.rankingSort;
      if (state.rankingSort === nextSort) {
        state.rankingDirection = state.rankingDirection === "desc" ? "asc" : "desc";
      } else {
        state.rankingSort = nextSort;
        state.rankingDirection = "desc";
      }
      update();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const set = new Set();
      for (const factor of state.data.factors) {
        if (!isSelectableFactor(factor)) continue;
        if (action === "all" && factor.interactivePaf > 0) set.add(factor.id);
        if (action === "early" && factor.group === "Early life" && factor.interactivePaf > 0) set.add(factor.id);
        if (action === "adult" && factor.group === "Adulthood" && factor.interactivePaf > 0) set.add(factor.id);
        if (action === "work" && factor.group === "Occupation" && factor.interactivePaf > 0) set.add(factor.id);
      }
      state.selected = set;
      update();
    });
  });

  document.getElementById("formula-toggle").addEventListener("change", (event) => {
    state.additive = event.target.checked;
    update();
  });

  document.getElementById("focus-close").addEventListener("click", clearCountryFocus);
}

async function boot() {
  const [data, geo] = await Promise.all([
    fetch("./data/dashboard_data.json?v=bottom-method-2").then((response) => response.json()),
    fetch("./data/share_countries.geojson?v=bottom-method-2").then((response) => response.json()),
  ]);
  state.data = data;
  state.geo = geo;
  state.selected = new Set(data.factors.filter((factor) => isSelectableFactor(factor) && factor.defaultSelected && factor.interactivePaf > 0).map((factor) => factor.id));
  setupActions();
  update();
}

setupAccessGate();

boot().catch((error) => {
  document.body.innerHTML = `<main class="workspace"><section class="ranking-panel"><h1>${t("appTitle")}</h1><p>${t("loadingError")}: ${error.message}</p></section></main>`;
});
