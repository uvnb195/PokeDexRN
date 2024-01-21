import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Bar} from 'react-native-progress';
import {StatColor} from '../../const';

type StatItemProps = {
  title?: string;
  color: StatColor;
  value: number;
  maxValue: number;
  delay: 0 | 1 | 2 | 3 | 4 | 5;
};

export default function StatItem(props: StatItemProps) {
  const [value, setValue] = useState<number>(0);
  const progressValue = props.value / props.maxValue;
  useEffect(() => {
    setTimeout(() => {
      setValue(progressValue);
    }, props.delay * 100);
  }, []);
  return (
    <View style={{width: '100%', padding: 8, marginBottom: 20}}>
      <Bar
        progress={value}
        width={null}
        animationType="timing"
        color={props.color}
        height={16}
        borderRadius={50}
        borderWidth={1}
      />
    </View>
  );
}
