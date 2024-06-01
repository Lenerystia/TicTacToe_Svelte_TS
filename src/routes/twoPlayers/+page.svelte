<script lang="ts">
	import '../../app.css'
	import { toMenu } from '$lib/navigate';

	type Player = "X"|"O"
    let turns: number = 0;
    let player: Player | null = "X";
	let winner: Player | null = null;
	let board: Array<Player | null> = Array(9).fill(null);
	let done: boolean;

	const winCombination = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]

	$: done = winner !== null || turns === 9;

	// wyświetlenie aktualnego gracza/zwycięzcy
	let title: string;
	$: if (!done) {
		title = `Player ${player}`;
	} else if (winner !== null) {
		title = `Player ${winner} won!`;
	} else {
		title = "Draw!";
	}

	function handleClick(index: number) {
		if (board[index] === null && !done) {
			board[index] = player;
			turns++;
			if (checkWinner()){
				winner = player;
			} else if (turns < 9){
				player = player === "X" ? "O" : "X";
			}
		}
	}

	//funkcja sprawdza wszystkie kombinacje, jeśli któraś zawiera w całości jednego gracza - ten gracz wygrał
	function checkWinner(): boolean{
		for (let combination of winCombination){
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return true;
			}
		}
		return false;
	}

	function handleReset() {
		board = Array(9).fill(null);
		winner = null;
		player = "X";
		turns = 0;
	}
</script>

<div class="game-root">
	<p class="game-title">{title}</p>
        <div class="game-board">
			{#each board as player, index}
			<button
				disabled={done || player !== null}
				data-player={player}
				class="game-cell"
				on:click={() => handleClick(index)}
			>
				{player ?? ""}
			</button>
		{/each}
        </div>
	<button class="game-reset-btn" on:click={handleReset}>Reset</button>
	<button class="nav-btn" on:click={toMenu}>Powrót do Menu</button>
</div>