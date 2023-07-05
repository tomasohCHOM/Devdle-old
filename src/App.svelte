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

  let popOver: HTMLDivElement;

  const handleSubmit = (): void => {
    guesses = [...guesses, currentGuess];
    if (currentGuess === secretWord || guesses.length === 6) {
      popOver.style.visibility = "visible";
      popOver.style.opacity = "1";
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

  <div bind:this={popOver} class="pop-over">
    <div class="win-message">
      {isGameOver && currentGuess === secretWord
        ? WIN_MESSAGES[guesses.length - 1]
        : ""}
    </div>
  </div>

  <Board bind:guesses bind:currentGuess bind:numAttempts />
  <div>{secretWord}</div>
  <KeyBoard bind:currentGuess />
</main>

<style>
  .lg-header {
    font-family: var(--ff-custom);
  }
  main {
    position: relative;
  }
  .pop-over {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 13.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.125s ease-in;
  }
  .win-message {
    background-color: var(--color-correct);
    color: #ffffff;
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>
