/**
 * -removeIndex returns a new array without the element in the index position
 * @param arr any array
 * @param index index to be shifted
 */
export function removeIndex<T>(arr: Array<T>, index = -1): Array<T> {
	if (!Array.isArray(arr)) return arr

	return arr.filter((_, i) => index !== i)
}

/**
 * -arrayReplace - creates a new array replacing the index item for the payload
 * @param arr array to replace an item from
 * @param index index of the item to replace
 * @param payload value to put in the given index
 */
export function arrayReplace<T>(
	arr: Array<T>,
	index: number,
	payload: T
): Array<T> {
	const created: Array<T> = []

	const len = arr.length

	for (let i = 0; i < len; i++) {
		if (i !== index) {
			created.push(arr[i])
		} else {
			created.push(payload)
		}
	}

	return created
}

/**
 * -arrayToChunks - creates an array with @size sized arrays
 * @param arr array to create chunks from
 * @param size size of the chunks
 */
export function arrayToChunks<E>(arr: Array<E>, size: number): Array<Array<E>> {
	const base = Array(Math.ceil(arr.length / size)).fill(null)

	const chunks = base.map((_, i) => arr.slice(i * size,(i + 1) * size))

	return chunks
}
