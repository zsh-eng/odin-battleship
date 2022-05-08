import { Gameboard } from "../src/gameboard.js"

test("Gameboard initialises as an empty grid", () => {
	let board = Gameboard().board
	for (const row of board) {
		for (const cell of row) {
			expect(cell).toBe(false)
		}
	}
})

test("placeShip places ship of length 2 at (0, 0) horizontally", () => {
	let gb = Gameboard()
	gb.placeShip(0, 0, 2, "horizontal")

	expect(gb.board[0][0]).toBeTruthy()
	expect(gb.board[0][0]).toMatchObject({
		ship: { length: 2, positions: [false, false] },
		index: 0,
	})
	expect(gb.board[0][1]).toBeTruthy()
	expect(gb.board[0][1]).toMatchObject({ index: 1 })
	expect(gb.board[0][2]).toBeFalsy()
	expect(gb.board[1][0]).toBeFalsy()
})

test("placeShip places ship of length 2 at (0, 0) vertically", () => {
	let gb = Gameboard()
	gb.placeShip(0, 0, 2, "vertical")

	expect(gb.board[0][0]).toBeTruthy()
	expect(gb.board[1][0]).toBeTruthy()
	expect(gb.board[2][0]).toBeFalsy()
	expect(gb.board[0][1]).toBeFalsy()
})

test("placeShip successfully returns true", () => {
	expect(Gameboard().placeShip(0, 0, 2, "horizontal")).toBe(true)
})
test("placeShip at position with ship returns false", () => {
	let gb = Gameboard()
	gb.placeShip(0, 0, 2, "horizontal")
	expect(gb.placeShip(0, 0, 4, "vertical")).toBe(false)
})
test("placeShip with invalid direction throws error", () => {
	// Invalid direction
	expect(() => Gameboard().placeShip(0, 0, 4, "sideways")).toThrow(
		"placeShip direction must be 'horizontal' or 'vertical'"
	)
})
test("placeShip handles placing of ships at edge of board", () => {
	let gb = Gameboard()
	let x = gb.board[0].length - 1
	let n = 4
	let ship = {
		length: n,
		positions: Array(n).fill(false),
	}

	gb.placeShip(x, 0, n, "horizontal")
	expect(gb.getCell(x, 0)).toMatchObject({ ship })
	expect(gb.getCell(x - n + 1, 0)).toMatchObject({ ship })

	expect(gb.getCell(x - n, 0)).toBe(false)
})
test("receiveAttack registers miss on empty cell", () => {
	let gb = Gameboard()
	expect(gb.receiveAttack(0, 0)).toBe("miss")
    expect(gb.getCell(0, 0)).toEqual({ hit: true })
})
test("receiveAttack registers hit on ship", () => {
	let gb = Gameboard()
	gb.placeShip(0, 0, 2, "horizontal")
	expect(gb.receiveAttack(0, 0)).toBe("hit")
    expect(gb.getCell(0,0)).toMatchObject({
        ship: {
            positions: [true, false]
        },
        hit: true
    })
})
test("receiveAttack returns null if same coordinate shot", () => {
	let gb = Gameboard()
    gb.receiveAttack(0, 0)
	expect(gb.receiveAttack(0, 0)).toBe(null)
})
