import { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import HomeProductCard from '../components/HomeProductCard';
import SearchBar from '../components/SearchBar';
import BottomNavigation from "../components/BottomNavigation"


const CategoryDishes = ({ route, navigation }) => {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState({})
  const { id } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(id)
    try {
      const response = await fetch(
        `https://weak-tan-ostrich-tutu.cyclic.app/categories/${id}/dishes`
      );
      const jsonData = await response.json();
      
      setDishes(jsonData.dishes);
      setCategory(jsonData.category)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SearchBar />
      <View style={styles.categoryCard}>
        <ImageBackground
          source={{
            uri: `${category.img_url}`,
          }}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}></ImageBackground>
        <View
          style={{
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
            top: 100,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              opacity: 1,
              fontWeight: 'bold',
            }}>
            {category.name}
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginHorizontal: 10,
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 20,
        }}>
        Category Items
      </Text>
      <View style={{ height: 390, alignItems: 'center' }}>
        <FlatList
          data={dishes}
          renderItem={({ item }) => <HomeProductCard {...item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      </View>
      <BottomNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    height: 150,
    width: '96%',
    // paddingHorizontal:10,
    marginHorizontal: 9,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default CategoryDishes;
