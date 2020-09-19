import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView, Image, ImageBackground, Platform, View } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from "@paraboly/react-native-card";
import { Button } from './Button';
import { Images, nowTheme } from '../../constant';
import { HeaderHeight } from '../../constant/utils';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 2.5;

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
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
                      Ryan Scheinder
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
                      Photographer
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
                          178 cm
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
          <SafeAreaView style={{
            flex: 1,
            // marginTop: Constants.statusBarHeight,
          }}>
            <ScrollView style={{flex: 1}} >
              <View style={styles.card}>
                <Card
                  iconDisable
                  title="Activity Title"
                  titleFontSize={20}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  topRightText="09:30"
                  bottomRightText="30 km"
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="General description about the activity and or the event"
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
                  title="Activity Title"
                  titleFontSize={20}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  topRightText="09:30"
                  bottomRightText="30 km"
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="General description about the activity and or the event"
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
                  title="Activity Title"
                  titleFontSize={20}
                  iconName="home"
                  iconType="Entypo"
                  onPress={() => { }}
                  borderRadius={20}
                  topRightText="09:30"
                  bottomRightText="30 km"
                  iconBackgroundColor="#fcd"
                  textContainerNumberOfLines={null}
                  content="General description about the activity and or the event"
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
          </SafeAreaView>
        </Block>
      </Block>
    );
  }
}
