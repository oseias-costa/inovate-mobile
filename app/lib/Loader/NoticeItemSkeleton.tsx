import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { View } from 'react-native';

const NoticeItemSkeleton = () => (
  <View
    style={{
      height: 80,
      borderBottomColor: '#E9E9E9',
      borderBottomWidth: 1,
      marginHorizontal: 20,
    }}>
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <Rect x="15" y="16" rx="5" ry="3" width="88" height="9" />
      <Rect x="0" y="32" rx="5" ry="6" width="250" height="16" />
      <Rect x="0" y="54" rx="5" ry="6" width="134" height="13" />
      <Circle cx="6" cy="20" r="5" />
    </ContentLoader>
  </View>
);

export default NoticeItemSkeleton;
