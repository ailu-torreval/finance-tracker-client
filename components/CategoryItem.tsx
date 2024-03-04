import { View, Text } from "react-native";
import { StyleSheet } from "react-native";


type Props = {
    name: string;
    id: number;
}

export function CategoryItem(props: Props) {
    const {name, id} = props;
  return (
    <View style={[styles.item, styles[`category${id}` as keyof typeof styles]]}>
        <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 8,
  },
  category1: {
    backgroundColor: "#ffd1dc" // pastel pink
  },
  category2: {
    backgroundColor: "#ffd6d1" // pastel green
  },
  category3: {
    backgroundColor: "#d1d1ff" // pastel blue
  },
  category4: {
    backgroundColor: "#ffd1d1" // pastel red
  },
  category5: {
    backgroundColor: "#d1ffd6" // pastel mint
  },
  category6: {
    backgroundColor: "#d1ffd1" // pastel peach
  },
  category7: {
    backgroundColor: "#d6d1ff" // pastel lavender
  },
  category8: {
    backgroundColor: "#d1fff6" // pastel aqua
  },
  category9: {
    backgroundColor: "#f6d1ff" // pastel purple
  },
  category10: {
    backgroundColor: "#ffd1f6" // pastel magenta
  },
});