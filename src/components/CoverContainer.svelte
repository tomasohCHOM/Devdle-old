<script lang="ts">
  import closeWindow from "../assets/images/close-window.png";

  export let title: string = "Error: Failed to load secret word.";
  export let description: string = "Error: Failed to load description.";

  export let isOpen: boolean;

  const toggleContainer = () => {
    isOpen = !isOpen;
  };
</script>

<section class="cover-container {isOpen === true ? 'active' : ''}">
  <div class="top-section">
    <button class="placeholder"
      ><img class="icon-images" src={closeWindow} alt="Placeholder" /></button
    >
    <h2>{title}</h2>
    <button class="close-window-btn" on:click={toggleContainer}
      ><img class="icon-images" src={closeWindow} alt="Close Window" /></button
    >
  </div>
  <p>{description}</p>
</section>

<div
  class="full-window-overlay {isOpen === true ? 'active' : ''}"
  on:click={toggleContainer}
  on:keydown={toggleContainer}
/>

<style lang="scss">
  .cover-container {
    position: fixed;
    left: 50%;
    top: 55%;
    width: 30em;
    z-index: 4;
    padding: 1.25rem;
    background-color: var(--cover-container-color);
    box-shadow: 0 3px 1rem rgba(16, 19, 21, 0.1);
    border-radius: 1rem;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    transition: all 0.125s ease-in;

    & h2 {
      margin: 0;
      font-family: var(--ff-custom);
      font-size: 2rem;
      text-transform: uppercase;
      letter-spacing: -0.1rem;
    }

    &.active {
      top: 50%;
      opacity: 1;
      visibility: visible;
    }
  }

  .top-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .placeholder {
    visibility: hidden;

    &:hover {
      border: none;
      outline: none;
    }
  }

  .close-window-btn {
    padding: 0.6em 0.6em;
    background-color: var(--cover-container-color);

    &:hover {
      border: none;
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
