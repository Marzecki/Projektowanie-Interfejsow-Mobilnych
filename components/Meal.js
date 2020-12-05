import React,  { useState }  from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { IconButton, Colors, FAB } from 'react-native-paper';

const TopBar = ({play, fullScreen}) => (
  <View
    style={{
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    }}>
    {!fullScreen && <Text style={{color: '#FFF'}}> Custom Top bar</Text>}
  </View>
);


const Meal = (props) => {
    const {meal} = props.route.params;
    const [imageSize, setImageSize] = useState({height: 0, width: 0});
     const [fullScreen, setFullScreen] = useState(false);
    console.log(meal);

     
    Image.getSize(meal.strMealThumb, (width, height) => {
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      imageSize.width==0 && setImageSize({width: screenWidth, height: imageHeight})
    })

    const onFullScreen = (fullScreen) => {
        console.log('fullscreen ', fullScreen);
        setFullScreen({fullScreen});
    };

    const generateIngredients = () => {
      let ingredients = [];
      for (let i = 0; i < 20; i++) {
        if(meal[`strIngredient${i+1}`] != "" && meal[`strIngredient${i+1}`] != null) {
        ingredients.push(<View style={{flexDirection: "row",}}>
                            <Text>• {meal[`strIngredient${i+1}`]}:</Text>
                            <Text style={{color: "#212121"}}> {meal[`strMeasure${i+1}`]}</Text>
                        </View>);
        }
      } 
      return ingredients;
    }

    return(
        <SafeAreaView style={styles.main}>
            <ScrollView>

            <View style={styles.halfLeft}>
              <Text>Jeszcze nie dziala ten przycisk</Text>
                {meal.fav == 't'? 
                <IconButton
                icon="heart"
                color="#931a25"
                size={50}
                onPress={() =>{
                  meal = { ...meal, fav: 'f' }             
                }}
              />
              : 
              <IconButton
              icon="heart-outline"
              color="#931a25"
              size={50}
              onPress={() =>{
                { 
                  meal = { ...meal, fav: 't' }
              }}}
              />}</View>

                <Text style={styles.title}>{meal.strMeal}</Text>



                <Image style={{width: imageSize.width, height: imageSize.height}} source={{uri: meal.strMealThumb}}/>
                <View style={styles.tags}>
                    <Text style={[styles.tag, styles.placeTag]}>{meal.strArea}</Text>
                    <Text style={[styles.tag, styles.typeTag]}>{meal.strCategory}</Text>
                </View>
                <View style={[styles.description]}>
                    <Text style={styles.section}>Ingredients:</Text>
                    {generateIngredients()}
                    <Text style={styles.section}>Instruction:</Text>
                    <Text style={styles.instruction}>{meal.strInstructions}</Text>
                </View>

            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: "#fff",
    borderColor: "#e0e0e0",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  halfLeft: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  tags: {
    marginVertical: 7,
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
  description: {
    padding: 15,
    marginBottom: 20,
    color: "#616161",
    backgroundColor: "#fff",
  },
  ingredients: {
    padding: 15,
    color: "black",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  instruction: {
      color: "#212121",
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 3,
    borderBottomColor: "#616161",
    borderBottomWidth: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Meal;