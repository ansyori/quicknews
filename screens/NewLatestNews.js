import React, { Component  }  from 'react';
import { Modal, Alert,StyleSheet, Text, View, Image,  TouchableHighlight, TouchableOpacity,ListView, ActivityIndicator,RefreshControl  } from 'react-native'; 
import { Container, Header, Title,Subtitle, Content, Button,  Card, CardItem,  Body, Left, Right, Thumbnail, Icon, Text as NBText } from "native-base";

import { Config }  from './Config.js';

import { WebView } from 'react-native';




class DetailsScreen extends React.Component {
	
   static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.name,
  });
	
  render() {
    return (
     <WebView
        /* source={{uri: `${this.props.navigation.state.params.sourceUrl}`}} */
        style={{marginTop: 5}}
      />
    );
  }
}


export default class App extends React.Component {
	
	 static navigationOptions = {
		title: 'Latest News',
	}	;
  
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
	  refreshing: false,
	  modalVisible: false,
	  currentWebViewUrl:'https://www.google.co.id/',
	  currentTitle:''
	  
    }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setWebview(WVurl) {
    this.setState({currentWebViewUrl: WVurl});
  }
  
  setJudul(WVurl) {
    this.setState({currentTitle: WVurl});
  }
  
  
  
  
  //https://newsapi.org/v2/everything?domains=wsj.com&apiKey=bcdfef41b6694d2c830112b65c5d3519
  componentDidMount() {
    return fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=bcdfef41b6694d2c830112b65c5d3519')
      .then((response) => response.json())
      .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson["articles"]),
        }, function() {
          // do something with new state
        });  
		console.log('parsing json');
		console.log(responseJson["articles"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  reloadNews = () =>{
	   
	  return fetch(Config.api_ulr_sample)
      .then((response) => response.json())
      .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson["articles"]),
        }, function() {
          // do something with new state
		  
		  this.setState({'refreshing': false});
        });  
		console.log('parsing json');
		console.log(responseJson["articles"]);
      })
      .catch((error) => {
        console.error(error);
      });
	   
   };
  
  _onRefresh() {
	
	//Alert.alert('lagi refersh, hadeeeehhh');
	  
    this.setState({'refreshing': true});
	//this.setState({'isLoading': true});
	
    /* fetchData().then(() => {
      this.setState({refreshing: false});
    }); */
	
	this.reloadNews();
  }
  
  render() {
  //const { navigate } = this.props.navigation;

	
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
	<View>
	
	<Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
         
 
			
			<Container>
				<Header>
				<Left>
		 
					  <Button transparent onPress={() => {
						  this.setModalVisible(!this.state.modalVisible);
						}}>
					 
						 <Icon name='arrow-back' />
					  
					  </Button>
					   
					   
					   
					   
				</Left>
				
				
				 <Body>
					<Title>{this.state.currentTitle}</Title>
				  </Body>
				  
				<Right />
				
		 
				
				</Header>
				<Content>
		
				   <WebView
						 source={{uri: `${this.state.currentWebViewUrl}`}}
						
						style={{
							height: 8000,
							width: '100%'
						}}
									  
						  
						  />
					  
	
				</Content>
			  </Container>
			
        
        </Modal>
	

          <ListView 
		  
		   refreshControl={
			  <RefreshControl
				refreshing={this.state.refreshing}				
				onRefresh={this._onRefresh.bind(this)}
			  />
			}
		  
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
		  
		  <TouchableOpacity 		
		 /* onPress={() =>
          navigate('Details', { name: `${rowData.title}`,myvar:'wahhh keren',catid:`${rowData.title}`,sourceUrl:`${rowData.url}` })
        } */
		
		
		onPress={() => {
            this.setModalVisible(true);
			this.setWebview(`${rowData.url}`);
			this.setJudul(`${rowData.title}`);
			
			
          }}
		
		> 
		
		{rowData.urlToImage ?

			 
		  <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: rowData.urlToImage}} />
                <Body>
                  <Text>{rowData.source.name} : {rowData.author}</Text>
                  <Text note>{rowData.title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
			 
              <Image source={{uri: rowData.urlToImage }} style={{height: 100, width: null, flex: 1}}/>
			 
            </CardItem>
            <CardItem>

              <Body>
               <Text note>{rowData.description}</Text>
              </Body>
             
            </CardItem>
          </Card>
			 
			 
		   : null}
		  </TouchableOpacity>}
        />
	</View>
		
    );
  }
	
}


