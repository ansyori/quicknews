import React, { Component  }  from 'react';
import { StyleSheet, Text, View, Image, WebView  } from 'react-native'; 

import { Container, Header, Title, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon as NBIcon } from "native-base";

export default class App extends React.Component {
	
  render() {
    return <Container>
        <Header />
        <Content>
          
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 1</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 2</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 3</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 3</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 3</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 3</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  
		  <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>Category Name 3</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://loremflickr.com/320/240'}} style={{height: 100, width: null, flex: 1}}/>
            </CardItem>
          </Card>
		  
		  
        </Content>
      </Container>;
  }
}

