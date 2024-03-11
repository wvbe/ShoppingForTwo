import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { storageHelper } from '../api/storageHelper';
import { FancyButton } from '../components/atoms/FancyButton';
import { FancyText } from '../components/atoms/FancyText';
import { FancyTextInput } from '../components/atoms/FancyTextInput';
import { ScreenParams } from '../types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		padding: 20,
	},
});

export const AddItemScreen: FC<NativeStackScreenProps<ScreenParams, 'AddItem'>> = () => {
	const navigation = useNavigation();

	const [itemLabel, setItemLabel] = useState('');

	const onSubmit = useCallback(async () => {
		await storageHelper.items.add({
			id: storageHelper.items.generateNewKey(),
			label: itemLabel,
			quantity: 1,
			completed: false,
		});
		navigation.navigate('Home');
	}, [itemLabel, navigation]);

	return (
		<View style={styles.container}>
			<View>
				<FancyText>Whaddayaneed?</FancyText>
				<FancyTextInput
					autoFocus
					value={itemLabel}
					placeholder="Something to describe this item"
					onChangeText={setItemLabel}
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<FancyButton
					title="Add to shopping list!"
					onPress={onSubmit}
					isDisabled={!itemLabel.length}
				/>
			</View>
		</View>
	);
};
