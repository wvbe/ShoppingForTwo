import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { textStyle } from './FancyText';

const styles = StyleSheet.create({
	textInput: {
		marginVertical: 3,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		backgroundColor: '#fff',
		...textStyle,
	},
});
export const FancyTextInput: FC<Omit<TextInputProps, 'style'>> = (textInputProps) => {
	return <TextInput style={styles.textInput} {...textInputProps} />;
};
