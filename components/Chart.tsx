import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function Chart() {
  const entries = useSelector((state: RootState) => state.entries.entries);

  const colors = {
    color1: "#ffd1dc",
    color2: "#ffd6d1",
    color3: "#d1d1ff",
    color4: "#ffd1d1",
    color5: "#d1ffd6",
    color6: "#d1ffd1",
    color7: "#d6d1ff",
    color8: "#d1fff6",
    color9: "#f6d1ff",
    color10: "#ffd1f6",
  };

  const groupedEntries = entries.reduce((acc: { [key: string]: { amount: number; color: string } }, entry) => {
    if (entry.category && entry.category.id !== undefined && entry.amount < 0) {
      const name = entry.category.name;
      const amount = entry.amount;
      if (!acc[name]) {
        acc[name] = { amount: 0, color: colors[`color${entry.category.id}` as keyof typeof colors] };
      }
      acc[name].amount += amount;
    }
    return acc;
  }, {});
  
  const data2 = Object.entries(groupedEntries).map(([name, { amount, color }]) => ({
    name,
    amount,
    color,
    legendFontColor: "black",
    legendFontSize: 15,
  }));



  return (
    <View>
        <Text style={{fontSize: 19, fontWeight: "700", paddingVertical: 10, paddingHorizontal:5}} >Expenses Overview</Text>
      <PieChart
        data={data2}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="amount"
        backgroundColor="white"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({});
