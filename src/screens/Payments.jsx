import { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";

//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Alert,
  StatusBar,
} from "react-native";

import { confirmExit } from "../../utils";

import { getPayments, getAllDegreesData } from "../services/Queries";

import DropDownPicker from "react-native-dropdown-picker";

export const Payments = ({ navigation }) => {
  const miliSecondsToDays = 86400000;

  //Estados
  const [data, setData] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [showFlatList, setShowFlatList] = useState(false);

  //Dropdown
  const [openStudy, setOpenStudy] = useState(false);
  const [valueStudy, setValueStudy] = useState(null);
  const [itemsStudy, setItemsStudy] = useState([]);

  //UseEffect
  useEffect(() => {
    const fetchRequest = async () => {
      const allDegrees = await extractAllDegrees();
      if (allDegrees.length == 0) {
        //El verdadero mensaje debe ser "Usted no tiene estudios activos" pero el mensaje de abajo me parece más apropiado
        Alert.alert("PAGOS", "Usted no posee pagos pendientes");
        navigation.navigate("Profile");
      } else {
        setItemsStudy(allDegrees);
      }
    };
    fetchRequest();
  }, []);

  const extractAllDegrees = async () => {
    let extractedDegrees = [];
    const studiesData = await getAllDegreesData();
    studiesData.map((study) => {
      if (
        study.studyState == "ACTIVO" &&
        !extractedDegrees.some((item) => {
          return item.value === study.studyTypeValue;
        })
      ) {
        extractedDegrees = [
          ...extractedDegrees,
          {
            label: study.studyType,
            value: study.studyTypeValue,
          },
        ];
      }
    });
    return extractedDegrees;
  };

  //FlatList
  const PaymentInfo = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.big, { textAlign: "left" }]}>{item.name}</Text>
      <Text style={styles.medium}>
        {item.state == "INACTIVO" ? 0 : formatNumber(item.balance)}
      </Text>
      <Text style={styles.big}>{item.date}</Text>
      <View style={styles.tiny}>
        {item.state == "INACTIVO" ? (
          <Ionicons name="checkmark" size={24} color="green" />
        ) : null}
      </View>
    </View>
  );

  const renderPaymentInfo = ({ item, index }) => {
    return <PaymentInfo item={item} index={index} />;
  };

  //Funciones
  //Función para resetear los datos trabajados de la tabla
  const resetTable = () => {
    setSaldoTotal(0);
    setMessage("");
  };

  //Función para dar formato a la fecha
  const formatDate = (date) => {
    date = date.split("-").reverse().join("-");
    return date;
  };

  //Función para ejecutar las funciones deseadas al seleccionar un estudio dentro del dropdown
  const dropdownUpdate = (paymentData) => {
    try {
      totalToPay(paymentData);
      updateMessage(paymentData);
    } catch (error) {}
  };

  //Función para dar formato a los números dentro del saldo en la tabla
  const formatNumber = (number) => {
    let newNumber;
    newNumber = Number(parseFloat(number)).toFixed(2);
    if (newNumber != 0) {
      newNumber = Number(number).toFixed(2);
    }
    newNumber = `${newNumber}`;
    newNumber = newNumber.replace(".", ",");
    return newNumber;
  };

  //Función que toma el día actual del dispositivo y lo convierte a una fecha con formato yyyy-mm-dd
  const getCurrentDay = () => {
    let date = new Date().getDate();
    if (date < 10) date = `0${date}`;
    let month = new Date().getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let year = new Date().getFullYear();
    let day = `${year}-${month}-${date}`;
    return day;
  };

  //Función que recibe los días de pago y retorna la fecha de vencimiento del siguiente pago
  const nextPayDate = (paymentData) => {
    let nextPay;
    let found = false;
    paymentData.map((element) => {
      if (element.state == "ACTIVO" && found == false) {
        found = true;
        nextPay = formatDate(element.date);
      }
    });
    return nextPay;
  };

  //Función que calcula el delta de días entre la fecha actual y la fecha de vencimiento del siguiente pago
  const getDaysToNextPay = (paymentData) => {
    let date = new Date(getCurrentDay());
    let nextPay = new Date(nextPayDate(paymentData));
    let daysDelta = Math.round((nextPay - date) / miliSecondsToDays);
    return daysDelta;
  };

  //Función que actualiza el mensaje de pago debajo de la tabla
  const updateMessage = (paymentData) => {
    let nextPayment = getDaysToNextPay(paymentData);
    if (nextPayment < 0) {
      setMessage(`Usted lleva ${nextPayment * -1} días de retraso en el pago.`);
    } else if (nextPayment > 0) {
      setMessage(`El siguiente pago es en ${nextPayment} días.`);
    } else if (nextPayment == 0) {
      setMessage(`Hoy corresponde el pago.`);
    } else {
      setMessage("");
    }
  };

  //Función que calcula el total a pagar por el estudiante
  const totalToPay = (paymentData) => {
    let saldoTotal = 0;
    paymentData.forEach((element) => {
      if (element.state == "ACTIVO") {
        saldoTotal += element.balance;
      }
    });
    setSaldoTotal(formatNumber(saldoTotal));
  };

  //Header JSX del FlatList
  const flatListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.big, styles.white]}>Descripción</Text>
        <Text style={[styles.medium, styles.white]}>Monto (Bs.)</Text>
        <Text style={[styles.big, styles.white]}>Fecha de Pago</Text>
        <Text style={[styles.tiny, styles.white]}></Text>
      </View>
    );
  };

  //Footer JSX del FlatList
  const flatListFooter = () => {
    return (
      <>
        <View style={styles.row}>
          <Text style={styles.big}>TOTAL A PAGAR:</Text>
          <Text style={styles.medium}>
            {saldoTotal == 0 ? null : saldoTotal}
          </Text>
          <Text style={styles.big}></Text>
          <Text style={styles.tiny}></Text>
        </View>
        {message ? (
          <View style={styles.padding}>
            <Text style={styles.text}>{message}</Text>
          </View>
        ) : null}
        <Pressable
          style={styles.button}
          onPress={() => confirmExit(`https://notificapago.urbe.edu/`)}
        >
          <Text style={styles.buttonText}>NOTIFICAR PAGO</Text>
        </Pressable>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
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
          setIsSelected(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 30000);
        }}
        placeholder="Seleccione un estudio"
        onSelectItem={async (item) => {
          setIsLoading(true);
          resetTable();
          let payments = await getPayments(item.value);
          if (payments.length == 0) {
            setShowFlatList(false);
            setIsSelected(false);
            Alert.alert(
              "PAGOS",
              "No se han encontrado deudas para este estudio."
            );
          } else {
            setData(payments);
            dropdownUpdate(payments);
            setShowFlatList(true);
            setIsLoading(false);
          }
        }}
      />
      {isSelected ? (
        isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator
              style={styles.spinner}
              size="large"
              color="#000042"
            />
          </View>
        ) : (
          <>
            {showFlatList ? (
              <View style={styles.card}>
                <FlatList
                  data={data}
                  renderItem={renderPaymentInfo}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponent={flatListHeader}
                  ListFooterComponent={flatListFooter}
                />
              </View>
            ) : null}
          </>
        )
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
  button: {
    margin: "2%",
    width: "45%",
    height: Dimensions.get("window").height * 0.045,
    backgroundColor: "#B31105",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.get("window").height * 0.008,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.018,
  },
  card: {
    width: "98%",
    borderRadius: 10,
    margin: "1%",
    paddingBottom: "2.5%",
    backgroundColor: "white",
  },
  center: {
    alignSelf: "center",
  },
  row: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: "1%",
    textAlign: "center",
    alignItems: "center",
  },
  header: {
    paddingVertical: "2.5%",
    backgroundColor: "#000042",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    textAlign: "center",
    alignItems: "center",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  big: {
    fontSize: Dimensions.get("window").height * 0.018,
    flex: 0.35,
    textAlign: "center",
  },
  medium: {
    fontSize: Dimensions.get("window").height * 0.018,
    flex: 0.23,
    textAlign: "center",
  },
  tiny: {
    fontSize: Dimensions.get("window").height * 0.018,
    flex: 0.07,
    textAlign: "center",
  },
  white: {
    color: "white",
  },
  padding: {
    paddingVertical: "2%",
  },
  text: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height * 0.018,
  },
  centered: {
    height: Dimensions.get("window").height * 0.675,
    justifyContent: "center",
  },
  spinner: {
    alignSelf: "center",
    margin: "auto",
  },
  tableContainer: {
    minHeight: Dimensions.get("window").height * 0.8,
  },
  //Dropdown
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
