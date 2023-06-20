import {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BottomNav from "../components/BottomNavigation"
import CategoryListItem from '../components/CategoryListItem';
import SearchBar from '../components/SearchBar'



const CategoryItemsScreen = () => {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://weak-tan-ostrich-tutu.cyclic.app/categories');
      const jsonData = await response.json();
      console.log("fetched information: ", jsonData)
      setCategoryList(jsonData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SearchBar />
      <FlatList
        data={categoryList}
        renderItem={({item}) => <CategoryListItem {...item} /> }
        keyExtractor={(item) => item.id.toString()}
      />
      <BottomNav />
    </>
  );
};

const styles = StyleSheet.create({});

export default CategoryItemsScreen;
