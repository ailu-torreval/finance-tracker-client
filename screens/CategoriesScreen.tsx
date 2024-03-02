import { View, Text, SafeAreaView, FlatList, TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchCategories } from "../store/categorySlice";
import { CategoryItem } from "../components/CategoryItem";
import React from "react";

export default function CategoriesScreen() {
  const [text, onChangeText] = React.useState('');
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories())
  }, []);
  
  return (
    <View style={{marginTop: 20 }}>
      <Text>Categories</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <SafeAreaView >
      <FlatList
        data={categories}
        renderItem={({item}) => <CategoryItem name={item.name} />}
        keyExtractor={item => item.id!.toString()}
      />
    </SafeAreaView>

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
  });
