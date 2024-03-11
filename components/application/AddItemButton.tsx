import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';

import { FancyButton } from '../atoms/FancyButton';

export const AddItemButton: FC = () => {
	const navigation = useNavigation();
	const onPress = useCallback(() => {
		navigation.navigate('AddItem');
	}, []);
	return <FancyButton onPress={onPress} title={'Add an item yeh bruv?'} />;
};
