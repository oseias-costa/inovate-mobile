import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const ReporItemSkeleton = () => {
  const width = Dimensions.get('screen').width;
  return (
    <View style={{ height: 200, bottom: 7 }}>
      <ContentLoader
        speed={2}
        width={400}
        height={240}
        viewBox="0 0 400 240"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="120" rx="5" ry="8" width={width - 40} height="100" />
      </ContentLoader>
    </View>
  );
};

export default ReporItemSkeleton;
