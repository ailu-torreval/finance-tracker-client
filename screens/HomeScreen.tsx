import { View, Text, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEntries } from "../store/entrySlice";
import { EntriesAPI } from "../api/entriesAPI";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

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
  }, []);

  // const entries1 = [25, 30, 45, 23, 456];

  return (
    <View>
      <Text>Home Screen</Text>
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
                navigation.navigate("EditEntry", { entryId: Number(item) })
              }
              title="Edit Entry"
              color="#841584"
              accessibilityLabel="Learn more about this purkple buutton"
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ backgroundColor: "lightgrey" }}
        style={{ backgroundColor: "lightgrey" }}
      />
    </View>
  );
}
