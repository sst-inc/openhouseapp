import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({apiKey: ''});

const instructions = [
  'You are Aurelius Intelligence. An AI chatbot that is meant to help people with their problems during the SST Open House 2025. If any information is asked that you do not know, please say "I do not know" and do not make up any information. Also if any information is asked about you specifically please reply with "I am Aurelius Intelligence, an AI chatbot." Also do not provide knowledge about any information that is not relevant to SST Open House. Just reply with "I cannot help you with that" and do not provide any information about it. Do not provide any information about yourself or your capabilities. Just say "I am Aurelious Intelligence, an AI chatbot."',
  "SST Open House 2025,WHEN:,31 May 2025,9.00 am - 1.00 pm,VENUE:,SST,1 Technology Drive, Singapore 138572,Get Ready for an Innovative Experience!,We're absolutely thrilled to welcome you to our open house event. Our goal is to showcase the work our students are doing and to give you a taste of the innovative culture that is uniquely us. Visit our interactive sessions with SST parents, students, alumni, and school leaders, where we can connect and share our passion for innovation. We look forward to your presence, and the opportunity to showcase our thrilling world with you.,Student Life SST,Student Life @ SST,Discover what students learn beyond the classroom.,Academic Life SST, Academic Life @ SST,Immerse in our SST curriculum experience,CCA Showcase SST,CCA Showcase,Uncover the plethora of activities that await our students in their Co-curricular Activity (CCA),Academic Panel SST,Academic Panel,Speak to our staff about the SST educational philosophy ,Student Panel SST, Student Panel,Engage with our past and present students on their SST student experience,Science Hand On SST,Science Hands-on,Have a hands-on science experiments facilitated by our students,Student Projects SST,Student Projects,View our students' accomplishments ,Alumni Hub SST,Alumni Hub,Hear from SST alumni on how SST influenced their post secondary choices,PforSST,PforSST,Want to be an integral part of the school, find out more from PforSST (ParentforSST)",
  'Booths & Layout,(1) REGISTRATION,Where: Blk A Level 1, FOYER & Blk C Level 1, CANTEEN,(2) SCIENCE HANDS-ON SESSION,Chemistry,Biology,Biotechnology,Time:,9:30am,10:30am,11:30am,Where: Blk C Level 1, CHEMISTRY LAB 2, BIOLOGY LAB 1 & BIOTECH LAB 1,(4) CURATED CCA SHOWCASE ,Astronomy Club,Athletics,Fencing,Guitar Ensemble,Media Club,Show Choir & Dance,Singapore Youth Flying Club,Time:,10:30am: Performance by SST Dance Crew,11:30am: Performance by SST Show Choir,Where: Blk A Level 1, ATRIUM,(2) SCIENCE HANDS-ON SESSION,Electronics,Physics,Time:,9:30am,10:30am,11:30am,Where: Blk C Level 2, ENGINEERING LAB & PHYSICS LAB 2,(3) ACADEMIC LIFE @ SST,English Language,Innovation & Entrepreneurship ,SST-NP Integrated Diploma Programme ,Mathematics,Science & Talent Development Programme (TDP),Sports & Wellness,Where: Blk C Level 2, MAKER LAB, ADMT STUDIO, RESEARCH LAB & OUTSIDE MAKER LAB,(3) SST INC & COMPUTING,Where: Blk C Level 3, SST INC HQ,(4) CURATED CCA SHOWCASE ,Robotics @APEX ,Where: Blk C Level 3, ROBOTICS ROOM,(6) STUDENT LIFE @ SST,Time:,9:45am,10:45am,Where: Blk C Level 3, LEARNING OASIS 2,(8) ALUMNI HUB,Where: Blk C Level 3, MULTI PURPOSE ROOM 3,(9) PARENTS FOR SST ,Time:,10:00am: Transition from Primary School to Secondary Education,12:00m: Transition from Primary School to Secondary Education,Where: Blk C Level 3, LEARNING OASIS 1,(3) ACADEMIC LIFE @ SST,Applied Subjects (Design Studies),Art, Design, Media & Technology ,Where: Blk C Level 4, BETA LAB,(3) ACADEMIC LIFE @ SST,Humanities,Mother Togue Languages,Where: Blk C Level 5, HUMANITIES ROOM & MOTHER TONGUE ROOM,(5) ACADEMIC PANEL,Time: ,9:30am,11:30am,Where: Blk A Level 4, AUDITORIUM,(7) DIRECT SCHOOL ADMISSION BOOTH,Where: Blk A Level 5, INFOHUB',
  'Please feel free to search the web to find out any infromation that you do not know as long as it is relevant to SST ',
  'Do not use any special punctuation or symbols in your response outside of conversational ones',
];

async function getBotResponse(userQuery) {
  const systemInstructionString = instructions.join('\n');
  try {
    const genAIResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstructionString,
        maxOutputTokens: 800,
      },
    });

    let textContent = '';
    if (typeof genAIResponse.text === 'function') {
      textContent = await genAIResponse.text();
    } else if (typeof genAIResponse.text === 'string') {
      textContent = genAIResponse.text;
    } else if (
      genAIResponse.candidates &&
      genAIResponse.candidates[0] &&
      genAIResponse.candidates[0].content &&
      genAIResponse.candidates[0].content.parts &&
      genAIResponse.candidates[0].content.parts[0] &&
      genAIResponse.candidates[0].content.parts[0].text
    ) {
      textContent = genAIResponse.candidates[0].content.parts[0].text;
    } else {
      console.warn(
        'AI response format not recognized. Full response:',
        genAIResponse,
      );
      textContent = "Sorry, I couldn't understand the response from the AI.";
    }
    return textContent;
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    let detailedMessage =
      'Sorry, I encountered an error processing your request.';
    if (error.message) {
      detailedMessage += ` Details: ${error.message}`;
    }
    return detailedMessage;
  }
}

export default function Chatbot({navigation}) {
  const [messages, setMessages] = useState([
    {
      id: 'initial-bot-' + Date.now(),
      text: 'Hi, I am Aurelius Intelligence here to help answer your questions on SST Open House',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = inputText.trim();
    if (trimmedInput.length === 0 || isLoading) {
      return;
    }

    const userMessage = {
      id: 'user-' + Date.now(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const botResponseText = await getBotResponse(trimmedInput);
      const botMessage = {
        id: 'bot-' + Date.now(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error in handleSend processing:', error);
      const errorMessage = {
        id: 'error-' + Date.now(),
        text: 'Sorry, there was an issue displaying the response.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageItem = ({item}) => {
    const isUserMessage = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageBubbleContainer,
          isUserMessage
            ? styles.userMessageContainer
            : styles.botMessageContainer,
        ]}>
        {!isUserMessage && (
          <Image
            source={require('./assets/mr_yeo.png')}
            style={[styles.avatarImage, {marginRight: 8}]}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            isUserMessage ? styles.userMessageBubble : styles.botMessageBubble,
          ]}>
          <Text
            allowFontScaling={false}
            style={
              isUserMessage ? styles.userMessageText : styles.botMessageText
            }>
            {item.text}
          </Text>
        </View>
        {isUserMessage && (
          <Image
            source={require('./assets/user.png')}
            style={[styles.avatarImage, {marginLeft: 8}]}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 50}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.imageBackground}
          resizeMode="cover">
          <SafeAreaView style={styles.safeArea}>
            <View>
              <View style={{marginTop: '-6%'}} />
              <View>
                <View style={styles.topSidebar}>
                  <Text allowFontScaling={false} style={styles.header}>
                    Chatbot
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
              </View>
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={item => item.id}
              style={styles.chatArea}
              contentContainerStyle={styles.chatContentContainer}
              ListFooterComponent={
                isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#356AA9"
                    style={styles.loadingIndicator}
                  />
                ) : null
              }
            />

            <View style={styles.inputArea}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask Aurelius..."
                placeholderTextColor="#888888"
                multiline
                blurOnSubmit={false}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (isLoading || inputText.trim().length === 0) &&
                    styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={isLoading || inputText.trim().length === 0}>
                <Text allowFontScaling={false} style={styles.sendButtonText}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerOuterContainer: {
    marginTop: '5%',
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
  hamburgerIconPress: {
    padding: 8,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContentContainer: {
    paddingVertical: 10,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    paddingLeft: '20%',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    paddingRight: '20%',
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: '#356AA9',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botMessageBubble: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessageText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 15,
    lineHeight: 20,
  },
  botMessageText: {
    color: '#1C1C12',
    fontFamily: 'Lato',
    fontSize: 15,
    lineHeight: 20,
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: 'rgba(249, 249, 249, 0.95)',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Lato',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 10,
    paddingTop: Platform.OS === 'ios' ? 10 : 8,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
    minHeight: 40,
    maxHeight: 100,
    color: '#000000',
  },
  sendButton: {
    backgroundColor: '#356AA9',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  sendButtonDisabled: {
    backgroundColor: '#A0B8D0',
  },
  sendButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  generalText: {
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginTop: '1%',
  },
  basicText: {
    color: '#1C1C12',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 17,
    fontStyle: 'normal',
  },
});
