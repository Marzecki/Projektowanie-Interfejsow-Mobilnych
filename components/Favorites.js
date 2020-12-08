import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import { IconButton, Colors, FAB } from 'react-native-paper';

const Favorites = ({route, navigation}) => {
  const {data} = route.params;
    const [favourites, setFavourites] = useState([]);
    const [favouritesLoading, setFavouritesLoading] = useState(false);

    const [rrr, setrrr] = useState(1);

    const retrieveData = async () => {
        try {
          const favouritesString = await AsyncStorage.getItem('favourites');
          setFavouritesLoading(true);
          if (favouritesString !== null) {
            const favouritesArray = JSON.parse(favouritesString);
            setFavourites(favouritesArray);
          }
        } catch (error) {}
    };

    const isFavourite = (item) => {
      const filtered = favourites.filter((value) => value == item.idMeal);
      if (filtered.length == 0) {
        return false;
      }
      else {
        return true;
      }
    }

    const handleFavourites = async (item) => {
        const filtered = favourites.filter((value) => value == item.idMeal);
        let newFavourites;
        if (filtered.length == 0) {
          newFavourites = [...favourites, item.idMeal];
        }
        else {
          newFavourites = favourites.filter((value) => value != item.idMeal);
        }
        setFavourites(newFavourites);
        try { await AsyncStorage.setItem('favourites',JSON.stringify(newFavourites));} 
        catch (error) {}
      }

      

      !favouritesLoading && retrieveData();
      console.log(favourites);


      return (
        <SafeAreaView>
          <View style={styles.favBar}>
            <Text style={styles.favText} onPress={
              () =>{ }}>Favourites</Text>
          </View>
          <FlatList
          data={data.sort((a, b) => a.strMeal.localeCompare(b.strMeal))}
          keyExtractor={(item) => item.idMeal}
            
            renderItem={({ item }) => (
              
              <View style={styles.listElement}>
                <View style={styles.halfLeft}>
                    {favourites.includes(item.idMeal) ?
                    <Text numberOfLines={1} style={styles.listText}  onPress={() => navigation.navigate('Meal', { meal: item, isFavourite: isFavourite, handleFavourites: handleFavourites})}>{item.strMeal} ({item.strCategory})</Text>
                : null}</View>
                <View style={styles.halfRight}>
                {favourites.includes(item.idMeal) ?
                <IconButton
                icon="heart"
                color="#931a25"
                size={20}
                onPress={() => handleFavourites(item)}/>

                : null}</View>
              </View>)}       
          
            ItemSeparatorComponent={() => (
              <View style={styles.separator}></View>
            )}  
          />
        </SafeAreaView>
      );
    }
  
  
  const styles = StyleSheet.create({
    container: {
    },
    listElement: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
    },
    halfLeft: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 5,
      height: 20,
    },
    halfRight: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    listText: {
      fontSize: 16,
      textAlign: "left",
      color: '#222831',
    },
    favText: {
      fontSize: 20,
      textAlign: "center",
      color: '#FFFFFF',
    },
    separator: {
      height: 1,  
      width: "100%",  
      backgroundColor: "#9e9e9e",
    },
    searchBar: {
      height: 100,
      backgroundColor: "#931a25"
    },
    favBar: {
      height: 30,
      backgroundColor: "#931a25"
    },
  });
  
  export default Favorites;