import React, {Component, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, TextField, Button, Constants, TouchableOpacity} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import _ from 'lodash';
import Reanimated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const ReanimatedText = Reanimated.createAnimatedComponent(Text);

const items = _.times(300);

const CalendarContext = React.createContext({});
export default class PlaygroundScreen extends Component {
  list = React.createRef();
  page = 0;

  state = {
    page: 0
  };

  render() {
    return (
      <View bg-grey80 flex>
        <Calendar/>
      </View>
    );
  }
}

const now = new Date(2023, 5, 18).getTime();

const Calendar = () => {
  const list = useRef();
  const pageRef = useRef(0);
  const [page, setPage] = React.useState(0);
  const currentDate = useSharedValue(now);
  const [dateState, setDateState] = useState(now);

  const setDate = useCallback(date => {
    'worklet';
    currentDate.value = date;
  }, []);

  const contextValue = useMemo(() => {
    return {
      date: currentDate,
      setDate,
      dateState,
      setDateState
    };
  }, []);

  const goNext = useCallback(() => {
    pageRef.current++;
    list.current?.scrollToIndex({index: pageRef.current, animated: true});

    setPage(pageRef.current);
  }, []);

  const renderItem = useCallback(({item}) => {
    return (
      <View height={Constants.screenHeight} width={Constants.screenWidth} center>
        <CalendarItem/>
      </View>
    );
  }, []);

  return (
    <View>
      <CalendarContext.Provider value={contextValue}>
        <View>
          <Button label="Next" onPress={goNext}/>
        </View>
        <FlashList data={items} renderItem={renderItem} horizontal pagingEnabled ref={list}/>
      </CalendarContext.Provider>
    </View>
  );
};

const CalendarItem = ({
  /* currentDate, setDate */
}) => {
  return (
    <View flex>
      {_.times(4, week => {
        return (
          <View row width={'100%'}>
            {_.times(7, day => {
              const date = new Date(2023, 5, (week + 1) * day).getTime();
              return <Day date={date}/>;
            })}
          </View>
        );
      })}
    </View>
  );
};

const dayDate = new Date(now).getDay();

const Day = ({date /* , currentDate */}) => {
  const context = useContext(CalendarContext);
  const day = new Date(date).getDay();
  // const day = dayDate;

  const _setDate = useCallback(() => {
    context.setDate(new Date().getTime());
    // context.setDateState(date);
    // currentDate.value = date;
  }, []);

  // const justStyle = useMemo(() => {
  //   const isSelected = context.dateState === date;
  //   return {
  //     color: isSelected ? 'purple' : 'black'
  //   };
  // }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const isSelected = context.date === date;
    // const isSelected = currentDate.value === date;
    return {
      color: isSelected ? 'blue' : undefined
    };
  }, []);

  return (
    <TouchableOpacity flex onPress={_setDate}>
      {/* <ReanimatedText style={justStyle}>{day}</ReanimatedText> */}
      <ReanimatedText style={animatedStyle}>{day}</ReanimatedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  day: {
    color: 'red'
  }
});
