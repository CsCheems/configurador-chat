//PARAMETROS//
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const configJson = urlParams.get("configJson") || "";
const widgetUrl = urlParams.get("widgetUrl") || "";

const mostrarAvatar = document.getElementById('toggle-avatar');
const mostrarTiempo = document.getElementById('toggle-tiempo');
const mostrarInsignias = document.getElementById('toggle-insignias');
const permitirImagenes = document.getElementById('toggle-imagenes');
const fontSize = document.getElementById('font-size');
const btnWidgetUrl = document.getElementById('btnWidgetUrl');
const widgetUrlInput = document.getElementById('widgetUrlInput');








