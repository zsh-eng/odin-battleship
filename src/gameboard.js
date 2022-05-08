import { Ship } from "./ship.js"

export const Gameboard = () => {
	let rows = 5
	let cols = 5
	// Initialise board as empty 2-D Array
	let board = []
	for (let i = 0; i < rows; i++) {
		let row = Array(cols).fill(false)
		board.push(row)
	}

	// Fills the board at the given coordinate
	const setCellShip = (x, y, ship, index) => {
		board[y][x] = { ship, index }
	}

	const getCell = (x, y) => {
		return board[y][x]
	}
	const isEmpty = (coordinates) => {
		for (const [x, y] of coordinates) {
			if (getCell(x, y)) {
				return false
			}
		}
		return true
	}

	const placeShip = (x, y, length, direction) => {
		let ship = Ship(length)
		// Check if valid direction provided
		if (direction !== "horizontal" && direction !== "vertical") {
			throw "placeShip direction must be 'horizontal' or 'vertical'"
		}
		// Shifts starting coordinates if ship exceeds grid
		if (direction === "horizontal" && x + length > rows) {
			x = rows - length
		}
		if (direction === "vertical" && y + length > cols) {
			y = cols - length
		}

		let coordinates = []
		for (let i = 0; i < length; i++) {
			if (direction === "horizontal") {
				coordinates.push([x + i, y])
			}
			if (direction === "vertical") {
				coordinates.push([x, y + i])
			}
		}
		if (isEmpty(coordinates)) {
			coordinates.forEach(([x, y], index) => {
				setCellShip(x, y, ship, index)
			})

			return true
		}
		return false
	}

	const receiveAttack = (x, y) => {
		const cell = getCell(x, y)
		// Check if cell has been hit before
		if (cell.hasOwnProperty("hit")) {
			return null
		}
		// Check if cell is false
		if (cell) {
            cell.hit = true
            cell.ship.hit(cell.index)
			return "hit"
		} else {
			board[y][x] = { hit: true }
			return "miss"
		}
	}

	return { board, placeShip, getCell, receiveAttack }
}
