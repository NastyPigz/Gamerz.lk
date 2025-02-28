import { writable } from 'svelte/store';
import type { PaginatorInterface, ToastInterface, TopicInterface, UserInterface } from '../types';

export { topicPosts } from './posts';
// export { isDarkMode } from './darkMode';

export const userData = writable<UserInterface | null>(null);

export const topics = writable<PaginatorInterface<TopicInterface> | null>(null);

export const joinedTopics = writable<Array<TopicInterface>>([]);

export const toastStore = writable<ToastInterface | null>(null);

export function clearUserData() {
	userData.set(null);
	joinedTopics.set([]);
	topics.set(null);
}
