<script lang="ts">
  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
  const clickKey = (key: string) => {
    if (key == "<") key = "Backspace";
    if (key == ">") key = "Enter";
  };

  let keycolors = {};
  function updateKeyboard(colors) {
    for (let i of Object.keys(colors)) {
      for (let j of colors[i]) {
        keycolors[j] = i;
      }
    }
    keycolors = keycolors;
  }
</script>

<main>
  <br />
  {#each keys as key}
    <div class="row">
      {#each key as letter}
        <button
          class="keyboard-key ${keycolors[letter]}"
          on:click={() => {
            clickKey(letter);
          }}
          >{#if letter === "<"}
            DEL
          {:else if letter === ">"}
            ENTER
          {:else}
            {letter.toUpperCase()}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</main>

<style>
  .keyboard-key {
    background-color: #e9e9e9;
    margin: 0.125rem;
  }
</style>
