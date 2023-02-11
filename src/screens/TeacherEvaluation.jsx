import { useEffect, useState } from "react";

//Componentes de React Native
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";

//Componentes
import { RadioButton } from "../components/buttons/RadioButton";

//Consultas
//import { getQuestionsToEvaluate } from "../services/Queries";

export const TeacherEvaluation = ({ navigation, route }) => {
  //Parent State
  let teacherEvaluated = route.params;

  /*useEffect(async () => {
    let data = await getQuestionsToEvaluate();
    setQuestions(data);
  }, []);*/

  //States
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [showFlatList, setShowFlatList] = useState(true);
  //const [option, setOption] = useState([]);
  let option = [];
  let points = 0;

  //Verifica cuantas preguntas hay en total
  const checkQuestionsLength = async () => {
    let length = 0;
    questions.forEach((element) => {
      length += element.questions.length;
    });
    return length;
  };

  //Verifica si el valor
  const checkValue = async (id, fatherId, value) => {
    let i = 0;
    option.forEach((element) => {
      if (element.evaluacionId == fatherId && element.preguntaId == id) {
        option.splice(i, 1);
        i -= 1;
      }
      i += 1;
    });
    storeValue(id, fatherId, value);
  };

  const storeValue = (id, fatherId, value) => {
    let newValue;
    newValue = {
      evaluacionId: fatherId,
      preguntaId: id,
      value: value,
    };
    option.push(newValue);
  };

  const calculate = () => {
    option.forEach((element) => {
      points += element.value;
    });
  };

  const sendReview = async () => {
    if (option.length == (await checkQuestionsLength())) {
      alert("Gracias por enviarnos su opinión");
      calculate();

      //Poner función de envío aquí
      //Debe enviar la suma del puntaje y el mensaje del textinput
      //console.log("Puntos: " + points + " Mensaje: " + message);
      navigation.navigate("TermGrades");
    } else {
      alert("Error. Debe contestar todas las preguntas");
    }
  };

  const renderItemSeccion = ({ item, index }) => (
    <ItemSeccion item={item} index={index} />
  );
  const ItemSeccion = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.subTitle}>
          {index + 1}. {item.categoriaEvaluacion}
        </Text>
      </View>
      <FlatList
        data={questions[index].questions}
        renderItem={renderItemPregunta}
        keyExtractor={(item) => item.idIndicadorEvaluacion}
      />
    </View>
  );

  const renderItemPregunta = ({ item }) => <ItemPregunta item={item} />;
  const ItemPregunta = ({ item }) => (
    <View style={styles.cardContent}>
      <Text style={styles.question}>{item.indicadorEvaluacion}</Text>
      <RadioButton
        onSelect={(value) => {
          checkValue(item.idIndicadorEvaluacion, item.idPadre, value);
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView>
        <Text style={styles.title}>Evaluación Docente</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.subTitle}>
              ¿Tiene algún comentario sobre su Profesor/a?
            </Text>
          </View>
          <View style={styles.cardContent}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Ingrese su comentario (Opcional)"
              onChangeText={setMessage}
              value={message}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
        </View>
        <FlatList
          data={questions}
          renderItem={renderItemSeccion}
          keyExtractor={(item) => item.idCategoriaEvaluacion}
        />
        <Pressable style={styles.button} onPress={sendReview}>
          <Text style={styles.buttonText}>Envíar evaluación</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 22,
    marginVertical: "5%",
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    marginVertical: "1%",
    textAlign: "center",
  },
  subTitle: {
    color: "white",
    fontSize: 20,
    marginVertical: "2%",
    textAlign: "center",
  },
  question: {
    fontSize: 16,
    margin: "2%",
  },
  button: {
    margin: "2%",
    width: "75%",
    height: Dimensions.get("window").height * 0.08,
    borderRadius: 10,
    backgroundColor: "#b31105",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: Dimensions.get("window").height * 0.07,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  container: {
    flex: 1,
  },
  card: {
    width: "98%",
    backgroundColor: "white",
    borderRadius: 11,
    margin: "1%",
  },
  cardHeader: {
    backgroundColor: "#000042",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    width: "100%",
    borderColor: "#000042",
    borderTopWidth: 0.5,
    paddingVertical: "1%",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: Dimensions.get("window").height * 0.2,
    margin: "1%",
    padding: "2%",
    width: "98%",
  },
});
