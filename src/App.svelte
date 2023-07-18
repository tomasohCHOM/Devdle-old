<script lang="ts">
  import { onMount } from "svelte";
  import { ANSWER_LIST, ANSWERS } from "./constants/answersList";
  import { WIN_MESSAGES } from "./constants/strings";
  import {
    WORD_REVEAL_ANIMATION_DELAY,
    MESSAGE_DURATION,
    MESSAGE_FADING_TRANSITION,
  } from "./constants/values";
  import VALID_GUESSES from "./constants/validGuesses.json";
  import setCharAt from "./constants/utils";
  import Board from "./components/Board.svelte";
  import KeyBoard from "./components/KeyBoard.svelte";
  import Navbar from "./components/Navbar.svelte";
  import CoverContainer from "./components/CoverContainer.svelte";
  import WordCard from "./components/WordCard.svelte";

  const validGuesses = new Set<string>(VALID_GUESSES);

  interface Secret {
    word: string;
    description: string;
    supplementalImageLink: string;
  }

  let secret: Secret;
  let guesses: string[] = [];
  let colorsFromGuesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts: number = 0;
  let isGameOver: boolean = false;
  let gameOverMessage: string = "";

  $: isContainerOpen = false;
  let popOver: HTMLDivElement;

  const getColorsFromGuess = (
    guessedWords: string[],
    attempts: number
  ): void => {
    // Represented by letters (G, Y, B) - G = Correct, Y = Present, B = Absent.
    let result = "BBBBB";
    let answer = secret.word;
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

  const triggerPopOver = (
    message: string,
    popOverDelay: number | undefined = undefined
  ): void => {
    setTimeout(() => {
      popOver.textContent = message;
      popOver.style.visibility = "visible";
      popOver.style.opacity = "1";

      setTimeout(() => {
        popOver.style.opacity = "0";
        setTimeout(() => {
          popOver.style.visibility = "hidden";
        }, MESSAGE_FADING_TRANSITION);
      }, MESSAGE_DURATION);
    }, popOverDelay);
  };

  const setContainerOpen = (delay: number | undefined = undefined) => {
    setTimeout(() => {
      isContainerOpen = true;
    }, delay);
  };

  const handleSubmit = (): void => {
    if (
      !(validGuesses.has(currentGuess) || ANSWER_LIST.includes(currentGuess))
    ) {
      triggerPopOver("Not a valid word");
      return;
    }
    guesses = [...guesses, currentGuess];
    getColorsFromGuess(guesses, numAttempts);

    if (currentGuess === secret.word || guesses.length === 6) {
      isGameOver = true;
      if (currentGuess === secret.word) {
        gameOverMessage = WIN_MESSAGES[numAttempts];
      } else {
        gameOverMessage = secret.word;
      }
      triggerPopOver(gameOverMessage, WORD_REVEAL_ANIMATION_DELAY);
      setContainerOpen(WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);
      currentGuess = "";
    } else {
      currentGuess = "";
      window.removeEventListener("keydown", handleKeyType);
      setTimeout(() => {
        window.addEventListener("keydown", handleKeyType);
      }, WORD_REVEAL_ANIMATION_DELAY);
      numAttempts++;
    }
  };

  const handleKeyType = (event: KeyboardEvent) => {
    if (isGameOver) return;

    if (event.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
    else if (event.key === "Enter") {
      currentGuess.length === 5
        ? handleSubmit()
        : triggerPopOver("Not enough letters");
    }
    if (currentGuess.length === 5) return;
    if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
  };

  window.addEventListener("keydown", handleKeyType);

  onMount(async () => {
    secret = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    localStorage.getItem("theme") === "dark" &&
      document.documentElement.setAttribute("data-theme", "dark");
  });
</script>

<main>
  <Navbar />

  <WordCard bind:secret bind:isOpen={isContainerOpen} />

  <div bind:this={popOver} class="pop-over" />

  <Board
    bind:guesses
    bind:colorsFromGuesses
    bind:currentGuess
    bind:numAttempts
  />

  <KeyBoard
    bind:currentGuess
    bind:guesses
    answer={secret?.word}
    {triggerPopOver}
    {handleSubmit}
  />
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
