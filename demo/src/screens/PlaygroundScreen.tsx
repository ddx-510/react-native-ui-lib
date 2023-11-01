import React, {Component} from 'react';
import {View, Card, TextField, Button} from 'react-native-ui-lib';
import {renderScreenTitle} from './ExampleScreenPresenter';

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <View marginT-20>
          <TextField migrate placeholder="Placeholder"/>
        </View>
        <Card height={100} center padding-20>
          {renderScreenTitle('Playground Screen')}
        </Card>
        <View flex center>
          <Button marginV-20 label="Button"/>
        </View>
      </View>
    );
  }
}
