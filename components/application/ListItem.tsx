import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { storageHelper } from '../../api/storageHelper';
import { ShoppingListItem } from '../../types';
import { FancyButton } from '../atoms/FancyButton';
import { FancyCheckbox } from '../atoms/FancyCheckbox';
import { FancyText } from '../atoms/FancyText';

const styles = StyleSheet.create({
	container: {
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
	},
});

export const ListItem: FC<{ item: ShoppingListItem; isEditing: boolean }> = ({
	item,
	isEditing,
}) => {
	const [isCompleted, setIsCompleted] = useState(item.completed);

	const toggleIsCompleted = useCallback(() => {
		storageHelper.items.update(item.id, { completed: !isCompleted });
		setIsCompleted((prev) => !prev);
	}, [isCompleted]);

	const removeItem = useCallback(() => {
		storageHelper.items.remove(item.id);
	}, []);

	return (
		<View style={styles.container}>
			<FancyCheckbox
				isChecked={isCompleted}
				onPress={toggleIsCompleted}
				label={
					<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
						<FancyText>{item.label}</FancyText>
						{item.quantity !== undefined && (
							<FancyText style={{ color: '#666' }}>{item.quantity}</FancyText>
						)}
					</View>
				}
			/>
			{isEditing && (
				<FancyButton title="❌" onPress={removeItem} style={{ flex: 0 }} type="muted" />
			)}
		</View>
	);
};
