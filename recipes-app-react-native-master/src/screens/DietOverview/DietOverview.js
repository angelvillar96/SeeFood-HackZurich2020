import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import {setUsername, getUsername} from '../../lib/authentification.js'
import { Images, nowTheme } from '../../constant';
import { HeaderHeight } from '../../constant/utils';
import { ProgressBar, Colors } from 'react-native-paper';
import { Card } from "@paraboly/react-native-card";
import axios from 'axios';

import host from '../../constant/config'

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      total_calories: 0,
      total_fat: 0,
      total_protein: 0,
      total_carbs: 0,
      progress: 0,
      date: ""
    }
  }


  async componentWillMount() {
    today = new Date()
    var day = today.getDate().toString()
    if (day.lenght === 1){
      day = '0'+ day;
    }
    var month = (today.getMonth() + 1).toString();
    if(month.length === 1){
      month = '0' + month;
    }
    var year = today.getFullYear().toString();
    year = year.substr(2, 3)

    this.setState({date: day + '.' + month + '.' + year})
    var $this = this
    //setUsername()
    const username = await getUsername()
    await axios({
      method: 'get',
      url: 'http://10.15.1.254:5000/api/overview/'+ username + '/' + this.state.date,
      headers: {'content-type': 'multipart/form-data',
                "Accept": "application/json"}
    })
    .then(async function (response) {
      var d = response.data
      console.log("fetched data")
      console.log(d.data)

      await $this.setState({foods: d.data.foods,
                            total_calories: d.data.total_calories,
                            total_fat: d.data.total_fat,
                            total_carbs: d.data.total_carbs,
                            total_protein: d.data.total_protein})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
    });
  }

  render() {
    const styles = StyleSheet.create({
      title: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 10,
        fontSize:28,
        fontWeight: "bold"
      },
      title_center: {
        padding: 20,
        paddingBottom: 10,
        fontSize:30,
        fontWeight: "bold",
        textAlign: "center"
      },
      data: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 40,
        fontSize:22,
        textAlign: "center"
      },
      data_center: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize:24,
        textAlign: "center"
      },
      card: {
        paddingTop: 20
      },
      profileContainer: {
        width,
        height,
        padding: 0,
        zIndex: 1
      },
      profileBackground: {
        width,
        height: height * 0.15
      },

      backgroundStyle: {
        color: "#00e003"
      },

      info: {
        marginTop: 30,
        paddingHorizontal: 10,
        height: height * 0.8
      },
      avatarContainer: {
        position: 'relative',
        marginTop: -80
      },
      avatar: {
        width: thumbMeasure,
        height: thumbMeasure,
        borderRadius: 50,
        borderWidth: 0
      },
      nameInfo: {
        marginTop: 35
      },
      thumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
      },
      social: {
        width: nowTheme.SIZES.BASE * 3,
        height: nowTheme.SIZES.BASE * 3,
        borderRadius: nowTheme.SIZES.BASE * 1.5,
        justifyContent: 'center',
        zIndex: 99,
        marginHorizontal: 5
      }
    });


    const renderFoods = (cards) => {
      return (
        <Block style={styles.container}>
          {
            cards.map((card,idx) =>
              {card}
            )
          }
        </Block>
      );
    }

    //const cards = []
    console.log("State")
    console.log(this.state.foods)
    console.log("aaaaaa")
    const arr = this.state.foods
    const items = arr.map((item) =>
      <View style={styles.card}>
        <Card title={item.name} iconDisable content={"Calories: " + item.calories + "      C: " + item.carbs + "g   P: " + item.protein + "g   F: " + item.fat + "g"}  >
        </Card>
      </View>
    )
    console.log(items)



    return (
      <Block style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }} >
      <Block flex={0.2} style={{flex: 0.3,flexDirection: 'column'}}>
      <View style={{textAlign: "center"}}>
        <Text style={styles.title_center}>Total Calories</Text>
        <Text style={styles.data_center}>{this.state.total_calories} / 2500</Text>
      </View>
      <ProgressBar style={{marginHorizontal: 20, marginTop: 10 }}progress={this.state.total_calories / 2500} color={Colors.red800} />
      </Block>
      <Block flex={0.3} style={{flex: 0.3,flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <Text style={styles.title}>Fat</Text>
            <Text style={styles.data}>{this.state.total_fat}</Text>
          </View>
          <View style={{flex: 4}}>
            <Text style={styles.title}>Proteins</Text>
            <Text style={styles.data}>{this.state.total_protein}</Text>
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.title}>Carbs</Text>
            <Text style={styles.data}>{this.state.total_carbs}</Text>
          </View>
      </Block>
      <Block flex={1.6}
        style={{ padding: theme.SIZES.BASE, marginTop: 10 }}>
        {items}
      </Block>
    </Block>
      );
  }
}
