import { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ShoppingListItem } from '../../types';
import { FancyCheckbox } from '../atoms/FancyCheckbox';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
	},
});

export const ListItem: FC<{ item: ShoppingListItem }> = ({ item }) => {
	const [isCompleted, setIsCompleted] = useState(false);
	const toggleIsCompleted = useCallback(() => {
		setIsCompleted((prev) => !prev);
	}, [isCompleted]);
	return (
		<View style={styles.container}>
			<FancyCheckbox isChecked={isCompleted} onPress={toggleIsCompleted} label={item.label} />
		</View>
	);
};
