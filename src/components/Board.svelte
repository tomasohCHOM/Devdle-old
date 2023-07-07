<script lang="ts">
  export let guesses: string[];
  export let colorsFromGuesses: string[];
  export let currentGuess: string;
  export let numAttempts: number;

  const NUM_ROWS = { length: 6 };
  const cells = { length: 5 };

  const convertColorsToCSSColorClasses = (i: number, j: number): string => {
    switch (colorsFromGuesses[i][j]) {
      case "G":
        return "correct";
      case "Y":
        return "present";
      case "B":
        return "absent";
      default:
        break;
    }
    return;
  };
</script>

<main>
  <section class="board">
    {#key guesses}
      {#each NUM_ROWS as _, i}
        <div class="board-row">
          {#each cells as _, j}
            <div
              class="board-cell {guesses[i] !== undefined
                ? convertColorsToCSSColorClasses(i, j)
                : ''} {i === guesses.length &&
                currentGuess[j] !== undefined &&
                'border-active'}"
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
    border: 2px solid var(--border-empty);
    font-size: 1.5rem;
    font-weight: bold;
  }
  .border-active {
    border: 2px solid var(--border-active);
  }
  .correct {
    background-color: var(--color-correct);
    color: white;
    border: none;
  }
  .present {
    background-color: var(--color-present);
    color: white;
    border: none;
  }
  .absent {
    background-color: var(--color-absent);
    color: white;
    border: none;
  }
</style>
