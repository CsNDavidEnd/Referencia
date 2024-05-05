import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";

//const [leaderboardData, setLeaderboardData] = useState([]);

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  //const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    firebase.database().ref('leaderboard')
      .orderByScore('score')
      .limitToLast(10)
      .on('value', (snapshot) => {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          data.push({
            id: childSnapshot.key,
            name: user.name,
            score: user.score,
          });
        });
        setLeaderboardData(data.reverse());
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.itemRank}>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemScore}>{item.score}</Text>
      </View>
      <View style={styles.itemIcon}>
        <Icon name="trophy" size={24} color="#FFD700" />
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default LeaderBoard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  itemRank: {
    flex: 1,
    alignItems: 'center',
  },
  itemDetails: {
    flex: 4,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemScore: {
    color: 'gray',
  },
  itemIcon: {
    flex: 1,
  }
});
