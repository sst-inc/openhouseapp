import React from 'react';
import {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import Svg, {G, Path, Defs, ClipPath, Rect, Line} from 'react-native-svg';
import SearchBar from 'react-native-search-bar';
import {data} from './BoothInfo';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {Dimensions} from 'react-native';

const AppliedDetails = ({route}) => {
  const windowWidth = Dimensions.get('window').width;
  // Get the item data from the navigation parameters
  const {item} = route.params;
  const navigation = useNavigation();

  if (!item) {
    <View>
      <Text>No data</Text>
    </View>; // or replace with <View><Text>No data</Text></View> or similar
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{marginTop: '5%'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{marginLeft: '5%'}}>
                  <Image
                    source={require('../assets/boothInfo/arrow.png')}
                    style={{width: 48, height: 48}}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.topSidebar}>
                <Text style={styles.header}>Booth Info</Text>
              </View>
              <View style={{marginLeft: '5%'}}>
                <Text style={styles.sectionHeader}> Booth Info</Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <ReactNativeZoomableView
                  style={{width: windowWidth * 0.9}}
                  maxZoom={2.5}
                  minZoom={1}
                  zoomStep={0.5}
                  initialZoom={1}
                  panEnabled={true}
                  centerOn={{zoom: 1, x: 0, y: 0}}>
                  <Image
                    source={item.image}
                    style={{width: '100%', height: 252}}
                    resizeMode="contain"
                  />
                </ReactNativeZoomableView>
              </View>
              <View style={{marginTop: 10, marginLeft: '5%', width: '85%'}}>
                <View
                  style={{
                    width: windowWidth * 1,
                    backgroundColor: '#D9D9D9',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height:
                      item.header === 'Singapore Youth Flying Club' ||
                      item.header === 'Student Life Panel and exhibition'
                        ? 90
                        : 70,
                    marginLeft: '5%',
                  }}>
                  <Text
                    style={{
                      color: '#1C1C12',
                      fontFamily: 'Prototype',
                      fontSize: 35,
                      fontStyle: 'normal',
                      fontWeight: '400',
                    }}>
                    {item.header}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#1C1C12',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                    fontStyle: 'normal',
                    marginTop: '5%',
                    lineHeight: 19,
                    alignSelf: 'center',
                    marginLeft: '5%',
                    textAlign: 'left',
                  }}>
                  {item.description}
                </Text>
                <View style={{marginTop: 50, flexDirection: 'row'}}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none">
                    <Path
                      d="M9.0625 8.30627V13.75C9.0625 13.9987 9.16127 14.2371 9.33709 14.4129C9.5129 14.5887 9.75136 14.6875 10 14.6875C10.2486 14.6875 10.4871 14.5887 10.6629 14.4129C10.8387 14.2371 10.9375 13.9987 10.9375 13.75V8.30627C11.7357 8.07999 12.4252 7.57263 12.8787 6.87782C13.3321 6.183 13.519 5.34762 13.4048 4.52583C13.2905 3.70403 12.8829 2.95128 12.2572 2.40648C11.6314 1.86167 10.8297 1.56158 10 1.56158C9.1703 1.56158 8.3686 1.86167 7.74284 2.40648C7.11707 2.95128 6.70946 3.70403 6.59523 4.52583C6.48101 5.34762 6.66786 6.183 7.12133 6.87782C7.57479 7.57263 8.26426 8.07999 9.0625 8.30627ZM10 3.43752C10.309 3.43752 10.6111 3.52916 10.8681 3.70085C11.125 3.87254 11.3253 4.11657 11.4436 4.40208C11.5618 4.68759 11.5928 5.00176 11.5325 5.30485C11.4722 5.60795 11.3234 5.88636 11.1049 6.10488C10.8863 6.3234 10.6079 6.47221 10.3048 6.5325C10.0017 6.59279 9.68757 6.56185 9.40206 6.44358C9.11655 6.32532 8.87252 6.12505 8.70083 5.8681C8.52914 5.61115 8.4375 5.30906 8.4375 5.00002C8.4375 4.58562 8.60212 4.18819 8.89515 3.89517C9.18817 3.60214 9.5856 3.43752 10 3.43752ZM19.0625 13.75C19.0625 15.4367 17.1953 16.4063 16.082 16.8344C14.4422 17.4656 12.2828 17.8125 10 17.8125C5.49687 17.8125 0.9375 16.4172 0.9375 13.75C0.9375 12.0133 2.97812 10.6094 6.39687 9.99534C6.51884 9.97164 6.64429 9.97241 6.76595 9.99763C6.88761 10.0228 7.00304 10.072 7.10554 10.1422C7.20804 10.2124 7.29556 10.3023 7.36301 10.4066C7.43047 10.511 7.47651 10.6277 7.49846 10.75C7.52041 10.8723 7.51784 10.9977 7.49088 11.119C7.46393 11.2403 7.41314 11.355 7.34147 11.4565C7.26979 11.558 7.17866 11.6442 7.07336 11.7101C6.96807 11.7761 6.85072 11.8204 6.72813 11.8406C4.05703 12.3211 2.8125 13.2641 2.8125 13.75C2.8125 14.0625 3.36875 14.6149 4.59141 15.0844C6.02109 15.6313 7.94219 15.9375 10 15.9375C12.0578 15.9375 13.9789 15.6344 15.4086 15.0844C16.6305 14.6149 17.1875 14.0625 17.1875 13.75C17.1875 13.2641 15.943 12.3211 13.2719 11.8406C13.1493 11.8204 13.0319 11.7761 12.9266 11.7101C12.8213 11.6442 12.7302 11.558 12.6585 11.4565C12.5869 11.355 12.5361 11.2403 12.5091 11.119C12.4822 10.9977 12.4796 10.8723 12.5015 10.75C12.5235 10.6277 12.5695 10.511 12.637 10.4066C12.7044 10.3023 12.792 10.2124 12.8945 10.1422C12.997 10.072 13.1124 10.0228 13.234 9.99763C13.3557 9.97241 13.4812 9.97164 13.6031 9.99534C17.0219 10.6094 19.0625 12.0133 19.0625 13.75Z"
                      fill="#1C1C12"
                    />
                  </Svg>
                  <Text style={styles.locationText}>
                    {'  '}
                    {item.location} @ {item.sstLoc}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSidebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    gap: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 50,
    fontWeight: '400',
  },
  sectionHeader: {
    color: 'rgba(235, 235, 239, 0.70)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '400',
  },
  subContainer: {
    width: '90%',
    height: 80,
    backgroundColor: '#4F90DD',
    marginBottom: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  subjectHeader: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginBottom: '0.1%',
  },
  locationText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    paddingBottom: 20,
  },
  redirectText: {
    color: '#ABABED',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  imageRectangle: {
    height: 296,
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoothNamebox: {
    height: '20%',
    width: '100%',
    backgroundColor: 'grey;',
  },
});
export default AppliedDetails;
