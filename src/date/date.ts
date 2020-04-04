import { pipe } from './operators'
import {
	startOfWeek,
	getDay,
	getDate,
	getMonth,
	subMonths,
	isSameDay,
	isAfter,
	parseISO
} from 'date-fns'
import { setHours, addDays, format } from 'date-fns/fp'
import { Maybe } from '@shared/interfaces/common'

export const getWeekDays = (date: Date): Array<Date> => {
	const start = pipe(startOfWeek, setHours(12))(date)

	const getDays = (_, i): Date => addDays(i + 1, start)

	const restOfWeek = Array(6).fill(0).map(getDays)

	return [start, ...restOfWeek]
}

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const weekDayNames = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado'
]

export const monthNames = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
]

/**
 * returns string in the format 'Quinta-feira, 2 de Abril'
 * @param date date to format
 */
export function getLongBRDate(date: Date): string {
	const weekDay = getDay(date)
	const monthDay = getDate(date)
	const month = getMonth(date)

	return `${weekDayNames[weekDay]}, ${monthDay} de ${monthNames[month]}`
}

export function getWeekStartAndEnd(
	date: Date,
	outputFormat = 'dd/MM'
): [string, string] {
	const week = getWeekDays(date)

	const dayAndMonth = format(outputFormat)

	return [dayAndMonth(week[0]), dayAndMonth(week[6])]
}

export function isAfterTwoMonths(date: Maybe<Date>): boolean {
	if (date) {
		const d = date instanceof Date ? date : parseISO(date)

		const limitDay = subMonths(new Date(), 2)

		const isValid = isSameDay(d, limitDay) || isAfter(d, limitDay)

		return Boolean(isValid)
	}
	return false
}
