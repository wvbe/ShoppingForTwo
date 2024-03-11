import { FC, useMemo } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		// alignItems: 'flex-start',
		// justifyContent: 'flex-start',
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: '#fff',
	},
});

export const FancyCheckbox: FC<{
	isChecked: boolean;
	label?: string;
	onPress: (event: GestureResponderEvent) => void;
}> = ({ isChecked, label, onPress }) => {
	const buttonStyle = useMemo(
		() => ({
			width: 20,
			height: 20,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: isChecked ? '#000' : '#aaa',
			backgroundColor: isChecked ? 'yellow' : undefined,
		}),
		[isChecked],
	);
	return (
		<Pressable style={styles.container} onPress={onPress} hitSlop={0}>
			<View style={buttonStyle}>{isChecked && <Text style={{ fontWeight: 'bold' }}>✔</Text>}</View>
			{label && <Text style={{ marginLeft: 20 }}>{label}</Text>}
		</Pressable>
	);
};
