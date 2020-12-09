import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState(false);
  

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

  const isFavourite = (item) => {
    const filtered = favourites.filter((value) => value == item.idMeal);
    if (filtered.length == 0) {
      return false;
    }
    else {
      return true;
    }
  }

  useEffect(() => {
    setIsLoading(true);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setData(json.meals))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearch = () => {

  }
  const searchQuery = "xD";

  !favouritesLoading && retrieveData();
  console.log(favourites);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
      
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.favBar}>
        <Text style={styles.favText} onPress={() => {
            const newData = data.filter((item) => isFavourite(item));
            navigation.navigate('Favorites', {data: newData})
          }}>Favourites</Text>
        </View>

        <View style={styles.searchBarView}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={(text) => searchFilterFunction(text)}
            value={searchQuery}
          />
        </View>
        
        <FlatList
          data={data.sort((a, b) => a.strMeal.localeCompare(b.strMeal))}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.listElement}>
              <View style={styles.halfLeft}>
                <Text numberOfLines={1} style={styles.listText}  onPress={() => navigation.navigate('Meal', { meal: item, isFavourite: isFavourite, handleFavourites: handleFavourites})}>{item.strMeal} ({item.strCategory})</Text>
              </View>
              <View style={styles.halfRight}>
                <IconButton
                  icon={isFavourite(item) ? "heart" : "heart-outline"}
                  color="#931a25"
                  size={20}
                  onPress={() => handleFavourites(item)}
                />
              </View>
            </View>  
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.separator}></View>
          )}  
        />
      </SafeAreaView>
    );
  }
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
  separator: {
    height: 1,  
    width: "100%",  
    backgroundColor: "#9e9e9e",
  },
  searchBar: {
    height: 50,
    margin: 5,
    backgroundColor: "#EF9A9A",
    elevation: 5,
  },
  favBar: {
    margin: 5,
    height: 50,
    elevation: 5,
    backgroundColor: "#D50000",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favText: {
    fontSize: 20,
    textAlign: "center",
    color: '#fff',
  },
});

export default Home;