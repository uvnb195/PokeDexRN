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
import {useCallback, useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CircleSnail} from 'react-native-progress';

function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  let pokemonsCache: Pokemon[] = [];
  const getPokemonsFromLocal = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('pokemons');
      if (jsonValue != null) {
        setPokemons(JSON.parse(jsonValue));
      } else {
        const pokemons = await fetchPokemons({offset: 0, limit: 10000});
        const jsonData = JSON.stringify(pokemons.results);
        await AsyncStorage.setItem('pokemons', jsonData);
        setPokemons(pokemons.results);
      }
    } catch (error) {
      console.log('Error getting pokemons from AsyncStorage.');
    }
  };
  useEffect(() => {
    getPokemonsFromLocal();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [pokemons]);

  const handleSearch = (value: string) => {
    if (value.length > 0) {
      const searchList = pokemons.filter(item => item.name.includes(value));
      setPokemons(prevState => {
        pokemonsCache = prevState;
        return [...searchList];
      });
    } else {
      pokemonsCache.length > 0 && setPokemons(prevState => [...pokemonsCache]);
      pokemonsCache = [];
    }
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 16, rowGap: 50}}>
      {pokemons.length > 0 || pokemonsCache.length > 0 ? (
        <SearchSection
          style={styles.searchContainer}
          placeHolder="Search Something"
          onChangeText={value => {
            setLoading(true);
            handleSearch(value);
          }}
        />
      ) : null}

      {loading ? (
        <View style={styles.loadingContainer}>
          <CircleSnail size={50} color={['blue']} />
        </View>
      ) : (
        <ListSection
          list={pokemons}
          onItemClick={(id, name) =>
            navigation.navigate('Detail', {
              pokemonId: id,
              name: name,
            })
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {height: '10%'},
  flatList: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
