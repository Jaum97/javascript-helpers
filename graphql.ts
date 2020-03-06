export function doesPathExist(nodes, path) {
	if (!nodes || !nodes.length) return false

	const node = nodes.find(node => node.name.value === path[0])

	if (!node) return false

	if (path.length === 1) return true

	return doesPathExist(node.selectionSet.selections, path.slice(1))
}
