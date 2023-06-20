import { useState, useEffect } from 'react';

import {
  View,
  StyleSheet,
  SectionList,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/CategoryCard';
import HomeProductCard from '../components/HomeProductCard';
import SearchBar from '../components/SearchBar';
import BottomNavigation from '../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../App'
import { createNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();

  const navigationRef = createNavigationContainerRef();

  console.log('navigation:', navigation);

  useEffect(() => {
    // console.log('This executes');
    const fetchData = async () => {
      console.log('This executes');

      try {
        const response = await fetch(
          'https://weak-tan-ostrich-tutu.cyclic.app/home'
        );
        const jsonData = await response.json();
        // console.log("jsonData:", jsonData)
        try {
          const value = await AsyncStorage.getItem('@userData');
          console.log('value:', value);
          if (value !== null) {
            console.log('user information', JSON.parse(value));
          }
        } catch (e) {
          console.log("this executes h h")
          console.log("couldn't find the user data", e);
          navigate("LogIn")
          // setTimeout(() => {
          //   navigation.navigate('LogIn');
          // }, 5000);
        }

        setCategories(jsonData.categories);
        setDishes(jsonData.dishes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('categories list:', categories);
    console.log('dishes list:', dishes);
    setLoaded(!loaded);
  }, [categories, dishes]);

  return (
    <>
      <SearchBar />
      <View style={{ ...styles.container, flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Categories')}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Categories</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: 'column' }}>
          {loaded ? (
            categories.length > 0 ? (
              categories.map((item) => (
                <CategoryCard
                  navigator={navigation}
                  id={item.id}
                  name={item.name}
                  uri={item.img_url}
                />
              ))
            ) : (
              <Text>No categories found</Text>
            )
          ) : (
            <Text>Loading</Text>
          )}
        </ScrollView>
      </View>

      <View>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Our Menu
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
        <View
          style={{
            height: 400,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <FlatList
            data={dishes}
            renderItem={({ item }) => <HomeProductCard {...item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        </View>
        <BottomNavigation />
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
