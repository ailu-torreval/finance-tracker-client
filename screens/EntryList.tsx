import { View, Text, Button, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">;

export default function EntryList({ navigation }: Props) {

    const entries = [25, 30, 45, 23, 456];

  return (
    <View>
      <Text>Home Screen</Text>
            <FlatList
        data={entries}
        renderItem={({ item }) =>   <View>
        <Text >{item}</Text>
        <Button
            onPress={() => navigation.navigate("EditEntry", { entryId: Number(item) })}
            title="Edit Entry"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
      </View>}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{backgroundColor:"lightgrey"}}
        style={{backgroundColor: "lightgrey"}}
      />
    </View>
  );
}
