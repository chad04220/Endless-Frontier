# Endless Frontier — Local Edition

The complete current game, including Update 8's Mach 5 balance, four voxel
aircraft, selectable upgrades, guided missiles, persistent destruction,
procedural terrain and smooth rotor animation. All game code and Babylon.js
are included. No npm install, build step, account or internet connection is
needed after you have a browser and Python installed.

## Start on Windows

1. Extract the entire ZIP into a normal folder. Do not run from inside the ZIP.
2. Have Python 3.7 or newer installed (the current Python 3 release is fine).
3. Double-click START_GAME.bat. Your browser opens the game automatically.

Keep the server window open while playing. Close it or press Ctrl+C to stop.
Use Chrome, Edge or Firefox with hardware acceleration enabled.

## macOS / Linux, or manual Windows start

Open a terminal in this folder and run:

    python3 serve.py

On Windows, use `py -3 serve.py` or `python serve.py` instead.
macOS also includes START_GAME.command; Linux includes start_game.sh.
If a shell launcher is not executable, use the Python command above.

The game opens at http://127.0.0.1:8080/ . If it does not open automatically,
enter that address in your browser. The server binds only to your computer.
Do not double-click dist/index.html: JavaScript modules and the terrain worker
need HTTP and cannot reliably run from a file:// address.

If port 8080 is occupied, close its other server or run:

    python3 serve.py --port 8081

Use `--no-browser` to start without automatically opening a browser.

## Saves

Progress saves in your browser on this computer. Always use the same browser
profile and the same address/port to keep the same save. The hosted game's
save does not automatically transfer to localhost. Reset progress in the
hangar starts a new game; Repair environment clears world damage only.

## Controls

- W / S: nose down / up; A / D: roll left / right.
- Q / E: rudder; Shift / Left Alt: raise / lower throttle, including reverse.
- Space: boost or wheel brakes; G: gear; F: cycle flaps.
- T: select/cycle missile target; X: fire missile.
- C: camera; P or Escape: pause. Drag the scene to look around.
- Controller: left stick flies, right stick looks, triggers change throttle,
  shoulders steer the rudder, A boosts, B brakes, X fires, Y selects a target.
  Left stick click toggles gear; right stick click cycles flaps.
- Cyan airborne rings refill missile ammunition when collected.
- Open the in-game ? panel for the full briefing and speed progression table.

## Project layout

- dist/index.html, style.css: game UI.
- dist/*.js: all editable game source, models, physics and procedural systems.
- dist/babylon.js: bundled Babylon.js engine.
- serve.py: small local HTTP server using only Python's standard library.
- PROJECT_NOTES.md: development notes and the feature history.
- LICENSES/ and THIRD_PARTY_NOTICES.txt: third-party license information.

Edit the files in dist/ and refresh the browser. The local server sends
no-cache headers. This portable edition uses system fonts so startup works
without the hosted version's optional Google Fonts request. Game logic and
models match the current published version.
