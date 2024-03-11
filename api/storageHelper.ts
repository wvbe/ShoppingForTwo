import AsyncStorage from '@react-native-async-storage/async-storage';

import { ShoppingListItem, ShoppingListShop } from '../types';

/**
 * Represents a storage table for managing items of a specific type, typed as type generic `ItemShape`.
 * Objects stored in {@link StorageTable} must have an `id` property that uniquely identifies them.
 *
 * @template ItemShape - The shape of the items stored in the table.
 */
class StorageTable<ItemShape extends { id: string }> {
	#key: string;
	#items: null | ItemShape[] = [];
	#changeHandlers: (() => void)[] = [];

	/**
	 * Creates a new instance of the StorageTable class.
	 * @param key - The key used to identify the location where data is stored.
	 */
	public constructor(key: string) {
		this.#key = key;
	}

	/**
	 * Initializes the storage table by loading previously stored items.
	 * @throws Error if previously stored shopping items could not be loaded.
	 */
	public async init() {
		try {
			this.#items = JSON.parse((await AsyncStorage.getItem(this.#key)) || '[]');
		} catch (error) {
			throw new Error(`Previously stored shopping items could not be loaded: ${error}`);
		}
	}

	/**
	 * Returns a shallow copy of the items in the storage table as an array. You can modify the array
	 * without modifying the original storage table.
	 * @returns An array of items in the storage table.
	 * @throws Error if the storage table is not initialized.
	 */
	public slice(): ItemShape[] {
		if (this.#items === null) {
			throw new Error('StorageTable not initialized');
		}
		return this.#items.slice();
	}

	/**
	 * Synchronizes the storage table with the underlying storage.
	 * @private
	 */
	async #sync() {
		await AsyncStorage.setItem(this.#key, JSON.stringify(this.#items));
		this.#changeHandlers.forEach((handler) => handler());
	}

	/**
	 * Adds an item to the storage table, and synchronizes the storage table with the underlying storage.
	 * @param item - The item to be added.
	 * @throws Error if the storage table is not initialized.
	 */
	public async add(item: ItemShape): Promise<void> {
		if (this.#items === null) {
			throw new Error('StorageTable not initialized');
		}
		this.#items.push(item);
		await this.#sync();
	}

	/**
	 * Removes an item from the storage table, and synchronizes the storage table with the underlying storage.
	 * @param id - The ID of the item to be removed.
	 * @throws Error if the storage table is not initialized or if the item with the specified ID is not found.
	 */
	public async remove(id: string): Promise<void> {
		if (this.#items === null) {
			throw new Error('StorageTable not initialized');
		}
		const index = this.#items.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error(`Item with id ${id} not found`);
		}
		this.#items.splice(index, 1);
		await this.#sync();
	}

	/**
	 * Generates a new key for the storage table that you could use for a new object that goes into it.
	 * @returns A randomly generated key.
	 * @note Does not (yet) check if the key is already in use.
	 */
	public generateNewKey(): string {
		return Math.random().toString(36).slice(2);
	}

	/**
	 * Registers a change handler to be called when the storage table changes. Returns a function that
	 * unsets the event listener.
	 * @param handler - The change handler function.
	 * @returns A function that can be used to unregister the change handler.
	 */
	public subscribe(handler: () => void) {
		this.#changeHandlers.push(handler);
		return () => {
			const index = this.#changeHandlers.indexOf(handler);
			if (index !== -1) {
				this.#changeHandlers.splice(index, 1);
			}
		};
	}
}

/**
 * Helper class for managing storage of shopping items and shops.
 */
class StorageHelper {
	public readonly items = new StorageTable<ShoppingListItem>('@ShoppingForTwo:items');
	public readonly shops = new StorageTable<ShoppingListShop>('@ShoppingForTwo:shops');

	/**
	 * Initializes the storage helper by initializing all storage tables within it.
	 */
	public async init() {
		await this.items.init();
		await this.shops.init();
	}
}

export const storageHelper = new StorageHelper();
