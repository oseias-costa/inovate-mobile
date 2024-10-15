import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';

const ReporItemSkeleton = () => {
  const width = Dimensions.get('screen').width;
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
        <Circle x="32" y="22" cx="6" cy="20" r="20" />
        <Rect x="74" y="20" rx="5" ry="3" width="280" height="16" />
        <Rect x="74" y="44" rx="5" ry="6" width="100" height="11" />
      </ContentLoader>
    </View>
  );
};

export default ReporItemSkeleton;
