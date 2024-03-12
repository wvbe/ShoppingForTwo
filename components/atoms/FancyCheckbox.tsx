import { FC, ReactNode, useMemo } from 'react';
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
	innerDot: {
		width: 16,
		height: 16,
		backgroundColor: '#5072EB',
		borderRadius: 8,
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
	label?: string | ReactNode;
	onPress: (event: GestureResponderEvent) => void;
}> = ({ isChecked, label, onPress }) => {
	const buttonStyle = useMemo(
		() => [
			styles.button,
			{
				borderColor: isChecked ? '#5072EB' : '#aaa',
				marginRight: label ? 20 : undefined,
			},
		],
		[isChecked, label],
	);
	return (
		<Pressable style={styles.container} onPress={onPress} hitSlop={0}>
			<View style={buttonStyle}>{isChecked && <View style={styles.innerDot} />}</View>
			{typeof label === 'string' ? (
				<FancyText style={styles.label}>{label}</FancyText>
			) : (
				label || null
			)}
		</Pressable>
	);
};
