import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View } from 'react-native';

const NumbersSkeleton = () => {
  return (
    <View
      style={{
        height: 70,
      }}>
      <ContentLoader
        speed={2}
        width={600}
        height={100}
        viewBox="0 0 590 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="6" rx="5" ry="3" width="60" height="10" />
        <Rect x="0" y="25" rx="5" ry="3" width="60" height="40" />
        <Rect x="120" y="6" rx="5" ry="3" width="60" height="10" />
        <Rect x="120" y="25" rx="5" ry="6" width="60" height="40" />
        <Rect x="240" y="6" rx="5" ry="3" width="60" height="10" />
        <Rect x="240" y="25" rx="5" ry="6" width="60" height="40" />
      </ContentLoader>
    </View>
  );
};

export default NumbersSkeleton;
