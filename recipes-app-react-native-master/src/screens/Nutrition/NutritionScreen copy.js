import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { ListItem } from 'react-native-elements';
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

    renderResults = ({ item }) => (
        <ListItem
            bottomDivider
            title={item.name}
            chevron
        />
    );

    render() {
        const { response } = this.props.route.params;
        const items = response.data[0]
        console.log(response.data[0]);

        return (
            <View>            
                <FlatList
                    data={items}
                    renderItem={this.renderResults}
                />
            </View>
        );
    }
} 