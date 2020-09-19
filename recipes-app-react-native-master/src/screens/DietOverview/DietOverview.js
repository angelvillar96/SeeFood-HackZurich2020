import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import {setUsername, getUsername} from '../../lib/authentification.js'
import { Images, nowTheme } from '../../constant';
import { HeaderHeight } from '../../constant/utils';
import { ProgressBar, Colors } from 'react-native-paper';
import axios from 'axios';

import host from '../../constant/config'

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }
  state = {
    foods: [],
    total_calories: 0,
    total_fat: 0,
    total_protein: 0,
    total_carbs: 0,
    progress: 0,
    date: ""
  }

  async componentDidMount() {
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

    console.log(day + '.' + month + '.' + year)
    this.setState({date: day + '.' + month + '.' + year})
    const $this = this
    //setUsername()
    const username = await getUsername()
    console.log(username)
    await axios({
      method: 'get',
      url: 'http://10.15.1.254:5000/api/overview/'+ username + '/' + this.state.date,
      headers: {'content-type': 'multipart/form-data',
                "Accept": "application/json"}
    })
    .then(async function (response) {
      // console.log(response.data)
      var data = response.data
      console.log(data)

      $this.setState({foods: data.foods});
      $this.setState({total_fat: data.total_fat});
      $this.setState({total_carbs: data.total_carbs})
      $this.setState({total_protein: data.total_protein})
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
    });
  }

  render() {
    const styles = StyleSheet.create({

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


    const progress_title = "You are killing it!"
    const progress_subtitle = "You are still 100 calories behid target!"


    return (
      <Block style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }} >
        <Block flex={0.2} >
          <Block style={styles.backgroundStyle}>
            <Block flex style={styles.profileCard}>
              <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
                <Block middle style={{ top: height * 0.15 }}>
                  <ProgressBar progress={0.6} color="#000000"/>
                </Block>
                <Block style={{ top: height * 0.2 }}>
                  <Block middle >
                    <Text
                      style={{
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26
                      }}
                      color='#ffffff'
                      >
                      {progress_title}
                    </Text>

                    <Text
                      size={16}
                      color="white"
                      style={{
                        marginTop: 5,
                        lineHeight: 20,
                        fontWeight: 'bold',
                        fontSize: 18,
                        opacity: .8
                      }}
                    >
                      {progress_subtitle}
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="around">

                      <Block middle>
                        <Text
                          size={18}
                          color="white"
                          style={{ marginBottom: 4}}
                        >
                          2K
                        </Text>
                        <Text  size={14} color="white">
                          Friends
                        </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4}}
                        >
                          26
                        </Text>
                        <Text  size={14} color="white">
                          Hello
                          </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4}}
                        >
                          48
                        </Text>
                        <Text  size={14} color="white">
                          Bookmarks
                        </Text>
                      </Block>

                    </Block>
                  </Block>
                </Block>

              </Block>

              <Block
                middle
                row
                style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}
              >
                {/* <Button style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                  Follow
                </Button> */}


              </Block>
            </Block>
          </Block>


        </Block>
        <Block />
        <Block flex={0.4} style={{ padding: theme.SIZES.BASE, marginTop: 90}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex style={{ marginTop: 20 }}>
              <Block middle>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontWeight: 'bold',
                    fontSize: 19,
                    marginTop: 15,
                    marginBottom: 30,
                    zIndex: 2
                  }}
                >
                  About me
                    </Text>
                <Text
                  size={16}
                  muted
                  style={{
                    textAlign: 'center',
                    zIndex: 2,
                    lineHeight: 25,
                    color: '#9A9A9A',
                    paddingHorizontal: 15
                  }}
                >
                  An artist of considerable range, named Ryan — the name has taken by Melbourne has raised,
                  Brooklyn-based Nick Murphy — writes, performs and records all of his own music.
                    </Text>
              </Block>
              <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
                <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
                  Album
                    </Text>
              </Block>

              <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15}}>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
      );
  }
}
