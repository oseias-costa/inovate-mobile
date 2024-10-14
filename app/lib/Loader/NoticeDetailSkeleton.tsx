import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const NoticeDetailSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View style={{ height: 400, bottom: 7, marginHorizontal: 20 }}>
      <ContentLoader
        speed={2}
        width={500}
        height={240}
        viewBox="0 0 500 240"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="35" rx="5" ry="6" width="120" height="13" />
        <Rect x="0" y="65" rx="5" ry="6" width={width - 40} height="25" />
        <Rect x="0" y="120" rx="5" ry="8" width={width - 40} height="120" />
      </ContentLoader>
    </View>
  );
};

export default NoticeDetailSkeleton;
