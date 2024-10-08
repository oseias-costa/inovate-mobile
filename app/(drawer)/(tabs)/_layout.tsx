import Badge from '@ant-design/react-native/lib/badge';
import { Ionicons, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useFilter } from '~/app/components/FilterProvider';
import SelectStatus from '~/app/components/SelectStatus';
import Logo from '~/assets/svg/Logo';

export default function Layout() {
  const { reportFilter, setReportFilter } = useFilter();

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="dashboard/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Início',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitle: () => <Logo />,
            headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
            headerRight: () => (
              <TouchableOpacity>
                <Badge
                  text={9}
                  style={{ marginRight: 25 }}
                  styles={{
                    dot: { backgroundColor: '#000' },
                  }}>
                  <MaterialCommunityIcons name="bell" size={24} color="#fff" style={{ left: 5 }} />
                </Badge>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <MaterialIcons name="dashboard" color="#00264B" size={size} />;
              }
              return <MaterialIcons name="dashboard" color={color} size={size} />;
            },
            tabBarActiveTintColor: '#00264B',
          }}
        />
        <Tabs.Screen
          name="requests/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Solicitações',
            headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate('/requests/newSolicitation')}>
                <Text
                  style={{
                    marginRight: 20,
                    color: '#fff',
                  }}>
                  Nova
                </Text>
              </TouchableOpacity>
            ),
            headerLeftLabelVisible: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
            headerShadowVisible: false,
            tabBarActiveTintColor: '#00264B',
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <MaterialCommunityIcons name="folder-plus" size={size} color="#00264B" />;
              }
              return <MaterialCommunityIcons name="folder-plus" size={size} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="notice/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Avisos',
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  color="#fff"
                  size={22}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => router.navigate('/screens/notice/Create')}>
                <Text
                  style={{
                    marginRight: 20,
                    color: '#fff',
                  }}>
                  Nova
                </Text>
              </TouchableOpacity>
            ),
            tabBarActiveTintColor: '#00264B',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Foundation name="megaphone" size={size} color="#00264B" />
              ) : (
                <Foundation name="megaphone" size={size} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="reports/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
              height: 120,
            },
            title: 'Relatórios',
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            header: () => (
              <View style={{ backgroundColor: '#00264B', height: 150, paddingTop: 50 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <DrawerToggleButton tintColor="#fff" />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: ' Lato_700Bold',
                      fontSize: 22,
                    }}>
                    Relatórios
                  </Text>
                  <DrawerToggleButton tintColor="#fff" />
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="normal"
                  contentContainerStyle={{
                    marginHorizontal: 15,
                    marginTop: 20,
                    flexDirection: 'row',
                    paddingRight: 20,
                  }}>
                  <SelectStatus item="" setStatus={setReportFilter} status={reportFilter} />
                  <SelectStatus item="PENDING" setStatus={setReportFilter} status={reportFilter} />
                  <SelectStatus item="EXPIRED" setStatus={setReportFilter} status={reportFilter} />
                  <SelectStatus item="FINISH" setStatus={setReportFilter} status={reportFilter} />
                </ScrollView>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  color="#fff"
                  size={22}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            ),
            tabBarActiveTintColor: '#00264B',
            tabBarIcon: ({ focused, color, size }) =>
              focused ? (
                <Ionicons name="documents" size={size} color="#00264B" />
              ) : (
                <Ionicons name="documents" size={size} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="notifications/index"
          options={{
            title: 'Notificações',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#00264B',
            },
            tabBarActiveTintColor: '#00264B',
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <MaterialCommunityIcons name="bell" color="#00264B" size={size} />;
              }
              return <MaterialCommunityIcons name="bell" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="account/index"
          options={{
            headerStyle: {
              backgroundColor: '#00264B',
            },
            title: 'Conta',
            headerTintColor: '#fff',
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  color="#fff"
                  size={22}
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            ),
            tabBarActiveTintColor: '#00264B',
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <FontAwesome name="user" color="#00264B" size={size} />;
              }
              return <FontAwesome name="user" color={color} size={size} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
