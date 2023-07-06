<script lang="ts">
  import { onMount } from "svelte";
  import words from "./constants/answersList.json";
  import { WIN_MESSAGES } from "./constants/strings";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";

  let secretWord: string = "";
  let guesses: string[] = [];
  let colorsFromGuesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts: number = 0;
  let isGameOver: boolean = false;

  let popOver: HTMLDivElement;

  const getColorsFromGuess = (
    guessedWords: string[],
    attempts: number
  ): void => {
    // Represented by letters (G, Y, B) - G = Correct, Y = Present, B = Absent.
    let colors = "";
    let guess = guessedWords[attempts];
    for (let i = 0; i < guess.length; i++) {
      let char = guess[i];
      if (char === secretWord[i]) {
        colors += "G";
      } else if (secretWord.includes(char)) {
        colors += "Y";
      } else {
        colors += "B";
      }
    }
    colorsFromGuesses = [...colorsFromGuesses, colors];
  };

  const handleSubmit = (): void => {
    guesses = [...guesses, currentGuess];
    getColorsFromGuess(guesses, numAttempts);

    if (currentGuess === secretWord || guesses.length === 6) {
      isGameOver = true;
      popOver.style.visibility = "visible";
      popOver.style.opacity = "1";

      setTimeout(() => {
        popOver.style.opacity = "0";
        setTimeout(() => {
          popOver.style.visibility = "hidden";
        }, 250);
      }, 2000);
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
        : secretWord}
    </div>
  </div>

  <Board
    bind:guesses
    bind:colorsFromGuesses
    bind:currentGuess
    bind:numAttempts
  />
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
    transition: opacity 0.125s ease-in-out;
  }
  .win-message {
    background-color: var(--color-correct);
    color: #ffffff;
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>
