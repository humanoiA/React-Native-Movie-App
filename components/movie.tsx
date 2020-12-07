/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
export default class App extends React.Component<{}, any> {
  isRender = false;
  //isDialogVisible = false;
  genreFilter = [];
  constructor(props: any) {
    super(props);
    //const isRender = false;
    this.state = {data: Array, search: '', isVisible: false};
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateSearch = (search: String) => {
    this.setState({search: search});
  };
  loadData() {
    const client = new ApolloClient({
      uri: 'http://192.168.31.247:4000/',
      cache: new InMemoryCache(),
    });
    const query = gql`
      query getMovies {
        getMovies {
          id
          name
          producer
          genre
          rating
        }
      }
    `;
    client
      .query({
        query: query,
      })
      .then((result) => this.setState({data: result.data.getMovies}))
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.loadData();
    this.isRender = true;
  }
  //Alert.alert(this.state.title.toString());
  render() {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#FFC0CB',
        }}>
        <Input
          underlineColorAndroid="transparent"
          inputStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 30,
            height: 55,
            alignSelf: 'center',
            width: 370,
          }}
          placeholder="Search by Genre"
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
        <ScrollView>
          {this.isRender ? (
            this.state.data
              .filter((t, k) =>
                this.state.search === ''
                  ? t.genre === t.genre
                  : t.genre === this.state.search,
              )
              .map((t, k) => (
                <Card
                  borderRadius={30}
                  style={{backgroundColor: '#003f5c'}}
                  key={k}>
                  <Card.Title>{t.name}</Card.Title>
                  <Card.Divider />
                  <Text>{'Producer: ' + t.producer}</Text>
                  <Card.Divider />
                  <Text>{'Rating: ' + t.rating.toString()}</Text>
                  <Card.Divider />
                  <Text>{'Genre: ' + t.genre}</Text>
                </Card>
              ))
          ) : (
            <Text>{'No Data'}</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}
