import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from "react-native";

export default function App() {
  const [gramsInput, setGramsInput] = useState("0.0")
  const [calsInput, setCalsInput] = useState("0.0")
  const [bigOutput, setBigOutput] = useState("0.0")
  const [sumOutput, setSumOutput] = useState("0.0")
  const [prevSum, setPrevSum] = useState("0.0")
  const [limitInput, setLimitInput] = useState("0.0")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.big1}>
        <Text style={styles.bigText}>{bigOutput}</Text>
      </View>
      <View style={styles.big2}>
        <View style={styles.halfLeft}>
          <Text style={styles.smallText}>grams:</Text>
          <Text style={styles.smallerText}>Kcal/100g:</Text>
        </View>
        <View style={styles.halfRight}>
          <TextInput style={styles.input} placeholder="0.0" onChangeText={(val) => setGramsInput(val)}/>
          <TextInput style={styles.input} placeholder="0.0" onChangeText={(val) => setCalsInput(val)}/>
        </View>
      </View>
      <View style={styles.small1}>
        <Button title="CALCULATE" color="teal" onPress={() => setBigOutput(calculate(gramsInput, calsInput))}/>
      </View>     
      <View style={styles.small2}>
          <Text style={ [ styles.smallText, [(sumOutput > limitInput) ? {color:"red"} : {color:"teal"}] ] }>Today: {sumOutput}</Text>
      </View>
      <View style={styles.small1}>
      <View style={styles.halfLeft}>
        <Button title="ADD" color="teal" onPress={() => {
          setPrevSum(sumOutput); 
          setSumOutput(addToSum(sumOutput, bigOutput));
        }
        }/>
        </View>
        <View style={styles.halfRight}>
          <Button title="UNDO" color="teal" onPress={() => setSumOutput(prevSum)}/>
        </View>
      </View>
      <View style={styles.small2}>
        <View style={styles.halfLeft}>
          <Text style={styles.smallerText}>Daily limit:</Text>
        </View>
        <View style={styles.halfRight}>
        <TextInput style={styles.input} placeholder="0.0" onChangeText={(val) => setLimitInput(val)}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const calculate = (g, c) => {
  var grams = +(g)
  var cals = +(c)
  var output = grams / 100 * cals
  output = output.toFixed(2)
  console.log(output)
  return output
}

const addToSum = (s, b) => {
  var sum = +(s) 
  var big = +(b) 
  return sum + big
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  big1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  big2: {
    flex: 0.8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
  },
  big3: {
    flex: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  small1: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  small2: {
    flex: 0.5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
  },
  halfLeft: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 0,
  },
  halfRight: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
  },
  bigText: {
    fontSize: 80, 
    color:"teal",
    marginTop: 50,
  },
  smallText: {
    fontSize: 40, 
    color:"teal"
  },
  smallerText: {
    fontSize: 30, 
    color:"teal",
  },
  input: {
    borderWidth: 1,
    borderColor: "teal",
    color: "teal",
    padding: 5,
    width: 100,
    marginTop: 10,
  },
});
