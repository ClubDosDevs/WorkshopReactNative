import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { getFirestore, collection, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";

const firestoreDB = getFirestore();

// destructuring assingment
const DepoimentoListItem = ({ depoimento }) => {
  return (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() => {
        console.log("tocou");
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold" }}>Empresa:</Text>
        <Text>{depoimento.company}</Text>

        {/* se tocar, expande e mostra os detalhes */}
        <Text style={{ fontWeight: "bold", marginTop: 5 }}>
          Como é o banheiro:
        </Text>
        <Text>{depoimento.describeTheBathroom}</Text>

        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Como é o café:</Text>
        <Text>{depoimento.describeTheCoffee}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firestoreDB, "depoimentos"),
      (result) => {
        const lista = result.docs.map((value, index) => value.data());
        setDepoimentos(lista);
      }
    );

    // cleanup
    return () => {
      console.log("cleanup function");
      unsub();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={depoimentos}
        ItemSeparatorComponent={() => (
          <View style={{ height: 2, backgroundColor: "lightgray" }} />
        )}
        renderItem={({ item }) => <DepoimentoListItem depoimento={item} />}
      />
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
