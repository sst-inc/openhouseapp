import React, {useState, useEffect, useRef, createContext} from 'react';
import {Alert, Platform} from 'react-native';
import {PermissionsIOS, PermissionsAndroid} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  BackHandler,
  AppState,
} from 'react-native';
import Svg, {Circle, Path, Line, G, Rect} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const saveData = async () => {
  try {
    const jsonData = JSON.stringify(scannedDataArray);
    await AsyncStorage.setItem('@scannedData', jsonData);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const Stack = createNativeStackNavigator();

function ChecklistHome({navigation}) {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={{flex: 1, width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%', alignItems: 'center'}}>
            <View style={styles.topSidebar}>
              <Text allowFontScaling={false} style={styles.header}>
                Checklist
              </Text>
              <TouchableOpacity
                style={styles.hamburgerIconPress}
                onPress={() => navigation.openDrawer()}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{marginTop: '28%'}}>
                  <Path
                    d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                    fill="#1C1C12"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 20}} />

            <View style={{width: '90%'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4F90DD',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate('DetailedChecklist')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#fff"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      marginLeft: 12,
                    }}>
                    Block A
                  </Text>
                </View>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9.29 6.71a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 1 1-1.42-1.42L12.59 12l-3.3-3.29a1 1 0 0 1 0-1.42z"
                    fill="#fff"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4F90DD',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate('DetailedChecklist')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#fff"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      marginLeft: 12,
                    }}>
                    Block B
                  </Text>
                </View>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9.29 6.71a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 1 1-1.42-1.42L12.59 12l-3.3-3.29a1 1 0 0 1 0-1.42z"
                    fill="#fff"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4F90DD',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginBottom: 20,
                }}
                onPress={() => navigation.navigate('DetailedChecklist')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#fff"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      marginLeft: 12,
                    }}>
                    Block C
                  </Text>
                </View>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9.29 6.71a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 1 1-1.42-1.42L12.59 12l-3.3-3.29a1 1 0 0 1 0-1.42z"
                    fill="#fff"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4F90DD',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 20,
                  marginBottom: 20,
                }}
                onPress={() =>
                  navigation.navigate('DetailedChecklist', {option: num})
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#fff"
                    />
                  </Svg>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                      marginLeft: 12,
                    }}>
                    Block D
                  </Text>
                </View>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M9.29 6.71a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 1 1-1.42-1.42L12.59 12l-3.3-3.29a1 1 0 0 1 0-1.42z"
                    fill="#fff"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

function DetailedChecklist({navigation, route}) {
  const [checkedBooths, setCheckedBooths] = useState({});
  const blockName = route?.params?.option || 'Block A';

  useEffect(() => {
    (async () => {
      try {
        const storedBooths = await AsyncStorage.getItem('checkedBooths');
        if (storedBooths) {
          setCheckedBooths(JSON.parse(storedBooths));
        }
      } catch (error) {
        console.error('Error loading checked booths:', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(
          'checkedBooths',
          JSON.stringify(checkedBooths),
        );
      } catch (error) {
        console.error('Error saving checked booths:', error);
      }
    })();
  }, [checkedBooths]);

  const boothsByLocation = {
    'Block A': {
      'Level 1': [
        {id: 'a1-1', name: 'Atrium Exhibition', location: 'Main Atrium'},
        {id: 'a1-2', name: 'Athletics Booth', location: 'Sports Hall Entrance'},
        {id: 'a1-3', name: 'Fencing Display', location: 'Dance Studio'},
        {id: 'a1-4', name: 'Guitar Ensemble', location: 'Performance Area'},
      ],
      'Level 2': [
        {id: 'a2-1', name: 'Mathematics Exhibition', location: 'Room A2-01'},
        {id: 'a2-2', name: 'Physics Lab', location: 'Room A2-05'},
      ],
      'Level 3': [
        {id: 'a3-1', name: 'Mother Tongue Languages', location: 'Room A3-02'},
        {id: 'a3-2', name: 'English Workshop', location: 'Room A3-07'},
      ],
    },
    'Block B': {
      'Level 1': [
        {id: 'b1-1', name: 'School Reception', location: 'Main Entrance'},
        {id: 'b1-2', name: 'Central Courtyard', location: 'Outdoor Area'},
      ],
      'Level 2': [
        {id: 'b2-1', name: 'Info Counter', location: 'Student Services Hub'},
        {id: 'b2-2', name: 'Student Services', location: 'Room B2-03'},
      ],
    },
    'Block C': {
      'Level 1': [
        {id: 'c1-1', name: 'Chemistry Lab', location: 'Room C1-02'},
        {id: 'c1-2', name: 'Biology Lab', location: 'Room C1-05'},
        {id: 'c1-3', name: 'Biotech Lab', location: 'Room C1-07'},
      ],
      'Level 2': [
        {id: 'c2-1', name: 'Engineering Lab', location: 'Room C2-03'},
        {id: 'c2-2', name: 'ADMT Studio', location: 'Room C2-06'},
        {id: 'c2-3', name: 'Maker Lab', location: 'Room C2-08'},
      ],
      'Level 3': [
        {id: 'c3-1', name: 'SST Inc HQ - Computing+', location: 'Room C3-01'},
        {
          id: 'c3-2',
          name: 'MPR3 - Alumni Panel',
          location: 'Multi-Purpose Room 3',
        },
        {id: 'c3-3', name: 'Robotics Room', location: 'Room C3-05'},
        {id: 'c3-4', name: 'LO1 - PforSST', location: 'Learning Office 1'},
      ],
    },
  };

  const toggleBooth = boothId => {
    setCheckedBooths(prev => ({
      ...prev,
      [boothId]: !prev[boothId],
    }));
  };

  const renderStampCheckbox = isChecked => {
    return (
      <TouchableOpacity style={styles.stampCheckboxContainer}>
        {isChecked ? (
          <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
            <Circle cx={16} cy={16} r={16} fill="#356AA9" />
            <Path
              d="M10 17l4 4 8-8"
              stroke="#fff"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        ) : (
          <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
            <Circle
              cx={16}
              cy={16}
              r={15}
              stroke="#356AA9"
              strokeWidth={2}
              fill="#fff"
            />
          </Svg>
        )}
      </TouchableOpacity>
    );
  };

  const blockFloors = boothsByLocation[blockName] || {};

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={{flex: 1, width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}}>
          {/* Arrow row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 18,
              marginBottom: 0,
              paddingHorizontal: 18,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.arrowBackBtn}>
              <Image
                source={require('./assets/boothInfo/arrow.png')}
                style={{width: 36, height: 36}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {/* Block X and hamburger row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              paddingHorizontal: 18,
            }}>
            <Text
              style={[
                styles.detailedBlockTitle,
                {textAlign: 'left', marginLeft: 0},
              ]}>
              Block {blockName.slice(-1)}
            </Text>
            <TouchableOpacity
              style={styles.hamburgerIconPress}
              onPress={() => navigation.openDrawer()}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none">
                <Path
                  d="M42.5 24.25C42.5 24.8467 42.2629 25.419 41.841 25.841C41.419 26.2629 40.8467 26.5 40.25 26.5H7.25C6.65326 26.5 6.08097 26.2629 5.65901 25.841C5.23705 25.419 5 24.8467 5 24.25C5 23.6533 5.23705 23.081 5.65901 22.659C6.08097 22.2371 6.65326 22 7.25 22H40.25C40.8467 22 41.419 22.2371 41.841 22.659C42.2629 23.081 42.5 23.6533 42.5 24.25ZM7.25 14.5H40.25C40.8467 14.5 41.419 14.2629 41.841 13.841C42.2629 13.419 42.5 12.8467 42.5 12.25C42.5 11.6533 42.2629 11.081 41.841 10.659C41.419 10.2371 40.8467 10 40.25 10H7.25C6.65326 10 6.08097 10.2371 5.65901 10.659C5.23705 11.081 5 11.6533 5 12.25C5 12.8467 5.23705 13.419 5.65901 13.841C6.08097 14.2629 6.65326 14.5 7.25 14.5ZM40.25 34H7.25C6.65326 34 6.08097 34.2371 5.65901 34.659C5.23705 35.081 5 35.6533 5 36.25C5 36.8467 5.23705 37.419 5.65901 37.841C6.08097 38.2629 6.65326 38.5 7.25 38.5H40.25C40.8467 38.5 41.419 38.2629 41.841 37.841C42.2629 37.419 42.5 36.8467 42.5 36.25C42.5 35.6533 42.2629 35.081 41.841 34.659C41.419 34.2371 40.8467 34 40.25 34Z"
                  fill="#1C1C12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 40}}>
            {Object.entries(blockFloors).map(([level, booths]) => (
              <View key={level} style={{marginBottom: 24}}>
                <Text style={styles.levelHeader}>{level}</Text>
                {booths.map(booth => (
                  <TouchableOpacity
                    key={booth.id}
                    style={styles.detailedBoothRow}
                    onPress={() => toggleBooth(booth.id)}>
                    <View style={{flex: 1}}>
                      <Text style={styles.detailedBoothName}>{booth.name}</Text>
                      <Text style={styles.detailedBoothLocation}>
                        {booth.location}
                      </Text>
                    </View>
                    {renderStampCheckbox(checkedBooths[booth.id])}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const Checklist = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChecklistHome">
      <Stack.Screen name="ChecklistHome" component={ChecklistHome} />
      <Stack.Screen name="DetailedChecklist" component={DetailedChecklist} />
    </Stack.Navigator>
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
    marginTop: '1%',
    marginBottom: '5%',
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
  boxHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 27,
    fontWeight: '400',
    marginLeft: '5%',
    marginTop: '15%',
  },
  centeredText: {
    color: '#1C1C12',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.2,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  button: {
    width: '90%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
    backgroundColor: '#356AA9',
    shadowColor: 'rgba(28, 28, 34, 0.30)',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },
  blockContainer: {
    marginTop: 20,
    marginHorizontal: '5%',
  },
  blockHeader: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
  },
  floorContainer: {
    marginLeft: 10,
    marginBottom: 15,
  },
  floorHeader: {
    color: '#4F90DD',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  boothItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4F90DD',
    marginVertical: 5,
    padding: 12,
    borderRadius: 5,
  },
  boothItemChecked: {
    backgroundColor: '#356AA9',
  },
  boothTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  boothName: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  boothLocation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    marginTop: 3,
  },
  stampCheckboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  stampContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampBackground: {
    position: 'absolute',
  },
  stampOverlay: {
    position: 'absolute',
  },
  stampCheckmark: {
    position: 'absolute',
  },
  detailedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
  },
  arrowBackBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedBlockTitle: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 38,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1,
  },
  levelHeader: {
    color: '#1C1C12',
    fontFamily: 'Prototype',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  detailedBoothRow: {
    backgroundColor: '#4F90DD',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 12,
    marginBottom: 12,
    shadowColor: 'rgba(28, 28, 34, 0.10)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailedBoothName: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    fontWeight: '700',
  },
  detailedBoothLocation: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    fontWeight: '400',
    opacity: 0.85,
    marginTop: 2,
  },
  checkSquare: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#356AA9',
    backgroundColor: '#fff',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSquareChecked: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#356AA9',
    backgroundColor: '#fff',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2185C5',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export {Checklist};
