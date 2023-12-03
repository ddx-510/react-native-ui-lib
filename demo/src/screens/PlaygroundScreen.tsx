import React, {Component} from 'react';
import {View, Text, Card, TextField, Button} from 'react-native-ui-lib';
import {UIManager, Platform, LayoutAnimation} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class PlaygroundScreen extends Component {
  state = {
    show: false
  };
  onPress = () => {
    this.setState({show: !this.state.show});
  };

  render() {
    return (
      <View bg-grey80 flex bottom>
        <Button
          label="Button"
          fullWidth
          onPress={() => {
            LayoutAnimation.configureNext({
              duration: 500,
              update: {type: 'easeOut', property: 'scaleY'}
            });
            this.onPress();
          }}
        />
        {this.state.show && (
          <View height={100}>
            <Text>I'm a footer</Text>
          </View>
        )}
      </View>
    );
  }
}
