// src/utils/shuffle-effect.js
export function startShuffle(setter) {
  setter(true);
}

export function stopShuffle(setter) {
  setter(false);
}
