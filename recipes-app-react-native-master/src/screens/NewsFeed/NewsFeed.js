import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme, Card} from 'galio-framework';
import { nowTheme } from '../../constant';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import axios from 'axios';
import { Asset } from 'expo-asset';

import { Images} from '../../constant';
import articles from '../../lib/news';

const salad = '../../../assets/imgs/sharing_salad.jpg';

function NewsFeed() {
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   axios.get('https://newsapi.org/v2/top-headlines?country=ch&category=health&apiKey=70307e18d289449ea1095c4c5444814b')
  //     .then(function (response) {
  //       setArticles(response.data.articles);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },[])

  const renderCards = (articles) => {
    console.log(articles[0].urlToImage);
    dayjs.extend(relativeTime);
    return (
      <Block style={styles.container}>
        {
          articles.map((article,idx) =>
            <Card
            key={idx}
            flex
            borderless
            style={styles.card}
            title={article.title}
            caption={dayjs(article.publishedAt).fromNow()}
            location={article.location}
            avatar={article.avatar}
            // imageStyle={styles.cardImageRadius}
            imageBlockStyle={{ padding: 10 }}
            image={article.urlToImage}
          />
          )
        }
      </Block>
    );
  }
  return (
    <Block flex>
      {
        articles != null ? <ScrollView showsVerticalScrollIndicator={false}>{renderCards(articles)}</ScrollView> : null
      }
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default NewsFeed;
