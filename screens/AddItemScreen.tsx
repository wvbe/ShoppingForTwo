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

	const [label, setLabel] = useState<string>('');
	const [quantity, setQuantity] = useState<string>('');

	const onSubmit = useCallback(async () => {
		await storageHelper.items.add({
			id: storageHelper.items.generateNewKey(),
			label,
			quantity: quantity || undefined,
			completed: false,
		});
		navigation.navigate('Home');
	}, [label, quantity, navigation]);

	return (
		<View style={styles.container}>
			<View>
				<FancyText>What's the craving?</FancyText>
				<FancyTextInput
					autoFocus
					value={label}
					placeholder="Something to describe this item"
					onChangeText={setLabel}
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<FancyText>How many of 'em?</FancyText>
				<FancyTextInput
					keyboardType="number-pad"
					value={quantity}
					placeholder="Any number will do"
					onChangeText={setQuantity}
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<FancyButton title="OK gov'ner" onPress={onSubmit} isDisabled={!label.length} />
			</View>
		</View>
	);
};
