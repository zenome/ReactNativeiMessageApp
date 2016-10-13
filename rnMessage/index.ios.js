/**
 * Copyright (c) 2016-present ZENOME, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import Config from './Config';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class VirtualVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
        },
      ],
      vehicles : [],
      loading : true,
      req_sending: false
    };
  }

  componentDidMount() {
      this.fetchData();
  }

  fetchData() {
      this.setState({loading: true});
      fetch(Config.SERVER_ADDRESS + '/vehicle', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((response_dic) => {
        console.log('response from /vehicle : ' + JSON.stringify(response_dic));
        this.setState({

          region: {
            latitude: response_dic[0].Location.Latitude,
            longitude: response_dic[0].Location.Longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers: [
            {
              coordinate: {
                latitude: response_dic[0].Location.Latitude + SPACE,
                longitude: response_dic[0].Location.Longitude + SPACE,
              },
            },
          ],
          vehicles : response_dic, 
          loading : false ,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({loading:false});
      });
  }

  engine(v) {
      this.setState({req_sending: true});
      let command = v.status == 'Engine On' ? '/vehicle/engineoff' : '/vehicle/engineon';
      fetch(Config.SERVER_ADDRESS + command, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(v)
      })
      .then((response) => {
        return response.json();
      })
      .then((response_dic) => {
        console.log('response from /vehicle : ' + JSON.stringify(response_dic));
        this.setState({
            vehicles : response_dic, 
            req_sending : false });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({req_sending:false});
      });
  }

  poi() {
  }

  render() {
    if(this.state.loading) {
      return (
        <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    else {
      let engineCommand = this.state.vehicles[0].status == 'Engine On' ? 'Engine Off' : 'Engine On'
      return (
        <View style={styles.container}>

          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            showsUserLocation={true}
            >
            <MapView.Marker
              ref={ref => { this.marker1 = ref; }}
              coordinate={this.state.markers[0].coordinate}
              title={this.state.vehicles[0].CarManufacturer + ' ' + this.state.vehicles[0].Vehicle.Model}
            />
          </MapView>
     
          <View style={styles.informationPanel}>
            <View style={{margin:10}}>
              <Text style={styles.textstatus}> Status : {this.state.vehicles[0].status}</Text>
              <Text> Car Manufacturer : {this.state.vehicles[0].CarManufacturer}</Text>
              <Text> Model : {this.state.vehicles[0].Vehicle.Model}</Text>
              <Text> Year : {this.state.vehicles[0].Vehicle.Modelyear}</Text>
              <Text> Color : {this.state.vehicles[0].Vehicle.Color}</Text>
              <Text> IMEI : {this.state.vehicles[0].Vehicle.IMEI}</Text>
              <Text> License Plate : {this.state.vehicles[0].Vehicle.LicensePlate}</Text>
            </View>
          </View>
          
          <View style={{backgroundColor: '#f3f3f3', flexDirection:'row', alignSelf:'flex-end'}}>
            <ActionButton style={{alignItems:'flex-end'}} buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title={engineCommand} onPress={()=>this.engine(this.state.vehicles[0])}>
                <Icon name="md-heart" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="POI" onPress={()=>this.poi()}>
                <Icon name="md-map" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
            <View style={{width:50}}></View>
          </View>
     
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  informationPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'column',
    alignSelf:'center'
  },
  textstatus: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppRegistry.registerComponent('rnmessage', () => VirtualVehicle);
