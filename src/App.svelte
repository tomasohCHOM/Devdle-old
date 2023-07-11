<script lang="ts">
  import { onMount } from "svelte";
  import { ANSWER_LIST } from "./constants/answersList";
  import { VALID_GUESSES } from "./constants/validGuesses";
  import setCharAt from "./constants/utils";
  import { WIN_MESSAGES } from "./constants/strings";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";
  import Navbar from "./components/Navbar.svelte";

  interface SecretWord {
    word: string;
    description: string;
    descriptiveImage: string;
    supplementalImage: string;
  }

  let secretWord: string = "";
  let guesses: string[] = [];
  let colorsFromGuesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts: number = 0;
  let isGameOver: boolean = false;
  let gameOverMessage: string = "";

  let popOver: HTMLDivElement;

  const getColorsFromGuess = (
    guessedWords: string[],
    attempts: number
  ): void => {
    // Represented by letters (G, Y, B) - G = Correct, Y = Present, B = Absent.
    let result = "BBBBB";
    let answer = secretWord;
    let guess = guessedWords[attempts];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        // Calling our utility function to replace characters at specified indices.
        result = setCharAt(result, i, "G");
        answer = setCharAt(answer, i, "$");
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (answer.includes(guess[i])) {
        let correctIndex: number = answer.indexOf(guess[i]);
        if (result[i] != "G") {
          result = setCharAt(result, i, "Y");
          answer = setCharAt(answer, correctIndex, "$");
        }
      }
    }
    colorsFromGuesses = [...colorsFromGuesses, result];
  };

  const triggerPopOver = (): void => {
    popOver.style.visibility = "visible";
    popOver.style.opacity = "1";

    setTimeout(() => {
      popOver.style.opacity = "0";
      setTimeout(() => {
        popOver.style.visibility = "hidden";
      }, 250);
    }, 2000);
  };

  const handleSubmit = (): void => {
    if (
      !(VALID_GUESSES.has(currentGuess) || ANSWER_LIST.includes(currentGuess))
    ) {
      console.error("Invalid guess");
      return;
    }
    guesses = [...guesses, currentGuess];
    getColorsFromGuess(guesses, numAttempts);

    if (currentGuess === secretWord || guesses.length === 6) {
      isGameOver = true;
      if (currentGuess === secretWord) {
        gameOverMessage = WIN_MESSAGES[numAttempts];
      }
      currentGuess = "";
      triggerPopOver();
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
    secretWord = ANSWER_LIST[Math.floor(Math.random() * ANSWER_LIST.length)];
    console.log(secretWord);
  });
</script>

<main>
  <Navbar />

  <div bind:this={popOver} class="pop-over">
    {#if gameOverMessage !== ""}
      {gameOverMessage}
    {:else}
      {secretWord}
    {/if}
  </div>

  <Board
    bind:guesses
    bind:colorsFromGuesses
    bind:currentGuess
    bind:numAttempts
  />

  <KeyBoard bind:currentGuess />
</main>

<style>
  main {
    position: relative;
  }
  .pop-over {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 15%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    transition: opacity 0.125s ease-in-out;
    background-color: var(--color-contrast);
    color: var(--color-primary);
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
  }
</style>
