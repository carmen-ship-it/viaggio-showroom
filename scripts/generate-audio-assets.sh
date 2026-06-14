#!/usr/bin/env bash
# ElevenLabs host narration and UI SFX are checked into public/assets/audio/.
# Do not regenerate narration with macOS say or synthetic ambient loops.
set -euo pipefail

echo "✓ Audio assets are managed manually (ElevenLabs host MP3 + UI SFX)."
echo "  Host narration: public/assets/audio/narration/host/*.mp3"
echo "  UI SFX:         public/assets/audio/sfx/*.mp3"
