<script lang="ts">
  export let guesses: string[];
  export let colorsFromGuesses: string[];
  export let currentGuess: string;
  export let numAttempts: number;

  const NUM_ROWS = { length: 6 };
  const cells = { length: 5 };
</script>

<main>
  <section class="board">
    {#key guesses}
      {#each NUM_ROWS as _, i}
        <div class="board-row">
          {#each cells as _, j}
            <div
              class="board-cell {guesses[i] !== undefined
                ? colorsFromGuesses[i][j]
                : ''}"
            >
              {#if i === numAttempts && currentGuess.length - 1 >= j}
                {currentGuess[j].toUpperCase()}
              {:else}
                {guesses[i]?.[j].toUpperCase() ?? ""}
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    {/key}
  </section>
</main>

<style>
  .board-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-block-end: 0.25rem;
  }
  .board-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    aspect-ratio: 1;
    border: 2px solid gray;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .correct {
    background-color: var(--color-correct);
    color: white;
  }
  .present {
    background-color: var(--color-present);
    color: white;
  }
  .absent {
    background-color: var(--color-absent);
    color: white;
  }
  .G {
    background-color: var(--color-correct);
    color: white;
    border: none;
  }
  .Y {
    background-color: var(--color-present);
    color: white;
    border: none;
  }
  .B {
    background-color: var(--color-absent);
    color: white;
    border: none;
  }
</style>
