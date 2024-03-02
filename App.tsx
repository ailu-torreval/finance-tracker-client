import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import EditEntry from "./screens/EditEntry";
import DeleteEntry from "./screens/DeleteEntry";
import EntryList from "./screens/EntryList";
import CategoriesScreen from "./screens/CategoriesScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { store } from "./store/store";
import { Provider } from "react-redux";

export type RootStackParamList = {
  Home: undefined;
  EditEntry: { entryId: number };
  DeleteEntry: { entryId: number };
  EntryList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const EntryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditEntry" component={EditEntry} />
      <Stack.Screen name="DeleteEntry" component={DeleteEntry} />
      <Stack.Screen name="EntryList" component={EntryList} />
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

            if (route.name === "Home1") {
              iconName ="home";
            } else if (route.name === "Category") {
              iconName = "list";
            }

            // You can return any component that you like here!
            return <Icon name={iconName || "home"} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home1" component={EntryStackNavigator} />
        <Tab.Screen name="Category" component={CategoriesScreen} />
      </Tab.Navigator>

      {/* // <View style={styles.container}>
      //   <Text>Open up App.tsx to start working on your app!</Text>
      //   <StatusBar style="auto" />
      // </View> */}
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
