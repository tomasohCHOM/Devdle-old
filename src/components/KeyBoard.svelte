<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let currentGuess: string;
  // export let numAttempts: number;
  // export let isGameOver: boolean;
  // export let handleSubmit: () => void;

  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
  const clickKey = (key: string) => {
    if (key == "<") {
      currentGuess = currentGuess.slice(0, -1);
      return;
    } else if (key == ">" && currentGuess.length === 5) {
      console.log(key);
    }
    if (currentGuess.length === 5) return;
    currentGuess = currentGuess + key.toUpperCase();
  };
</script>

<main>
  <br />
  {#each keys as key}
    <div class="row">
      {#each key as letter}
        <button
          class="keyboard-key"
          on:click={() => {
            clickKey(letter);
          }}
          >{#if letter === "<"}
            DEL
          {:else if letter === ">"}
            ENTER
          {:else}
            {letter.toUpperCase()}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</main>

<style>
  .keyboard-key {
    background-color: #e9e9e9;
    margin: 0.125rem;
  }
  @media screen and (max-width: 36em) {
    .keyboard-key {
      padding: 0.3em 0.6em;
      font-size: 1rem;
    }
  }
</style>
