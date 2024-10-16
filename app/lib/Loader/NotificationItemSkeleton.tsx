import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { View } from 'react-native';

const NotificationItemSkeleton = () => {
  return (
    <View
      style={{
        height: 70,
        bottom: 7,
        borderBottomColor: '#E9E9E9',
        borderBottomWidth: 1,
        paddingBottom: 10,
      }}>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Circle x="32" y="20" cx="6" cy="20" r="13" />
        <Rect x="65" y="24" rx="5" ry="3" width="140" height="9" />
        <Rect x="65" y="40" rx="5" ry="6" width="240" height="11" />
      </ContentLoader>
    </View>
  );
};

export default NotificationItemSkeleton;
