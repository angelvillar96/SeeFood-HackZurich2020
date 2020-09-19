import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
// import styles from '../../components/BackButton/styles';

export default class ResultScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: 'true',
            headerLeft: () => <BackButton
                onPress={() => {
                    navigation.goBack();

                }}
            />
        };
    };

    constructor(props) {
        super(props);
    }

    renderResults = ({ item }) => {
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressResult(item)}>
            <View styles={styles.container}>
                <Text>{item.name}</Text>
            </View>
        </TouchableHighlight>
    }

    render() {
        const { response } = this.props.route.params;
        console.log('Name: ' + response.data);

        return (
            <View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={true}
                    numColumns={1}
                    data={response.data}
                    renderItem={this.renderResults}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        );
    }


}