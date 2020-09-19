import React from 'react';
import {StyleSheet, FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import axios from 'axios';
import RecipeScreen from '../Recipe/RecipeScreen';
import Theme from '../../constant/Theme.js';
import { AsyncStorage } from 'react-native';

import {setUsername} from '../../lib/authentification.js'
import {getUsername} from '../../lib/authentification.js'


export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipes',
    headerLeft: () => <RecipeScreen
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  state = {
    recipes: []
  }

  constructor(props) {
    super(props);
    setUsername()
  }

  async componentDidMount() {
    // if(this.state.recipes.length == 0){
    const recipes = this.get_recipe_data()
    // await this.setState({recipes: recipes})
  }

  get_recipe_data = async () => {

    const username = await getUsername()
    console.log(username)
    const formData = new FormData()
    formData.append("username", username);
    formData.append("ingredient", undefined);
    const $this = this
    await axios({
      method: 'post',
      url: 'http://10.15.1.254:5000/api/get_recipe',
      data: formData,
      headers: {'content-type': 'multipart/form-data',
                "Accept": "application/json"}
    })
    .then(async function (response) {
      console.log("siiiii")
      // console.log(response.data)
      var recipes = response.data.recommendations
      console.log(recipes)
      await $this.setState({recipes: recipes})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
    });

    // console.log(recipes.length)

    // return recipes

  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };


  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.general_info.image_url }} />
        <Text style={styles.title}>{item.general_info.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.general_info.teaser)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {

    return (
      <View style={styling.screen}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

const styling = StyleSheet.create({
  screen: {
    backgroundColor: Theme.COLORS.BACKGROUND,
    flexDirection: "column"
  }
});
