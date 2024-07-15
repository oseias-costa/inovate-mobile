import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from '~/app/lib/date';
import { AntDesign } from '@expo/vector-icons';

type StatusProps = {
  expiration: string;
  status: string;
  type: string;
};

export const Status = ({ expiration, status, type }: StatusProps) => {
  const expirationDate = formatDate(new Date(expiration));
  const statusData: {
    [key: string]: {
      icon: React.ReactNode;
      title: string;
      description: string;
      color: {
        background: string;
        color: string;
      };
    };
  } = {
    EXPIRED: {
      icon: <AntDesign name="exclamationcircle" size={24} color="#DE4F51" />,
      title: `${type} vencida!`,
      description: `A ${type} venceu dia ${expirationDate}`,
      color: {
        color: '#DE4F51',
        background: '#FFF4E6',
      },
    },
    PEDING: {
      icon: <AntDesign name="exclamationcircle" size={24} color="#F4782E" />,
      title: `${type} pendente!`,
      description: `Atenção a ${type} irá vencer dia ${expirationDate}`,
      color: {
        color: '#F4782E',
        background: '#FFF4E6',
      },
    },
    FINISH: {
      icon: <AntDesign name="checkcircle" size={24} color="#00264B" />,
      title: `${type} concluída!`,
      description: `A ${type} foi concluída`,
      color: {
        color: '#00264B',
        background: '#E4F6FD',
      },
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: statusData[status]?.color.background }]}>
      {statusData[status]?.icon}
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: statusData[status]?.color.color }]}>
          {statusData[status]?.title}
        </Text>
        <Text style={styles.description}>{statusData[status]?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  textBox: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato_400Regular',
    position: 'relative',
    bottom: 5
  },
  description: {
    color: '#363636',
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
});
