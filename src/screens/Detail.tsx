import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcons from 'react-native-vector-icons/Feather';
import StatItem from '../components/StatItem';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {StackParams} from '../../App';
import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {pokemonImgFromId} from './Home';

type DetailProps = NativeStackScreenProps<StackParams, 'Detail'>;

const Detail: React.FC<DetailProps> = ({route}) => {
  const {pokemonId, name} = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.popToTop();
        }}>
        <FeatherIcons name="chevron-left" size={40} color={'black'} />
      </TouchableOpacity>
      <LinearGradient
        style={styles.item}
        colors={['transparent', '#c9c9c9', '#15181f', 'black']}
        locations={[0.15, 0.2, 0.5, 1]}>
        <Image
          style={styles.img}
          source={{
            uri: pokemonImgFromId(pokemonId),
          }}
        />
        <Text style={styles.text}>
          #{pokemonId} {name}
        </Text>
        <StatItem color="#1E00FF" value={30} maxValue={100} key={1} delay={0} />
        <StatItem color="#0067FF" value={50} maxValue={100} key={2} delay={1} />
        <StatItem color="#008DFF" value={70} maxValue={100} key={3} delay={2} />
        <StatItem color="#00A6FF" value={26} maxValue={100} key={4} delay={3} />
        <StatItem color="#00BAE6" value={39} maxValue={100} key={5} delay={4} />
        <StatItem color="#00CC9A" value={85} maxValue={100} key={6} delay={5} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10},
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e00ff',
  },
  img: {
    width: 250,
    height: 250,
  },
});

export default Detail;
