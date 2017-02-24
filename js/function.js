$(function() {

	function randomString() {
		let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		let str = '';
		let i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		const self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			const $column = $('<div>').addClass('column');
			const $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			const $columnCardList = $('<ul>').addClass('column-card-list');
			const $columnDelete = $('<button>').addClass('btn-delete').text('x');
			const $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function(event) {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});

			$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);

			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}

	function Card(description) {
		const self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			const $card = $('<li>').addClass('card');
			const $cardDescription = $('<p>').addClass('card-description').text(self.description);
			const $cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function() {
        		self.removeCard();
			});

			$card.append($cardDelete).append($cardDescription);

			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	const board = {
		name: 'Tablica kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}
 	
 	function initSortable() {
    	$('.column-card-list').sortable({
    	  	connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'
    	}).disableSelection();
	}

	$('.create-column').click(function() {
		const name = prompt('Wpisz nazwę kolumny');
		const column = new Column(name);
		board.addColumn(column);
	})

	// TWORZENIE KOLUMN
	const todoColumn = new Column('Do zrobienia');
	const doingColumn = new Column('W trakcie');
	const doneColumn = new Column('Skończone');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	const card1 = new Card('Nowe zadanie');
	const card2 = new Card('Stworzyc tablice kanban');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
})