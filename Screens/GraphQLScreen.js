import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';


export default function GraphQLScreen() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    const queryString = `
        {
            authors {
                id
                name
            }
        }
    `;


    useEffect(() => {
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
    }, []);
    
  
    return (
      <View style={{ flex: 1, padding: 24, marginTop: 30 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <Text>{item.name}</Text>
            )}
          />
        )}
      </View>
    );

}