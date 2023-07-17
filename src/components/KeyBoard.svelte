<script lang="ts">
  export let currentGuess: string;
  export let triggerPopOver: (
    message: string,
    popOverDelay: number | undefined
  ) => void;
  export let handleSubmit: () => void;

  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
  const clickKey = (key: string) => {
    if (key == "<") {
      currentGuess = currentGuess.slice(0, -1);
      return;
    } else if (key == ">") {
      currentGuess.length === 5
        ? handleSubmit()
        : triggerPopOver("Not enough letters", undefined);
      return;
    }
    if (currentGuess.length === 5) return;
    currentGuess = currentGuess + key.toLowerCase();
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
    background-color: var(--color-secondary);
    color: var(--color-contrast);
    margin: 0.125rem;
  }
  @media screen and (max-width: 36em) {
    .keyboard-key {
      padding: 0.3em 0.6em;
      font-size: 1rem;
    }
  }
</style>
