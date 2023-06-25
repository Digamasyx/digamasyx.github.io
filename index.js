import { Rules } from "./rules_class.js";

const rng = Math.random() * (2 - (-1)) + (-1)
const qtd = [250, 250, 250, 250]
const color = ["yellow", "red", "green", "blue"]
const canvas = document.getElementById("canvas")
const test = new Rules(1, canvas, qtd, color)

console.log(test._RULES)
console.log(rng);
