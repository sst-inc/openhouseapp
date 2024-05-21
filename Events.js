import React, {useState, useEffect, useId} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import Svg, {
  Circle,
  Path,
  Line,
  Image,
  G,
  Rect,
  Defs,
  ClipPath,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {EventType} from '@notifee/react-native';

const events = [
  {
    id: '1',
    time: '9.00 am  ',
    name: 'Open House starts',
    location: '@SST',
    timeRange: '  9:00am - end',
    notifTime: '8.55am',
  },
  {
    id: '2',
    time: '9.30 am  ',
    name: 'Academic Panel',
    location: '@Auditorium',
    timeRange: '  9:30am - 9:45am',
    notifTime: '9.29am',
    actualLocation: 'Auditorium',
  },
  {
    id: '3',
    time: '9.30 am  ',
    name: 'Science hands on',
    location: '@Labs',
    timeRange: '  9:30am - 10:30am',
    notifTime: '9.29am',
    actualLocation: 'Respective Science Labs',
  },
  {
    id: '4',
    time: '10.00 am',
    name: 'PforSSTPanel:Transition ',
    location: '@LO1',
    timeRange: ' 10:00am - 10:30am',
    notifTime: '9.59am',
    actualLocation: 'Learning Oasis 1',
  },
  {
    id: '6',
    time: '10.00 am',
    name: 'Performance by Guitar ',
    location: '@Atrium',
    actualLocation: 'Atrium',
    timeRange: '10:00am - 10:15am',
    notifTime: '9.59am',
  },
  {
    id: '12',
    time: '10.30 am',
    name: 'Performance by Dance ',
    location: '@Atrium',
    actualLocation: 'Atrium',
    timeRange: '10:30am - 10:45am',
    notifTime: '10.29am',
  },
  {
    id: '5',
    time: '10.45 am',
    name: 'Student Life Panel',
    location: '@LO2',
    timeRange: ' 10:45am - 11:15am',
    notifTime: '10.45am',
    actualLocation: 'Learning Oasis 2',
  },
  {
    id: '15',
    time: '11.00 am',
    location: '@Atrium',
    name: 'Performance by Dance ',
    actualLocation: 'Atrium',
    timeRange: '11:00am - 11:15am',
    notifTime: '10.59am',
  },
  {
    id: '7',
    time: '11.15 am',
    name: 'Student Life Panel',
    location: '@LO2',
    timeRange: ' 11.15am - 11:30am',
    notifTime: '11.15am',
    actualLocation: 'Learning Oasis 2',
  },
  {
    id: '8',
    time: '11.30 am',
    name: 'Academic Panel',
    location: '@Auditorium',
    timeRange: ' 11:30am - 11:45am',
    notifTime: '11.29am',
    actualLocation: 'Auditorium',
  },
  {
    id: '9',
    time: '11.30 am',
    name: 'PforSSTPanel:Transition',
    location: '@LO1',
    timeRange: ' 11:30am - 12:00pm',
    notifTime: '11.29am',
    actualLocation: 'Learning Oasis 1',
  },
  {
    id: '10',
    time: '11.30 am',
    name: 'Science hands on',
    location: '@Labs',
    timeRange: ' 11:30am - 12:30pm',
    notifTime: '11.29am',
    actualLocation: 'Labs',
  },
  {
    id: '13',
    time: '11.30 am',
    name: 'Performance by Guitar ',
    location: '@Atrium',
    actualLocation: 'Atrium',
    timeRange: '11:30am - 11:45am',
    notifTime: '11.29am',
  },
  {
    id: '11',
    time: '12.15 pm',
    name: 'PforSSTPanel:Beyond SST',
    location: '@LO1',
    timeRange: ' 12:15pm - 12:45pm',
    notifTime: '12.14pm',
    actualLocation: 'Learning Oasis 1',
  },
];

const FlatListItem = ({item}) => {
  const [isSvgOne, setSvgOne] = useState(false);
  const [notificationId, setNotificationId] = useState(null);

  useEffect(() => {
    const loadSvgState = async () => {
      const savedState = await AsyncStorage.getItem(`svgState-${item.id}`);
      setSvgOne(String(savedState) === 'true');
    };

    loadSvgState();
  }, [item.id]);

  const handlePress = async () => {
    // Toggle the state
    setSvgOne(prevState => !prevState);

    // Save the state to AsyncStorage
    await AsyncStorage.setItem(`svgState-${item.id}`, String(!isSvgOne));

    // If isSvgOne is set to true, schedule a notification
    if (isSvgOne === true) {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      if (notificationId) {
        // Cancel the scheduled notification
        await notifee.cancelNotification(notificationId);
        setNotificationId(null);
      } else {
        // Schedule the notification
        const eventTime = item.notifTime.split('.');
        const eventMinute = parseInt(eventTime[1].slice(0, 2), 10);
        let notifSec = (eventMinute - new Date().getMinutes()) * 60;

        const id = await notifee.scheduleNotification({
          title: item.name,
          body: item.location,
          android: {
            channelId: 'default',
            notificationSound: 'default',
            importance: 'high',
          },
          trigger: {
            timestamp: Date.now() + notifSec * 1000,
            repeatFrequency: 'none',
          },
        });

        setNotificationId(id);
      }
    }
  };

  return (
    <>
      <View style={styles.eventsContainer}>
        <View style={styles.eventsBox}>
          <Text style={styles.basicText}>{item.time}</Text>
          <View style={styles.eventsDetailsBox}>
            <LinearGradient
              colors={['#E3E3E8', '#D5D5DD']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                shadowColor: 'rgba(28, 28, 18, 0.15)',
                shadowOffset: {width: -2, height: 2},
                shadowOpacity: 0.15,
                shadowRadius: 15,
                elevation: 15,
                height: '100%',
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: '4%',
                    marginTop: '3.5%',
                  }}>
                  <Text style={styles.basicText}>{item.name}</Text>
                  <Text style={styles.generalText}>{item.location}</Text>
                </View>
                <View style={{flex: 1, minHeight: 40}}>
                  <TouchableOpacity
                    style={{position: 'absolute', top: -30, right: 0}}
                    onPress={handlePress}>
                    {isSvgOne == true ? (
                      <Svg
                        width={40}
                        height={40}
                        fill="#000000"
                        viewBox="0 0 40 40"
                        xmlns="http://www.w3.org/2000/svg">
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z"></Path>
                        </G>
                      </Svg>
                    ) : (
                      <Svg
                        width={40}
                        height={40}
                        fill="#000000"
                        viewBox="0 0 40 40"
                        xmlnss="http://www.w3.org/2000/svg">
                        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                        <G
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"></G>
                        <G id="SVGRepo_iconCarrier">
                          <Path d="M10,21h4a2,2,0,0,1-4,0ZM3.076,18.383a1,1,0,0,1,.217-1.09L5,15.586V10a7.006,7.006,0,0,1,6-6.92V2a1,1,0,0,1,2,0V3.08A7.006,7.006,0,0,1,19,10v5.586l1.707,1.707A1,1,0,0,1,20,19H4A1,1,0,0,1,3.076,18.383ZM6.414,17H17.586l-.293-.293A1,1,0,0,1,17,16V10A5,5,0,0,0,7,10v6a1,1,0,0,1-.293.707Z"></Path>
                        </G>
                      </Svg>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
      <View style={{marginTop: '5%'}} />
    </>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const EventsPage = ({navigation}) => {
  const renderItem = ({item}) => <FlatListItem item={item} />;
  const carouselItems = [
    {
      id: '1',
      time: '11.15 am',
      name: 'Student Life Panel',
      location: 'Learning Oasis 2',
      timeRange: ' 10:45am & 11:15am',
      notifTime: '11.15am',
      actualLocation: 'Blk C Level 3',
      imagePath: require('./assets/eventPics/studentLife.png'),
    },
    {
      id: '2',
      time: '11.30 am',
      name: 'Academic Panel',
      location: 'Auditorium',
      timeRange: ' 9.30am $ 11.30am',
      notifTime: '11.29am',
      actualLocation: 'Blk A Level 4',
      imagePath: require('./assets/eventPics/academicPanel.jpeg'),
    },
    {
      id: '3',
      time: '11.30 am',
      name: 'PforSSTPanel:Transition',
      location: 'Learning Oasis 1',
      timeRange: ' 10.00am & 11.30am',
      notifTime: '11.29am',
      actualLocation: 'Blk C Level 3',
      imagePath: require('./assets/eventPics/pforSST.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageBackground}
        resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <View style={{marginTop: '5%'}} />
          <View>
            <View style={styles.topSidebar}>
              <Text style={styles.header}>Events</Text>
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
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
            style={{width: width, height: 500, marginTop: '9%'}}>
            {carouselItems.map((item, index) => (
              <View key={index} style={styles.topBox}>
                <ImageBackground
                  source={item.imagePath}
                  style={{
                    width: width,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      opacity: 0.3,
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                  <View style={styles.middleBox}>
                    <Text style={styles.middleBoxText}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'baseline',
                      marginTop: '3%',
                      marginLeft: '7%',
                    }}>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none">
                      <Path
                        d="M6.875 5.00002C6.87497 4.40872 7.04271 3.82955 7.35872 3.32977C7.67473 2.83 8.12605 2.43014 8.66026 2.17663C9.19446 1.92313 9.78963 1.82639 10.3766 1.89766C10.9636 1.96892 11.5183 2.20526 11.9764 2.57922C12.4344 2.95318 12.7769 3.44942 12.9642 4.01029C13.1514 4.57116 13.1757 5.17365 13.0342 5.74777C12.8927 6.32188 12.5912 6.84407 12.1647 7.25367C11.7383 7.66328 11.2044 7.94348 10.625 8.06174V13.75C10.625 13.9158 10.5592 14.0748 10.4419 14.192C10.3247 14.3092 10.1658 14.375 10 14.375C9.83424 14.375 9.67527 14.3092 9.55806 14.192C9.44085 14.0748 9.375 13.9158 9.375 13.75V8.06174C8.66962 7.91701 8.03574 7.5334 7.58031 6.97564C7.12488 6.41788 6.87577 5.7201 6.875 5.00002ZM17.0312 11.4524C16.0734 10.9102 14.7562 10.4938 13.2211 10.2477C13.1399 10.2349 13.057 10.2382 12.977 10.2574C12.8971 10.2766 12.8217 10.3114 12.7552 10.3597C12.6888 10.4081 12.6324 10.4691 12.5895 10.5392C12.5466 10.6093 12.5179 10.6872 12.5051 10.7684C12.4923 10.8496 12.4955 10.9325 12.5148 11.0125C12.534 11.0924 12.5688 11.1677 12.6171 11.2342C12.6655 11.3007 12.7265 11.357 12.7966 11.4C12.8667 11.4429 12.9446 11.4716 13.0258 11.4844C14.3961 11.7047 15.6039 12.0805 16.418 12.543C17.1094 12.9297 17.5 13.3703 17.5 13.75C17.5 14.7938 14.6469 16.25 10 16.25C5.35313 16.25 2.5 14.7938 2.5 13.75C2.5 13.3703 2.89062 12.9297 3.58203 12.5399C4.39922 12.0774 5.60391 11.7016 6.97422 11.4813C7.05715 11.4704 7.13706 11.4431 7.20922 11.4008C7.28138 11.3585 7.34432 11.3022 7.39431 11.2351C7.4443 11.1681 7.48033 11.0917 7.50026 11.0105C7.52019 10.9292 7.52361 10.8448 7.51033 10.7623C7.49705 10.6797 7.46733 10.6006 7.42293 10.5298C7.37854 10.4589 7.32037 10.3976 7.25187 10.3497C7.18337 10.3017 7.10594 10.2679 7.02416 10.2504C6.94239 10.2329 6.85792 10.232 6.77578 10.2477C5.24063 10.4938 3.92344 10.9102 2.96562 11.4524C1.54766 12.2555 1.25 13.1453 1.25 13.75C1.25 16.186 5.75859 17.5 10 17.5C14.2414 17.5 18.75 16.186 18.75 13.75C18.75 13.1453 18.4523 12.2555 17.0312 11.4524Z"
                        fill="#EBEBEF"
                      />
                    </Svg>
                    <Text style={styles.topBoxText}>
                      {' '}
                      {item.actualLocation}, {item.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'baseline',
                      marginTop: '3%',
                      marginLeft: '7%',
                    }}>
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none">
                      <Path
                        d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM14.375 10.625H10C9.83424 10.625 9.67527 10.5592 9.55806 10.4419C9.44085 10.3247 9.375 10.1658 9.375 10V5.625C9.375 5.45924 9.44085 5.30027 9.55806 5.18306C9.67527 5.06585 9.83424 5 10 5C10.1658 5 10.3247 5.06585 10.4419 5.18306C10.5592 5.30027 10.625 5.45924 10.625 5.625V9.375H14.375C14.5408 9.375 14.6997 9.44085 14.8169 9.55806C14.9342 9.67527 15 9.83424 15 10C15 10.1658 14.9342 10.3247 14.8169 10.4419C14.6997 10.5592 14.5408 10.625 14.375 10.625Z"
                        fill="#EBEBEF"
                      />
                    </Svg>
                    <Text style={styles.topBoxText}> {item.timeRange}</Text>
                  </View>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="112"
                    height="4"
                    viewBox="0 0 112 4"
                    fill="none"
                    style={{top: '13.5%'}}>
                    <G clip-path="url(#clip0_418_1347)">
                      <Rect
                        width="32"
                        height="4"
                        rx="2"
                        fill={item.id === '1' ? '#EBEBEF' : 'grey'}
                      />
                      <Rect
                        x="40"
                        width="32"
                        height="4"
                        rx="2"
                        fill={item.id === '2' ? '#EBEBEF' : 'grey'}
                        fill-opacity="0.35"
                      />
                      <Rect
                        x="80"
                        width="32"
                        height="4"
                        rx="2"
                        fill={item.id === '3' ? '#EBEBEF' : 'grey'}
                        fill-opacity="0.35"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_418_1347">
                        <Rect width="112" height="4" fill="white" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.scheduleText}>Schedule</Text>
          <View style={styles.seperator}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="2"
              viewBox="0 0 334 2"
              fill="none">
              <Path
                d="M333 1.49997C333.276 1.49997 333.5 1.27611 333.5 0.999971C333.5 0.723828 333.276 0.499971 333 0.499971L333 1.49997ZM4.37114e-08 1.5L333 1.49997L333 0.499971L-4.37114e-08 0.5L4.37114e-08 1.5Z"
                fill="#1C1C12"
              />
            </Svg>
            <Text style={styles.basicText}>now</Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="2"
              viewBox="0 0 334 2"
              fill="none">
              <Path
                d="M333 1.49997C333.276 1.49997 333.5 1.27611 333.5 0.999971C333.5 0.723828 333.276 0.499971 333 0.499971L333 1.49997ZM4.37114e-08 1.5L333 1.49997L333 0.499971L-4.37114e-08 0.5L4.37114e-08 1.5Z"
                fill="#1C1C12"
              />
            </Svg>
          </View>
          <View style={{marginTop: '5%'}} />
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
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
  },
  header: {
    color: '#356AA9',
    fontFamily: 'Prototype',
    fontSize: 50,
    fontWeight: '400',
  },
  discover: {
    color: 'rgba(235, 235, 239, 0.60)',
    opacity: 0.7,
    marginLeft: '5%',
    marginTop: '7%',
    fontSize: 16,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  generalText: {
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: '1%',
  },
  topBox: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1C1C12',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 45,
    elevation: 5,
  },
  topBoxText: {
    color: '#EBEBEF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
  },
  middleBox: {
    width: '85%',
    borderWidth: 3,
    borderColor: '#EBEBEF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
  },
  middleBoxText: {
    color: '#EBEBEF',
    fontFamily: 'Prototype',
    fontSize: 27,
    fontWeight: '400',
    textAlign: 'center',
  },
  seperator: {
    flexDirection: 'row',
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: '4%',
  },
  basicText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 17,
    fontStyle: 'normal',
  },
  eventsContainer: {
    flexDirection: 'column',
  },
  eventsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 19,
  },
  eventsDetailsBox: {
    width: '65%',
    height: 64,
    shadowColor: 'rgba(28, 28, 18, 0.15)',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
  },
  scheduleText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
    fontWeight: '500',
    marginTop: '5%',
    marginLeft: '6.7%',
  },
});

export default EventsPage;
