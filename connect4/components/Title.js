import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Title = () => {
    return(
        <View style={Styles.titleView}>
            <Text style={Styles.titleText}> connect4 </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    titleView:{
        flex: 2,
        alignItems : 'center',
        justifyContent:'center'
    },
    titleText:{
        fontSize:wp(15),
        color:'#268ec7',
        marginTop: wp(5)
    },
});

export default Title;