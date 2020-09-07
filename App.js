import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import createPDF from './crearPDF';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: '',
    };
  }

  callback = (filePath) => {
    var that = this;
    console.log(`path: ${filePath}`);
    that.setState({filePath: filePath});
  };

  // eslint-disable-next-line consistent-this
  requestExternalWritePermission = async () => {
    console.log('entre en requestExternalWritePermission');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'CameraExample App External Storage Write Permission',
          message:
            'CameraExample App needs access to Storage data in your SD Card ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //If WRITE_EXTERNAL_STORAGE Permission is granted
        //changing the state to show Create PDF option
        createPDF(this.callback);
      } else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      alert('Write permission err', err);
      console.warn(err);
    }
  };

  askPermission = () => {
    console.log('entre en askpermission');
    let filePath = '';
    //Calling the External Write permission function
    if (Platform.OS === 'android') {
      this.requestExternalWritePermission();
    } else {
      createPDF(this.callback);
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.Container}>
            <Text>PDF Generator</Text>
            <TouchableOpacity onPress={this.askPermission}>
              <View style={styles.btnContainer}>
                <Text>Generate</Text>
              </View>
            </TouchableOpacity>
            <Text>FilePath: </Text>
            <Text>{this.state.filePath}</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnContainer: {
    alignItems: 'center',
    backgroundColor: '#33E1FF',
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 30,
    margin: 20,
  },
});
