import { View, Text, SafeAreaView, FlatList, TextInput } from "react-native";
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchCategories } from "../store/categorySlice";
import { CategoryItem } from "../components/CategoryItem";
import React from "react";
import { PieChart } from "react-native-chart-kit";

export default function CategoriesScreen() {
  const [text, onChangeText] = React.useState('');
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const data = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]

  
  return (
    <View style={{marginTop: 20 }}>
      <Text>Categoriesss</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <SafeAreaView >
      <FlatList
        data={categories}
        renderItem={({item}) => <CategoryItem name={item.name} id={item.id!} />}
        keyExtractor={item => item.id!.toString()}
      />
    </SafeAreaView>

    <PieChart
      data={data}
      width={400}
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />

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
