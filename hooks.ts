export declare type IIntervalReturn = [
	() => void,
	() => void,
	number
]

export const useInterval = (
	action: () => void,
	time = 1000
): IIntervalReturn => {
	let id = 0

	let start = () => {		
		id = setInterval(action, time)
	}

	const stop = () => {
		clearInterval(id)
	}

	return [start, stop, id]
}

export const useDelay = (
	callback: () => void,
	delay = 5000,
	checkTime = 1000,
) => {
	let id = 0
	let s = 0

	const check = () => {
		if(!(Date.now() - s > delay)) return

		callback()
		stop()
	}

	let start = () => {	
		s = Date.now()	
		id = setInterval(check, checkTime)
	}

	const stop = () => {
		clearInterval(id)
	}

	return [start]
}
