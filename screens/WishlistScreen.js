import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import AppButton from '../components/AppButton';
import { Ionicons } from '@expo/vector-icons';
import WishedItem from '../components/WishedItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



data = [
  { name: 'Strawberry Flavored Donut', price: 0.89 },
  { name: 'Blueberry Glazed Donut', price: 1.25 },
  { name: 'Chocolate Frosted Donut', price: 0.99 },
  { name: 'Vanilla Bean Donut', price: 1.15 },
  { name: 'Maple Bacon Donut', price: 1.5 },
  { name: 'Cinnamon Roll Donut', price: 1.1 },
  { name: 'Powdered Sugar Donut', price: 0.75 },
  { name: 'Peanut Butter Cup Donut', price: 1.35 },
  { name: 'Raspberry Filled Donut', price: 1.2 },
  { name: 'Lemon Glazed Donut', price: 0.95 },
  { name: 'Caramel Apple Donut', price: 1.3 },
  { name: 'Honey Cruller Donut', price: 1.25 },
  { name: 'Cherry Jelly Donut', price: 1.1 },
  { name: 'Almond Crusted Donut', price: 1.4 },
  { name: 'Coffee Cream Donut', price: 1.0 },
];

const WishlistComponent = ({ navigation }) => {
  // console.log("po", props)

  const fetchWishlist = async (userId) => {
    try {
      const url = `https://weak-tan-ostrich-tutu.cyclic.app/users/${userId}/wishes`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch user wishes');
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log('Error fetching user wishes:', error);
      // Handle the error or return a default value
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userData');
      if (value !== null) {
        const user = JSON.parse(value);
        // fetchWishlist()
        // Use the userData as needed
        console.log('User Data:', userData);
      } else {
        console.log('No data found with the key "@userData"');
        setTimeout(() => {
          navigation.navigate('LogIn');
        }, 2000);

      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ margin: 10, flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 28,
            fontWeight: '900',
            color: 'gray',
          }}>
          Wishlisted
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
      <View style={{ height: 60, marginTop: 20 }}>
        <TouchableOpacity style={styles.button}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Ionicons name="trash" size={20} color="white" />
            <View
              style={{
                width: 1,
                height: 15,
                backgroundColor: 'white',
                margin: 5,
                top: 1,
              }}
            />
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '900' }}>
              Clear All
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <WishedItem name={item.name} price={item.price} />
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 110,
    paddingVertical: 5,
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    // paddingHorizontal:10
  },
});

export default WishlistComponent;
