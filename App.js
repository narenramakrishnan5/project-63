import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
       isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              
              definition: '',
              };
  }
  getWord = (word) => {
    var url = 'https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].meanings[0].partOfSpeech
        
      
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
          lexicalCategory:lexicalCategory,
          
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'#70ae98'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: { color: 'white', fontSize:20, fontFamily: 'French Script MT' },
          }}
        />

        <TextInput
          style={styles.inputBox}
          placeholder=""
          onChangeText={(text) => {
            this.setState({
              text: text
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> Search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18 , fontWeight:"bold"}}>Word :{this.state.word}</Text>
        <Text style={{ fontSize: 18 , fontWeight:"bold", marginTop:20}}>Definition :{this.state.definition}</Text>
         <Text style={{ fontSize: 18 , fontWeight:"bold", marginTop:20}}>Type :{this.state.lexicalCategory}</Text>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'black',
    outline: 'none',
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
