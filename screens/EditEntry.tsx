import { View, Text, Button, Alert } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "EditEntry">;

export default function EditEntry({ route, navigation }: Props) {
  const { entryId } = route.params;

  function deleteEntry() {
    console.log("delete entry");
    Alert.alert("Are you sure?");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Edit Entry {entryId} </Text>
      <Button
        onPress={() => navigation.navigate("DeleteEntry", { entryId: 123 })}
        title="Delete Entry"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
