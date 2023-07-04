<script lang="ts">
  import { onMount } from "svelte";
  import words from "./data/words.json";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";

  let secretWord: string = "";
  let guesses: string[] = Array(6).fill(null);
  let currentGuess: string = "";

  onMount(async () => {
    secretWord = words[Math.floor(Math.random() * words.length)];
    const handleKeyType = (event: KeyboardEvent) => {
      if (event.key === "Backspace")
        currentGuess = currentGuess.slice(0, currentGuess.length - 1);
      if (event.key === "Enter" && currentGuess.length === 5) currentGuess = "";
      if (currentGuess.length === 5) return;
      if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
    };
    window.addEventListener("keydown", handleKeyType);
  });
</script>

<main>
  <h1>Devdle</h1>
  <Board {currentGuess} />
  <div>{secretWord}</div>
  <div>{currentGuess}</div>
  <KeyBoard />
</main>
