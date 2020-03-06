import { Types, Document } from 'mongoose'

export enum MongoCollections {}

export declare type ValidMongoCollection = keyof typeof MongoCollections


export declare type ValidMongoDocument = never

export declare type SchemaReference<T> = T | string | Types.ObjectId

export declare type ValidMongoId = string | Types.ObjectId

export declare type MongoDocument<T> = T &  Document & {
	 /**
     * Virtual getter that by default returns the document's _id field cast to a string,
     * or in the case of ObjectIds, its hexString. This id getter may be disabled by
     * passing the option { id: false } at schema construction time. If disabled, id
     * behaves like any other field on a document and can be assigned any value.
     */
	_id: any
}

