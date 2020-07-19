export function removeEspecialCharacters(str: string): string {
	return str.replace(/[^0-9a-zA-Z]+/g, '')
}
