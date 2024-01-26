import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {debounce} from 'lodash';

interface SearchSectionProps {
  placeHolder: string;
  style: ViewStyle;
  onChangeText: (value: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = props => {
  const [input, setInput] = useState('');
  const handleTextDebounce = useCallback(debounce(props.onChangeText, 500), []);
  useEffect(() => {
    handleTextDebounce(input);
  }, [input]);

  return (
    <View style={[props.style, styles.container]}>
      <TextInput
        style={styles.input}
        placeholder={props.placeHolder || 'Search Pokemon...'}
        value={input}
        onChangeText={value => {
          setInput(value);
        }}
      />
      <TouchableOpacity style={styles.icon} onPress={() => setInput('')}>
        <FeatherIcons name="x" size={24} color={'rgba(0, 0, 0, 0.5)'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 50,
    position: 'relative',
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    paddingEnd: 5,
    paddingVertical: 10,
    position: 'absolute',
    end: 0,
    top: 0,
    bottom: 0,
    height: 50,
    width: 50,
  },
});

export default SearchSection;
