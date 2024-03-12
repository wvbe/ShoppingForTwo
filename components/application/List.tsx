import { FC, useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { ShoppingListItem } from '../../types';
import { FancyText } from '../atoms/FancyText';
import { useShoppingListItemStorage } from '../hooks/useStorageHelper';
import { AddItemButton } from './AddItemButton';
import { ListItem } from './ListItem';

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		flexShrink: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 10,
	},
	list: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	secondList: {
		borderTopColor: '#ccc',
		borderTopWidth: 1,
		marginTop: 10,
		paddingTop: 10,
	},
	stateMessage: {
		flexGrow: 1,
		flexShrink: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

/**
 * Renders a list of shopping items.
 *
 * @component
 * @returns {JSX.Element} The rendered list component.
 */
export const List: FC<{
	/**
	 * Indicates whether the list is in editing mode, meaning additional buttons are shown to remove things.
	 */
	isEditing: boolean;
}> = ({ isEditing }) => {
	const { isLoading, items } = useShoppingListItemStorage();

	const body = useMemo(() => {
		if (isLoading) {
			return (
				<View style={styles.stateMessage}>
					<FancyText>Hang tight, fam…</FancyText>
					<ActivityIndicator size="small" style={{ marginTop: 20 }} />
				</View>
			);
		}
		if (!items.length) {
			return (
				<View style={styles.stateMessage}>
					<FancyText>No shopping items yet!</FancyText>
					<AddItemButton title="Add gogogo" style={{ marginTop: 20 }} />
				</View>
			);
		}

		const [complete, notComplete] = items.reduce<[ShoppingListItem[], ShoppingListItem[]]>(
			([complete, notComplete], item) => {
				if (item.completed) {
					complete.push(item);
				} else {
					notComplete.push(item);
				}
				return [complete, notComplete];
			},
			[[], []],
		);

		return (
			<>
				{notComplete.length ? (
					<View style={styles.list}>
						{notComplete.map((item, index) => (
							<ListItem key={item.id} item={item} isEditing={isEditing} />
						))}
					</View>
				) : null}
				{complete.length ? (
					<View style={[styles.list, notComplete.length ? styles.secondList : null]}>
						{complete.map((item, index) => (
							<ListItem key={item.id} item={item} isEditing={isEditing} />
						))}
					</View>
				) : null}
			</>
		);
	}, [isLoading, isEditing, items]);

	return <ScrollView contentContainerStyle={styles.scrollContainer}>{body}</ScrollView>;
};
