import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

let hello = {
  hey: "hola",
  soy: "tomas",
  bienvenidos: "a Svelte",
  breakThisLine: "please",
};

export default app;
