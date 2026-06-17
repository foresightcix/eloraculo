/**
 * El Oráculo — Receptor de Google Sheets
 * ----------------------------------------
 * Pega este código en el editor de Apps Script de tu Google Sheet
 * (Extensiones ▸ Apps Script) y despliégalo como "Aplicación web".
 * Consulta el README.md, sección "Conectar con Google Sheets".
 *
 * Guarda el Nombre del participante y su Arquetipo (constelación)
 * en la pestaña "Respuestas". Crea los encabezados la primera vez.
 */

// Nombre de la pestaña donde se guardarán las respuestas.
var SHEET_NAME = 'Respuestas';

// Columnas (en orden). El "key" debe coincidir con lo que envía index.html.
var COLUMNS = [
  { key: 'nombre',    titulo: 'Nombre' },
  { key: 'arquetipo', titulo: 'Arquetipo' }
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // evita colisiones si llegan varios a la vez
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var row = COLUMNS.map(function (col) {
      var v = data[col.key];
      return v === undefined || v === null ? '' : v;
    });
    sheet.appendRow(row);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permite verificar en el navegador que el despliegue está vivo.
function doGet() {
  return json_({ ok: true, service: 'El Oráculo', hint: 'Usa POST para guardar respuestas.' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c.titulo; }));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
