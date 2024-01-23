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
import {
  NavigationContainerProps,
  useNavigation,
} from '@react-navigation/native';
import {StackParams} from '../../App';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export const pokemonImgFromId = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <SafeAreaView style={{flex: 1, padding: 16, rowGap: 50}}>
      <SearchSection
        style={styles.searchContainer}
        placeHolder="Search Something"
        onChangeText={value => {
          console.log(value);
        }}
      />
      <ListSection
        onItemClick={(id, name) =>
          navigation.navigate('Detail', {
            pokemonId: id,
            name: name,
          })
        }
      />
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
