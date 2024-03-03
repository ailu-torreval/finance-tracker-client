import { View, Text, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEntries } from "../store/entrySlice";
import { FAB } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { fetchCategories } from "../store/categorySlice";

type Props = NativeStackScreenProps<RootStackParamList, "Entries">;

type Entry = {
  id: number;
  amount: number;
  date: Date;
  currency: string;
  name: string;
  comment: string;
};

export default function HomeScreen({ navigation }: Props) {
  const entries = useSelector((state: RootState) => state.entries.entries);

  // const [entries, setEntries] = useState<Entry[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEntries());
    dispatch(fetchCategories())
  }, []);

  // const entries1 = [25, 30, 45, 23, 456];

  return (
    <View style={styles.view}>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.name}
              {item.id}
            </Text>
            <Button
              onPress={() =>
                navigation.navigate("EditEntry", { entryId: Number(item.id) })
              }
              title="Edit Entry"
              color="#841584"
              accessibilityLabel="Learn more about this purple buutton"
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ backgroundColor: "lightgrey" }}
        style={{ backgroundColor: "lightgrey" }}
      />
            <FAB
  
        icon={{ name: 'add', color: 'white' }}
        placement="right"
        size="large"
      />

    <FAB
      style={{ width: "80%", margin: 20 }}
      placement="right"
      size="small"
      title="Add Entry"
      color="red"
      icon={{ name: "add", color: "#fff" }}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex:1
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
