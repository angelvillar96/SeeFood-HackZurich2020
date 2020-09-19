import { StyleSheet, Dimensions } from 'react-native';
import Theme from '../../constant/Theme.js';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  infoRecipeContainer: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 270,
    justifyContent: 'space-between',
    
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    // textAlign: 'left',
  },
  logBtn:{
    width:80,
    backgroundColor:Theme.COLORS.PRIMARY,
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  },
  logBtnConfirmed: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Theme.COLORS.PRIMARY,
    width: 80,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logText:{
    color:"white",
    fontWeight: 'bold'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default styles;
