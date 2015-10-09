var Game = (function() {
	var x = 'X', o = 'O', board;
	// Cell constructor
	function Cell(domElem) {
		this.value = '';
		this.domElem = domElem;
	}
	// Cell instance methods
	Cell.prototype.setState = function(val) {
		if (this.playable()) {
			this.value = val;
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
			return this.cells[pos].setState(this.currentPlayer);
		}
	};
	Board.prototype.checkWin = function() {
		// figure this out
	};

	return {
		makeBoard: function(container) {
			board = new Board(container);
		},
		
	}

})();