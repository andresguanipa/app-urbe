import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const options = [
  { id: 1, name: "Muy Malo", value: 1 },
  { id: 2, name: "Malo", value: 2 },
  { id: 3, name: "Regular", value: 3 },
  { id: 4, name: "Bueno", value: 4 },
  { id: 5, name: "Muy Bueno", value: 5 },
];

export const RadioButton = ({ onSelect }) => {
  const renderItem = ({ item }) => <Item style={styles.button} item={item} />;
  const Item = ({ item }) => (
    <View style={styles.column}>
      <Text style={styles.text}>{item.name}</Text>
      <Pressable
        style={item.value === userOption ? styles.selected : styles.unselected}
        onPress={() => selectHandler(item.value)}
      ></Pressable>
    </View>
  );

  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    alignItems: "center",
    width: Dimensions.get("window").width / 5.2,
  },
  container: {
    flex: 1,
    paddingVertical: "2%",
  },
  selected: {
    backgroundColor: "#000042",
    borderWidth: 1,
    borderColor: "#000042",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  unselected: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000042",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: 25,
    height: 25,
  },
});
