/**
 * Parameters expected by each of the screens
 */
export type ScreenParams = {
	Home: undefined;
	AddShop: undefined;
	AddItem: undefined;
};

/**
 * Represents one item on a wishlist.
 */
export type ShoppingListItem = {
	id: string;
	label: string;
	quantity: number;
	completed: boolean;
	shops?: string[];
};

/**
 * Represents a shop where items can be bought.
 *
 * @note Not implemented
 */
export type ShoppingListShop = {
	id: string;
	label: string;
};
