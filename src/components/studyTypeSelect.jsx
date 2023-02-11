import { useState, useEffect, createContext, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";

//Query
import { getAllStudyTypesByInscriptionId } from "../services/Queries";

export const StudyTypeContext = createContext();

export const StudyTypeSelect = () => {
  const [openStudyType, setOpenStudyType] = useState(false);
  const [valueStudyType, setValueStudyType] = useState(null);
  const [itemsStudyType, setItemsStudyType] = useState([
    { label: "PREGRADO", value: "PREGRADO" },
    { label: "POSTGRADO", value: "POSTGRADO" },
  ]);

  let contextData = useContext(StudyTypeContext);

  useEffect(() => {
    const fetchRequest = async () => {
      const allStudyTypes = await getAllStudyTypesByInscriptionId();
      setItemsStudyType(allStudyTypes);
    };
    fetchRequest();
  }, []);

  return (
    <DropDownPicker
      //Data
      open={openStudyType}
      value={valueStudyType}
      items={itemsStudyType}
      setOpen={setOpenStudyType}
      setValue={setValueStudyType}
      setItems={setItemsStudyType}
      //Styles
      disableBorderRadius={false}
      closeOnBackPressed={true}
      itemSeparator={true}
      itemSeparatorStyle={{
        backgroundColor: "#98a49e",
        marginVertical: "3%",
      }}
      textStyle={{
        fontSize: 16,
      }}
      style={{
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
      }}
      dropDownContainerStyle={{
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
      }}
      selectedItemContainerStyle={{
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
      }}
      placeholder="Seleccione un tipo de estudio"
      //Function
      onSelectItem={(item) => {
        contextData.selectedStudy = item.value;
        contextData.selected = true;
        setValueStudyType(item.value);
      }}
    />
  );
};
