#!/bin/sh
cd -- "$(dirname -- "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
    exec python3 serve.py
fi
printf '%s\n' 'Python 3.7 or newer is required. See README.md.'
exit 1
