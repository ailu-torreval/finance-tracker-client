import { View, Text, FlatList, Pressable } from "react-native";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEntries } from "../store/entrySlice";
import { FAB } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { fetchCategories } from "../store/categorySlice";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Entry } from "../entities/entry";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Entries">;

export default function HomeScreen({ navigation }: Props) {
  const entries = useSelector((state: RootState) => state.entries.entries);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  // const [entries, setEntries] = useState<Entry[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEntries());
    dispatch(fetchCategories());
    calculateTotal();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [entries]);

  function calculateTotal() {
    const total = entries.reduce((total, entry) => total + entry.amount, 0);
    setTotalAmount(total);
  }

  // const entries1 = [25, 30, 45, 23, 456];

  return (
    <View style={styles.view}>
      <View style={styles.item}>
        <Text style={{ textTransform: "capitalize", fontSize: 19, flex: 1, fontWeight: "700"}}>
          Total:
        </Text>
        <Text
          style={[
            styles.amount,
            totalAmount > 0
              ? {
                  color: "green",
                  textAlign: "left",
                }
              : {
                  color: "red",
                  textAlign: "right",
                },
          ]}
        >
          {totalAmount} kr.
        </Text>
      </View>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <Item
            entry={item}
            action={() =>
              navigation.navigate("EditEntry", { entryId: Number(item.id), title: 'Edit Entry' })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ backgroundColor: "lightgrey" }}
        style={{ backgroundColor: "lightgrey" }}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        onPress={() => navigation.navigate("EditEntry", { entryId: 0 , title: "Add New Entry"})}
        placement="right"
        size="large"
        color="#568bff"
      />
    </View>
  );
}

type ItemProps = { entry: Entry; action: any };

const Item = (props: ItemProps) => (
  <View
    style={[
      styles.item,
      props.entry.category &&
        styles[`category${props.entry.category.id}` as keyof typeof styles],
    ]}
  >
    {/* <View style={styles.itemGrid}> */}
    <Text style={{ textTransform: "capitalize", fontSize: 15, flex: 1 }}>
      {props.entry.name}
    </Text>
    <Text
      style={[
        styles.amount,
        props.entry.amount > 0
          ? {
              color: "green",
              textAlign: "left",
            }
          : {
              color: "red",
              textAlign: "right",
            },
      ]}
    >
      {props.entry.amount} kr.
    </Text>
    {/* </View> */}
    <Pressable style={styles.iconBtn} onPress={props.action}>
      <Icon name="pen" />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  iconBtn: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 12,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 8,
  },
  itemGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
    width: "80%",
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
  amount: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    paddingHorizontal: 55,
  },
});
