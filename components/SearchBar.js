import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


function SearchBarComponent() {
  return (

      <View style={styles.searchContainer}>
        <TextInput placeholder="Search food" cursorColor="red" style={styles.textInput} />
        <TouchableOpacity style={styles.button}>
          <View>
            <Ionicons name="search" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
  
  searchContainer : {
    height:80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    justifyContent: 'center'
  },
  
  textInput: {
    borderWidth: 1,
    paddingTop: 10,
    width: '75%',
    paddingBottom: 10,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    borderColor: 'lightgray',
  },
  
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center', 
    width:60,
    height:'60%',
  },
  

});

export default SearchBarComponent;
