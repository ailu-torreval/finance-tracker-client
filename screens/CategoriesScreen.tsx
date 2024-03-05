import React from "react";
import { View, Text, SafeAreaView, FlatList, TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CategoryItem } from "../components/CategoryItem";
import { FAB } from "@rneui/themed";
import { Chart } from "../components/Chart";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../App";

type Props = NativeStackScreenProps<CategoriesStackParamList, "Overview">;

export default function CategoriesScreen({ navigation }: Props) {
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );


  
  return (
    <View style={{marginTop: 20, flex: 1 }}>
      <SafeAreaView >
      <FlatList
        data={categories}
        renderItem={({item}) => <CategoryItem category={item} action={() =>
          navigation.navigate("NewCategory", { catId: Number(item.id), title: "Edit Category"})
        } />}
        keyExtractor={item => item.id!.toString()}
      />
    </SafeAreaView>

    <Chart/>


<FAB
        icon={{ name: "add", color: "white" }}
        onPress={() => navigation.navigate("NewCategory", { catId: 0, title: "Add New Category"})}
        placement="right"
        size="large"
        color="#568bff"
      />

    </View>
  );
}
  const styles = StyleSheet.create({

  });
