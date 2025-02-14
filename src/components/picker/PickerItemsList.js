import _times from "lodash/times";
import _throttle from "lodash/throttle";
import _isFunction from "lodash/isFunction";
import React, { useCallback, useContext, useState, useMemo } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';
import { Typography, Colors } from "../../style";
import Assets from "../../assets";
import Modal from "../modal";
import View from "../view";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import WheelPicker from "../WheelPicker";
import { PickerModes } from "./types";
import PickerContext from "./PickerContext";
import PickerItem from "./PickerItem";
import { Constants } from "../../commons/new";
const keyExtractor = (_item, index) => index.toString();
const PickerItemsList = props => {
  const {
    useWheelPicker,
    topBarProps,
    listProps,
    children,
    items,
    showSearch,
    searchStyle = {},
    searchPlaceholder = 'Search...',
    onSearchChange,
    renderCustomSearch,
    renderCustomDialogHeader,
    useSafeArea,
    useDialog,
    mode,
    testID
  } = props;
  const context = useContext(PickerContext);
  const [wheelPickerValue, setWheelPickerValue] = useState(context.value ?? items?.[0].value);
  // TODO: Might not need this memoized style, instead we can move it to a stylesheet
  const wrapperContainerStyle = useMemo(() => {
    // const shouldFlex = Constants.isWeb ? 1 : useDialog ? 1 : 1;
    const shouldFlex = true;
    const style = {
      flex: shouldFlex ? 1 : 0,
      maxHeight: Constants.isWeb ? Constants.windowHeight * 0.75 : undefined
    };
    return style;
  }, [/* useDialog */]);
  const renderSearchInput = () => {
    if (showSearch) {
      if (_isFunction(renderCustomSearch)) {
        return renderCustomSearch(props);
      }
      return <View style={styles.searchInputContainer}>
          <Icon style={styles.searchIcon} tintColor={Colors.$iconDefault} source={searchStyle.icon || Assets.icons.search} />
          <TextInput testID={testID}
        // ref={r => (this.search = r)}
        style={[styles.searchInput, {
          color: searchStyle.color
        }]} placeholderTextColor={searchStyle.placeholderTextColor} selectionColor={searchStyle.selectionColor} placeholder={searchPlaceholder}
        // @ts-expect-error
        onChangeText={_throttle(onSearchChange, 300)} autoCorrect={false} underlineColorAndroid="transparent" />
        </View>;
    }
  };
  const renderItem = useCallback(({
    index
  }) => {
    return React.Children.toArray(children)[index];
  }, [children]);
  const renderPropItems = useCallback(({
    item
  }) => {
    return <PickerItem {...item} />;
  }, []);
  const renderList = () => {
    if (items) {
      return <FlatList testID={`${testID}.list`} data={items} renderItem={renderPropItems} keyExtractor={keyExtractor} {...listProps} />;
    }
    return <FlatList data={_times(React.Children.count(children))}
    // @ts-expect-error
    renderItem={renderItem} keyExtractor={keyExtractor} testID={`${testID}.list`} {...listProps} />;
  };
  const renderCancel = () => {
    const {
      cancelButtonProps,
      cancelLabel,
      onCancel
    } = topBarProps ?? {};
    return <>
        {cancelLabel ? <Text text70 $textPrimary accessibilityRole={'button'} onPress={onCancel}>
            {cancelLabel}
          </Text> : cancelButtonProps ? <Button key={'cancel-button'} link onPress={onCancel} {...cancelButtonProps} /> : undefined}
      </>;
  };
  const renderWheel = () => {
    const {
      cancelButtonProps,
      cancelLabel,
      doneLabel,
      title,
      titleStyle,
      containerStyle,
      useSafeArea
    } = topBarProps ?? {};
    return <View useSafeArea={useSafeArea}>
        <View row spread padding-page style={containerStyle}>
          {(cancelButtonProps || cancelLabel) && renderCancel()}
          <Text style={titleStyle}>{title}</Text>
          <Text text70 $textPrimary accessibilityRole={'button'} onPress={() => context.onPress(wheelPickerValue)}>
            {doneLabel ?? 'Select'}
          </Text>
        </View>
        <WheelPicker flatListProps={listProps} initialValue={context.value} items={items} onChange={setWheelPickerValue} />
      </View>;
  };
  const renderPickerHeader = () => {
    if (renderCustomDialogHeader) {
      return renderCustomDialogHeader?.({
        onDone: topBarProps?.onDone,
        onCancel: topBarProps?.onCancel
      });
    } else if (!useDialog || mode === PickerModes.MULTI) {
      return <Modal.TopBar {...topBarProps} />;
    }
  };
  return <View bg-$backgroundDefault style={wrapperContainerStyle} useSafeArea={useSafeArea}>
      {!useWheelPicker && <>
          {renderPickerHeader()}
          {renderSearchInput()}
          {renderList()}
        </>}

      {useWheelPicker && renderWheel()}
    </View>;
};
const styles = StyleSheet.create({
  modalBody: {},
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.$outlineDefault
  },
  searchIcon: {
    marginRight: 12
  },
  searchInput: {
    height: 60,
    paddingRight: 16,
    flex: 1,
    ...Typography.text70
  }
});
export default PickerItemsList;