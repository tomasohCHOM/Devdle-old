<script lang="ts">
  import { writable } from "svelte/store";
  import githubLogo from "../assets/images/github-logo.png";
  import leaderboard from "../assets/images/leaderboard.png";
  import darkTheme from "../assets/images/dark-theme.png";
  import help from "../assets/images/help.png";

  const toggleTheme = (): void => {
    const element: HTMLElement = document.documentElement;
    if (element.getAttribute("data-theme") === "dark") {
      element.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      element.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };
</script>

<header class="navbar">
  <section class="navbar-section">
    <a href="https://github.com/tomasohCHOM/Devdle">
      <img src={githubLogo} alt="Githbub Repo Link" class="icon-images" />
    </a>
  </section>
  <section class="navbar-section title-section">
    <h1 class="lg-header">DEVDLE</h1>
  </section>
  <section class="navbar-section">
    <div>
      <img src={help} alt="Help" class="icon-images" />
    </div>
    <div>
      <img src={leaderboard} alt="Leaderboard" class="icon-images" />
    </div>
    <div on:click={toggleTheme} on:keydown={toggleTheme}>
      <img src={darkTheme} alt="Dark Theme Toggle" class="icon-images" />
    </div>
    <button class="sign-in">Sign In</button>
  </section>
</header>

<style lang="scss">
  .navbar {
    display: flex;
    max-height: 4rem;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 2px solid var(--border-active);
    padding: 0rem 1.25rem;
    margin-block-end: 2rem;
    .navbar-section {
      flex: 1;
      &.title-section {
        justify-content: center;

        & h1 {
          display: inline-block;
        }
      }

      & button {
        background-color: var(--color-primary);
        color: var(--color-contrast);
        border: 2px solid var(--border-active);
        border-radius: 2rem;
        transition: all 0.125s ease-in;

        &:hover {
          background-color: var(--color-contrast);
          color: var(--color-primary);
        }
      }
    }
    & :first-child {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    & :last-child {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
  .lg-header {
    font-size: 3.2em;
    line-height: 1.1;
    font-family: var(--ff-custom);
    letter-spacing: -0.125rem;
  }

  @media screen and (max-width: 48em) {
    .navbar {
      padding: 0 0.5rem;

      & :first-child {
        flex: 0.5;
        flex-grow: 0;
      }
    }

    .navbar-section {
      &.title-section {
        flex: 2;
        justify-content: flex-start;
      }
    }

    .lg-header {
      font-size: 2.2em;
    }

    .navbar {
      & :last-child {
        gap: 0.5rem;

        & button {
          font-size: 0.75rem;
          border-radius: 0.75rem;
        }
      }
    }
  }
</style>
