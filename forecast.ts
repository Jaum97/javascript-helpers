import moment from 'moment'

import { IForecastListItem, IFormattedForecast } from '@interfaces/forecast'

export function isTodayItem(item: IForecastListItem) {
	return moment().isSame(item.dt_txt, 'day')
}

export function formatForecastListItem(item: IForecastListItem): IFormattedForecast {
	const { dt_txt, main, weather } = item

	const created = {
		date: dt_txt,
		temp: String(main.temp),
		feels_like: String(main.feels_like),
		temp_min: String(main.temp_min),
		temp_max: String(main.temp_max),
		weather: {
			main: weather[0].main,
			description: weather[0].description,
			icon: weather[0].icon
		}
	}

	return created

}

export function isLatestForecast(forecast: IFormattedForecast): boolean {
	return moment().isAfter(forecast.date, 'hours')
}