import RNFetchBlob, { FetchBlobResponse, StatefulPromise } from 'rn-fetch-blob'

import { Maybe } from './interfaces/generic'

import { generateSerial } from './security'

const { config, fs } = RNFetchBlob

/**
 * Download da media através da URL
 */
export function downloadMediaAsync(mediaUrl: Maybe<string>): Maybe<StatefulPromise<FetchBlobResponse>>{

	if(!mediaUrl) return
	
	let PictureDir = fs.dirs.DocumentDir
	const date = new Date()

	const mediaKey = String(Math.floor(date.getSeconds() / 2)) + generateSerial(6)

	const options = { path: PictureDir + '/pic' + mediaKey }

	return config(options).fetch('GET', mediaUrl)
}
