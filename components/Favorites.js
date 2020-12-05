import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { IconButton, Colors, FAB } from 'react-native-paper';

const Favorites = (props) => {

    const favText = useState("Favorites");
      return (
        <SafeAreaView>
          <View style={styles.searchBar}>
            <Text>To do</Text>
          </View>
          <View style={styles.favBar}>
            <Text style={styles.favText}>{favText}</Text>
          </View>
          <FlatList
            data={props.route.params.newdata.sort((a, b) => a.strMeal.localeCompare(b.strMeal))}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <View style={styles.listElement}>
                <View style={styles.halfLeft}>
                {item.fav == 't'? 
                
                    <Text numberOfLines={1} style={styles.listText}  onPress={() => navigation.navigate('Meal', { meal: item})}>{item.strMeal} ({item.strCategory})</Text>
                : 
                null}
                </View>
                <View style={styles.halfRight}>
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
              null
              }

                </View>
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