import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, Image, ImageBackground, Platform, View } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from "@paraboly/react-native-card";
import { Button } from './Button';
import { Images, nowTheme } from '../../constant';
import {Theme} from '../../constant/Theme.js';
import { HeaderHeight } from '../../constant/utils';
import Constants from 'expo-constants';
import axios from 'axios';

import host from '../../constant/config'

import {setUsername, getUsername} from '../../lib/authentification.js'

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 2.5;

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    user_data: undefined
  }

  async componentDidMount() {

    setUsername()
    const username = await getUsername()
    console.log(username)
    const $this = this
    await axios({
      method: 'get',
      url: 'http://' + host + ':5000/api/profile/'+username,
      headers: {'content-type': 'multipart/form-data',
                "Accept": "application/json"}
    })
    .then(async function (response) {
      console.log("siiiii")
      // console.log(response.data)
      var user_data = response.data
      console.log(user_data)
      await $this.setState({user_data: user_data})
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
        height: height * 0.50
      },
      card: {
        margin: 5,
      },
      info: {
        marginTop: 20,
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
        marginTop: 25
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

    return (
      <Block style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }} >
        <Block flex={0.6} >
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block flex style={styles.profileCard}>
              <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
                <Block middle style={{ top: height * 0.10 }}>
                  <Image source={Images.ProfilePicture} style={styles.avatar} />
                </Block>
                <Block style={{ top: height * 0.15 }}>
                  <Block middle >
                    <Text
                      style={{
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26
                      }}
                      color='#ffffff'
                    >
                      Angel Villar-Corrales
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
                      Engineer and Amateur Runner
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="around">

                      <Block middle>
                        <Text
                          size={18}
                          color="white"
                          style={{ marginBottom: 4 }}
                        >
                          24
                        </Text>
                        <Text size={14} color="white">
                          Age
                        </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4 }}
                        >
                          177 cm
                        </Text>
                        <Text size={14} color="white">
                          Height
                          </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4 }}
                        >
                          70 Kg
                        </Text>
                        <Text size={14} color="white">
                          Weight
                        </Text>
                      </Block>

                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex={0.4}
          style={{ padding: theme.SIZES.BASE, marginTop: 100 }}>
          <View style={{flex: 5}}>
            <ScrollView style={{flexGrow: 1}} >
              <View style={styles.card}>
                <Card
                  iconDisable
                  title="Special Diet"
                  titleFontSize={20}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="Vegetaria, Pescaterian, Low-Carbs"
                  topRightStyle={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#505e80"
                  }}
                  bottomRightStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#505e80"
                  }}
                />
              </View>
              <View style={styles.card}>
                <Card
                  iconDisable
                  title="Allergies"
                  titleFontSize={18}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="--"
                  topRightStyle={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#505e80"
                  }}
                  bottomRightStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#505e80"
                  }}
                />
              </View>
              <View style={styles.card}>
                <Card
                  iconDisable
                  title="Goal"
                  titleFontSize={18}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  bottomRightText="2200 Kcal"
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="Target Daily Calories"
                  topRightStyle={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#505e80"
                  }}
                  bottomRightStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#505e80"
                  }}
                />
              </View>
              <View style={styles.card}>
              <Card
                iconDisable
                title="Goal"
                titleFontSize={18}
                iconName="home"
                iconType="Entypo"
                onPress={() => { }}
                borderRadius={20}
                bottomRightText="1800 Kcal"
                iconBackgroundColor="#fcd"
                textContainerNumberOfLines={null}
                content="Target Daily Calories"
                topRightStyle={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: "#505e80"
                }}
                bottomRightStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#505e80"
                }}
              />
            </View>
            </ScrollView>
          </View>
        </Block>
      </Block>
    );
  }
}
