export function generateSerial(len: number): string {
	'use strict'

	const chars =
		'1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const serialLength = len || 10
	let randomSerial = ''
	let randomNumber

	for (let i = 0; i < serialLength; i = i + 1) {
		randomNumber = Math.floor(Math.random() * chars.length)

		randomSerial += chars.substring(randomNumber, randomNumber + 1)
	}

	return randomSerial
}
