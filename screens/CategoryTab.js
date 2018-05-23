import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import TabNews from './NewsContainer';



export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header/>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Sports">
            <TabNews kategori="sports" />
          </Tab>
          <Tab heading="Technology">
            <TabNews  kategori="technology"  />
          </Tab>
          <Tab heading="Business">
            <TabNews kategori="business" />
          </Tab>
          <Tab heading="Politics">
            <TabNews kategori="politics" />
          </Tab>
          <Tab heading="Science">
            <TabNews kategori="science" />
          </Tab>
		  
		  <Tab heading="Health">
            <TabNews kategori="health" />
          </Tab>
		  
		  <Tab heading="Entertainment">
            <TabNews kategori="entertainment" />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}