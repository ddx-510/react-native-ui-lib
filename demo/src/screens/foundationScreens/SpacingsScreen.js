import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Spacings} from 'react-native-ui-lib'; //eslint-disable-line
import {renderScreenTitle} from '../ExampleScreenPresenter';

export default class SpacingsScreen extends Component {
  
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View padding-18>
          {renderScreenTitle('Spacings', {marginBottom: 20})}
          {_.map(Spacings, (value, key) => {
            if (!_.isNumber(value)) {
              return;
            }
            
            return (
              <View key={key} marginB-12>
                <View row spread bottom>
                  <Text text60 grey10>{key}</Text>
                  <Text grey30 text90>{value}</Text>
                </View>
                <View height={value} bg-red80 right/>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
