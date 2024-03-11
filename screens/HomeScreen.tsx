import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AddItemButton } from '../components/application/AddItemButton';
import { List } from '../components/application/List';
import { FancyButton } from '../components/atoms/FancyButton';
import { ScreenParams } from '../types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	buttonWrapper: {
		flexDirection: 'row',
		paddingBottom: 20,
		paddingHorizontal: 20,
	},
});

export const HomeScreen: FC<NativeStackScreenProps<ScreenParams, 'Home'>> = ({ navigation }) => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEditing = useCallback(() => setIsEditing((prev) => !prev), []);
	return (
		<View style={styles.container}>
			<List isEditing={isEditing} />
			<View style={styles.buttonWrapper}>
				<AddItemButton style={{ flexGrow: 1 }} />
				<FancyButton title={'❌'} onPress={toggleEditing} style={{ marginLeft: 20 }} type="muted" />
			</View>
		</View>
	);
};
