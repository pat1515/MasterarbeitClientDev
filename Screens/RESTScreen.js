import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';


export default function RESTScreen() {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);




  useEffect(() => {
      fetch('https://restapitestpat.azurewebsites.net/api/persons')      
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  

  return (
    <View style={{ flex: 1, padding: 24, marginTop: 30 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <Text>{item.firstName} {item.lastName}</Text>
          )}
        />
      )}
    </View>
  );

}