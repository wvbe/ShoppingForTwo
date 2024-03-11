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
import { FancyText } from './FancyText';

const COLORS: Record<
	'primary' | 'muted',
	{
		disabledBackground: string;
		pressedBackground: string;
		normalBackground: string;
		disabledText: string;
		normalText: string;
	}
> = {
	primary: {
		disabledBackground: '#ccc',
		pressedBackground: '#10454F',
		normalBackground: '#506266',
		disabledText: '#999',
		normalText: '#fff',
	},
	muted: {
		disabledBackground: '#ccc',
		pressedBackground: '#333',
		normalBackground: '#ccc',
		disabledText: '#999',
		normalText: '#fff',
	},
};

/**
 * The "ShoppingForTwo"'s own button style.
 */
export const FancyButton: FC<{
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	isDisabled?: boolean;
	type?: keyof typeof COLORS;
	style?: StyleProp<ViewStyle>;
}> = ({ title, onPress, isDisabled, type, style }) => {
	const buttonStyle = useCallback<(state: PressableStateCallbackType) => StyleProp<ViewStyle>>(
		({ pressed }) => {
			const colors = COLORS[type || 'primary'] || COLORS.primary;
			return [
				{
					marginVertical: 3,
					paddingHorizontal: 20,
					paddingVertical: 15,
					borderRadius: 5,
					borderCurve: 'continuous',
					backgroundColor: isDisabled
						? colors.disabledBackground
						: pressed
						? colors.pressedBackground
						: colors.normalBackground,
				},
				style,
			];
		},
		[isDisabled, style],
	);

	const textStyle = useMemo<StyleProp<TextStyle>>(() => {
		const colors = COLORS[type || 'primary'] || COLORS.primary;
		return {
			fontWeight: 'bold',
			color: isDisabled ? colors.disabledText : colors.normalText,
			textAlign: 'center',
		};
	}, [isDisabled]);

	return (
		<Pressable style={buttonStyle} disabled={isDisabled} onPress={onPress}>
			<FancyText style={textStyle}>{title}</FancyText>
		</Pressable>
	);
};
