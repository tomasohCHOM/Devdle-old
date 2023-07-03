<script lang="ts">
  const rows = { length: 6 };
  const cells = { length: 5 };
</script>

<main>
  <section class="board">
    {#each rows as _}
      <div class="board-row">
        {#each cells as _}
          <div class="board-cell" />
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
    width: 3.5rem;
    aspect-ratio: 1;
    border: 2px solid gray;
  }
</style>
