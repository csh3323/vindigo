import _ from 'lodash';

type CacheList<T> = ItemEntry<T>[]|null;

/**
 * Item lists are used to create extendible arrays
 * which sort their contents based on item weights.
 *
 * Credits to https://flarum.org/ for inspiration.
 */
export class ItemList<T> {

	private items: { [key: string]: Item<T> };
	private cache: CacheList<T>;

	constructor() {
		this.items = {};
		this.cache = null;
	}

	/**
	 * Check whether the list is empty
	 */
	public isEmpty(): boolean {
		return _.isEmpty(this.items);
	}

	/**
	 * Check whether an item is present in the list
	 *
	 * @param key The key to check
	 */
	public has(key: string) : boolean {
		return !!this.items[key];
	}

	/**
	 * Returns the value at the specified key
	 *
	 * @param key The key to retrieve
	 */
	public get(key: string) : T {
		return this.items[key].content;
	}

	/**
	 * Returns the weight of the specified key
	 *
	 * @param key The key weight to retrieve
	 */
	public getWeight(key: string) : number {
		return this.items[key].weight;
	}

	/**
	 * Add a new item to this ItemList with the specified weight
	 * 
	 * @param key The key
	 * @param content The value to assign
	 * @param weight The weight of this value
	 * @param replace Whether to replace an existing value
	 */
	public add(key: string, value: T, weight = 0, replace = true) : ItemList<T> {
		if(replace || !this.has(key)) {
			this.items[key] = new Item(value, weight);
		}

		this.cache = null;

		return this;
	}

	/**
	 * Remove an item from the list
	 *
	 * @param key The key to remove
	 */
	public remove(key: string) : ItemList<T> {
		delete this.items[key];

		this.cache = null;

		return this;
	}

	/**
	 * Merge another list's items into this one
	 *
	 * @param items Another ItemList
	 */
	public merge(items: ItemList<T>) : ItemList<T> {
		for (const i in items.items) {
			if (
				items.items.hasOwnProperty(i) && items.items[i] instanceof Item
			) {
				this.items[i] = items.items[i];
			}
		}

		this.cache = null;

		return this;
	}

	/**
	 * Convert the list into an array of item content arranged by priority. Each
	 * item's content will be assigned an `itemName` property equal to the item's
	 * unique key.
	 *
	 * @return {Array}
	 * @public
	 */
	public toArray() : ItemEntry<T>[] {
		const items = _.map(this.items, (value, key) => ({key, value}));

		if(this.cache) {
			return this.cache;
		} else {
			const arr = items
				.sort((a, b) => a.value.weight - b.value.weight)
				.map(item => ({
					key: item.key,
					value: item.value.content
				}));

			this.cache = arr;

			return arr;
		}

		return this.cache || items
			.sort((a, b) => a.value.weight - b.value.weight)
			.map(item => ({
				key: item.key,
				value: item.value.content
			}));
	}
}

/**
 * A single entry in an ItemList
 */
class Item<T> {

	public content: T;
	public weight: number;

	constructor(content: T, priority: number) {
		this.content = content;
		this.weight = priority;
	}
}

/**
 * A representation of an item when returned by #toArray
 */
interface ItemEntry<T> {
	key: string;
	value: T;
}