<script lang="ts">
  export let currentGuess: string;

  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
  const clickKey = (key: string) => {
    if (key == "<") {
      currentGuess = currentGuess.slice(0, currentGuess.length - 1);
    } else if (key == ">" && currentGuess.length === 5) {
      currentGuess = "";
    } else {
      currentGuess = currentGuess + key.toUpperCase();
    }
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
</style>
