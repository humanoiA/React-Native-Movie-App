/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Alert, ScrollView, Text, View, TextInput} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Dialog from 'react-native-dialog';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
export default class App extends React.Component<{}, any> {
  isRender = false;
  //isDialogVisible = false;
  genreFilter = [];
  constructor(props: any) {
    super(props);
    //const isRender = false;
    this.state = {
      data: Array,
      search: '',
      isVisible: false,
      isVisible2: false,
      title: '',
      producer: '',
      rating: '',
      genre: '',
      id: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateSearch = (search: String) => {
    this.setState({search: search});
  };
  addData() {
    const client = new ApolloClient({
      uri: 'http://192.168.31.247:4000/',
      cache: new InMemoryCache(),
    });
    const query = gql`
      mutation addMovie(
        $name: String!
        $genre: String!
        $producer: String!
        $rating: String!
      ) {
        addMovie(
          name: $name
          producer: $producer
          rating: $rating
          genre: $genre
        ) {
          id
          name
          producer
          genre
          rating
        }
      }
    `;
    client
      .mutate({
        mutation: query,
        variables: {
          name: this.state.title,
          genre: this.state.genre,
          producer: this.state.producer,
          rating: this.state.rating,
        },
      })
      .then((result) =>
        this.setState({
          isVisible2: false,
        }),
      )
      .catch((error) => console.log(error));
    this.loadData();
  }
  deleteData() {
    const client = new ApolloClient({
      uri: 'http://192.168.31.247:4000/',
      cache: new InMemoryCache(),
    });
    const query = gql`
      mutation deleteMovie($id: String!) {
        deleteMovie(id: $id) {
          id
        }
      }
    `;
    client
      .mutate({
        mutation: query,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => this.loadData())
      .catch((error) => console.log(error));
  }
  updateData() {
    const client = new ApolloClient({
      uri: 'http://192.168.31.247:4000/',
      cache: new InMemoryCache(),
    });
    const query = gql`
      mutation updateMovie(
        $name: String!
        $genre: String!
        $producer: String!
        $rating: String!
      ) {
        updateMovie(
          name: $name
          producer: $producer
          rating: $rating
          genre: $genre
        ) {
          id
          name
          producer
          genre
          rating
        }
      }
    `;
    client
      .mutate({
        mutation: query,
        variables: {
          name: this.state.title,
          genre: this.state.genre,
          producer: this.state.producer,
          rating: this.state.rating,
        },
      })
      .then((result) =>
        this.setState({
          isVisible: false,
        }),
      )
      .catch((error) => console.log(error));
    this.loadData();
  }
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
    const leftContent = <Text>Pull to activate</Text>;

    const rightButtons = [
      <Card
        containerStyle={{
          borderRadius: 30,
          height: '90%',
          backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: 'white',
            display: 'flex',
            marginTop: '16%',
            alignItems: 'center',
          }}>
          Delete
        </Text>
      </Card>,
    ];
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
                <TouchableOpacity
                  key={k}
                  onPress={() =>
                    this.setState({
                      id: t.id,
                      title: t.name,
                      producer: t.producer,
                      rating: t.rating,
                      genre: t.genre,
                      isVisible: true,
                    })
                  }>
                  <Swipeable
                    leftContent={leftContent}
                    rightButtons={rightButtons}
                    rightActionActivationDistance={11}
                    onRightActionRelease={() => {
                      this.setState({
                        id: t.id,
                        title: t.title,
                      });
                      this.deleteData();
                    }}>
                    <Card
                      borderRadius={30}
                      style={{backgroundColor: '#003f5c'}}>
                      <Card.Title>{t.name}</Card.Title>
                      <Card.Divider />
                      <Text>{'Producer: ' + t.producer}</Text>
                      <Card.Divider />
                      <Text>{'Rating: ' + t.rating.toString()}</Text>
                      <Card.Divider />
                      <Text>{'Genre: ' + t.genre}</Text>
                    </Card>
                  </Swipeable>
                </TouchableOpacity>
              ))
          ) : (
            <Text>{'No Data'}</Text>
          )}
        </ScrollView>
        <Dialog.Container visible={this.state.isVisible}>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                title: text,
              })
            }>
            {this.state.title}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                producer: text,
              })
            }>
            {this.state.producer}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                rating: text,
              })
            }>
            {this.state.rating}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                genre: text,
              })
            }>
            {this.state.genre}
          </TextInput>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({
                isVisible: false,
              });
            }}
          />
          <Dialog.Button label="OK" onPress={() => this.updateData()} />
        </Dialog.Container>
        <Button
          onPress={() =>
            this.setState({
              isVisible2: true,
              title: '',
              producer: '',
              rating: '',
              genre: '',
            })
          }
          title="Add Movie"
        />
        <Dialog.Container visible={this.state.isVisible2}>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                title: text,
              })
            }>
            {this.state.title}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                producer: text,
              })
            }>
            {this.state.producer}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                rating: text,
              })
            }>
            {this.state.rating}
          </TextInput>
          <TextInput
            onChangeText={(text) =>
              this.setState({
                genre: text,
              })
            }>
            {this.state.genre}
          </TextInput>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              this.setState({
                isVisible2: false,
              });
            }}
          />
          <Dialog.Button label="OK" onPress={() => this.addData()} />
        </Dialog.Container>
      </View>
    );
  }
}
