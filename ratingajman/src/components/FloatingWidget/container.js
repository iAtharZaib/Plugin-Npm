import React, { useState, useEffect } from 'react';
import { FloatingWidget } from './FloatingWidget';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { floatingActions } from './floatingActions';
import { Modal, Alert, Platform } from 'react-native';
import { AudioRecorder } from './AudioRecorder';
// import MovToMp4 from 'react-native-mov-to-mp4';

const FloatingWidgetContainer = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [audioRecording, setAudioRecording] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false);

  const _handleAudioRecord = () => {
    setModalVisible(!modalVisible);
  };

  const _handleText = () => {
    setTextModalVisible(!textModalVisible);
  };

  const handleItemSelection = (type) => {
    switch (type) {
      case 'bt_image':
        _onOpenActionSheet();
        break;
      case 'bt_audio':
        _handleAudioRecord();
        break;
      case 'bt_text':
        _handleText();
        break;
      case 'bt_video':
        _handlevideo();
        break;
      default:
        break;
    }
  };

  const _handlevideo = () => {
    try {
      launchCamera(
        {
          videoQuality: 'high',
          mediaType: 'video',
          durationLimit: 60,
        },
        (res) => {
          if (Platform.OS == 'ios') {
            const filename = Date.now().toString();
            // MovToMp4.convertMovToMp4(res.assets[0].uri, filename).then(
            //   function (results) {
            //     const videoData = {
            //       uri: results,
            //       fileName: filename + ".mp4",
            //       duration: res.assets[0].duration,
            //     };
            //     console.log(videoData);
            //     //here you can upload the video...
            //     console.log(results);
            //     postVideoFeedback(videoData);
            //   }
            // );
          } else {
            console.log(res.assets[0], 'dataa');
            const videoDataAndroid = {
              uri: res.assets[0].uri,
              duration: res.assets[0].duration,
              fileName: res.assets[0].fileName,
              fileSize: res.assets[0].fileSize,
            };
            postVideoFeedback(videoDataAndroid);
          }

          //
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const postVideoFeedback = async (vidData) => {
    const data = new FormData();
    data.append('feedback_file', {
      uri: Platform.OS === 'ios' ? `file://${vidData.uri}` : vidData.uri,
      name: vidData.fileName,
      type: 'video/mp4',
    });
    data.append('user', 'admin');
    data.append('domain', 'video_athar');
    try {
      let res = await fetch('https://ajmanplugin-api.lfdanalytics.com/api/create_feedback/', {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: data,
      });
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  };

  const postImageFeedback = async (cameraResponse) => {
    console.log(cameraResponse, 'responbsees');
    try {
      const data = new FormData();
      data.append('feedback_file', {
        uri: Platform.OS === 'ios' ? cameraResponse.uri.replace('file://', '') : cameraResponse.uri,
        name: cameraResponse.fileName,
        type: cameraResponse.type,
      });
      data.append('user', 'admin');
      data.append('domain', 'image_athar');
      let res = await fetch('https://ajmanplugin-api.lfdanalytics.com/api/create_feedback/', {
        method: 'POST',
        headers: {
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body: data,
      });
      console.log('res', await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const _onOpenActionSheet = () => {
    console.log('frfsd');
    const options = ['Open Camera', 'Chose From Library', 'Cancel'];
    const destructiveButtonIndex = -1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      // buttonIndex => {
      //   if (buttonIndex === 0) {
      //     try {
      //       launchCamera({}, (res) => postImageFeedback(res.assets[0]))
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   } else if (buttonIndex === 1){
      //     try {
      //       launchImageLibrary({}, (res) => postImageFeedback(res.assets[0]))
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      // },
    );
  };

  useEffect(() => {
    console.log('audio', audioRecording);
  }, [audioRecording]);

  return (
    <>
      <FloatingWidget actions={floatingActions} handleItemSelection={handleItemSelection} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        presentationStyle="pageSheet">
        <AudioRecorder />
      </Modal>
      <Modal
        animationType="slide"
        visible={textModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setTextModalVisible(!textModalVisible);
        }}
        presentationStyle="pageSheet">
        <Text allowFontScaling={false} Area />
      </Modal>
    </>
  );
};

export const FloatingWidgetConnected = FloatingWidgetContainer;
