import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import EditEntry from "./screens/EditEntry";
import CategoriesScreen from "./screens/CategoriesScreen";
import NewCategory from "./screens/NewCategory";
import Icon from "react-native-vector-icons/FontAwesome5";
import { store } from "./store/store";
import { Provider } from "react-redux";

export type RootStackParamList = {
  Entries: undefined;
  EditEntry: { entryId: number; title: string };
};

export type CategoriesStackParamList = {
  Overview: undefined;
  NewCategory: { catId: number; title: string };
};

const Stack1 = createNativeStackNavigator<RootStackParamList>();
const Stack2 = createNativeStackNavigator<CategoriesStackParamList>();
const Tab = createBottomTabNavigator();

const EntryStackNavigator = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen name="Entries" component={HomeScreen} />
      <Stack1.Screen
        name="EditEntry"
        component={EditEntry}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack1.Navigator>
  );
};

const CategoriesStackNavigator = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen name="Overview" component={CategoriesScreen} />
      <Stack2.Screen
        name="NewCategory"
        component={NewCategory}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack2.Navigator>
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
                iconName = "home";
              } else if (route.name === "Categories") {
                iconName = "list";
              }

              // You can return any component that you like here!
              return (
                <Icon name={iconName || "home"} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "#568bff",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={EntryStackNavigator} />
          <Tab.Screen name="Categories" component={CategoriesStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
