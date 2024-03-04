import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { Entry } from "../entities/entry";
import { EntriesAPI } from "../api/entriesAPI";
import React from "react";
import { ButtonGroup, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createEntry, deleteEntry, updateEntry } from "../store/entrySlice";
import { EntryDTO } from "../entities/entryDTO";

type Props = NativeStackScreenProps<RootStackParamList, "EditEntry">;

export default function EditEntry({ route, navigation }: Props) {
  const [entry, setEntry] = React.useState<Entry>({} as Entry);
  const [isIncome, setIsIncome] = React.useState<0 | 1>();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const { entryId } = route.params;
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function getEntry() {
      try {
        const response = await EntriesAPI.fetchEntry(entryId.toString());
        if (response) {
          setEntry(response);
          if (response.amount > 0) {
            setIsIncome(0);
          } else {
            setIsIncome(1);
          }
        }
      } catch (error) {
        Alert.alert("Something went wrong. Please try again.");
        console.log(error);
      }
    }
    if (entryId !== 0) {
      getEntry();
    } else {
      setEntry({ ...entry, date: new Date(), currency: "DKK" });
    }
  }, []);

  function deleteEntryById() {
    console.log("delete entry");
    dispatch(deleteEntry(entry.id.toString()));
    navigation.navigate("Entries");
  }

  function handleEntry() {
    if (entry.category?.id && entry.amount && entry.currency && entry.date && entry.name) {
      console.log(entry.amount, isIncome);

      isIncome === 0
        ? (entry.amount = Math.abs(entry.amount))
        : (entry.amount = -Math.abs(entry.amount));

      const entryDto = new EntryDTO(
        entry.amount,
        entry.date,
        entry.currency,
        entry.name,
        entry.category?.id
      );

      if(entryId === 0) {
        dispatch(createEntry(entryDto));
      } else {
        dispatch(updateEntry({ entry: entryDto, id: entry.id.toString() }));
      }

      navigation.navigate("Entries");
    } else {
      Alert.alert("Please fill all the fields. Remember to choose a category.")
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 5 }}>
      <View>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setEntry((prevState) => ({ ...prevState, name: value }))
          }
          value={entry.name ? entry.name : ""}
        />
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setEntry((prevState) => ({ ...prevState, amount: Number(value) }))
          }
          value={entry.amount ? Math.abs(entry.amount).toString() : ""}
          keyboardType="numeric"
        />

        <ButtonGroup
          buttons={["Income", "Expense"]}
          selectedIndex={isIncome}
          onPress={(value) => {
            setIsIncome(value);
          }}
          containerStyle={{ marginBottom: 20 }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                mode="single"
                date={entry.date}
                onChange={(params) => {
                  setEntry((prevState) => ({
                    ...prevState,
                    date: new Date(params.date as Date),
                  }));
                }}
              />
              <Pressable
                style={styles.iconBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>Accept</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonGrid}>
          <View>
            <Text>Date:</Text>
            <Text>
              {entry.date &&
                new Date(entry.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
            </Text>
          </View>
          <Pressable
            style={styles.iconBtn}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="pen" />
          </Pressable>
        </View>

        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>
                  Category: {entry.category && entry.category.name}
                </ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          {categories.map((cat, i) => (
            <ListItem
              key={i}
              onPress={() => {
                setEntry((prevState) => ({
                  ...prevState,
                  category: cat,
                  categoryId: cat.id,
                }));
                setExpanded(!expanded);
              }}
              bottomDivider
              containerStyle={styles[`category${cat.id}` as keyof typeof styles]}
            >
              <ListItem.Content >
                <ListItem.Title>{cat.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ListItem.Accordion>
      </View>
      <View  style={entryId !== 0 && styles.buttonGrid}>
        {entryId !== 0 && (
          <Pressable style={styles.deleteBtn} onPress={deleteEntryById}>
            <Icon style={styles.white} name="trash" />
            <Text style={styles.white}>Delete Entry</Text>
          </Pressable>
        )}

        <Pressable style={styles.acceptBtn} onPress={handleEntry}>
          <Icon style={styles.white} name="check" />
          <Text style={styles.white}>{ entryId === 0 ? "Create Entry" :"Update Entry"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  iconBtn: {
    borderRadius: 20,
    backgroundColor: "lightblue",
    padding: 12,
  },
  buttonGrid: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteBtn: {
    borderRadius: 20,
    backgroundColor: "#ff5656",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  acceptBtn: {
    borderRadius: 20,
    backgroundColor: "#568bff",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  white: {
    color: "#fff",
    padding: 1,
    fontSize: 16,
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
  }
});
