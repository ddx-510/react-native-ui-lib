import _toUpper from "lodash/toUpper";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import _cloneDeep from "lodash/cloneDeep";
// TODO: support commented props
import React, { useCallback, useContext, useEffect, useRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Reanimated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Colors, Typography, Spacings } from "../../style";
import Badge from "../badge";
import View from "../view";
import TabBarContext from "./TabBarContext";
const DEFAULT_LABEL_COLOR = Colors.$textDefault;
const DEFAULT_SELECTED_LABEL_COLOR = Colors.$textPrimary;
/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
export default function TabBarItem({
  index,
  label,
  labelColor = DEFAULT_LABEL_COLOR,
  selectedLabelColor = DEFAULT_SELECTED_LABEL_COLOR,
  labelStyle,
  labelProps,
  selectedLabelStyle,
  icon,
  badge,
  leadingAccessory,
  trailingAccessory,
  uppercase,
  activeOpacity = 0.9,
  backgroundColor = Colors.$backgroundElevated,
  activeBackgroundColor,
  testID,
  ignore,
  style,
  ...props
}) {
  const {
    currentPage,
    setCurrentIndex
  } = useContext(TabBarContext);
  const itemRef = useRef();
  const itemWidth = useRef(props.width);
  const isPressed = useSharedValue(false);
  // JSON.parse(JSON.stringify is due to an issue with reanimated
  const sharedLabelStyle = useSharedValue(JSON.parse(JSON.stringify(StyleSheet.flatten(labelStyle))));
  const sharedSelectedLabelStyle = useSharedValue(JSON.parse(JSON.stringify(StyleSheet.flatten(selectedLabelStyle))));

  // NOTE: We clone these color values in refs because they might contain a PlatformColor value
  //       which throws an error (see https://github.com/software-mansion/react-native-reanimated/issues/3164)
  const inactiveColor = useRef(_cloneDeep(labelColor));
  const activeColor = useRef(_cloneDeep(!ignore ? selectedLabelColor : inactiveColor.current));
  useEffect(() => {
    if (props.width) {
      props.onLayout?.({
        nativeEvent: {
          layout: {
            x: 0,
            y: 0,
            width: itemWidth.current,
            height: 0
          }
        }
      }, index);
    }
  }, []);
  const onLayout = useCallback(event => {
    const {
      width
    } = event.nativeEvent.layout;
    if (!itemWidth.current && itemRef?.current) {
      itemWidth.current = width;
      // @ts-ignore
      itemRef.current?.setNativeProps?.({
        style: {
          width,
          paddingHorizontal: null,
          flex: null
        }
      });
      props.onLayout?.(event, index);
    }
  }, [index, props.onLayout]);
  const animatedLabelStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    return isActive ? sharedSelectedLabelStyle.value : sharedLabelStyle.value;
  }, [currentPage]);
  const animatedLabelColorStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    return {
      color: isActive ? activeColor.current : inactiveColor.current
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    return {
      tintColor: isActive ? activeColor.current : inactiveColor.current
    };
  });
  const pressStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: isPressed.value ? activeBackgroundColor : backgroundColor,
      opacity: isPressed.value ? activeOpacity : 1
    };
  });
  const _style = useMemo(() => {
    const constantWidthStyle = itemWidth.current ? {
      flex: 0,
      width: itemWidth.current
    } : undefined;
    return [styles.tabItem, style, constantWidthStyle, pressStyle];
  }, [style]);
  const gesture = Gesture.Tap().maxDuration(60000).onEnd(() => {
    if (!ignore) {
      setCurrentIndex(index);
    }
    props.onPress && runOnJS(props.onPress)(index);
  }).onFinalize(() => {
    isPressed.value = false;
  }).onTouchesDown(() => {
    isPressed.value = true;
  });
  return <GestureDetector gesture={gesture}>
      <View reanimated
    // @ts-expect-error
    ref={itemRef} style={_style} onLayout={onLayout} testID={testID}>
        {leadingAccessory}
        {icon && <Reanimated.Image source={icon} style={[!_isUndefined(label) && styles.tabItemIconWithLabel, animatedIconStyle]} />}
        {!_isEmpty(label) && <Reanimated.Text {...labelProps} fsTagName={'unmask'} style={[styles.tabItemLabel, labelStyle, animatedLabelStyle, animatedLabelColorStyle]}>
            {uppercase ? _toUpper(label) : label}
          </Reanimated.Text>}
        {badge && <Badge backgroundColor={Colors.$backgroundDangerHeavy} size={20} {...badge} containerStyle={styles.badge} />}
        {trailingAccessory}
      </View>
    </GestureDetector>;
}
const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.s4
  },
  tabItemLabel: {
    ...Typography.text80
  },
  tabItemIconWithLabel: {
    marginRight: 10
  },
  badge: {
    marginLeft: Spacings.s1
  }
});