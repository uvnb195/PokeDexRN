import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcons from 'react-native-vector-icons/Feather';
import StatItem from '../components/StatItem';

export default function Detail() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FeatherIcons name="chevron-left" size={40} color={'black'} />
      </TouchableOpacity>
      <LinearGradient
        style={styles.item}
        colors={['transparent', '#c9c9c9', '#15181f', 'black']}
        locations={[0.15, 0.2, 0.5, 1]}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
          }}
        />
        <Text style={styles.text}>Pikachu</Text>
        <StatItem color="#1E00FF" value={30} maxValue={100} key={1} delay={0} />
        <StatItem color="#0067FF" value={50} maxValue={100} key={2} delay={1} />
        <StatItem color="#008DFF" value={70} maxValue={100} key={3} delay={2} />
        <StatItem color="#00A6FF" value={26} maxValue={100} key={4} delay={3} />
        <StatItem color="#00BAE6" value={39} maxValue={100} key={5} delay={4} />
        <StatItem color="#00CC9A" value={85} maxValue={100} key={6} delay={5} />
      </LinearGradient>
    </View>
  );
}

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
    width: 200,
    height: 200,
  },
});
