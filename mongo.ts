import { DocumentQuery, Model, Schema } from 'mongoose'

import {
	ValidMongoCollection,
	ValidMongoDocument,
	ValidMongoId
} from './interfaces/mongo'
import { throwApiException } from './error'

export const createRefObject = (
	collection: ValidMongoCollection,
	required = false
) => ({
	type: Schema.Types.ObjectId,
	ref: collection,
	required
})

export function getMongoDocumentById<T extends ValidMongoDocument>(
	collection: Model<T, {}>
): (_id: ValidMongoId) => DocumentQuery<T, T, {}> {
	return function(_id: ValidMongoId): DocumentQuery<T, T, {}> {
		if (!_id) {
			throwApiException('O id é obrigatório')
		}

		return collection.findById(_id).lean()
	}
}

export function getMongoDocuments<T extends ValidMongoDocument>(
	collection: Model<T, {}>
): (select?: Object) => DocumentQuery<Array<T>, T, {}> {
	return function(select = {}): DocumentQuery<Array<T>, T, {}> {
		return collection.find(select).lean()
	}
}

export function updateMongoDocumentById<
	T extends ValidMongoDocument,
	P extends Partial<T>
>(collection: Model<T, {}>): (_id: ValidMongoId, payload: P) => Promise<T> {
	return async function(_id, payload) {
		if (!_id) {
			throwApiException('O id é obrigatório')
		}

		if (!payload || !Object.keys(payload).length) {
			throwApiException('Nada para atualizar')
		}

		await collection.findByIdAndUpdate(_id, payload)

		return collection.findById(_id).lean()
	}
}

export function deleteMongoDocumentById<T extends ValidMongoDocument>(
	collection: Model<T, {}>
): (_id: ValidMongoId) => Promise<T> {
	return async function(_id) {
		if (!_id) {
			throwApiException('O id é obrigatório')
		}

		const document = await collection.findById(_id, '_id')

		if (!document || !document._id) {
			throwApiException('Documento não encontrado')
		}

		return collection
			.findOneAndUpdate({ _id, status: 'ACTIVE' }, { status: 'DELETED' })
			.lean()
	}
}
