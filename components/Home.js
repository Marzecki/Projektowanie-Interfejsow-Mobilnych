import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
//
  useEffect(() => {
    setIsLoading(true);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setData(json.meals))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.searchBar}>
          {/* TODO Searchbar */}
        </View>
        <FlatList
          data={data.sort((a, b) => a.strMeal.localeCompare(b.strMeal))}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.listElement}>
              <View style={styles.halfLeft}>
                <Text numberOfLines={1} style={styles.listText}  onPress={() => navigation.navigate('Meal', { meal: item})}>{item.strMeal} ({item.strCategory})</Text>
              </View>
              <View style={styles.halfRight}>
                <IconButton
                  icon="heart"
                  color="#931a25"
                  size={20}
                  onPress={() => console.log('Added to fav')}
                />
                <IconButton
                  icon="heart-outline"
                  color="#931a25"
                  size={20}
                  onPress={() => {
                    console.log('Added to fav');
                  }}
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
    flex: 1,
  },
  listElement: {
    flex: 1,
    flexDirection: "row",
    height: 55,  
    justifyContent: "center",
  },
  halfLeft: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  halfRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  listText: {
    fontSize: 30,  
    color: '#222831',
  },
  separator: {
    height: 1,  
    width: "100%",  
    backgroundColor: "#931a25",
  },
  searchBar: {
    height: 100,
    backgroundColor: "#931a25"
  }
});

export default Home;