import React from 'react';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const RequestDetailSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View style={{ height: 280, bottom: 7 }}>
      <ContentLoader
        speed={2}
        width={400}
        height={240}
        viewBox="0 0 400 240"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Circle cx="6" cy="20" r="5" />
        <Rect x="15" y="16" rx="5" ry="3" width="88" height="9" />
        <Rect x="0" y="35" rx="5" ry="6" width="250" height="18" />
        <Rect x="0" y="60" rx="5" ry="6" width="134" height="13" />
        <Rect x="0" y="90" rx="5" ry="6" width="220" height="11" />
        <Rect x="0" y="120" rx="5" ry="8" width={width - 40} height="100" />
      </ContentLoader>
    </View>
  );
};

export default RequestDetailSkeleton;
