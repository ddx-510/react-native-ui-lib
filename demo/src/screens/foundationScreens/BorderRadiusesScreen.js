import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {BorderRadiuses, View, Text} from 'react-native-ui-lib';
import {renderScreenTitle} from '../ExampleScreenPresenter';

export default class BorderRadiusesScreen extends Component {
  render() {
    return (
      <View>
        {renderScreenTitle('Border Radius', {margin: 20})}
        <ScrollView contentContainerStyle={styles.container}>
          
          <View>
            {_.map(BorderRadiuses, (value, key) => {
              return (
                <View center key={key} height={150} width={150}>
                  <View style={styles.labelContainer}>
                    <Text grey30 text50>
                      {key}
                    </Text>
                    <Text grey30 text70>
                      ({value})
                    </Text>
                  </View>
                  <View style={{borderRadius: value}} bg-yellow30 width="40%" height="40%"/>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    alignItems: 'center'
  },
  labelContainer: {
    position: 'absolute',
    top: 5,
    left: 5
  }
});
