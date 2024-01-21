import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchSection from '../components/SearchSection';
import ListSection, {/*ListSection,*/ Item} from '../components/ListSection';
import {useEffect, useState} from 'react';
import {fetchPokemons} from '../../api/pokeApi';
import {Pokemon} from '../../api/data';

function Home() {
  return (
    <SafeAreaView style={{flex: 1, padding: 16, rowGap: 50}}>
      <SearchSection
        style={styles.searchContainer}
        placeHolder="Search Something"
        onChangeText={value => {
          console.log(value);
        }}
      />
      <ListSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {height: '10%'},
  flatList: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default Home;
