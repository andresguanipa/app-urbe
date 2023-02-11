//React Native
import {
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";

import { useState, useEffect } from "react";

import DropDownPicker from "react-native-dropdown-picker";
/*
  interface Input {
    open: boolean | null,
    value: string | null,
    items: string[] | null,
    placeholder: string | null,
    onOpenFunction: function | null,
    onSelectItem: function | null,
  }
*/
export const Select = ({ item }) => {
  const placeholderData = {
    open: false,
    value: null,
    items: ["algo1", "algo2", "algo3", "algo4", "algo5", "algo6", "algo7"],
    placeholder: "Soy un placeholder",
    onOpenFunction: () => {
      //console.log("onOpenFunction");
    },
    onSelectItem: () => {
      //console.log("onSelectItem");
      /*
        (item) => {
          setValuePeriod(item.value);
          let selectedPeriodValue = item.value;
          mountContent(selectedPeriodValue);
        }
      */
    },
  };

  //States
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [placeholder, setPlaceholder] = useState(null);
  const [onOpenFunction, setOnOpenFunction] = useState(null);
  const [onSelectItem, setOnSelectItem] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log("====================================");
    // console.log("placeholderData");
    // console.log(placeholderData);
    // console.log("====================================");
    setOpen(placeholderData.open);
    setValue(placeholderData.value);
    setItems(placeholderData.items);
    setPlaceholder(placeholderData.placeholder);
    setOnOpenFunction(placeholderData.onOpenFunction);
    setOnSelectItem(placeholderData.onSelectItem);
    setShow(true);
  }, []);

  return (
    <>
      {show ? (
        <DropDownPicker
          //Data
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          //Styles
          disableBorderRadius={false}
          itemSeparator={true}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          textStyle={styles.textStyle}
          style={styles.style}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          //Function
          onOpen={onOpenFunction} //item
          placeholder={placeholder} //item
          onSelectItem={onSelectItem} //item
          translation={{
            NOTHING_TO_SHOW: "Cargando...",
          }}
          closeOnBackPressed={true}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    backgroundColor: "#98a49e",
    marginVertical: "3%",
  },
  textStyle: {
    fontSize: 16,
  },
  style: {
    width: "95%",
    height: 60,
    backgroundColor: "white",
    borderColor: "#000042",
    marginVertical: "1%",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 10,
    borderWidth: 1,
  },
  dropDownContainerStyle: {
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "white",
    borderColor: "#000042",
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
    position: "relative",
    top: 0,
  },
  selectedItemContainerStyle: {
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
});
