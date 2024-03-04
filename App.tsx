import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import EditEntry from "./screens/EditEntry";

import CategoriesScreen from "./screens/CategoriesScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { store } from "./store/store";
import { Provider } from "react-redux";

export type RootStackParamList = {
  Entries: undefined;
  EditEntry: { entryId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const EntryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Entries" component={HomeScreen} />
      <Stack.Screen name="EditEntry" component={EditEntry} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName ="home";
            } else if (route.name === "Category") {
              iconName = "list";
            }

            // You can return any component that you like here!
            return <Icon name={iconName || "home"} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#568bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={EntryStackNavigator} />
        <Tab.Screen name="Category" component={CategoriesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
