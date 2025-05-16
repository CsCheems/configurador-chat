// Parámetros de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const configJson = urlParams.get("configJson") || "";

const widgetUrl = urlParams.get("widgetUrl") || "";
const mostrarAvatar = document.getElementById('toggle-mostarAvatar');
const mostrarTiempo = document.getElementById('toggle-mostrarTiempo');
const mostrarInsignias = document.getElementById('toggle-mostarInsigneas');
const permitirImagenes = document.getElementById('toggle-mostarImagenes');
const permitirComandos = document.getElementById('toggle-excluirComandos');
const fontSize = document.getElementById('tamañoFuente');
const ignoredUsers = document.getElementById('usuariosIgnorados');
const host = document.getElementById('hostInput');
const port = document.getElementById('portInput');
const btnWidgetUrl = document.getElementById('btnWidgetUrl');
const widgetUrlInput = document.getElementById('widgetUrlInput');


fetch('./configuracion/config.json')
  .then(response => response.json())
  .then(config => {
    applyDefaultSettings(config);
    loadFromURL(config);
    generarUrlWidget(config);

    document.getElementById('btnWidgetUrl').addEventListener('click', () => {
      generarUrlWidget(config);
    });
  })
  .catch(error => {
    console.error("Error cargando config.json:", error);
  });

function applyDefaultSettings(config) {
  config.config.forEach(item => {
    const input = document.getElementById(`toggle-${item.id}`) || document.getElementById(item.id);
    if (!input) return;

    if (item.type === "checkbox") {
      input.checked = item.value ?? item.defaultValue ?? false;
    } else if (item.type === "number" || item.type === "text" || item.type === "color") {
      input.value = item.value ?? item.defaultValue ?? "";
    }
  });
}

function loadFromURL(config) {
  const urlParams = new URLSearchParams(window.location.search);
  config.config.forEach(item => {
    const input = document.getElementById(`toggle-${item.id}`) || document.getElementById(item.id);
    if (!input || !urlParams.has(item.id)) return;

    if (item.type === "checkbox") {
      input.checked = urlParams.get(item.id) === 'true';
    } else {
      input.value = urlParams.get(item.id);
    }
  });
}

function generarUrlWidget(config) {
  const baseUrl = "https://cscheems.github.io/Streamerbot-Chat-Widget/";
  const params = new URLSearchParams();

  config.config.forEach(item => {
    const el = document.getElementById(`toggle-${item.id}`) || document.getElementById(item.id);
    if (!el) return;
    const value = item.type === "checkbox" ? el.checked : el.value;
    params.set(item.id, value);
  });

  const finalUrl = `${baseUrl}?${params.toString()}`;
  document.getElementById("widgetUrlInput").value = finalUrl;
}

function copiarUrl() {
  const input = document.getElementById("widgetUrlInput");
  navigator.clipboard.writeText(input.value);

  const urlCopiado = document.createElement('span');
  urlCopiado.textContent = 'Copiado';
  urlCopiado.style.textAlign = 'center';
  urlCopiado.style.color = 'white';
  urlCopiado.style.fontWeight = 'bold';
  urlCopiado.style.position = 'absolute';
  urlCopiado.style.backgroundColor = '#45A049';
  urlCopiado.style.padding = '5px';
  urlCopiado.style.borderRadius = '10px';
  urlCopiado.style.zIndex = '2';
  urlCopiado.style.opacity = '0';
  urlCopiado.style.transform = 'translate(-50%, -112%)';
  urlCopiado.style.transition = 'opacity 0.2s easy-in-out';

  const widgetUrlInputContainer  = document.getElementById("widgetUrlInputContainer");
  widgetUrlInputContainer.appendChild(urlCopiado);

  void urlCopiado.offsetWidth;

  urlCopiado.style.opacity = '1';

  setTimeout(() => {
    urlCopiado.style.opacity = '0';
    setTimeout(() => {
      widgetUrlInputContainer.removeChild(urlCopiado);
    }, 500);
  }, 5000);
}

// PREVIEW

// function actualizarPreview() {
//   const baseURL = "https://cscheems.github.io/Streamerbot-Chat-Widget/";

//   // Obtener valores
//   const fondoColor = document.getElementById("fondoColor").value;
//   const opacidad = document.getElementById("opacidad").value;
//   const mostarAvatar = document.getElementById("toggle-mostarAvatar").checked;
//   const mostrarTiempo = document.getElementById("toggle-mostrarTiempo").checked;
//   const mostarInsigneas = document.getElementById("toggle-mostarInsigneas").checked;
//   const mostarImagenes = document.getElementById("toggle-mostarImagenes").checked;
//   const rolesId = document.getElementById("rolesId").value;
//   const mostrarCanjes = document.getElementById("toggle-mostrarCanjes").checked;
//   const mostrarDestacado = document.getElementById("toggle-mostrarDestacado").checked;
//   const mostrarRaids = document.getElementById("toggle-mostrarRaids")?.checked || false;
//   const mostrarSubs = document.getElementById("toggle-mostrarSubs")?.checked || false;
//   const mostrarSubsRegaladas = document.getElementById("toggle-mostrarSubsRegaladas")?.checked || false;
//   const mostrarEmotesGigantes = document.getElementById("toggle-mostrarEmotesGigantes")?.checked || false;
//   const excluirComandos = document.getElementById("toggle-excluirComandos").checked;
//   const tamañoFuente = document.getElementById("tamañoFuente").value;
//   const usuariosIgnorados = document.getElementById("usuariosIgnorados").value;
//   const hostInput = document.getElementById("hostInput").value;
//   const portInput = document.getElementById("portInput").value;

//   // Construir parámetros
//   const params = new URLSearchParams({
//     fondoColor,
//     opacidad,
//     mostarAvatar,
//     mostrarTiempo,
//     mostarInsigneas,
//     mostarImagenes,
//     rolesId,
//     mostrarCanjes,
//     mostrarDestacado,
//     mostrarRaids,
//     mostrarSubs,
//     mostrarSubsRegaladas,
//     mostrarEmotesGigantes,
//     excluirComandos,
//     "tamañoFuente": tamañoFuente,
//     usuariosIgnorados,
//     hostInput,
//     portInput
//   });

//   document.getElementById("chat-preview-frame").src = `${baseURL}?${params.toString()}`;
// }


// document.addEventListener("DOMContentLoaded", () => {
//   actualizarPreview();
// });

