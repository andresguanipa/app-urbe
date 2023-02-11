import { useState, useEffect, useCallback } from "react";
//React Native Components
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
  Pressable,
  StatusBar,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

//Functions
import {
  getAllPeriods,
  getAllDegrees,
  getGrades,
  getInscriptionIdByStudyId,
} from "../services/Queries";

export const TermGrades = ({ navigation, route }) => {
  //La carta con su respectiva nota
  const renderCardItem = ({ item, index }) => (
    <CardItem item={item} index={index} />
  );

  //Modelos iterables del flatlist
  const CardItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.name}>{item.materia}</Text>
          <Text style={styles.sectionText}>Sección: {item.seccion}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.ball}>
            <Text style={styles.text}>{item.notaAcumulativa}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <FlatList
          data={DATA[index].notas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );

  //La iteración de la nota dentro de la carta
  const renderItem = ({ item, index }) => <Item item={item} index={index} />;

  const Item = ({ item, index }) => (
    <View style={styles.insideCard}>
      <Text style={styles.text}>
        {index + 1} Corte ({item.peso}%)
      </Text>
      <Text style={styles.text}>
        {item.notaParcial}/{item.base}
      </Text>
    </View>
  );

  useEffect(() => {
    const fetchRequest = async () => {
      const setStudy = setItemsStudy(await getAllDegrees());
    };
    fetchRequest();
  }, []);

  //Toma el valor de la carrera e introduce el mismo dentro de la consulta para verificar los periodos de la misma
  const mountPeriodDropdown = async (selectedStudyValue) => {
    const inscriptionId = await getInscriptionIdByStudyId(selectedStudyValue);
    const periodData = await getAllPeriods(inscriptionId);
    setItemsPeriod(periodData);
  };

  //Monta el contenido que devuelve la consulta del periodo
  const mountContent = async (selectedPeriodValue) => {
    setIsLoading(true);
    const inscriptionId = await getInscriptionIdByStudyId(valueStudy);
    const data = await getGrades(selectedPeriodValue, inscriptionId);
    if (data.length == 0) {
      Alert.alert(
        "CORTE DE NOTAS",
        "Todavía no se han cargado las notas de este corte"
      );
    }
    setDATA(data);
    setShowFlatList(true);
    setIsLoading(false);
  };

  //States
  const [isLoading, setIsLoading] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);
  const [DATA, setDATA] = useState();

  const [openStudy, setOpenStudy] = useState(false);
  const [valueStudy, setValueStudy] = useState(null);
  const [itemsStudy, setItemsStudy] = useState([]);

  const [openPeriod, setOpenPeriod] = useState(false);
  const [valuePeriod, setValuePeriod] = useState(null);
  const [itemsPeriod, setItemsPeriod] = useState([]);

  //Functions to close
  const onOpenStudy = useCallback(() => {
    setOpenPeriod(false);
  }, []);
  const onOpenPeriod = useCallback(() => {
    setOpenStudy(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.scroll}>
        <DropDownPicker
          //Data
          open={openStudy}
          value={valueStudy}
          items={itemsStudy}
          setOpen={setOpenStudy}
          setValue={setValueStudy}
          setItems={setItemsStudy}
          //Styles
          translation={{
            NOTHING_TO_SHOW: "Cargando...",
          }}
          disableBorderRadius={false}
          closeOnBackPressed={true}
          itemSeparator={true}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          textStyle={styles.textStyle}
          style={styles.style}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          //Function
          onOpen={() => {
            onOpenStudy();
            setShowFlatList(false);
            setValuePeriod(null);
            setItemsPeriod([]);
          }}
          placeholder="Seleccione un estudio"
          onSelectItem={(item) => {
            setValueStudy(item.value);
            let selectedStudyValue = item.value;
            mountPeriodDropdown(selectedStudyValue);
          }}
        />
        <DropDownPicker
          //Data
          open={openPeriod}
          value={valuePeriod}
          items={itemsPeriod}
          setOpen={setOpenPeriod}
          setValue={setValuePeriod}
          setItems={setItemsPeriod}
          //Styles
          translation={{
            NOTHING_TO_SHOW: "Cargando...",
          }}
          disableBorderRadius={false}
          closeOnBackPressed={true}
          itemSeparator={true}
          itemSeparatorStyle={styles.itemSeparatorStyle}
          textStyle={styles.textStyle}
          style={styles.style}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          //Function
          onOpen={onOpenPeriod}
          placeholder="Seleccione un periodo"
          onSelectItem={(item) => {
            setValuePeriod(item.value);
            let selectedPeriodValue = item.value;
            mountContent(selectedPeriodValue);
          }}
        />
        {showFlatList ? (
          <FlatList
            data={DATA}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.id}
          />
        ) : isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#000042" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    width: "100%",
    alignContent: "center",
  },
  card: {
    width: "95%",
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: "white",
  },
  name: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.022,
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  sectionText: {
    fontSize: Dimensions.get("window").height * 0.02,
    color: "white",
  },
  text: {
    fontSize: Dimensions.get("window").height * 0.02,
  },
  header: {
    backgroundColor: "#000042",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  left: {
    width: "85%",
    alignContent: "center",
    justifyContent: "center",
    padding: "2%",
  },
  right: {
    width: "15%",
    alignContent: "center",
    justifyContent: "center",
    padding: "2%",
  },
  ball: {
    width: Dimensions.get("window").height * 0.05,
    height: Dimensions.get("window").height * 0.05,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    backgroundColor: "white",
    marginRight: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: "2%",
  },
  insideCard: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemSeparatorStyle: {
    backgroundColor: "#98a49e",
    marginVertical: "3%",
  },
  textStyle: {
    fontSize: Dimensions.get("window").height * 0.018,
    fontWeight: "600",
  },
  style: {
    width: "95%",
    height: Dimensions.get("window").height * 0.0825,
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
