import { realm, ValidRealmSchemas } from '@config/realm'
import { IInteraction } from '@interfaces/models/interaction'

/**
 * - persistInRealm function to persist an object in realmDB,
 * does a create followed by a write
 * @param schema Realm Schema
 * @param objects object or objects to persist
 */
export function persistInRealm(
	schema: ValidRealmSchemas,
	objects: Object | Array<Object>
): void {
	const isArray = Array.isArray(objects)

	const toWrite = () => {
		isArray
			? (objects as Array<Object>).forEach(o => realm.create(schema, o))
			: realm.create(schema, objects)
	}

	realm.write(toWrite)
}

export function syncInteractions(interactions: Array<IInteraction>) {

}