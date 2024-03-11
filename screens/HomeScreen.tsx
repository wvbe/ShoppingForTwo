import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { AddItemButton } from '../components/application/AddItemButton';
import { List } from '../components/application/List';
import { ScreenParams } from '../types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	buttonWrapper: {
		paddingBottom: 20,
		paddingHorizontal: 20,
	},
});

export const HomeScreen: FC<NativeStackScreenProps<ScreenParams, 'Home'>> = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<List />
			<View style={styles.buttonWrapper}>
				<AddItemButton />
			</View>
		</View>
	);
};
