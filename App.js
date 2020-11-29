import { StatusBar } from 'expo-status-bar';
import React,  { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((json) => setData(json.meals))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

 return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item.strMeal}, {item.strCategory}, {item.idMeal}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
