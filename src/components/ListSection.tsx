import React, {CSSProperties, memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ImageSourcePropType,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {fetchPokemonImage, fetchPokemons} from '../../api/pokeApi';
import {CircleSnail} from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {pokemonImgFromId} from '../screens/Home';

type Pokemon = {
  name: string;
  url: string;
};

interface ItemData {
  name: string;
  url: string;
}

interface ItemProps {
  data: ItemData;
  onPress: (itemId: string, itemName: string) => void;
}
export const Item = (props: ItemProps) => {
  const {data} = props;
  const [loadingImg, setLoadingImg] = useState(true);
  const idFromUrl = data.url.slice(0, -1).split('/').pop();
  const toggleLoading = async () => {
    setTimeout(() => setLoadingImg(false), 1000);
  };
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => props.onPress(idFromUrl + '', data.name)}>
      <View style={styles.itemSection}>
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: pokemonImgFromId(idFromUrl || ''),
            }}
            style={styles.img}
            resizeMode="center"
            onLoadEnd={toggleLoading}
          />
          <Text>{data.name}</Text>
        </View>
        {loadingImg && (
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#d9d9d9',
              top: 0,
              bottom: 0,
              start: 0,
              end: 0,
              borderRadius: 50,
            }}>
            <CircleSnail color={['#ffcb05', '#385faa']} size={50} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const ListSection = (props: {
  onItemClick: (id: string, name: string) => void;
}) => {
  const navigation = useNavigation();
  const [currentLoad, setLoad] = useState(0);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchPokemonsData = async (params: {offset: number; limit: number}) => {
    fetchPokemons(params).then(data => {
      setPokemons(prevState => [...prevState, ...data.results]);
    });
  };
  const loadMorePokemon = () => {
    setLoad(prevState => prevState + 20);
    fetchPokemonsData({offset: currentLoad, limit: 20});
  };

  useEffect(() => {
    setLoading(true);
    fetchPokemonsData({offset: currentLoad, limit: 20});
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const renderItem = (item: Pokemon) => (
    <Item data={{name: item.name, url: item.url}} onPress={props.onItemClick} />
  );
  return loading ? (
    <View style={styles.loadingContainer}>
      <CircleSnail color={['#ffcb05', '#385faa']} size={50} />
    </View>
  ) : (
    <FlashList
      style={[styles.flatList]}
      horizontal={false}
      data={pokemons}
      renderItem={({item}) => renderItem(item)}
      numColumns={3}
      onEndReached={loadMorePokemon}
      onEndReachedThreshold={0.5}
      estimatedItemSize={200}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {},
  itemSection: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    rowGap: 8,
    margin: 8,
  },
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  img: {
    width: 100,
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ListSection);
