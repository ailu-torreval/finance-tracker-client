import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { CategoriesStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { Category } from "../entities/category";

type Props = {
  category: Category;
  action: any;
};




export function CategoryItem({ category, action}: Props) {
  return (
    <View style={[styles.item, styles[`category${category.id}` as keyof typeof styles]]}>
      <Text style={{textTransform: "capitalize",fontSize: 16}}>{category.name}</Text>
      <Pressable style={styles.iconBtn} onPress={action}>
      <Icon name="pen" />
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 8,
    textTransform: "capitalize",
  },
  iconBtn: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 12,
  },
  category1: {
    backgroundColor: "#ffd1dc", // pastel pink
  },
  category2: {
    backgroundColor: "#ffd6d1", // pastel green
  },
  category3: {
    backgroundColor: "#d1d1ff", // pastel blue
  },
  category4: {
    backgroundColor: "#ffd1d1", // pastel red
  },
  category5: {
    backgroundColor: "#d1ffd6", // pastel mint
  },
  category6: {
    backgroundColor: "#d1ffd1", // pastel peach
  },
  category7: {
    backgroundColor: "#d6d1ff", // pastel lavender
  },
  category8: {
    backgroundColor: "#d1fff6", // pastel aqua
  },
  category9: {
    backgroundColor: "#f6d1ff", // pastel purple
  },
  category10: {
    backgroundColor: "#ffd1f6", // pastel magenta
  },
});
