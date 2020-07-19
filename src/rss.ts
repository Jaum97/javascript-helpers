import { FeedItem } from 'react-native-rss-parser'

import { Maybe } from './interfaces/generic'

export function getImageURLFromFeedItem(string: string): Maybe<string> {
	const myRegex = /<img.*?src="([^">]*\/([^">]*?))".*?>/g

	const img = myRegex.exec(string)

	if (!img) return

	const url = img[0].replace('<img src="', '').replace('" />', '')

	return url
}

export function feedItemToAd(label: string, imageUrl: string) {
	const RSSAdObject = {
		_id: '',
		label,
		type: 'RSS',
		partner: '',
		medias: [
			{
				_id: '',
				advertisement: '',
				label,
				type: 'IMAGE',
				imageUrl,
				videoUrl: ''
			}
		],
		status: 'ACTIVE'
	}

	return RSSAdObject
}

export function formatRSSFeedItem(feedItem: FeedItem) {
	const { description, title } = feedItem

	if (!description.includes('<img src')) return

	const extractedUrl = getImageURLFromFeedItem(description)

	if (!extractedUrl) return

	return feedItemToAd(title, extractedUrl)
}
