<script lang="ts">
  import { onMount } from "svelte";
  import words from "./data/words.json";
  import Board from "./components/Board.svelte";

  const WORDS_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
  let secretWord: string;
  let guesses: string[] = Array(6).fill(null);

  onMount(async () => {
    secretWord = words[Math.floor(Math.random() * words.length)];
  });
</script>

<main>
  <h1>WordleSvelte Clone</h1>
  <Board />
  <div>{secretWord}</div>
</main>
