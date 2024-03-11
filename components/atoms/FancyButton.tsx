import { FC, useCallback, useMemo } from 'react';
import {
	GestureResponderEvent,
	Pressable,
	PressableStateCallbackType,
	StyleProp,
	Text,
	TextStyle,
	ViewStyle,
} from 'react-native';

/**
 * The "ShoppingForTwo"'s own button style.
 */
export const FancyButton: FC<{
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	isDisabled?: boolean;
}> = ({ title, onPress, isDisabled }) => {
	const buttonStyle = useCallback<(state: PressableStateCallbackType) => StyleProp<ViewStyle>>(
		({ pressed }) => ({
			marginVertical: 3,
			paddingHorizontal: 20,
			paddingVertical: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: isDisabled ? '#aaa' : '#000',
			borderCurve: 'continuous',
			backgroundColor: isDisabled ? '#eee' : pressed ? 'yellow' : '#fff',
		}),
		[isDisabled],
	);
	const textStyle = useMemo<StyleProp<TextStyle>>(
		() => ({
			fontWeight: 'bold',
			color: isDisabled ? '#aaa' : '#000',
			textAlign: 'center',
		}),
		[isDisabled],
	);
	return (
		<Pressable style={buttonStyle} disabled={isDisabled} onPress={onPress}>
			<Text style={textStyle}>{title}</Text>
		</Pressable>
	);
};
