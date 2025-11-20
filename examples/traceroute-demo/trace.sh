#!/usr/bin/env bash
set -euo pipefail

TARGET=${1:-google.com}

echo "Running traceroute to: $TARGET"

if command -v mtr >/dev/null 2>&1; then
  echo "mtr found — running a short report (press q to quit)"
  mtr --report --report-cycles 5 "$TARGET"
  exit 0
fi

if command -v traceroute >/dev/null 2>&1; then
  echo "Using traceroute (UDP probes by default)"
  traceroute "$TARGET"
  exit 0
fi

if command -v tracepath >/dev/null 2>&1; then
  echo "Using tracepath (Linux)"
  tracepath "$TARGET"
  exit 0
fi

echo "No traceroute/mtr/tracepath command found on this system. On macOS install 'mtr' via brew; on Debian/Ubuntu install 'traceroute' or 'mtr'."
