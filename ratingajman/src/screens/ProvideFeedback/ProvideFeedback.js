import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import MovToMp4 from 'react-native-mov-to-mp4';
import Pdf from 'react-native-pdf';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import styles from './styles';
// import axios from 'axios';
import { useKeepAwake } from '@unsw-gsbme/react-native-keep-awake/src/index';
const { width, height } = Dimensions.get('window');
const ProvideFeedback = ({ onClose, lang }) => {
  useKeepAwake();
  const languageResource = useSelector((state) => state.resourcesReducer.resource);
  const feedbackID = useSelector((state) => state.resourcesReducer.feedbackID);
  // const languageID = useSelector(state => state.resourcesReducer.languageID);
  const [languageID, setlanguageID] = useState(lang);
  const [reviewstate, setreviewstate] = useState(false);
  const [activestate, setactivestate] = useState(0);
  const apiLink = useSelector((state) => state.resourcesReducer.apiLink);
  const [attachmentStatus, setattachmentStatus] = useState(false);
  const [playTimeraw, setPlayTimeraw] = useState(0);
  const [recording, setrecording] = useState(0);
  const [audioRecorderPlayer, setaudioRecorderPlayer] = useState(new AudioRecorderPlayer());
  audioRecorderPlayer.setSubscriptionDuration(0.1);
  const [recordingdata, setrecordingdata] = useState(null);
  const [audiopaused, setaudiopaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [feedbackIDFromResponse, setfeedbackIDFromResponse] = useState(0);
  const [usercancelled, setusercancelled] = useState(false);
  const [feedbackphoto, setfeedbackphoto] = useState(null);
  const [feedbacktext, setfeedbacktext] = useState('');
  const [videodata, setvideodata] = useState(null);

  const [keyboard, setkeyboard] = useState(false);
  const [docuement, setdocuement] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showrating, setshowrating] = useState(false);
  const [rating, setrating] = useState(0);
  const [reviewText, setreviewText] = useState();

  const [picpreviewmodal, setpicpreviewmodal] = useState(false);
  const [videopreviewmodal, setvideopreviewmodal] = useState(false);
  const [audiopreview, setaudiopreview] = useState();
  const [pdfpreview, setpdfpreview] = useState(false);
  const [feedbackSubmitted, setfeedbackSubmitted] = useState(false);

  const circularProgressref = useRef();

  const [playertime, setplayertime] = useState(0);
  const appState = useRef(AppState.currentState);

  const [attachmentbtndisabled, setattachmentbtndisabled] = useState(false);

  const headers = {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    Accept: 'multipart/form-data; boundary=----WebKitFormBoundaryt0mA6M0xyyBgI2pj',
    'Content-Type': '*/*',
  };
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setaudiopaused(true);
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
    setaudiopaused(false);
  };

  useEffect(() => {
    if (toggleCheckBox && docuement) {
      setattachmentStatus(true);
    } else {
      setattachmentStatus(false);
    }
  }, [toggleCheckBox]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds == 60) {
      onStopRecord();
    }
  }, [seconds]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active')
      appState.current = nextAppState;
    if (appState.current === 'background') {
      if (!reviewstate && recordingdata != null) {
        Cancel();
      }
    }
  };

  function Cancel() {
    onStopPlay();
    onStopRecord();

    setrecordingdata(null);
    setaudiopreview();
    setTimeout(() => {
      setrecording(0);
      reset();
    }, 100);
  }

  useEffect(() => {
    if (playertime) {
      if (playertime == 100) {
        setTimeout(() => {
          setplayertime(0);
        }, 1000);
      }
    }
  }, [playertime]);

  useEffect(() => {
    if (rating == 0) {
      setreviewText('');
    } else if (rating >= 1 && rating <= 2) {
      setreviewText(
        languageResource.We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service,
      );
    } else if (rating == 3) {
      setreviewText(
        languageResource.Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better,
      );
    } else {
      setreviewText(languageResource.We_are_always_happy_to_serve_you);
    }
  }, [rating]);

  const option = [
    {
      id: 1,
      title: languageResource.Audio,
      image: require('../../assets/images/microphone.png'),
      noactiveImage: require('../../assets/images/microphone.png'),
      press: () => {
        setactivestate(1);
      },
    },
    {
      id: 2,
      title: languageResource.Video,
      image: require('../../assets/images/videoplayer.png'),
      noactiveImage: require('../../assets/images/videoplayer.png'),
      press: () => {
        setactivestate(2);
        _handlevideo();
      },
    },
    {
      id: 3,
      title: languageResource.Selfie,
      image: require('../../assets/images/selfie.png'),
      noactiveImage: require('../../assets/images/selfie.png'),
      press: () => {
        setactivestate(3);
        _onOpenActionSheet();
      },
    },
    {
      id: 4,
      title: languageResource.Text,
      image: require('../../assets/images/message.png'),
      noactiveImage: require('../../assets/images/selfie.png'),
      press: () => {
        setactivestate(4);
      },
    },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setkeyboard(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setkeyboard(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function Clear() {
    netinfo().then((res) => {
      if (res) {
        setactivestate(0);
        setreviewstate(false);
        setrecording(0);
        setaudiopreview();
        if (activestate == 1) {
          PostAudioFeedback();
        } else if (activestate == 4) {
          handleTextSubmit();
        } else if (activestate == 3) {
          onStartCamera(feedbackphoto);
        } else if (activestate == 2) {
          postVideoFeedback(videodata);
        }

        setshowrating(true);
      } else {
        Alert.alert(languageResource.Alert, languageResource.No_internet_connection, [
          {
            text: languageResource.Ok,
            onPress: () => console.log('OK Pressed'),
          },
        ]);
      }
    });
  }

  function skip() {
    setactivestate(0);
    setreviewstate(false);
    setrecording(0);
    setaudiopreview();
    if (activestate == 1) {
      PostAudioFeedback();
    } else if (activestate == 4) {
      handleTextSubmit();
    } else if (activestate == 3) {
      onStartCamera(feedbackphoto);
    } else if (activestate == 2) {
      postVideoFeedback(videodata);
    }
    setdocuement();
    setshowrating(true);
  }

  function Reset() {
    setrecording(0);
    setreviewstate(false);
    setPlayTimeraw(0);
    setrecording();
    setrecordingdata(null);
    setfeedbackphoto(null);
    setfeedbacktext('');
    // setvideodata(null);
    setdocuement();
    setshowrating(false);
    setaudiopreview();
  }

  const _onOpenActionSheet = () => {
    try {
      launchCamera(
        {
          cameraType: 'front',
        },

        (res) => {
          if (res.assets) {
            setusercancelled(false);
            setfeedbackphoto(res.assets[0]);
          } else {
            setusercancelled(true);
          }
        },
      );
    } catch (error) {}
  };

  const _handlevideo = () => {
    setvideodata(null);
    try {
      launchCamera(
        {
          videoQuality: 'high',
          mediaType: 'video',
          durationLimit: 60,
          cameraType: 'front',
        },
        (res) => {
          if (res?.assets) {
            if (res?.assets[0].duration >= 5) {
              setusercancelled(false);
              if (Platform.OS == 'ios') {
                const filename = Date.now().toString();

                MovToMp4.convertMovToMp4(res.assets[0].uri, filename).then(function (results) {
                  const videoData = {
                    uri: results,
                    fileName: filename + '.mp4',
                    duration: res.assets[0].duration,
                  };
                  setvideodata(videoData);
                  // postVideoFeedback(videoData);
                });
              } else {
                const videoDataAndroid = {
                  uri: res.assets[0].uri,
                  duration: res.assets[0].duration,
                  fileName: res.assets[0].fileName,
                  fileSize: res.assets[0].fileSize,
                };
                setvideodata(videoDataAndroid);
              }
            } else {
              setusercancelled(true);
              Alert.alert(
                languageResource.Alert,
                languageResource.Video_should_be_more_than_5_seconds,
                [
                  {
                    text: languageResource.Ok,
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
              );
            }
          } else {
            setusercancelled(true);
          }
        },
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const PickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setattachmentbtndisabled(false);
      if (res.size >= 5000000) {
        Alert.alert(
          languageResource.Alert,
          languageResource.Unable_to_upload_attachments_more_than_5MBs,
          [
            {
              text: languageResource.Ok,
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      } else {
        if (res?.type == 'application/pdf' || res[0]?.type == 'application/pdf') {
          setdocuement({
            uri: res.uri,
            cache: true,
            type: res.type,
          });
          {
            setdocuement(
              res[0] != undefined
                ? {
                    uri: res[0].uri,
                    cache: true,
                    type: res[0].type,
                  }
                : {
                    uri: res.uri,
                    cache: true,
                    type: res.type,
                  },
            );
          }
        } else if (
          res.type == 'image/jpeg' ||
          res.type == 'image/jpg' ||
          res.type == 'image/png' ||
          res.type == 'image/heic' ||
          res[0].type == 'image/jpeg' ||
          res[0].type == 'image/jpg' ||
          res[0].type == 'image/png' ||
          res[0].type == 'image/heic'
        ) {
          {
            setdocuement(res[0] != undefined ? res[0] : res);
          }
        } else {
          Alert.alert(
            languageResource.Alert,
            languageResource.Only_png_jpg_and_pdf_files_are_allowed,
            [
              {
                text: languageResource.Ok,
                onPress: () => console.log('OK Pressed'),
              },
            ],
          );
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setattachmentbtndisabled(false);
      } else {
        setattachmentbtndisabled(false);
        throw err;
      }
    }
  };

  const onStartCamera = async (photo) => {
    if (Platform.OS === 'android') {
      try {
        await postImageFeedback(photo);
      } catch (err) {
        return;
      }
    }

    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.CAMERA).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CAMERA);
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.GRANTED:
            postImageFeedback(photo);
            break;
          case RESULTS.BLOCKED:
            Linking.openSettings();
            break;
        }
      });
    }
  };

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          onStartRecording();
        } else {
          setactivestate(5);
          Linking.openSettings();
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.MICROPHONE).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // setactivestate(5);
            break;
          case RESULTS.DENIED:
            // setactivestate(5);
            request(PERMISSIONS.IOS.MICROPHONE);
            break;
          case RESULTS.LIMITED:
            // setactivestate(5);
            break;
          case RESULTS.GRANTED:
            onStartRecording();
            break;
          case RESULTS.BLOCKED:
            // setactivestate(5);
            Linking.openSettings();
            break;
        }
      });
    }
  };

  const onStartRecording = async () => {
    setSeconds(0);
    setPlayTimeraw(0);

    setrecording(1);
    // const dirs = ReactNativeBlobUtil.fs.dirs;

    const path = Platform.select({
      ios: 'hello.m4a',
      // android: `${dirs.CacheDir}/hello.m4a`,
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    toggle();

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e) => {
      setPlayTimeraw(e.currentPosition);
    });
  };

  const timeConverter = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds2 = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds2 < 10 ? '0' : '') + seconds2;
  };

  const onStopRecord = async () => {
    toggle();
    const result = await audioRecorderPlayer.stopRecorder();
    setrecording(2);
    audioRecorderPlayer.removeRecordBackListener();

    setaudiopreview(result);
    const data = new FormData();
    data.append('feedback_file', {
      uri: `${result}`,
      name: 'audio ' + new Date() + ' .m4a',
      type: 'audio/.m4a',
    });
    data.append('user', 'test');
    data.append('domain', 'audio');
    data.append('feedback_type', 'audio');
    data.append('attachment_status', 'false');
    data.append('feedback_id', 0);
    setrecordingdata(data);
  };

  useEffect(() => {
    if (playTimeraw && playTimeraw < 5120) {
      Alert.alert(languageResource.Alert, languageResource.Audio_should_be_minimum_5_seconds, [
        {
          text: languageResource.Ok,
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      setrecording(0);
      setPlayTimeraw(0);
      setrecordingdata(null);
    }
  }, [recordingdata]);

  const onStartPlay = async (url) => {
    setrecording(3);

    const msg = await audioRecorderPlayer.startPlayer(url);
    const volume = await audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener((e) => {
      setplayertime((e.currentPosition / e.duration) * 100);

      if (e.currentPosition == e.duration) {
        onStopPlay();
      }
    });
  };

  const onStopPlay = async () => {
    setrecording(2);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const PostAudioFeedback = async () => {
    setfeedbackSubmitted(true);
    try {
      console.log(recordingdata, 'recordingdata');
      let res = await fetch(apiLink, {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: recordingdata,
      });
      let a = await res.json();
      console.log('res', await a.data.id);
      await setfeedbackIDFromResponse(a.data.id);
      if (docuement) {
        await postDocumentFeedback(a.data.id);
      } else {
        setdocuement();
      }
      setrecordingdata(null);
    } catch (error) {
      Alert.alert(languageResource.Alert, languageResource.Something_went_wrong_in_sharing_audio, [
        {
          text: languageResource.Ok,
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      setrecordingdata(null);
    }
  };

  const postVideoFeedback = async (vidData) => {
    setfeedbackSubmitted(true);
    const data = new FormData();
    data.append('feedback_file', {
      uri: Platform.OS === 'ios' ? `file://${vidData.uri}` : vidData.uri,
      name: vidData.fileName,
      type: 'video/mp4',
    });
    data.append('user', 'admin');
    data.append('domain', 'video');
    data.append('feedback_type', 'video');
    data.append('attachment_status', 'false');
    data.append('feedback_id', 0);
    try {
      let res = await fetch(apiLink, {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: data,
      });
      let a = await res.json();
      console.log('res', await a.data.id);
      await setfeedbackIDFromResponse(a.data.id);
      if (docuement) {
        await postDocumentFeedback(a.data.id);
      } else {
        setdocuement();
      }
    } catch (error) {
      Alert.alert(languageResource.Alert, languageResource.Something_went_wrong_in_sharing_video, [
        {
          text: languageResource.Ok,
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      setvideodata(null);
    }
  };

  const postImageFeedback = async (cameraResponse) => {
    setfeedbackSubmitted(true);
    try {
      const data = new FormData();
      data.append('feedback_file', {
        uri: Platform.OS === 'ios' ? cameraResponse.uri.replace('file://', '') : cameraResponse.uri,
        name: cameraResponse.fileName,
        type: cameraResponse.type,
      });
      data.append('user', 'admin');
      data.append('domain', 'image');
      data.append('feedback_type', 'image');
      data.append('attachment_status', 'false');
      data.append('feedback_id', 0);
      let res = await fetch(apiLink, {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: data,
      });
      let a = await res.json();
      console.log('res', await a.data.id);
      await setfeedbackIDFromResponse(a.data.id);
      if (docuement) {
        await postDocumentFeedback(a.data.id);
      } else {
        setdocuement();
      }
      setfeedbackphoto(null);
    } catch (error) {
      Alert.alert(languageResource.Alert, languageResource.Something_went_wrong_in_sharing_image, [
        {
          text: languageResource.Ok,
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      setfeedbackphoto(null);
    }
  };

  const postDocumentFeedback = async (id) => {
    setfeedbackSubmitted(true);
    try {
      const data = new FormData();
      data.append('feedback_file', {
        uri: Platform.OS === 'ios' ? docuement.uri.replace('file://', '') : docuement.uri,
        name: docuement.name,
        type: docuement.type,
      });
      data.append('user', 'admin');
      data.append('domain', 'attachment');
      data.append('feedback_type', 'image');
      data.append('attachment_status', true);
      data.append('feedback_id', id);
      let res = await fetch(apiLink, {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: data,
      });
      console.log('res', await res.json());
      setdocuement();
    } catch (error) {
      Alert.alert(
        languageResource.Alert,
        languageResource.Something_went_wrong_in_sharing_attachment,
        [
          {
            text: languageResource.Ok,
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
      setdocuement();
    }
  };

  const postRatingFeedback = async () => {
    setfeedbackSubmitted(true);
    try {
      const data = new FormData();
      let path = RNFS.DocumentDirectoryPath + `/${Date.now()}ratingFile.txt`;
      RNFS.writeFile(path, 'rating= ' + rating, 'utf8')
        .then(async (success) => {
          RNFS.readFile(path, 'utf8').then((file) => console.log(file, 'rating text', rating));
          data.append('feedback_file', {
            uri: `file://${path}`,
            name: 'ratingFile.txt',
            type: 'file/txt',
          });
          data.append('user', 'admin');
          data.append('domain', 'rating');
          data.append('feedback_type', 'text');
          data.append('attachment_status', 'false');
          data.append('feedback_id', feedbackIDFromResponse);
          let res = await fetch(apiLink, {
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
              'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            },
            body: data,
          });
          console.log('res', await res.json());
          setshowrating(false);
          setreviewstate(false);
          Reset();
          setrating(0);
          return RNFS.unlink(path)
            .then(() => {
              console.log('FILE DELETED');
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          Alert.alert(
            languageResource.Alert,
            languageResource.Something_went_wrong_in_sharing_ratings,
            [
              {
                text: languageResource.Ok,
                onPress: () => console.log('OK Pressed'),
              },
            ],
          );
          setrating(0);
        });
    } catch (error) {
      Alert.alert(
        languageResource.Alert,
        languageResource.Something_went_wrong_in_sharing_ratings,
        [
          {
            text: languageResource.Ok,
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
    }
  };
  const handleTextSubmit = async () => {
    setfeedbackSubmitted(true);
    if (feedbacktext?.length < 6) {
      Alert.alert(
        languageResource.Alert,
        languageResource.Your_feedback_must_contain_at_least_6_characters,
        [
          {
            text: languageResource.Ok,
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
    } else {
      let path = RNFS.DocumentDirectoryPath + `/${Date.now()}test.txt`;
      RNFS.writeFile(path, feedbacktext, 'utf8')
        .then(async (success) => {
          RNFS.readFile(path, 'utf8').then((file) => console.log(file, 'fileeee text'));

          const data = new FormData();
          data.append('feedback_file', {
            uri: `file://${path}`,
            name: 'test.txt',
            type: 'file/txt',
          });
          data.append('user', 'admin');
          data.append('domain', 'text');
          data.append('feedback_type', 'text');
          data.append('attachment_status', 'false');
          data.append('feedback_id', 0);
          let res = await fetch(apiLink, {
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
              'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            },
            body: data,
          });
          let a = await res.json();
          console.log('res', await a.data.id);
          await setfeedbackIDFromResponse(a.data.id);
          if (docuement) {
            await postDocumentFeedback(a.data.id);
          } else {
            setdocuement();
          }
          setfeedbacktext('');
          setreviewstate(true);
          RNFS.unlink(path)
            .then(() => {
              console.log('FILE DELETED');
            })
            .catch((err) => {
              Alert.alert(
                languageResource.Alert,
                languageResource.Something_went_wrong_in_sharing_text,
                [
                  {
                    text: languageResource.Ok,
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
              );
              console.log(err.message);
            });
        })
        .catch((err) => {
          Alert.alert(
            languageResource.Alert,
            languageResource.Something_went_wrong_in_sharing_text,
            [
              {
                text: languageResource.Ok,
                onPress: () => console.log('OK Pressed'),
              },
            ],
          );
          setfeedbacktext('');
        });
    }
  };

  async function netinfo() {
    let state = await NetInfo.fetch();
    return state.isConnected;
  }

  return (
    <ImageBackground
      style={[styles.mainContainer]}
      resizeMode={'cover'}
      source={
        languageID !== 1
          ? require('../../assets/images/drawerBgReverse.png')
          : require('../../assets/images/drawerBg.png')
      }>
      <Modal
        visible={picpreviewmodal}
        transparent
        animationType="fade"
        onRequestClose={() => setpicpreviewmodal(false)}>
        <View style={styles.innerContainer}>
          <Image
            source={docuement?.uri ? { uri: docuement.uri } : feedbackphoto}
            resizeMode="contain"
            style={styles.documentStyling}
          />
          <Text
            allowFontScaling={false}
            onPress={() => setpicpreviewmodal(false)}
            style={styles.doneText}>
            {languageResource.Done}
          </Text>
        </View>
      </Modal>
      <Modal
        visible={pdfpreview}
        animationType="fade"
        transparent
        onRequestClose={() => setpdfpreview(false)}>
        <View style={styles.PDFModalCont}>
          <View style={styles.PDFModalInner}>
            <TouchableOpacity style={styles.CrossImgCont} onPress={() => setpdfpreview(false)}>
              <Image
                source={require('../../assets/images/cross.png')}
                resizeMode="contain"
                style={styles.modalImage}
              />
            </TouchableOpacity>

            <View style={styles.pdfView}>
              <Pdf source={docuement} style={styles.pdf} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={videopreviewmodal}
        onRequestClose={() => setvideopreviewmodal(false)}
        transparent
        animationType="fade">
        <View style={styles.videoView}>
          <View style={{ width, height }}>
            <Video
              controls
              resizeMode="cover"
              source={{ uri: videodata?.uri }} // Can be a URL or a local file.
              repeat
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <Text
            allowFontScaling={false}
            onPress={() => setvideopreviewmodal(false)}
            style={styles.doneText2}>
            {languageResource.Done}
          </Text>
        </View>
      </Modal>

      <SafeAreaView style={[styles.innercont, { right: -20 }]}>
        <TouchableOpacity
          style={[
            styles.feedbackButton,
            {
              // right: languageID != 1 && Platform.OS == 'ios'  ?  width * 0.075: undefined,
            },
          ]}
          onPress={() => {
            onStopPlay();
            if (!feedbackSubmitted) {
              setreviewText('');
              onStopPlay();
              onClose();
              Cancel();
            } else {
              onStopPlay();
              Cancel();
              onClose();
            }
          }}>
          <Image
            source={require('../../assets/images/cross.png')}
            resizeMode="contain"
            style={styles.documentStyling}
          />
        </TouchableOpacity>
        {showrating ? (
          <>
            <View
              style={[
                styles.ratingView,
                {
                  marginLeft: 0.5,
                  left: 70,
                },
              ]}>
              <Text allowFontScaling={false} style={styles.ratingText} numberOfLines={2}>
                {languageResource.Thanks_for_your_feedback}
              </Text>
              <Image
                source={require('../../assets/images/rate.png')}
                resizeMode="contain"
                style={styles.ratingImage}
              />
              <Text allowFontScaling={false} style={styles.ratingFont}>
                {languageResource.Please_rate_us}
              </Text>
              <StarRating
                emptyStar={require('../../assets/images/starempty.png')}
                fullStar={require('../../assets/images/starfull.png')}
                maxStars={5}
                starSize={30}
                buttonStyle={{ paddingHorizontal: 7.5 }}
                rating={rating}
                selectedStar={(rating) => setrating(rating)}
                fullStarColor={'red'}
                containerStyle={{
                  transform: [{ translateX: lang == 1 ? 1 : -1 }],
                }}
              />
              <Text allowFontScaling={false} style={styles.reviewText}>
                {rating >= 1 && reviewText}
              </Text>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => {
                  postRatingFeedback();
                  onClose();
                }}>
                <Text allowFontScaling={false} style={styles.submitButton}>
                  {languageResource.Submit}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bottomView]}>
              <Text style={styles.bottomText}>
                {languageResource.This_feedback_will_be_used_for_quality_assurance_purposes}
              </Text>
            </View>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.safeView]}>
              {activestate != 0 && activestate != 5 && !keyboard && (
                <View style={[styles.safeView2]}>
                  {option.map((item) => {
                    return (
                      <View style={[styles.optionsView]}>
                        <TouchableOpacity style={styles.options}>
                          <View
                            style={[
                              styles.optionsInnerView,
                              {
                                backgroundColor: activestate == item.id ? '#147AF3' : '#fff',
                              },
                            ]}>
                            <Image
                              source={item.image}
                              resizeMode="contain"
                              style={[
                                styles.optionsImage,
                                {
                                  tintColor: activestate == item.id ? '#fff' : 'grey',
                                },
                              ]}
                            />
                          </View>
                        </TouchableOpacity>
                        {activestate == item.id && (
                          <>
                            <Text allowFontScaling={false} style={styles.optionsTitle}>
                              {item.title}
                            </Text>
                            <Image
                              source={require('../../assets/images/smallarrow.png')}
                              resizeMode="contain"
                              style={styles.optionsInnerImage}
                            />
                          </>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
              {activestate == 0 ? (
                <View style={styles.mainView}>
                  <Text allowFontScaling={false} style={[styles.experienceView]}>
                    {languageResource.How_was_your_experience}
                  </Text>
                  <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                      alignSelf: 'center',
                    }}
                    numColumns={2}
                    data={option}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.outerView}>
                          <TouchableOpacity style={styles.buttonPress} onPress={item.press}>
                            <Image
                              resizeMode={'contain'}
                              style={styles.imagePress}
                              source={item.image}
                            />
                          </TouchableOpacity>
                          <Text allowFontScaling={false} style={styles.titleText}>
                            {' '}
                            {item.title}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : activestate == 5 ? (
                <View style={{ alignItems: 'center' }}>
                  <Text allowFontScaling={false} style={styles.textView}>
                    {languageResource.Audio_Feedback}
                  </Text>
                  <Image
                    source={require('../../assets/images/audioerror.png')}
                    resizeMode="contain"
                    style={styles.textImage}
                  />
                  <Text
                    allowFontScaling={false}
                    style={styles.textView}
                    onPress={() => Linking.openSettings()}>
                    {languageResource.No_microphone_detected}
                  </Text>
                </View>
              ) : (
                <View style={[styles.Box, { width: '70%' }]}>
                  {reviewstate ? (
                    <>
                      <Text allowFontScaling={false} style={styles.Label}>
                        {languageResource.Would_you_like_to_attach_any_supporting_documents}
                      </Text>
                      <View>
                        <TouchableOpacity
                          disabled={attachmentbtndisabled}
                          onPress={() => {
                            if (docuement?.type == 'application/pdf') {
                              if (docuement) {
                                setpdfpreview(true);
                              }
                            } else if (
                              docuement?.type == 'image/jpeg' ||
                              docuement?.type == 'image/jpg' ||
                              docuement?.type == 'image/png' ||
                              docuement?.type == 'image/heic'
                            ) {
                              if (docuement) {
                                setpicpreviewmodal(true);
                              }
                            } else {
                              setattachmentbtndisabled(true);
                              PickDocument();
                            }
                          }}>
                          {docuement?.type == 'application/pdf' ? (
                            <Text allowFontScaling={false} style={styles.viewPdf}>
                              {languageResource.View_PDF}
                            </Text>
                          ) : (
                            <Image
                              source={
                                docuement?.uri
                                  ? { uri: docuement.uri }
                                  : require('../../assets/images/attachment.png')
                              }
                              resizeMode="contain"
                              style={styles.viewPdfIcon}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <Text allowFontScaling={false} style={styles.warningText}>
                        {
                          languageResource.Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size
                        }
                      </Text>
                      {docuement && (
                        <View style={styles.pdfStyling}>
                          <TouchableOpacity
                            style={styles.documentButton}
                            onPress={() => setdocuement()}>
                            <Text allowFontScaling={false} style={{ color: '#147AF3' }}>
                              {languageResource.Remove_Attachment}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            {
                              width: '45%',
                              height: height * 0.05,
                              alignSelf: 'center',
                              borderColor: '#147AF3',
                              borderWidth: 1,
                              backgroundColor: 'white',
                            },
                          ]}
                          onPress={() => skip()}>
                          <Text allowFontScaling={false} style={{ color: '#147AF3' }}>
                            {languageResource.Skip}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            {
                              width: '45%',
                              height: height * 0.05,
                              alignSelf: 'center',
                            },
                          ]}
                          onPress={() => {
                            netinfo().then((res) => {
                              if (res) {
                                Clear();
                              } else {
                                Alert.alert(
                                  languageResource.Alert,
                                  languageResource.No_internet_connection,
                                  [
                                    {
                                      text: languageResource.Ok,
                                      onPress: () => console.log('OK Pressed'),
                                    },
                                  ],
                                );
                              }
                            });
                          }}>
                          <Text allowFontScaling={false} style={{ color: '#fff' }}>
                            {languageResource.Continue}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text allowFontScaling={false} style={styles.Label}>
                        {activestate == 1
                          ? languageResource.Please_tap_to_record_the_audio
                          : activestate == 2
                          ? languageResource.Record_Your_Video
                          : activestate == 3
                          ? languageResource.Capture_Your_Selfie
                          : activestate == 4
                          ? languageResource.Enter_Your_Feedback
                          : ''}
                      </Text>
                      {activestate == 1 ? (
                        <View>
                          {recording == 3 ? (
                            <>
                              <AnimatedCircularProgress
                                size={100}
                                width={5}
                                style={{
                                  alignSelf: 'center',
                                  justifyContent: 'space-evenly',
                                  transform: [
                                    {
                                      rotate: '270deg',
                                    },
                                  ],
                                }}
                                fill={playertime}
                                tintColor="#1A73e9"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                ref={circularProgressref}
                                backgroundColor="#dcdcdc"
                                arcSweepAngle={360}>
                                {(fill) => (
                                  <>
                                    <Text
                                      allowFontScaling={false}
                                      style={{
                                        color: '#444',
                                        fontWeight: 'bold',
                                        alignSelf: 'center',

                                        zIndex: 99,
                                        transform: [
                                          {
                                            rotate: '90deg',
                                          },
                                        ],
                                      }}>
                                      {timeConverter((fill / 100) * playTimeraw)}{' '}
                                    </Text>
                                  </>
                                )}
                              </AnimatedCircularProgress>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '80%',
                                  justifyContent: 'space-evenly',
                                  alignSelf: 'center',
                                  paddingTop: 10,
                                }}>
                                <TouchableOpacity
                                  onPress={
                                    !audiopaused ? () => onPausePlay() : () => onResumePlay()
                                  }>
                                  <Text
                                    style={{
                                      fontSize: width * 0.033,
                                      color: '#000',
                                    }}>
                                    {!audiopaused
                                      ? languageResource.Pause
                                      : languageResource.Resume}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          ) : recording == 1 ? (
                            <TouchableOpacity onPress={() => onStopRecord()}>
                              <AnimatedCircularProgress
                                size={100}
                                width={5}
                                style={{
                                  alignSelf: 'center',
                                  transform: [
                                    {
                                      rotate: '270deg',
                                    },
                                  ],
                                }}
                                fill={(seconds / 60) * 100}
                                tintColor="#1A73e9"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                ref={circularProgressref}
                                backgroundColor="#dcdcdc"
                                arcSweepAngle={360}>
                                {(fill) => (
                                  <>
                                    <Image
                                      source={require('../../assets/images/recording.png')}
                                      resizeMode="contain"
                                      style={{
                                        width: width * 0.3,
                                        height: width * 0.3,
                                        alignSelf: 'center',
                                        transform: [
                                          {
                                            rotate: '90deg',
                                          },
                                        ],
                                      }}
                                    />
                                  </>
                                )}
                              </AnimatedCircularProgress>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  textAlign: 'center',
                                  paddingTop: 10,
                                  color: '#444',
                                }}>
                                {seconds == 0 || seconds < 10 ? '0:0' : '0:'}
                                {seconds}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                recording == 0
                                  ? onStartRecord()
                                  : recording == 2
                                  ? onStartPlay(audiopreview)
                                  : recording == 3
                                  ? null
                                  : onStartRecord()
                              }>
                              <Image
                                source={
                                  recording == 1
                                    ? require('../../assets/images/recording.png')
                                    : recording == 2
                                    ? require('../../assets/images/play.png')
                                    : require('../../assets/images/newmic.png')
                                }
                                resizeMode="contain"
                                style={{
                                  width: width * 0.3,
                                  height: width * 0.3,
                                  alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      ) : activestate == 2 ? (
                        <View
                          activeOpacity={1}
                          style={{
                            width: languageID == 1 ? width * 0.6 : width * 0.6,
                            height: languageID == 1 ? height * 0.2 : height * 0.19,
                            borderWidth: videodata ? 1 : 0,
                            alignSelf: 'center',
                          }}>
                          {videodata && (
                            <TouchableOpacity
                              onPress={() => {
                                if (videodata) setvideopreviewmodal(true);
                              }}
                              style={{
                                position: 'absolute',
                                top: '5%',
                                right: '5%',
                                zIndex: 99,
                                color: 'blue',
                              }}>
                              <Icon name={'resize-full-screen'} size={30} color={'#444'} />
                            </TouchableOpacity>
                          )}
                          <Video
                            controls
                            resizeMode="cover"
                            source={{ uri: videodata?.uri }} // Can be a URL or a local file.
                            style={{ width: '100%', height: '100%' }}
                          />
                        </View>
                      ) : activestate == 3 ? (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            if (feedbackphoto) {
                              setpicpreviewmodal(true);
                            }
                          }}>
                          <Image
                            source={feedbackphoto}
                            resizeMode="contain"
                            style={{
                              width: width * 0.6,
                              height: width * 0.4,
                              alignSelf: 'center',
                            }}
                          />
                        </TouchableOpacity>
                      ) : activestate == 4 ? (
                        <View
                          style={{
                            width: width * 0.6,
                            height: '50%',
                            alignSelf: 'center',
                          }}>
                          <View
                            style={{
                              width: '100%',
                              height: '80%',
                              borderRadius: 5,
                              borderColor: '#B7B7B7',
                              borderWidth: 1,
                            }}>
                            <TextInput
                              allowFontScaling={false}
                              Input
                              value={feedbacktext}
                              style={{
                                height: '100%',
                                color: '#000',
                                textAlignVertical: 'top',
                                textAlign: feedbackID != 1 ? 'right' : 'left',
                              }}
                              maxLength={500}
                              keyboardType={'default'}
                              returnKeyType={'next'}
                              onChangeText={(text) => setfeedbacktext(text)}
                              multiline
                            />
                          </View>
                          <Text
                            allowFontScaling={false}
                            style={{
                              alignSelf: 'flex-start',
                              color: 'black',
                            }}>
                            {500 - feedbacktext?.length + ' ' + languageResource.charatcters_left}
                          </Text>
                        </View>
                      ) : null}

                      {usercancelled ? (
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            {
                              width: '90%',
                              alignSelf: 'center',
                              height: height * 0.06,
                            },
                          ]}
                          onPress={() => {
                            if (activestate == 3) {
                              onStopPlay();
                              setfeedbackphoto(null);
                              _onOpenActionSheet();
                            } else if (activestate == 1) {
                              setrecordingdata(null);
                              setrecording(0);
                              setPlayTimeraw(0);
                              reset();
                            } else if (activestate == 2) {
                              onStopPlay();
                              // setvideodata(null);
                              _handlevideo();
                            }
                          }}>
                          <Text style={{ color: '#fff', fontSize: width * 0.04 }}>
                            {activestate == 3
                              ? languageResource.Retake
                              : languageResource.Recapture}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: '5%',
                            }}>
                            <CheckBox
                              disabled={false}
                              value={toggleCheckBox}
                              onValueChange={(newValue) => setToggleCheckBox(newValue)}
                              boxType={'square'}
                              onCheckColor={'#147AF3'}
                              onTintColor={'#147AF3'}
                              tintColors={{ true: '#147AF3', false: 'grey' }}
                            />
                            <Text
                              style={{
                                marginHorizontal: Platform.OS == 'ios' ? 10 : 0,
                                color: 'black',
                              }}>
                              {languageResource.Add_Attachment}
                            </Text>
                          </View>
                          <View>
                            <View style={styles.BtnCont}>
                              {activestate != 4 ? (
                                <>
                                  {feedbackphoto != null ||
                                  recordingdata != null ||
                                  videodata != null ? (
                                    <TouchableOpacity
                                      style={[
                                        styles.LeftBtn,
                                        {
                                          width: '48%',
                                          borderColor: recording == 1 ? '#ececec' : '#444',
                                        },
                                      ]}
                                      disabled={recording == 1}
                                      onPress={() => {
                                        if (activestate == 3) {
                                          onStopPlay();
                                          setfeedbackphoto(null);
                                          _onOpenActionSheet();
                                        } else if (activestate == 1) {
                                          setrecordingdata(null);
                                          setrecording(0);

                                          setPlayTimeraw(0);
                                          reset();
                                        } else if (activestate == 2) {
                                          onStopPlay();
                                          // setvideodata(null);
                                          _handlevideo();
                                        }
                                      }}>
                                      <Text
                                        allowFontScaling={false}
                                        style={{
                                          color: recording == 1 ? '#ececec' : '#444',
                                          fontSize: width * 0.04,
                                        }}>
                                        {activestate == 3
                                          ? languageResource.Retake
                                          : languageResource.Recapture}
                                      </Text>
                                    </TouchableOpacity>
                                  ) : null}

                                  <TouchableOpacity
                                    style={[
                                      styles.RightBtn,
                                      {
                                        width:
                                          feedbackphoto != null ||
                                          recordingdata != null ||
                                          videodata != null
                                            ? '48%'
                                            : '100%',
                                      },
                                    ]}
                                    onPress={() => {
                                      if (toggleCheckBox) {
                                        if (activestate == 1) {
                                          if (recording != 1 && recording != 0) {
                                            setPlayTimeraw(0);
                                            setaudiopreview();
                                            onStopPlay();
                                            setreviewstate(true);
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_record_an_audio_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else if (activestate == 2) {
                                          if (videodata) {
                                            setreviewstate(true);
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_record_a_video_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else if (activestate == 3) {
                                          if (feedbackphoto) {
                                            setreviewstate(true);
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_take_a_picture_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else if (activestate == 4) {
                                          if (feedbacktext?.length >= 6) {
                                            setreviewstate(true);
                                          } else {
                                            setreviewstate(false);
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Your_feedback_must_contain_at_least_6_characters,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        }
                                      } else {
                                        if (activestate == 1) {
                                          if (recording != 1 && recording != 0) {
                                            netinfo().then((res) => {
                                              if (res) {
                                                setPlayTimeraw(0);
                                                setaudiopreview();
                                                onStopPlay();
                                                setshowrating(true);
                                                Clear();
                                              } else {
                                                Alert.alert(
                                                  languageResource.Alert,
                                                  languageResource.No_internet_connection,
                                                  [
                                                    {
                                                      text: languageResource.Ok,
                                                      onPress: () => console.log('OK Pressed'),
                                                    },
                                                  ],
                                                );
                                              }
                                            });
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_record_an_audio_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else if (activestate == 2) {
                                          if (videodata) {
                                            netinfo().then((res) => {
                                              if (res) {
                                                setshowrating(true);
                                                Clear();
                                              } else {
                                                Alert.alert(
                                                  languageResource.Alert,
                                                  languageResource.No_internet_connection,
                                                  [
                                                    {
                                                      text: languageResource.Ok,
                                                      onPress: () => console.log('OK Pressed'),
                                                    },
                                                  ],
                                                );
                                              }
                                            });
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_record_a_video_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else if (activestate == 3) {
                                          if (feedbackphoto) {
                                            netinfo().then((res) => {
                                              if (res) {
                                                setshowrating(true);
                                                Clear();
                                              } else {
                                                Alert.alert(
                                                  languageResource.Alert,
                                                  languageResource.No_internet_connection,
                                                  [
                                                    {
                                                      text: languageResource.Ok,
                                                      onPress: () => console.log('OK Pressed'),
                                                    },
                                                  ],
                                                );
                                              }
                                            });
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.Please_take_a_picture_to_proceed,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        } else {
                                          setshowrating(false);
                                        }
                                      }
                                    }}>
                                    <Text
                                      allowFontScaling={false}
                                      style={{
                                        color: '#fff',
                                        fontSize: width * 0.04,
                                      }}>
                                      {!toggleCheckBox
                                        ? languageResource.Submit
                                        : languageResource.Next}
                                    </Text>
                                  </TouchableOpacity>
                                </>
                              ) : (
                                <TouchableOpacity
                                  style={[styles.RightBtn, { width: '100%' }]}
                                  onPress={() => {
                                    if (toggleCheckBox) {
                                      if (activestate == 1) {
                                        if (recording != 1 && recording != 0) {
                                          setPlayTimeraw(0);
                                          setaudiopreview();
                                          onStopPlay();
                                          setreviewstate(true);
                                        } else {
                                          Alert.alert(
                                            languageResource.Alert,
                                            languageResource.Please_record_an_audio_to_proceed,
                                            [
                                              {
                                                text: languageResource.Ok,
                                                onPress: () => console.log('OK Pressed'),
                                              },
                                            ],
                                          );
                                        }
                                      } else if (activestate == 2) {
                                        if (videodata) {
                                          setreviewstate(true);
                                        } else {
                                          Alert.alert(
                                            languageResource.Alert,
                                            languageResource.Please_record_a_video_to_proceed,
                                            [
                                              {
                                                text: languageResource.Ok,
                                                onPress: () => console.log('OK Pressed'),
                                              },
                                            ],
                                          );
                                        }
                                      } else if (activestate == 3) {
                                        if (feedbackphoto) {
                                          setreviewstate(true);
                                        } else {
                                          Alert.alert(
                                            languageResource.Alert,
                                            languageResource.Please_take_a_picture_to_proceed,
                                            [
                                              {
                                                text: languageResource.Ok,
                                                onPress: () => console.log('OK Pressed'),
                                              },
                                            ],
                                          );
                                        }
                                      } else if (activestate == 4) {
                                        if (feedbacktext?.length >= 6) {
                                          setreviewstate(true);
                                        } else {
                                          setreviewstate(false);

                                          Alert.alert(
                                            languageResource.Alert,
                                            languageResource.Your_feedback_must_contain_at_least_6_characters,
                                            [
                                              {
                                                text: languageResource.Ok,
                                                onPress: () => console.log('OK Pressed'),
                                              },
                                            ],
                                          );
                                        }
                                      }
                                    } else {
                                      if (feedbacktext?.length >= 6) {
                                        netinfo().then((res) => {
                                          if (res) {
                                            setshowrating(true);
                                            Clear();
                                          } else {
                                            Alert.alert(
                                              languageResource.Alert,
                                              languageResource.No_internet_connection,
                                              [
                                                {
                                                  text: languageResource.Ok,
                                                  onPress: () => console.log('OK Pressed'),
                                                },
                                              ],
                                            );
                                          }
                                        });
                                      } else {
                                        setshowrating(false);
                                        Alert.alert(
                                          languageResource.Alert,
                                          languageResource.Your_feedback_must_contain_at_least_6_characters,
                                          [
                                            {
                                              text: languageResource.Ok,
                                              onPress: () => console.log('OK Pressed'),
                                            },
                                          ],
                                        );
                                      }
                                    }
                                  }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      color: '#fff',
                                      fontSize: width * 0.04,
                                    }}>
                                    {!toggleCheckBox
                                      ? languageResource.Submit
                                      : languageResource.Next}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </>
                      )}
                    </>
                  )}
                </View>
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProvideFeedback;
