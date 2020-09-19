import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, StyleSheet, Image } from 'react-native';
//galio
import { Block, Text, theme , Card} from 'galio-framework';
import { articles, nowTheme } from '../../constant';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import axios from 'axios';
import news from "../../lib/news.js";
import { getUsername } from '../../lib/authentification.js'

import { Images} from '../../constant';

function NewsFeed() {
  // const [news, setArticles] = useState([]);

  // const articles = news
  console.log(news)

  const renderCards = (article) => {
    return (
      // <Block style={styles.container}>
      //   {
      //     news.map((article, idx) =>
      //       <Card
      //       key={idx}
      //       flex
      //       borderless
      //       style={styles.card}
      //       title={article.title}
      //       caption={article.user}
      //       location={article.location}
      //       // avatar={{ uri: article.avatar}}
      //       // imageStyle={styles.cardImageRadius}
      //       imageBlockStyle={{ padding: 10 }}
      //       image=<Image source={{uri: article.urlToImage}}/>
      //     />
      //     )
      //   }
      // </Block>
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <Block style={styles.container}>
          <Image style={styles.photo} source={{ uri: article.urlToImage }} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.category}>{article.user}</Text>
        </Block>
      </TouchableHighlight>
    );
  }
  return (
    <View style={styles.screen}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={news}
        renderItem={this.renderCards}
        keyExtractor={item => `${item.title}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: nowTheme.COLORS.BACKGROUND,
    flexDirection: "column"
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE,
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default NewsFeed;
