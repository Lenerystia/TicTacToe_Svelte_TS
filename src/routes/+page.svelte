<script lang="ts">
//działa	
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

//działa
	$: done = winner !== null || turns === 9;

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
			} else{
				player = turns % 2 === 0 ? "X" : "O";
			}
		}
	}

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
</div>

<style>
	*{
		background-color: #222;
	}
    .game-board {
		--border-size: 0.25rem;
		--border-color: black;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--border-size);
		background-color: var(--border-color);
		border: var(--border-size) solid var(--border-color);
	}

 	.game-cell {
		appearance: none;
		border: none;
		cursor: pointer;
		width: 4rem;
		height: 4rem;
		font-size: 3rem;
		background-color: white;
		transition: background-color 0.2s ease-out;
	}

	.game-cell[data-player="X"] {
		background-color: #f87171;
	}

	.game-cell[data-player="O"] {
		background-color: #38bdf8;
	}

	.game-cell:disabled {
		color: black;
		cursor: default;
	}
	.game-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.game-title {
		font-size: 1.5rem;
		margin: 0;
		margin-bottom: 1.5rem;
	}

	.game-reset-btn {
		appearance: none;
		border: none;
		margin-top: 2rem;
		height: 2rem;
		padding: 0 1rem;
		border-radius: 0.25rem;
		background-color: #dc2626;
		color: white;
	}

	.game-reset-btn:hover {
		background-color: #b91c1c;
	}

	.game-reset-btn:active {
		background-color: #991b1b;
	}
	/* .game-start-btn{
		appearance: none;
		border: none;
		margin-top: 2rem;
		height: 2rem;
		padding: 0 1rem;
		border-radius: 0.25rem;
		background-color: #00cb00;
		color: white;
	}
	.game-start-btn:hover {
		background-color: #009000;

	}

	.game-start-btn:active {
		background-color: rgb(24, 120, 0);
	} */
</style>