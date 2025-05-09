import React, {useState, useEffect, useRef, createContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import Svg, {Circle, Path, Line, G, Rect} from 'react-native-svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BlockA({navigation, route}) {
  const [checkedBooths, setCheckedBooths] = useState({});
  const blockheader = route?.params?.option || 'Block A';

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
        {
          id: 'a1-1',
          header: 'Athletics Showcase',
          location: 'Main Atrium',
          type: 'Sports CCA',
          description:
            'Explore SST Athletics through this showcase on training, teamwork, and tourheadernt experiences. Emphasis is placed on both endurance and sprint disciplines.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A - Atrium Zone',
        },
        {
          id: 'a1-2',
          header: 'Track & Field Info Booth',
          location: 'Atrium Lobby',
          type: 'CCA Info',
          description:
            'Learn about the events offered in Track & Field, from 100m sprints to 5K runs. Hear from our student-athletes and coaches about their journey.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A - Near Entrance',
        },
        {
          id: 'a1-3',
          header: 'Athletics Training Insights',
          location: 'Sports Zone - Atrium',
          type: 'Athletic CCA',
          description:
            'Detailed info on training regimens, athlete development, and the supportive environment that helps shape sportsmen at SST.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A - Central Area',
        },
        {
          id: 'a1-4',
          header: 'Running Excellence CCA Booth',
          location: 'Atrium West',
          type: 'Student Sports',
          description:
            'Highlights from competitions, personal stories of growth, and opportunities in SST Athletics await you here.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block A - West End',
        },
      ],
      'Level 2': [
        {
          id: 'a2-1',
          header: 'SST Athletics Journey',
          location: 'Level 2 Gallery',
          type: 'CCA Showcase',
          description:
            'Gain insight into how SST Athletics builds resilience and leadership through its comprehensive sports program.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block A - Hallway',
        },
        {
          id: 'a2-2',
          header: 'Athletics Training Plans',
          location: 'Gallery Walk',
          type: 'Student CCA',
          description:
            'Understand the structure of our athletic training and how students balance sports and academics.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block A - South Wing',
        },
      ],
      'Level 3': [
        {
          id: 'a3-1',
          header: 'Athletic Skills Booth',
          location: 'Level 3 Study Pod',
          type: 'Performance CCA',
          description:
            'Interactive booth showing warm-ups, drills, and tips from SST athletes on staying in peak condition.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block A - Study Area',
        },
        {
          id: 'a3-2',
          header: "SST Runners' Corner",
          location: 'Corner Pod',
          type: 'CCA Program',
          description:
            'Discover what it takes to be an SST runner—focus, dedication, and spirit—all in one place.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block A - East Side',
        },
      ],
    },
    'Block B': {
      'Level 1': [
        {
          id: 'b1-1',
          header: 'Athletics Info Point',
          location: 'Foyer',
          type: 'Sport CCA',
          description:
            "Stop by to meet student athletes and explore SST's commitment to sports and overall well-being.",
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block B - Entry',
        },
        {
          id: 'b1-2',
          header: 'SST Athletic Programs',
          location: 'Reception Booth',
          type: 'CCA Insights',
          description:
            'Our athletes train rigorously for national-level competitions—drop by to see how they do it.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block B - Near Lobby',
        },
      ],
      'Level 2': [
        {
          id: 'b2-1',
          header: 'Distance & Sprint Events',
          location: 'Upper Hall',
          type: 'Track Events',
          description:
            'Find out how SST supports both sprint and endurance events through specialized coaching.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block B - Upper Area',
        },
        {
          id: 'b2-2',
          header: 'Sporting Spirit Booth',
          location: 'Level 2 Walkway',
          type: 'Character CCA',
          description:
            'Hear firsthand how students develop perseverance and camaraderie through athletics.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block B - Walkway',
        },
      ],
    },
    'Block C': {
      'Level 1': [
        {
          id: 'c1-1',
          header: 'All About Athletics',
          location: 'Main Deck',
          type: 'Showcase CCA',
          description:
            'Explore the legacy and accomplishments of SST Athletics through photos, medals, and videos.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block C - Deck Area',
        },
        {
          id: 'c1-2',
          header: 'SST Sports Hub',
          location: 'Booth A',
          type: 'CCA Network',
          description:
            'Connect with student athletes and understand the benefits of sports engagement at SST.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block C - Booth Corner',
        },
        {
          id: 'c1-3',
          header: 'Athletics Booth C1',
          location: 'Block C Display',
          type: 'Performance Booth',
          description:
            'Featuring demonstrations and short talks by our most experienced runners and coaches.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L1 Block C - Display Zone',
        },
      ],
      'Level 2': [
        {
          id: 'c2-1',
          header: 'Peak Performance Info',
          location: 'Study Bay',
          type: 'Endurance CCA',
          description:
            'See how our athletes condition themselves for peak physical and mental performance.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block C - Bay Area',
        },
        {
          id: 'c2-2',
          header: 'Athlete Support Systems',
          location: 'Open Hall',
          type: 'Support CCA',
          description:
            'Learn how SST fosters physical and mental support for its student-athletes.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block C - Central Hall',
        },
        {
          id: 'c2-3',
          header: 'Train Like a Pro Booth',
          location: 'L2 Deck',
          type: 'Training Focus',
          description:
            'Breakdown of drills, schedules, and mentoring opportunities for rising athletes.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L2 Block C - Training Deck',
        },
      ],
      'Level 3': [
        {
          id: 'c3-1',
          header: "Runner's Showcase",
          location: 'Pod North',
          type: 'Athlete CCA',
          description:
            'Real-life testimonials from SST athletes and how sports changed their lives.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block C - North Pod',
        },
        {
          id: 'c3-2',
          header: 'Winning Mindset Booth',
          location: 'East Wing',
          type: 'Motivation Zone',
          description:
            'Discover what mindset makes champions through stories and exhibits.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block C - East Side',
        },
        {
          id: 'c3-3',
          header: 'Beyond the Finish Line',
          location: 'West Zone',
          type: 'Development CCA',
          description:
            'Athletics at SST is not just about winning—it’s about character, perseverance, and teamwork.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block C - West Zone',
        },
        {
          id: 'c3-4',
          header: 'Champion’s Journey',
          location: 'Final Bay',
          type: 'Elite CCA',
          description:
            'Follow the stories of top athletes who’ve gone from school track to national glory.',
          image: require('../assets/layoutPics/Atrium.png'),
          sstLoc: 'L3 Block C - Champion’s Bay',
        },
      ],
    },
  };

  const toggleBooth = boothId => {
    setCheckedBooths(prev => ({
      ...prev,
      [boothId]: !prev[boothId],
    }));
  };

  const blockFloors = boothsByLocation[blockheader] || {};

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/background.png')}
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
                source={require('../assets/boothInfo/arrow.png')}
                style={{width: 36, height: 36}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
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
              Block {blockheader.slice(-1)}
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
            {Object.entries(blockFloors).map(([level, item]) => (
              <View key={level} style={{marginBottom: 24}}>
                <Text style={styles.levelHeader}>{level}</Text>
                {item.map(booth => (
                  <View key={booth.id} style={styles.detailedBoothRow}>
                    <TouchableOpacity
                      style={{flex: 1}}
                      onPress={() =>
                        navigation.navigate('BoothDetail', {item: booth})
                      }>
                      <Text style={styles.detailedBoothheader}>
                        {booth.header}
                      </Text>
                      <Text style={styles.detailedBoothLocation}>
                        {booth.location}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleBooth(booth.id)}
                      style={styles.stampCheckboxContainer}>
                      {checkedBooths[booth.id] ? (
                        <Svg
                          width={32}
                          height={32}
                          viewBox="0 0 32 32"
                          fill="none">
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
                        <Svg
                          width={32}
                          height={32}
                          viewBox="0 0 32 32"
                          fill="none">
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
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
  detailedBoothheader: {
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
  hamburgerIconPress: {
    padding: 4,
  },
});
