import { parseISO } from 'date-fns'
import { pipe, curry } from './operators'
import { format } from 'date-fns/fp'

export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'

const formatToISO = pipe(format(DATE_TIME_FORMAT), parseISO)

export const formatMalformedDate = (separator: string, str: string): string => {
	if (str.split(separator).length < 3) return str

	const [date, hours] = str.split(' ')

	const parts = date.split(separator)

	const [, , lastPart] = parts

	const isInverted = lastPart.length === 4

	const strArr = isInverted ? parts.reverse() : parts

	return `${strArr.join('-')}${ hours ? ` ${hours}` : ''}`
}

const formatSlashDate = curry(formatMalformedDate)('/')

const formatDashDate = curry(formatMalformedDate)('-')

export const set = (date: any): Date => {
	if(!date) return new Date()

	if (Number(date) || date instanceof Date) {
		return formatToISO(date)
	}

	if (String(date)) {
		const isSlashDate = date.split('/').length > 2

		const formatFunction = isSlashDate ? formatSlashDate : formatDashDate

		const formatted = formatFunction(date)

		const hasHours = formatted.split(' ').length > 1

		const toFormat = hasHours ? new Date(formatted) : new Date(formatted + ' 12:00:00')

		return formatToISO(toFormat)
	}

	return new Date()
}
