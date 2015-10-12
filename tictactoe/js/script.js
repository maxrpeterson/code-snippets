var Game = (function() {
	var x = 'X', o = 'O', board;
	// Cell constructor
	function Cell(domElem) {
		this.value = null;
		this.domElem = domElem;
	}
	// Cell instance methods
	Cell.prototype.setState = function(plyr) {
		if (this.playable()) {
			this.value = plyr;
			// set its own DOM node text content
			this.domElem.textContent = plyr;
			return true;
		} else {
			return false;
		}
	};
	Cell.prototype.playable = function() {
		return !this.value;
	};

	// Board Constructor
	function Board(container) {
		this.container = container;
		this.cells = [];
		this.currentPlayer = null;
		this.isOver = false;
		this.winner = null;
	}
	// Board instance methods
	Board.prototype.startGame = function() {
		this.container.innerHTML = '';
		// create each cell div and append to the board container
		for(var i = 0; i < 9; i++) {
			var cellElem = document.createElement('div');
			cellElem.id = i;
			cellElem.classList.add('cell');
			// passing the element to the cell allows it to update its own dom node
			this.container.appendChild(cellElem);
			this.cells.push(new Cell(cellElem));
		}
		this.currentPlayer = x;
		return this;
	};
	Board.prototype.makePlay = function(pos) {
		// error handling in case pos is outside the cells array
		if (!this.cells[pos]) {
			return false;
		} else {
			if (this.cells[pos].setState(this.currentPlayer)) {
				if (this.checkWin()) {
					return this.isOver;
				} else {
					// change the current player after making a move
					if (this.currentPlayer === x) {
						this.currentPlayer = o;
					} else {
						this.currentPlayer = x;
					}
					return this.currentPlayer;
				}
			} else {
				return false;
			}
		}
	};
	// this can be called a bunch of times for any win case
	Board.prototype.winStatus = function() {
		this.isOver	= true;
		this.winner = this.currentPlayer;
		return true;
	};
	// check the across & down values since they're always gonna be the same '+' pattern
	Board.prototype.checkAcross = function(start) {
		return this.cells[start].value && this.cells[start].value === this.cells[start + 1].value && this.cells[start + 1].value === this.cells[start + 2].value;
	};
	Board.prototype.checkDown = function(start) {
		return this.cells[start].value && this.cells[start].value === this.cells[start + 3].value && this.cells[start + 3].value === this.cells[start + 6].value;
	};
	Board.prototype.checkWin = function() {
		// anyPlayable will be changed to true if any still have null value
		var anyPlayable = false;
		for (var i = 0; i < this.cells.length; i++) {
			if (this.cells[i].playable()) {anyPlayable = true;}
			if (i === 0) {
				var across = this.checkAcross(i);
				var down = this.checkDown(i);
				var diag = this.cells[i].value && this.cells[i].value === this.cells[i + 4].value && this.cells[i + 4].value === this.cells[i + 8].value;
				if (across || down || diag) {
					return this.winStatus();
				}
			} else if (i === 1) {
				if (this.checkDown(i)) {
					return this.winStatus();
				}
			} else if (i === 2) {
				var down = this.checkDown(i);
				var diag = this.cells[i].value && this.cells[i].value === this.cells[i + 2].value && this.cells[i + 2].value === this.cells[i + 4].value;
				if (down || diag) {
					return this.winStatus();
				}
			} else if (i === 3 || i === 6) {
				if (this.checkAcross(i)) {
					return this.winStatus();
				}
			}
		}
		if (anyPlayable) {
			// game is not yet over
			return false;
		} else {
			// tie game, none left to play
			this.isOver = true;
			return true;
		}
	};

	return {
		start: function(container) {
			board = new Board(container);
			board.container.onclick = null;
			board.container.addEventListener('click', function(e) {
				if(e.target.tagName === 'DIV' && e.target.className === 'cell') {
					this.play(parseInt(e.target.id));
				}
			}.bind(this));
			board.startGame();
		},
		play: function(pos) {
			board.makePlay(pos);
			if (board.isOver) {
				console.log(board.isOver, board.winner);
				var winner = board.winner || 'Nobody';
				board.container.innerHTML = (
				'<div class="gameover-message">' +
					'<div>Game Over!</div>' + 
					'<div class="player">' + winner + '</div>' +
					'<div>won!</div>' +
				'</div>'
				);
				var self = this;
				board.container.onclick = function(e) {
					self.start(e.currentTarget);
				};
				return board.winner;
			}
		},
		status: function() {
			return board;
		}
	}

})();

Game.start(document.querySelector('div.board'));
