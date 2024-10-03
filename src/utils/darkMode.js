import { Dark } from "quasar";

export function getDarkModeStatus() {
  return Dark.isActive;
}

// // get configured status
// console.log(Dark.mode); // "auto", true, false

export function setDarkStatus(status) {
  Dark.set(status);
}

export function toggleDarkStatus() {
  Dark.toggle();
}
