const fs = require("fs");

const actividades = [
  { id: 1, name: "Tirolesa", places: 15 },
  { id: 2, name: "Safari", places: 30 },
  { id: 3, name: "Palestra", places: 10 },
  { id: 4, name: "Jardineria", places: 20 }
];

const horarios = [];
const hoy = new Date();
const fin = new Date();
fin.setMonth(hoy.getMonth() + 2);

function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());

  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}.000 +00:00`;
}

for (let d = new Date(hoy); d <= fin; d.setDate(d.getDate() + 1)) {
  const dia = d.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
  if (dia === 2 || dia === 4) continue; // Saltea martes (2) y jueves (4)

  for (let hora = 9; hora <= 17; hora++) {
    const horaStr = hora.toString().padStart(2, "0") + ":00:00";
    const startDate = new Date(d);
    startDate.setHours(hora, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(hora + 1); // 1h de duración

    actividades.forEach((act) => {
      horarios.push(
        `INSERT INTO Schedules (startDate, endDate, placesLeft, activity_id) VALUES (
          '${formatDate(startDate)}',
          '${formatDate(endDate)}',
          ${act.places},
          ${act.id}
        );`
      );
    });
  }
}

fs.writeFileSync("insert_horarios.sql", horarios.join("\n"));
console.log("Archivo SQL generado: insert_horarios.sql");