import { FC } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

export const textStyle = {
	fontSize: 18,
	fontFamily: 'Avenir',
} as const satisfies StyleProp<TextStyle>;

export const FancyText: FC<TextProps> = (textProps) => {
	return <Text {...textProps} style={[textStyle, textProps.style]} />;
};
