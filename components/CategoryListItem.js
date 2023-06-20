import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



function CategoryComponent(props) {
  console.log('Props', props);
  console.log('props II', props.dishes.length);

  navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Category Items", {id: props.id})}>
      <View style={styles.categoryCard}>
        <ImageBackground
          source={{ uri: `${props.img_url}` }}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}></ImageBackground>
        <View
          style={{
            flex: 0.4,
            width: '100%',
            elevation: 5, // this property adds a drop shadow effect on Android devices
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: 120,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              opacity: 1,
              fontWeight: 'bold',
            }}>
            {props.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', opacity: 1, fontSize: 20 }}>
              Items
            </Text>
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 100,
                backgroundColor: 'white',
                marginHorizontal: 8,
              }}
            />
            <Text style={{ color: 'white', opacity: 1, fontSize: 20 }}>
              {props.dishes.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    height: 200,
    width: '95%',
    marginHorizontal: 11,
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default CategoryComponent;
