import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddItemScreen } from './screens/AddItemScreen';
import { AddShopScreen } from './screens/AddShopScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ScreenParams } from './types';

const Stack = createNativeStackNavigator<ScreenParams>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="AddShop"
					component={AddShopScreen}
					options={{ title: 'Add a new shop' }}
				/>
				<Stack.Screen
					name="AddItem"
					component={AddItemScreen}
					options={{ title: 'Add an item to the list' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
