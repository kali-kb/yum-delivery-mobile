import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function BasketItem(props) {
  console.log('bask', props)
  return (
    <View style={styles.card}>
      <View style={{ borderRadius: 10, overflow: 'hidden', margin: 10 }}>
        <Image
          style={{ height: 80, width: 80 }}
          source={require('../assets/image(10).png')}
        />
      </View>
      <View>
        <View style={styles.itemDetail}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontSize: 18, fontWeight: '400' }}>
            {props.name.length > 16
              ? props.name.substring(0, 16) + '...'
              : props.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${props.price}</Text>
            <View style={styles.quantityContainer}>
              <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
              <View
                style={{
                  marginHorizontal: 5,
                  width: 2,
                  top: 0.5,
                  height: 10,
                  backgroundColor: '#000',
                }}
              />
              <Text>{props.quantity}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 10, flex: 1, alignItems: 'center' }}>
        <Ionicons name="trash" size={24} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemDetail: {
    justifyContent: 'space-around',
    // backgroundColor: 'green',
    //margin: 10,
    width:180,
    flex: 1
  },

  quantityContainer: {
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: 'red',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 10,
    borderRadius: 10,
  },
});

export default BasketItem;
