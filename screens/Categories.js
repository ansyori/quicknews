import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView  } from 'react-native'; 

import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";

/*
https://newsapi.org/v2/top-headlines?country=id&category=sport&apiKey=bcdfef41b6694d2c830112b65c5d3519
https://newsapi.org/v2/top-headlines?country=id&category=politics&apiKey=bcdfef41b6694d2c830112b65c5d3519
https://newsapi.org/v2/top-headlines?country=id&category=business&apiKey=bcdfef41b6694d2c830112b65c5d3519

*/

export default class App extends React.Component {
	
  render() {
    return <Container>
        <Header />
        <Content>
          
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Sports</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		   <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Technology</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/11406/c12ee0f379643a278198b2086afd3b9c.jpg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Business</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Politics</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1525653286000/photosp/24ce4df4-0b73-4620-8635-253311e9802e/stock-photo-politics-united-states-kansas-house-of-representatives-senate-session-chambers-state-capitol-legislature-24ce4df4-0b73-4620-8635-253311e9802e.jpg'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Science</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/4154/clinic-doctor-health-hospital.jpg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		 
		  
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Health</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Entertainment</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&h=350'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  
        </Content>
      </Container>;
  }
}



