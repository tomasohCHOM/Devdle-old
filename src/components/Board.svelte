<script lang="ts">
  export let currentGuess: string;
  const rows = { length: 6 };
  const cells = { length: 5 };
</script>

<main>
  <section class="board">
    {#each rows as _, i}
      <div class="board-row">
        {#each cells as _, j}
          <div class="board-cell">
            {#if i === 0 && currentGuess.length - 1 >= j}
              {currentGuess[j].toUpperCase()}
            {/if}
          </div>
        {/each}
      </div>
    {/each}
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
</style>
