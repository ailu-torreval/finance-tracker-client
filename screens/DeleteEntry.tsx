import { View, Text, Alert, Button } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "DeleteEntry">;


export default function DeleteEntry({route}:Props) {
  const { entryId } = route.params;

  function deleteEntry() {
    Alert.alert("Are you sure?");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Delete Entry {entryId}</Text>
      <Button
        onPress={deleteEntry}
        title="Delete Entry"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
