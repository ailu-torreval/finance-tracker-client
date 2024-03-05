import { View, Text, Alert, TextInput, Pressable } from "react-native";
import { CategoriesStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createCategory, deleteCategory, updateCategory } from "../store/categorySlice";
import { CategoriesAPI } from "../api/categoriesAPI";


type Props = NativeStackScreenProps<CategoriesStackParamList, "NewCategory">;

export default function NewCategory({ route, navigation }: Props) {
  const [categoryName, onChangeText] = React.useState("");
  const { catId } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
   async function getCategory() {
      try {
        const response = await CategoriesAPI.fetchCategory(catId.toString());
        if (response) {
          onChangeText(response.name);
        }
      } catch(error) {
        Alert.alert("Something went wrong. Please try again.");
        console.log(error);
      }
    }
    if(catId !== 0) {
      getCategory();
    }
  }, []);

  function handleCategory() {
    if(categoryName.length > 3) {
      if(catId === 0 ) {
        const categoryForUpload = {
            "name": categoryName
        };
          dispatch(createCategory(categoryForUpload));
        } else {
          dispatch(updateCategory({categoryName, id: catId.toString()}))
        }
        navigation.navigate("Overview")
    } else {
        Alert.alert("please add a valid name. Must be at least 3 characters.")
    }
  }

  function deleteCategoryById() {
    console.log("delete entry");
    dispatch(deleteCategory(catId.toString()));
    navigation.navigate("Overview");
  }

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={categoryName}
      />

<View  style={catId !== 0 && styles.buttonGrid}>
        {catId !== 0 && (
          <Pressable style={styles.deleteBtn} onPress={deleteCategoryById}>
            <Icon style={styles.white} name="trash" />
            <Text style={styles.white}>Delete Category</Text>
          </Pressable>
        )}

        <Pressable style={styles.acceptBtn} onPress={handleCategory}>
          <Icon style={styles.white} name="check" />
          <Text style={styles.white}>{ catId === 0 ? "Create Category" :"Update Category"}</Text>
        </Pressable>
      </View>

      {/* <View style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
      <Pressable style={styles.acceptBtn} onPress={handleCategory}>
        <Icon style={styles.white} name="check" />
        <Text style={styles.white}>Add Category</Text>
      </Pressable>
      </View> */}
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
  buttonGrid: {
    marginHorizontal: 2,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    width: 180
  },
  white: {
    color: "#fff",
    padding: 1,
    fontSize: 16,
  }
});
