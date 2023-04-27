import React, {useCallback, useContext, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../commons/new';
import View from '../../components/view';
import Text from '../../components/text';
import {CalendarItemProps} from './types';
import CalendarContext from './CalendarContext';
import Month from './Month';
import Header from './Header';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';
import {getMonthDifference} from './helpers/DateUtils';

const CALENDAR_HEIGHT = 270;

function CalendarItem(props: CalendarItemProps) {
  const {year, month} = props;
  const {staticHeader, headerHeight, selectedDate} = useContext(CalendarContext);

  // const isVisible = useCallback((year: number, month: number) => {
  //   'worklet';
  //   const date = new Date(selectedDate.value);
  //   const value = month !== undefined && date.getFullYear() === year && Math.abs(date.getMonth() - month) <= 3;
  //   console.log('ethan - valu', date.getMonth(), month, Math.abs(date.getMonth() - month) <= 3);
  //   return value;
  // }, []);

  const [visible, setVisible] = useState(getMonthDifference(selectedDate.value, new Date(year, month).getTime()) <= 3);

  // console.log('ethan - isVisible', year, month, visible)

  const calendarStyle = useMemo(() => {
    // TODO: dynamic height: calc calendar height with month's number of weeks
    return [
      styles.container,
      {
        height: CALENDAR_HEIGHT - (staticHeader ? headerHeight.value : 0)
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticHeader]);

  useAnimatedReaction(() => {
    return getMonthDifference(selectedDate.value, new Date(year, month).getTime()) <= 3;
  },
  (isVisible, wasVisible) => {
    if (wasVisible !== null && isVisible !== wasVisible) {
      runOnJS(setVisible)(isVisible);
    }
  });

  if (month !== undefined) {
    if (visible) {
      return (
        <View style={calendarStyle}>
          {!staticHeader && <Header month={month} year={year}/>}
          <Month month={month} year={year}/>
        </View>
      );
    } else {
      return (
        <View style={calendarStyle}>
          <Text>
            {month}-{year}
          </Text>
        </View>
      );
    }
  }
  return null;
}

export default React.memo(CalendarItem);

const styles = StyleSheet.create({
  container: {
    width: Constants.screenWidth,
    borderBottomWidth: 1
  }
});
