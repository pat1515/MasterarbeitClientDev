import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button, Alert } from 'react-native';


export default function GraphQLScreen() {

    
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);


    // Abfrage
    const queryString = `
        {
            authors {
                id
                name
            }
        }
    `;


    // Daten holen GRAPHQL
    function holeDaten() {
      
      // Initialisieren
      setLoading(true);
      setData([]);

      // HTTP Request durchführen
      fetch('https://graphqlpat.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: queryString
            })
        })
        .then((response) => response.json())
        .then((json) => setData(json.data.authors))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    };
    
  
    // User Interface
    return (
      
      <View style={{ flex: 1, padding: 24, marginTop: 30 }}>
        
        <Button 
          title="Daten holen"
          onPress={() => {
            const start = Date.now();           
            holeDaten();
            const ende = Date.now();

            const millis = {ende}.ende - {start}.start;
            
            Alert.alert('Laufzeit', {millis}.millis + " ms");
          }} 
        />

        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.itemStyle}>{item.name}</Text>
            )}
          />
        )}
      </View>
    );

}



const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    marginBottom: 3,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    
    fontSize: 12

  },
});