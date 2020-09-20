import { Images } from '../constant';
import { Asset } from 'expo-asset';

export default [
  {
    title: 'Enjoying a nice salad with my girlfriend',
    user: 'Theo Zeitler',
    location: "Munich",
    urlToImage: Asset.fromModule(Images.NewsImgs[0]).uri,
    avatar: Asset.fromModule(require('../../assets/avatars/avatar1.png')).uri
  },
  {
    title: '7 days in a row meeting my diet goals! :)',
    user: 'Lisa Taylor',
    location: "London",
    urlToImage: Asset.fromModule(Images.NewsImgs[1]).uri,
    avatar: Asset.fromModule(require('../../assets/avatars/avatar2.jpeg')).uri
  },
  {
    title: 'Just downloaded FoodAIe. Time to get out of the couch',
    user: 'Chuck Rodriguez',
    location: "Cape Town",
    urlToImage: Asset.fromModule(Images.NewsImgs[2]).uri,
    avatar: Asset.fromModule(require('../../assets/avatars/avatar3.jpg')).uri
  },
  {
    title: 'I love cake!!',
    user: 'Zhao Xu',
    location: "Beijing",
    urlToImage: Asset.fromModule(Images.NewsImgs[3]).uri,
    avatar: Asset.fromModule(require('../../assets/avatars/avatar4.png')).uri
  }
];
