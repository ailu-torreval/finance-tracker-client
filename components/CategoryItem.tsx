import { View, Text } from "react-native";

type Props = {
    name: string;
}

export function CategoryItem(props: Props) {
    const {name} = props;
  return (
    <View>
        <Text>{name}</Text>
    </View>
  )
}

