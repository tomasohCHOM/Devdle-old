<script lang="ts">
  import githubLogo from "../assets/images/github-logo.png";

  const toggleTheme = (): void => {
    document.body.classList.toggle("dark-mode");
  };
</script>

<header class="navbar">
  <a href="https://github.com/tomasohCHOM/Devdle">
    <img src={githubLogo} alt="hamburger" class="icon-images" />
  </a>
  <h1 class="lg-header">DEVDLE</h1>
  <button class="theme-toggler" on:click={toggleTheme}>Dark Mode</button>
</header>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--border-active);
    margin-block-end: 1rem;
  }
  .lg-header {
    font-family: var(--ff-custom);
    letter-spacing: -0.125rem;
  }
  .theme-toggler {
    padding: 1em;
  }
</style>
