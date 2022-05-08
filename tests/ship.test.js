import { Ship } from "../src/ship.js"

test("Ship creates ship of length 5", () => {
	expect(Ship(5).length).toBe(5)
})
test("Ship throws error with lengths out of range", () => {
	expect(() => Ship(-1)).toThrow("Ship length is out of range")
})
describe("testing Ship methods", () => {
    let ship = Ship(3)

	test("Ship creates ship with all positions not hit", () => {
		expect(ship.positions).toEqual([false, false, false])
	})

	test("Ship.hit() changes position to hit", () => {
		ship.hit(2)
		expect(ship.positions).toEqual([false, false, true])
	})
	test("Ship.hit() throws error if index given is out of range", () => {
        expect(() => ship.hit(4)).toThrow("Cannot hit Ship position out of range")
    })
    test("Ship.isSunk() returns false when not all positions hit", () =>{
        expect(ship.isSunk()).toBeFalsy()
    })
    test("Ship.isSunk() returns true after all positions hit", () => {
        ship.hit(0)
        ship.hit(1)
        expect(ship.positions).toEqual([true, true, true])
        expect(ship.isSunk()).toBeTruthy()
    })
})
