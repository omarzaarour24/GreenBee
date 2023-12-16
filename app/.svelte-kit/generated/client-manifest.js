import * as client_hooks from '../../src/hooks.client.ts';

export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')];

export const server_loads = [0];

export const dictionary = {
	"": [2],
	"company": [~3],
	"converter": [~4],
	"customer": [~5],
	"dashboard": [~6],
	"help": [~7],
	"login": [~8],
	"register": [~9],
	"user": [~10]
};

export const hooks = {
	handleError: client_hooks.handleError || (({ error }) => { console.error(error) }),
};