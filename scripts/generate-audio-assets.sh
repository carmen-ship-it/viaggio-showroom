#!/usr/bin/env bash
# Generate executive-demo audio assets (ambient, SFX, host narration).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO="$ROOT/public/assets/audio"
HOST="$AUDIO/narration/host"
VOICE="${VIAGGIO_TTS_VOICE:-Paulina}"
RATE="${VIAGGIO_TTS_RATE:-165}"

mkdir -p "$AUDIO/ambient" "$AUDIO/sfx" "$HOST"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required" >&2
  exit 1
fi

say_to_mp3() {
  local out="$1"
  local text="$2"
  local aiff="${out%.mp3}.aiff"
  say -v "$VOICE" -r "$RATE" -o "$aiff" "$text"
  ffmpeg -y -i "$aiff" -codec:a libmp3lame -qscale:a 2 "$out" >/dev/null 2>&1
  rm -f "$aiff"
}

echo "→ Ambient showroom loop (60s seamless pad)"
ffmpeg -y -f lavfi -i "anoisesrc=d=60:c=pink:a=0.015" \
  -f lavfi -i "sine=f=110:duration=60" \
  -f lavfi -i "sine=f=164.81:duration=60" \
  -filter_complex "[0][1][2]amix=inputs=3:duration=first,afade=t=in:st=0:d=2,afade=t=out:st=58:d=2,lowpass=f=800,volume=0.35" \
  -codec:a libmp3lame -qscale:a 4 "$AUDIO/ambient/showroom-loop.mp3" >/dev/null 2>&1

make_sfx() {
  local out="$1"
  local freq="$2"
  local dur="$3"
  local vol="$4"
  ffmpeg -y -f lavfi -i "sine=f=${freq}:duration=${dur}" \
    -af "afade=t=in:st=0:d=0.008,afade=t=out:st=0.05:d=0.035,volume=${vol},lowpass=f=4200" \
    -codec:a libmp3lame -qscale:a 2 "$out" >/dev/null 2>&1
}

echo "→ Premium SFX"
make_sfx "$AUDIO/sfx/nav-tap.mp3" 520 0.09 0.12
make_sfx "$AUDIO/sfx/card-select.mp3" 380 0.14 0.14
make_sfx "$AUDIO/sfx/transition-soft.mp3" 440 0.22 0.10
make_sfx "$AUDIO/sfx/success.mp3" 660 0.28 0.11
make_sfx "$AUDIO/sfx/qr-reveal.mp3" 494 0.35 0.09

echo "→ Host narration (es-BO scripts)"
declare -A SCRIPTS
SCRIPTS[host-s01-attract]="Bienvenido a Viaggio. Acá nadie te va a apurar ni a seguir con la mirada. Este recorrido es tuyo: mirá, compará, preguntá, a tu ritmo. Cuando quieras empezar, tocá la pantalla. Te acompaño en cada paso."
SCRIPTS[host-s03-selector]="Hoy el recorrido completo está armado alrededor del GS4 MAX, el SUV que más familias están evaluando en Santa Cruz. No es un catálogo: es una experiencia guiada. Tocá la tarjeta cuando quieras y entramos al vehículo en grande, diseño, confianza, comparación y cuota, en el orden que te sirva. Los demás modelos GAC vienen en camino; por ahora, profundizamos acá."
SCRIPTS[host-s22-hero]="Antes de números y comparaciones, tomate este momento. Fijate cómo se ve el GS4 MAX en persona, proporciones, presencia, detalle. Los datos están abajo cuando los necesites; ahora importa cómo te hace sentir arrancar el día con este auto. En los próximos pasos vas a poder responder la pregunta que todos traen: ¿puedo confiar en esto para mi familia? Empezamos por ahí cuando quieras."
SCRIPTS[host-s06-tour-intro-trust]="Ahora entramos al tour guiado. En los próximos minutos vas a recorrer el GS4 MAX con un especialista digital, motor, seguridad, garantía, servicio en Viaggio. No hace falta memorizar: avanzá paso a paso o volvé atrás cuando quieras. La idea es simple: primero confianza, después deseo. Cuando termines, vas a saber exactamente qué profundizar, o si ya estás listo para probarlo en la calle."
SCRIPTS[host-s06-tour-intro-family]="Ahora entramos al tour guiado. En los próximos minutos vas a recorrer el GS4 MAX con Diego, pensando en la vida real en familia. No hace falta memorizar: avanzá paso a paso o volvé atrás cuando quieras. La idea es simple: primero la vida real en familia, después los detalles que te importan. Cuando termines, vas a saber si encaja con tu rutina."
SCRIPTS[host-s06-tour-intro-desire]="Ahora entramos al tour guiado. En los próximos minutos vas a descubrir el GS4 MAX con Sofía, diseño y equipamiento. No hace falta memorizar: avanzá paso a paso o volvé atrás cuando quieras. La idea es simple: primero diseño y equipamiento, después la comparación con lo que ya conocés. Cuando termines, vas a saber qué te entusiasma."
SCRIPTS[host-s08-topic-frame]="Este tema responde una pregunta concreta de tu proceso de decisión. Escuchá al especialista, revisá los detalles visuales, y seguí cuando quieras, sin saltarte lo que te importa."
SCRIPTS[host-s08-adas]="Mucha gente mira el equipamiento; pocos se preguntan qué pasa un martes a las siete de la tarde en la doble vía. Acá no hablamos de gadgets: hablamos de margen, esos dos segundos extra cuando el tráfico se frena de golpe, o cuando hay que estacionar en un espacio justo con los chicos atrás. Carlos te muestra qué trae el GS4 MAX de serie. Después, si querés, lo probamos en la calle."
SCRIPTS[host-s12-compare]="Comparar no es descalificar al otro auto, es entender qué estás pagando realmente. Acá vas a ver filas donde ganamos, filas donde empatan, y alguna donde el competidor lleva ventaja. Eso es a propósito: Viaggio prefiere que decidas con información completa. Tocá cada fila para ver el contexto. Al final, la pregunta no es quién gana un marcador, es cuál encaja con tu familia y tu presupuesto."
SCRIPTS[host-s26-financing]="Llegaste al momento en que muchos se preguntan: ¿me cierra la cuota? Lo que ves acá es orientativo, rangos para que dimensiones el compromiso mensual antes de sentarte con un consultor. Jugá con versión y plazo; fijate también el costo de uso, no solo la letra del crédito. Ningún número de esta pantalla es final. El valor está en llegar a la conversación sabiendo qué preguntar, y qué ajustar."
SCRIPTS[host-s13-convert]="Llegaste lejos en pocos minutos, eso ya dice algo sobre tu interés. Ahora elegís cómo seguir: probarlo en la calle con tu familia, escribirnos por WhatsApp con todo lo que ya exploraste, o compartir un resumen con quien decide con vos. No hay respuesta correcta. Hay una que te resulte más cómoda hoy. Nosotros estamos en piso cuando quieras dar el paso, sin formularios eternos ni presión."
SCRIPTS[host-s15-whatsapp]="Este paso conecta lo digital con una persona real de Viaggio. Escaneá el código o abrí WhatsApp: tu recorrido viaja en el mensaje, temas que viste, comparación, cuota orientativa, para que no empieces de cero. En piso solemos responder en minutos. Si preferís seguir explorando acá, también podés. La conversación queda abierta cuando te sirva."

if ! command -v say >/dev/null 2>&1; then
  echo "macOS 'say' not found — skipping host narration MP3 generation" >&2
else
  for name in "${!SCRIPTS[@]}"; do
    echo "  · $name"
    say_to_mp3 "$HOST/${name}.mp3" "${SCRIPTS[$name]}"
  done
fi

echo "✓ Audio assets generated in public/assets/audio/"
