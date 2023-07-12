<script lang="ts">
  export let title: string = "Error: Failed to load secret word.";
  export let description: string = "Error: Failed to load description.";
</script>

<section class="cover-container">
  <h2>{title}</h2>
  <p>{description}</p>
</section>

<div class="full-window-overlay active" />

<style lang="scss">
  .cover-container {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 500px;
    height: 500px;
    z-index: 4;
    padding: 1.25rem;
    background-color: var(--color-secondary);
    box-shadow: 0 3px 1rem rgba(16, 19, 21, 0.1);
    border-radius: 1rem;
    transform: translate(-50%, -50%);

    & h2 {
      margin: 0;
      font-family: var(--ff-custom);
      font-size: 2rem;
      text-transform: uppercase;
      letter-spacing: -0.1rem;
    }
  }

  .full-window-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(213, 213, 213, 0.25);
    z-index: 3;
    transition: 0.25s;
    opacity: 0;
    visibility: hidden;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
