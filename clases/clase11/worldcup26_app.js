"use strict";

/* ──────────────────────────────────────────────────────
   CONFIGURACIÓN
────────────────────────────────────────────────────── */
const BASE = "https://worldcup26.ir";

/* ──────────────────────────────────────────────────────
   ESTADO DE APLICACIÓN
   Separamos claramente los tres recursos para que el fallo
   de uno no contamine el estado de los otros.
────────────────────────────────────────────────────── */
const state = {
  teams:     [],            // Array<{id, name, flag_url, ...}>//
  groups: [],
};

/* ──────────────────────────────────────────────────────
   SELECTORES DOM
────────────────────────────────────────────────────── */
const teamSelect     = document.getElementById("teamSelect");
const teamInfo     = document.getElementById("teamInfo");
const cardsGrid       = document.getElementById("cardsGrid");
const statsBar        = document.getElementById("statsBar");
const sectionEyebrow  = document.getElementById("sectionEyebrow");
const citiesSection   = document.getElementById("citiesSection");
const apiStatus       = document.getElementById("apiStatus");

const groupSection = document.getElementById("groupSection");
const groupLetterEl = document.getElementById("groupLetter");
const groupChipsEl = document.getElementById("groupChips");

/* ──────────────────────────────────────────────────────
   POBLAR SELECTOR DE EQUIPOS
   Datos obtenidos de /get/teams, ordenados alfabéticamente.
────────────────────────────────────────────────────── */
function populateTeamSelector() {
  const sortedTeamList = [...state.teams].sort((a, b) => {
    const na = a.name_en ?? "";
    const nb = b.name_en ?? "";
    return na.localeCompare(nb);
  });


  teamSelect.innerHTML =
    `<option value="">— Selecciona un equipo (${sortedTeamList.length}) —</option>`;

  sortedTeamList.forEach(team => {
    const opt = document.createElement("option");
    opt.value = String(team.id);
    opt.textContent = team.name_en ?? `Equipo ${team.id}`;
    teamSelect.appendChild(opt);
  });

  addEventToTeamSelect();
  teamSelect.disabled = false;
}


/* ──────────────────────────────────────────────────────
   EVENTO: cambio de equipo en el selector
────────────────────────────────────────────────────── */
function addEventToTeamSelect() {
  teamSelect.addEventListener("change", (event) => {
    const tid = teamSelect.value;

    if (!tid) {
      // si no hay equipo seleccionado, limpio la sección de partidos
      return;
    }
    state.teams.forEach(team => {
      if (String(team.id) === tid) {
        // si el equipo coincide con el seleccionado, muestro sus datos
        teamInfo.style.display = "block";
        console.log('Team', team);
        debugger;
        const flag = document.getElementById("teamFlagImg");
        const name = document.getElementById("teamName");

        flag.src = team.flag;
        flag.alt = `Bandera de ${team.name_en}`;
        name.textContent = team.name_en;
      }
    });
  });
}

async function cargarGrupos() {
  try {
    const response = await fetch(`${BASE}/get/groups`);
 
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
 
    const jsondata = await response.json();
    state.groups = jsondata.groups;
  } catch (err) {
    console.error("Error al cargar grupos:", err);
    state.groups = []; 
  }
}

function encontrarGrupoDeEquipo(teamId) {
  return state.groups.find(grupo =>
    grupo.teams.some(t => String(t.team_id) === String(teamId))
  ) ?? null;
}

function nombreDeEquipoPorId(teamId) {
  const encontrado = state.teams.find(t => String(t.id) === String(teamId));
  return encontrado?.name_en ?? `Equipo ${teamId}`;
}

function pintarGrupo(teamIdSeleccionado) {
  const grupo = encontrarGrupoDeEquipo(teamIdSeleccionado);
 
  if (!grupo) {
    // No hay datos de grupo falla /get/groups, o el equipo no aparece
    // en ninguno, Ocultamos la seccion en vez de mostrarla vacia.
    groupSection.classList.remove("visible");
    return;
  }
 
  groupLetterEl.textContent = grupo.name;
 
  groupChipsEl.innerHTML = "";
  grupo.teams.forEach(t => {
    const chip = document.createElement("span");
    chip.className = "city-chip"; 
    chip.textContent = nombreDeEquipoPorId(t.team_id);
 
    if (String(t.team_id) === String(teamIdSeleccionado)) {
      chip.style.borderColor = "var(--gold)";
      chip.style.color = "var(--gold)";
    }
    groupChipsEl.appendChild(chip);
  });
 
  groupSection.classList.add("visible");
}

function addEventToTeamSelect() {
  teamSelect.addEventListener("change", () => {
    const tid = teamSelect.value;
 
    if (!tid) {
      // si no hay equipo seleccionado, limpio las secciones dependientes
      teamInfo.style.display = "none";
      groupSection.classList.remove("visible"); 
      return;
    }
 
    const team = state.teams.find(t => String(t.id) === tid);
    if (!team) return;
 
    teamInfo.style.display = "block";
 
    const flag = document.getElementById("teamFlagImg");
    const name = document.getElementById("teamName");
    flag.src = team.flag;
    flag.alt = `Bandera de ${team.name_en}`;
    name.textContent = team.name_en;
 
    pintarGrupo(team.id); 
  });
}





/* ──────────────────────────────────────────────────────
   Init: carga inicial de los tres endpoints
────────────────────────────────────────────────────── */
async function init() {
  try { //Se modifica el estilo porque en el laboratorio no se permite usar .then() y catch
    const response = await fetch(`${BASE}/get/teams`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jsondata = await response.json();
    state.teams = jsondata.teams;
    populateTeamSelector();
  } catch (err) {
    console.error("Error al cargar equipos:", err);
  }

  await cargarGrupos();
}

/* Punto de entrada */
init();

