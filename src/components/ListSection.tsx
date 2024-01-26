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
import {fetchPokemons, pokemonImgEndpoint} from '../../api/pokeApi';
import {CircleSnail} from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

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
              uri: pokemonImgEndpoint(idFromUrl || ''),
            }}
            style={styles.img}
            resizeMode="center"
            onLoadEnd={toggleLoading}
          />
          <Text numberOfLines={1}>{data.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListSection = (props: {
  onItemClick: (id: string, name: string) => void;
  list: Pokemon[];
}) => {
  const navigation = useNavigation();
  const [currentLoad, setLoad] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const renderItem = (item: Pokemon) => (
    <Item data={{name: item.name, url: item.url}} onPress={props.onItemClick} />
  );
  return (
    <FlashList
      style={[styles.flatList]}
      horizontal={false}
      data={props.list}
      renderItem={({item}) => renderItem(item)}
      numColumns={3}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
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
