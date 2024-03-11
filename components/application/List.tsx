import { FC, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { storageHelper } from '../../api/storageHelper';
import { ShoppingListItem } from '../../types';
import { AddItemButton } from './AddItemButton';
import { ListItem } from './ListItem';

const styles = StyleSheet.create({
	list: {
		flexGrow: 0,
		flexShrink: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingVertical: 10,
	},
	stateMessage: {
		flex: 0,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function useShoppingListItemStorage() {
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

export const List: FC = () => {
	const { isLoading, items } = useShoppingListItemStorage();

	const body = useMemo(() => {
		if (isLoading) {
			return (
				<View style={styles.stateMessage}>
					<Text>Loading the thing!</Text>
				</View>
			);
		}
		if (!items.length) {
			return (
				<View style={styles.stateMessage}>
					<Text>No shopping items yet!</Text>
					<AddItemButton />
				</View>
			);
		}
		return items.map((item, index) => <ListItem key={item.id} item={item} />);
	}, [isLoading, items]);

	return <ScrollView contentContainerStyle={styles.list}>{body}</ScrollView>;
};
