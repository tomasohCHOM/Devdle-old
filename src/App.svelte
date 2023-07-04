<script lang="ts">
  import { onMount } from "svelte";
  import words from "./constants/words.json";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";

  let secretWord: string = "";
  let guesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts = 0;

  const handleSubmit = (): void => {
    console.log("Submitted word successfully!");
    if (currentGuess === secretWord) {
    } else {
      guesses.push(currentGuess);
      console.log(guesses);
      currentGuess = "";
      numAttempts++;
    }
  };

  onMount(async () => {
    secretWord = words[Math.floor(Math.random() * words.length)];
    const handleKeyType = (event: KeyboardEvent) => {
      if (event.key === "Backspace")
        currentGuess = currentGuess.slice(0, currentGuess.length - 1);
      if (event.key === "Enter" && currentGuess.length === 5) handleSubmit();
      if (currentGuess.length === 5) return;
      if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
    };
    window.addEventListener("keydown", handleKeyType);
  });
</script>

<main>
  <header>
    <h1>DEVDLE</h1>
  </header>

  <Board bind:guesses bind:currentGuess bind:numAttempts />
  <div>{secretWord}</div>
  <KeyBoard bind:currentGuess />
</main>
