import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, TextInput, ToastAndroid } from "react-native";

import { Text, View } from "../components/Themed";

const firestoreDB = getFirestore();

export default function TabTwoScreen() {
  const [empresa, setEmpresa] = useState("");
  const [banheiro, setBanheiro] = useState("");
  const [cafe, setCafe] = useState("");

  const onPressEnviar = async () => {
    if (!empresa || !banheiro || !cafe) {
      ToastAndroid.show("Preenche o formulário ai papito!!", ToastAndroid.LONG);
      return;
    }

    try {
      await addDoc(collection(firestoreDB, "depoimentos"), {
        company: empresa,
        describeTheBathroom: banheiro,
        describeTheCoffee: cafe,
        timestamp: new Date(),
      });
      setBanheiro("");
      setCafe("");
      setEmpresa("");
      ToastAndroid.show(
        "Obrigado, seu depoimento foi salvo com sucesso!",
        ToastAndroid.LONG
      );
    } catch (e) {
      console.log(e);
      ToastAndroid.show("Opa, deu algum erro papito!", ToastAndroid.SHORT);
    }
  };

  // TODO: useRef para capturar o valor
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu depoimento</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ width: "100%", padding: 16 }}>
        <TextInput
          placeholder="Qual empresa você trabalha?"
          style={{ width: "100%", borderColor: "blue", borderWidth: 1 }}
          onChangeText={setEmpresa}
          value={empresa}
        />

        <TextInput
          multiline={true}
          numberOfLines={2}
          onChangeText={setCafe}
          value={cafe}
          placeholder="Como é o café?"
          style={{
            width: "100%",
            borderColor: "blue",
            borderWidth: 1,
            marginTop: 8,
          }}
        />

        <TextInput
          multiline={true}
          numberOfLines={2}
          placeholder="Como é o banheiro?"
          onChangeText={setBanheiro}
          value={banheiro}
          style={{
            width: "100%",
            borderColor: "blue",
            marginTop: 8,
            borderWidth: 1,
            marginBottom: 16,
          }}
        />

        <Button title="Enviar" onPress={onPressEnviar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
