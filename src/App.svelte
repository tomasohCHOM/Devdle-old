<script lang="ts">
  import { onMount } from "svelte";
  import words from "./constants/words.json";
  import { WIN_MESSAGES } from "./constants/strings";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";

  let secretWord: string = "";
  let guesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts: number = 0;
  let isGameOver: boolean = false;

  const handleSubmit = (): void => {
    guesses = [...guesses, currentGuess];
    if (currentGuess === secretWord || guesses.length === 6) {
      isGameOver = true;
    } else {
      currentGuess = "";
      numAttempts++;
    }
  };

  const handleKeyType = (event: KeyboardEvent) => {
    if (isGameOver) return;

    if (event.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
    if (event.key === "Enter" && currentGuess.length === 5) handleSubmit();
    if (currentGuess.length === 5) return;
    if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
  };

  window.addEventListener("keydown", handleKeyType);

  onMount(async () => {
    secretWord = words[Math.floor(Math.random() * words.length)];
  });
</script>

<main>
  <header>
    <h1 class="lg-header">DEVDLE</h1>
  </header>

  <!-- {isGameOver && currentGuess === secretWord
    ? WIN_MESSAGES[guesses.length - 1]
    : ""} -->
  <Board bind:guesses bind:currentGuess bind:numAttempts />
  <div>{secretWord}</div>
  <div>
    {isGameOver
      ? currentGuess === secretWord
        ? "Noice"
        : "YAHH LAWWST"
      : "Game in progress"}
  </div>
  <KeyBoard bind:currentGuess />
</main>

<style>
  .lg-header {
    font-family: var(--ff-custom);
  }
</style>
