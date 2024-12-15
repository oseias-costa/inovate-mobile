import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const NoticeItemSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View
      style={{
        height: 65,
        marginHorizontal: 20,
      }}>
      <ContentLoader
        speed={4}
        width={400}
        height={80}
        viewBox="0 0 400 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="10" ry="8" width={width - 40} height="55" />
      </ContentLoader>
    </View>
  );
};

export default NoticeItemSkeleton;
