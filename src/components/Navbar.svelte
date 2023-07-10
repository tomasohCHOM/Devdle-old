<script lang="ts">
  import githubLogo from "../assets/images/github-logo.png";

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
      <img src={githubLogo} alt="hamburger" class="icon-images" />
    </a>
  </section>
  <section class="navbar-section">
    <h1 class="lg-header">DEVDLE</h1>
  </section>
  <section class="navbar-section">
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="checkbox">
        <input on:click={toggleTheme} type="checkbox" id="checkbox" />
        <div class="slider round" />
      </label>
      <em>Dark Mode</em>
      <div>Leaderboard</div>
    </div>
  </section>
</header>

<style lang="scss">
  .navbar {
    display: flex;
    max-height: 4rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--border-active);
    margin-block-end: 2rem;
    .navbar-section {
      flex: 1;
    }
    &:first-child {
      margin-right: auto;
    }
    &:last-child {
      margin-left: auto;
    }
  }
  .lg-header {
    font-family: var(--ff-custom);
    letter-spacing: -0.125rem;
  }
  .theme-switch-wrapper {
    display: flex;
    align-items: center;
    em {
      margin-left: 10px;
      font-size: 1rem;
    }
  }
  .theme-switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }
  .theme-switch input {
    display: none;
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
</style>
