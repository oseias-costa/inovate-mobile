import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const NoticeItemSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View
      style={{
        height: 80,
        marginHorizontal: 20,
      }}>
      <ContentLoader
        speed={4}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="5" ry="8" width={width - 40} height="70" />
      </ContentLoader>
    </View>
  );
};

export default NoticeItemSkeleton;
