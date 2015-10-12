var Game = (function() {
	var x = 'X', o = 'O', board;
	// Cell constructor
	function Cell(domElem) {
		this.value = '';
		this.domElem = domElem;
	}
	// Cell instance methods
	Cell.prototype.setState = function(plyr) {
		if (this.playable()) {
			this.value = plyr;
			this.domElem.textContent = plyr;
			return true;
		} else {
			return false;
		}
	};
	Cell.prototype.playable = function() {
		return this.value === '';
	};

	// Board Constructor
	function Board(container) {
		this.container = container;
		this.cells = [];
		this.currentPlayer = '';
	}
	// Board instance methods
	Board.prototype.startGame = function() {
		this.container.innerHTML = '';
		// create each cell div and append to the board container
		for(var i = 0; i < 9; i++) {
			var cellElem = document.createElement("div");
			cellElem.id = i;
			cellElem.classList.add("cell");
			this.container.appendChild(cellElem);
			this.cells.push(new Cell(cellElem));
		}
		this.currentPlayer = x;
		return this;
	};
	Board.prototype.makePlay = function(pos) {
		if (!this.cells[pos]) {
			return false;
		} else {
			if (this.cells[pos].setState(this.currentPlayer)) {
				// change the current player after making a move
				if (this.currentPlayer === x) {
					this.currentPlayer = o;
				} else {
					this.currentPlayer = x;
				}
				return this.checkWin();
			}

		}
	};
	Board.prototype.checkWin = function() {
		// figure this out
		// return status of game if won, current player if not yet over?
	};

	return {
		start: function(container) {
			board = new Board(container);
			board.container.addEventListener('click', function(e) {
				if(e.target.tagName === 'DIV' && e.target.className === 'cell') {
					this.play(parseInt(e.target.id));
					console.log(e);
				}
			}.bind(this));
			board.startGame();
		},
		play: function(pos) {
			board.makePlay(pos);
			return board.currentPlayer; // this should actually return from board.checkwin()??
		}
	}

})();

Game.start(document.querySelector('div.board'));