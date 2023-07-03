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
      if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
      if (event.key === "Backspace")
        currentGuess = currentGuess.slice(0, currentGuess.length - 1);
    };
    window.addEventListener("keydown", handleKeyType);
  });
</script>

<main>
  <h1>WordleSvelte Clone</h1>
  <Board />
  <div>{secretWord}</div>
  <div>{currentGuess}</div>
  <KeyBoard />
</main>
