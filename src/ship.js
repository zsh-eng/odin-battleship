export const Ship = (length) => {
	let minLength = 2
	let maxLength = 5
	// Ship lengths should be within a certain range
	if (length < minLength || length > maxLength) {
		throw "Ship length is out of range"
	}

	// Initialises array of positions with false (not hit)
	const positions = Array(length).fill(false)

	// Changes position to "hit" for specified position
	const hit = (pos) => {
		if (positions[pos] === undefined) {
			throw "Cannot hit Ship position out of range"
		}
		positions[pos] = true
	}

	// Checks if all positions of Ship have been hit
	const isSunk = () => {
		return positions.reduce((previous, current) => previous && current)
	}

	return { length, positions, hit, isSunk }
}
