const { readFileAsync } = require('./utils');
const { assertEqual, solution } = require('./test_utils');

const testInput = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`.split('\n');

function buildTree(input) {
	return input.reduce((tree, info) => {
		const [, name, weight, subprocesses] = info.match(
			/^(\w+)\s\((\d+)\)(?:\s->\s)?((?:(?:\w+),?\ ?)+)?/
		);
		tree[name] = { ...tree[name], weight: parseInt(weight, 10) };

		if (subprocesses) {
			subprocesses.split(', ').forEach(process => {
				tree[process] = { ...tree[process], parent: name };
			});
		}

		return tree;
	}, {});
}

const findRootNode = tree => Object.keys(tree).find(name => !Boolean(tree[name].parent));

const findSiblings = (tree, nodeName) => Object.keys(tree).filter(name => tree[name].parent === nodeName);

assertEqual(() => findRootNode(buildTree(testInput)), 'tknk');

const tree = buildTree(testInput);
for (nodeName in tree) {
	const siblings = findSiblings(tree, nodeName).map(nodeName => tree[nodeName]);
	const weight = siblings.reduce((n, { weight }) => n + weight, 0);
	console.log(weight)
}

(async function() {
	const input = await readFileAsync('./inputs/day_7.txt', 'utf8').then(data =>
		data.toString().split('\n')
	);
	const tree = buildTree(input);

	solution(findRootNode(tree));
})();
