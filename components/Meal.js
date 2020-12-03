import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Meal = () => {
    const [value, onChangeText] = React.useState('0');
    const [spinnerValue, onChangeSpinnerValue] = React.useState('0');

    return(
        <SafeAreaView style={styles.main}>
            <Text style={styles.output}>Specka</Text>
        </SafeAreaView>
    );
}

export default Meal;

const styles = StyleSheet.create({
  main: {
    height: 85,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  input: {
    height: 40,
    borderColor: '#5C6BC0',
    borderBottomWidth: 2,
    flex: 1
  },
  spinner: {
    width: 80,
    marginLeft: 10,
    elevation: 2,
  },
  top: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row'
  },
  bottom: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
  },
  output: {
      width: '90%',
      marginBottom: 13,
      padding: 14,
      backgroundColor: "#ddd",
      textAlign: 'center',
      fontSize: 18,
      alignSelf: 'center',
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4.65,
      elevation: 6,
  }
});