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
				if(player==="O"){
					computerMove();
				}
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

	function computerMove(){
        let bestScore = -Infinity;
        let move: number | null = null;

        for (let i = 0; i< board.length; i++){
            if (board[i] === null) {
				board[i] = "O";
				let score = minimax(board, 0, false, -Infinity, Infinity);
				board[i] = null;
				if (score > bestScore) {
					bestScore = score;
					move = i;
				}
			}
        }
        
		if (move !== null) {
			board[move] = "O";
			turns++;
			if (checkWinner()) {
				winner = "O";
			} else {
				player = "X";
			}
		}
	}

    //wykorzystując algorytm minmax
    function minimax(newBoard: Array<Player | null>, depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
		let scores = {
			"X": -10,
			"O": 10,
			"draw": 0
		};
	    //ocena stanu gry
		let result = evaluateBoard(newBoard);
		if (result !== null) {
			return scores[result];
		}

        //maxymalizacja dla ruchów komputera
		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < newBoard.length; i++) {
				if (newBoard[i] === null) {
					newBoard[i] = "O";
					let score = minimax(newBoard, depth + 1, false, alpha, beta);
					newBoard[i] = null;
					bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);
                    //odcięcie dalszego sprawdzania
					if (beta <= alpha) {
						break;
					}
				}
			}
			return bestScore;
        // minimalizacja dla ruchów człowieka
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < newBoard.length; i++) {
				if (newBoard[i] === null) {
					newBoard[i] = "X";
					let score = minimax(newBoard, depth + 1, true, alpha, beta);
					newBoard[i] = null;
					bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);
					if (beta <= alpha) {
						break;
					}
				}
			}
			return bestScore;
		}
	}
    function evaluateBoard(board: Array<Player | null>): Player | "draw" | null {
		for (let combination of winCombination) {
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}

		if (board.every(player => player !== null)) {
			return "draw";
		}

		return null;
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