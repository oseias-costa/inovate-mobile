import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const NoticeSquareSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View
      style={{
        height: 160,
        width: 140,
        marginHorizontal: 20,
      }}>
      <ContentLoader
        speed={4}
        width={180}
        height={160}
        viewBox="0 0 180 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="5" ry="8" width={170} height="150" />
      </ContentLoader>
    </View>
  );
};

export default NoticeSquareSkeleton;
