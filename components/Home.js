import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { IconButton, Colors, FAB } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const favText = useState("Favorites");

  useEffect(() => {
    setIsLoading(true);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setData(json.meals))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const newdata=data.map((item) => {return { ...item, fav: 'f'}});
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
          <Text>To do</Text>
        </View>
        <View style={styles.favBar}>
          <Text style={styles.favText} onPress={() => navigation.navigate('Favorites', {newdata: newdata})}>{favText}</Text>
        </View>
        <FlatList
          data={newdata.sort((a, b) => a.strMeal.localeCompare(b.strMeal))}
          //extraData={this.state}
          keyExtractor={(item) => item.idMeal}
          
          renderItem={({ item }) => (
            <View style={styles.listElement}>
              <View style={styles.halfLeft}>
                <Text numberOfLines={1} style={styles.listText}  onPress={() => navigation.navigate('Meal', { meal: item})}>{item.strMeal} ({item.strCategory}) {item.fav}</Text>
              </View>
              <View style={styles.halfRight}>
                <Text>{item.fav} </Text>
                {item.fav == 't'? 
                <IconButton
                icon="heart"
                color="#931a25"
                size={20}
                onPress={() =>{
                  item = { ...item, fav: 'f' }         
                }}
              />
              : 
              <IconButton
              icon="heart-outline"
              color="#931a25"
              size={20}
              onPress={() =>{                 
                item = { ...item, fav: 't' }
              }}

              />}
              
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

export default Home;