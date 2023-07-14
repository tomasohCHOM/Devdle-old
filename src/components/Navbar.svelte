<script lang="ts">
  import githubLogo from "../assets/images/github-logo.png";
  import leaderboard from "../assets/images/leaderboard.png";
  import darkTheme from "../assets/images/dark-theme.png";
  import help from "../assets/images/help.png";

  const toggleTheme = (e): void => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //add this
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); //add this
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
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="checkbox">
        <input on:click={toggleTheme} type="checkbox" id="checkbox" />
        <div class="slider round" />
      </label>
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
    </div>
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
        flex: 2;
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
      justify-content: flex-start;
    }
    & :last-child {
      display: flex;
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
  .theme-switch-wrapper {
    display: flex;
    align-items: center;
  }
  .theme-switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
    &:input {
      display: none;
    }
  }
  .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }
  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }
  input:checked + .slider {
    background-color: #66bb6a;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
  .slider.round {
    border-radius: 34px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
  @media screen and (max-width: 45em) {
    .title-section {
      display: flex;
      justify-content: flex-start;
    }
    .lg-header {
      font-size: 2.2em;
    }
  }
</style>
