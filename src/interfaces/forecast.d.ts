export interface IForecastAPIReturn {
	city: IForecastCity
	cnt: number
	cod: string
	list: Array<IForecastListItem>
	message: number
}

export interface IForecastCity {
	coord: {
		lat: number
		lon: number
	}
	country: string
	id: number
	name: string
	sunrise: number
	sunset: number
	timezone: number
}

export interface IForecastListItem {
	readonly dt: number
	readonly dt_txt: string
	readonly main: {
		readonly feels_like: number
		readonly grnd_level: number
		readonly humidity: number
		readonly pressure: number
		readonly sea_level: number
		readonly temp: number
		readonly temp_kf: number
		readonly temp_max: number
		readonly temp_min: number
	}
	readonly sys: {
		readonly pod: string
	}
	readonly weather: Array<{
		readonly description: string
		readonly icon: string
		readonly id: number
		readonly main: string
	}>
	readonly wind: {
		readonly deg: number
		readonly speed: number
	}
}

export interface IFormattedForecast {
	readonly date: string
	readonly temp: string
	readonly feels_like: string
	readonly temp_min: string
	readonly temp_max: string

	readonly weather: {
		readonly main: string
		readonly description: string
		readonly icon: string
	}
}
