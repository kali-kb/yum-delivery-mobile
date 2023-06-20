import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import BottomNavigation from '../components/BottomNavigation'
import AppButton from '../components/AppButton'
import BasketItem from '../components/BasketItem';

data = [
  {
    name: 'Chocolate Donut',
    price: 0.89,
    quantity: 3,
  },
  {
    name: 'Cheese burger',
    price: 2.95,
    quantity: 2,
  },
  {
    name: 'Veggies burger',
    price: 1.89,
    quantity: 4,
  },
  {
    name: 'Chocolate Donut',
    price: 0.89,
    quantity: 3,
  },
  {
    name: 'Glazed Donut',
    price: 1.25,
    quantity: 2,
  },
  {
    name: 'Blueberry Muffin',
    price: 1.75,
    quantity: 1,
  },
  {
    name: 'Cinnamon Roll',
    price: 2.15,
    quantity: 2,
  },
  {
    name: 'Bagel with Cream Cheese',
    price: 2.75,
    quantity: 1,
  },
  {
    name: 'Croissant',
    price: 1.95,
    quantity: 2,
  },
  {
    name: 'Chocolate Chip Cookie',
    price: 0.99,
    quantity: 3,
  },
  {
    name: 'Apple Turnover',
    price: 2.35,
    quantity: 1,
  },

];

const BasketItemComponent = () => {
  return (
    <View style={{ margin: 10 ,flex:1, backgroundColor:'white'}}>
      <View style={{marginVertical:15, flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 28,
            fontWeight: '900',
            color: 'gray',
          }}>
          Basket Items
        </Text>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: 'lightgray',
            borderRadius: 10,
            top: 3,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ fontSize: 28 }}>{data.length}</Text>
      </View>
      <View style={{flex:1}}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <BasketItem
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
      <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
        <AppButton name="Checkout" />
      </View>
      <BottomNavigation />

    </View>
  );
};

const styles = StyleSheet.create({

});

export default BasketItemComponent;
