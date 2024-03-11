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

export const AddShopScreen: FC<NativeStackScreenProps<ScreenParams, 'AddShop'>> = () => {
	const navigation = useNavigation();

	const [shopName, setShopName] = useState('');

	const onSubmit = useCallback(async () => {
		await storageHelper.shops.add({
			id: storageHelper.shops.generateNewKey(),
			label: shopName,
		});
		navigation.navigate('Home');
	}, [shopName, navigation]);

	return (
		<View style={styles.container}>
			<FancyText>Shop name:</FancyText>
			<FancyTextInput value={shopName} onChangeText={setShopName} />
			<FancyButton title="Add shop" onPress={onSubmit} isDisabled={!shopName.length} />
		</View>
	);
};
