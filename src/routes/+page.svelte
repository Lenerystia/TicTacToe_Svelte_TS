<script lang="ts">
    import '../app.css'
    import { toTwoPlay, toVsCompE, toVsCompH } from "$lib/navigate";
</script>

<div class="game-root">
<h1>Menu</h1>
<button class="nav-btn" on:click={toTwoPlay}>Tryb dwóch graczy</button>
<button class="nav-btn" on:click={toVsCompE}>Tryb przeciwko komputerowi - łatwy</button>
<button class="nav-btn" on:click={toVsCompH}>Tryb przeciwko komputerowi - trudny</button>
</div>
