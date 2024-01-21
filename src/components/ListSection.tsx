import React, {CSSProperties, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {fetchPokemonImage, fetchPokemons} from '../../api/pokeApi';
import {CircleSnail} from 'react-native-progress';

interface ItemData {
  title: string;
  imageSource: ImageSourcePropType;
}

interface ItemProps {
  data: ItemData;
  onPress: () => void;
}
export const Item = (props: {name: string; url: string}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const idFromUrl = props.url.slice(0, -1).split('/').pop();
  const toggleLoading = async () => {
    setTimeout(() => setLoadingImg(false), 1000);
  };
  return (
    <View style={styles.itemSection}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idFromUrl}.png`,
          }}
          style={styles.img}
          resizeMode="center"
          onLoadEnd={toggleLoading}
        />
        <Text>{props.name}</Text>
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
  );
};
const ListSection = () => {
  const [currentLoad, setLoad] = useState(0);
  const [pokemons, setPokemons] = useState<any[]>([]);
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
  return loading ? (
    <View style={styles.loadingContainer}>
      <CircleSnail color={['#ffcb05', '#385faa']} size={50} />
    </View>
  ) : (
    <FlatList
      style={[styles.flatList]}
      horizontal={false}
      data={pokemons}
      renderItem={({item, index}) => {
        return <Item name={item.name} url={item.url} />;
      }}
      numColumns={3}
      onEndReached={loadMorePokemon}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {},
  itemSection: {
    flex: 1,
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

export default ListSection;
