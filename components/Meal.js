import React,  { useState }  from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions  } from 'react-native';

const Meal = (props) => {
    const {meal} = props.route.params;
    const [imageSize, setImageSize] = useState({height: 0, width: 0});
    console.log(meal);

     
    Image.getSize(meal.strMealThumb, (width, height) => {
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      imageSize.width==0 && setImageSize({width: screenWidth, height: imageHeight})
    })

    return(
        <SafeAreaView style={styles.main}>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Image style={{width: imageSize.width, height: imageSize.height}} source={{uri: meal.strMealThumb}}/>
            <View style={styles.tags}>
                <Text style={[styles.tag, styles.placeTag]}>{meal.strArea}</Text>
                <Text style={[styles.tag, styles.typeTag]}>{meal.strCategory}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  tags: {
      marginVertical: 8,
      justifyContent: "center",
      flexDirection: "row"
  },
  tag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginHorizontal: 5,
      color: "white",
      fontSize: 14,
      borderRadius: 10,
      backgroundColor: "#fff",
  },
  placeTag: {
    backgroundColor: "#5c6bc0",
  },
  typeTag: {
    backgroundColor: "#4caf50",
  },
});

export default Meal;