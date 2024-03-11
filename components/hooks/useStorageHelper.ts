import { useEffect, useState } from 'react';

import { storageHelper } from '../../api/storageHelper';
import { ShoppingListItem } from '../../types';

export function useShoppingListItemStorage() {
	const [isLoading, setIsLoading] = useState(true);

	const [items, setItems] = useState<ShoppingListItem[]>(storageHelper.items.slice());

	useEffect(() => {
		setIsLoading(true);
		storageHelper.init().then(() => {
			// I want to see the loading state better, so adding a timeout here 💯
			setTimeout(() => {
				setItems(storageHelper.items.slice());
				setIsLoading(false);
			}, 1000);
		});

		return storageHelper.items.subscribe(() => {
			setItems(storageHelper.items.slice());
		});
	}, []);

	return { isLoading, items };
}
