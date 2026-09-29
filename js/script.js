// Horarios de atención.
// Los números son los días según Date.getDay(): 0 = domingo, 1 = lunes ... 6 = sábado.
// Cada día tiene una lista de tramos ["abre", "cierra"], en formato "HH:MM".
// Una lista vacía [] significa que ese día está cerrado.
const HORARIOS = {
  0: [],
  1: [["07:30", "12:00"], ["14:30", "19:00"]],
  2: [["07:30", "12:00"], ["14:30", "19:00"]],
  3: [["07:30", "12:00"], ["14:30", "19:00"]],
  4: [["07:30", "12:00"], ["14:30", "19:00"]],
  5: [["07:30", "12:00"], ["14:30", "19:00"]],
  6: []
};

// "16:30" -> 990 (minutos desde la medianoche)
function aMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

// "08:00" -> "8:00"
function formatear(hora) {
  return hora.replace(/^0/, "");
}

function calcularEstado(fecha) {
  const tramos = HORARIOS[fecha.getDay()];
  const ahora = fecha.getHours() * 60 + fecha.getMinutes();

  if (tramos.length === 0) {
    return { abierto: false, detalle: "Hoy no atendemos" };
  }

  for (const [abre, cierra] of tramos) {
    if (ahora < aMinutos(abre)) {
      return { abierto: false, detalle: `Abrimos hoy a las ${formatear(abre)}` };
    }
    if (ahora < aMinutos(cierra)) {
      return { abierto: true, detalle: `Cerramos a las ${formatear(cierra)}` };
    }
  }

  return { abierto: false, detalle: "Ya cerramos por hoy" };
}

function mostrarEstado() {
  const elementoTexto = document.getElementById("estado-texto");
  const elementoDetalle = document.getElementById("estado-detalle");
  const elementoAviso = document.getElementById("estado-aviso");

  if (!elementoTexto || !elementoDetalle) {
    return;
  }

  const estado = calcularEstado(new Date());

  elementoTexto.textContent = estado.abierto ? "Abierto ahora" : "Cerrado";
  elementoDetalle.textContent = estado.detalle;

  elementoTexto.classList.remove("abierto", "cerrado");
  elementoTexto.classList.add(estado.abierto ? "abierto" : "cerrado");

  // El aviso solo se muestra cuando el centro está cerrado
  if (elementoAviso) {
    elementoAviso.hidden = estado.abierto;
  }
}

mostrarEstado();
setInterval(mostrarEstado, 60000);
