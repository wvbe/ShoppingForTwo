import { FC, useMemo } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';

import { FancyText } from './FancyText';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignItems: 'center',
	},
	label: {
		marginLeft: 20,
	},
	button: {
		width: 32,
		height: 32,
		borderRadius: 16,
		borderWidth: 2,
		marginVertical: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const FancyCheckbox: FC<{
	isChecked: boolean;
	label?: string;
	onPress: (event: GestureResponderEvent) => void;
}> = ({ isChecked, label, onPress }) => {
	const buttonStyle = useMemo(
		() => [
			styles.button,
			{
				borderColor: isChecked ? '#506266' : '#818274',
				backgroundColor: isChecked ? '#BDE038' : '#fff',
			},
		],
		[isChecked],
	);
	return (
		<Pressable style={styles.container} onPress={onPress} hitSlop={0}>
			<View style={buttonStyle}>{isChecked && <FancyText>✔</FancyText>}</View>
			{label && <FancyText style={styles.label}>{label}</FancyText>}
		</Pressable>
	);
};
