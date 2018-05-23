import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView  } from 'react-native'; 

import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";

import { NativeRouter, Route, Link } from 'react-router-native'
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './dummyscreens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
     // icon: require('../img/one.png'),
     // selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      //icon: require('../img/two.png'),
     // selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Screen Two'
    }
  ]
});



