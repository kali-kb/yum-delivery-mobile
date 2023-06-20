import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';



function CategoryComponent(props) {
  // const { navigator } = props;
  // console.log('cnav', navigator)
  const navigation = useNavigation();
  
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate('Category Items', {id:props.id})}>
      <View style={styles.categoryCard}>
        <ImageBackground
          source={{ uri: `${props.uri}` }}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}></ImageBackground>
        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            paddingHorizontal: 20,
            top: 60,
          }}>
          <Text style={{ color: 'white', opacity: 1 }}>{props.name}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    height: 100,
    width: 180,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default CategoryComponent;
