import React,  { useState }  from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions  } from 'react-native';

const Meal = (props) => {
    const {meal} = props.route.params;
    console.log(meal);

    const [imageSize, setImageSize] = useState({height: 0, width: 0});

    Image.getSize(meal.strMealThumb, (width, height) => {
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      setImageSize({width: screenWidth, height: imageHeight})
    })

    return(
        <SafeAreaView style={styles.main}>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Image style={{width: imageSize.width, height: imageSize.height}} source={{uri: meal.strMealThumb}}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  title: {
    margin: 5,
    padding: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});

export default Meal;