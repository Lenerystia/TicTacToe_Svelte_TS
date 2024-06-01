<script lang="ts">
    import '../app.css'
    import { toTwoPlay, toVsComp } from "$lib/navigate";
</script>

<div class="game-root">
<h1>Menu</h1>
<button class="nav-btn" on:click={toTwoPlay}>Tryb dwóch graczy</button>
<button class="nav-btn" on:click={toVsComp}>Tryb przeciwko komputerowi</button>
</div>
