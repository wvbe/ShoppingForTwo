import { useNavigation } from '@react-navigation/native';
import { FC, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { FancyButton } from '../atoms/FancyButton';

export const AddItemButton: FC<{ title?: string; style?: StyleProp<ViewStyle> }> = ({
	title,
	style,
}) => {
	const navigation = useNavigation();
	const onPress = useCallback(() => {
		navigation.navigate('AddItem');
	}, []);
	return <FancyButton onPress={onPress} title={title || 'Add item bruv'} style={style} />;
};
