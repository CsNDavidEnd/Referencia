import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DocumentSnapshot, doc, documentId, getDoc, query, collection, getDocs } from 'firebase/firestore';
import firestore from 'firebase/compat/firestore';
import { db, auth } from '../Firebase';
import TakingQuizScreen from './TakingQuizScreen';

const quizzes = [
  { id: 1, category: 'Matematika', title: 'Algebra' },
  { id: 2, category: 'Magyar nyelv és irodalom', title: 'József Attila' },
  { id: 3, category: 'Matematika', title: 'Geometria' },
  { id: 4, category: 'Történelem', title: 'II. világháború' },
  { id: 5, category: 'Biológia', title: 'Emlősök' },
  { id: 6, category: 'Történelem', title: 'I. világháború' },
];

async function list1() {
  const q = query(collection(db, "quizzes"));

  const querySnapshot = await getDocs(q);
  const listing = querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      
  });
  return listing;
}

function list2() {
  db.collection('quizzes').get().then(snapshot => {
    snapshot.docs.forEach();
  })

  firestore()
  .collection('quizzes')
  .get()
  .then(querySnapshot => {
    console.log('Total quizzes: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('Quiz id: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
}


const QuizzesScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }} onPress={handleQuizPress}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleQuizPress = () => {
    /*navigation.reset({
      index: 0,
      routes: [{ name: TakingQuizScreen }],
    });
    */
    navigation.navigate('TakingQuizScreen');
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      style={{
        backgroundColor: selectedCategory === item ? '#0000FF' : '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        margin: 5,
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  //const categories = Array.from(new Set(quizzes.map((quiz) => quiz.category)));
  const categories = ['Összes', ...Array.from(new Set(quizzes.map((quiz) => quiz.category)))];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    <View style={{ flex: 1}}>
      <FlatList 
        
        data={quizzes.filter(
          (quiz) => selectedCategory === '' || selectedCategory === 'Összes' || quiz.category === selectedCategory
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        }
      />
    </View>
    </KeyboardAvoidingView>
  );
};

export default QuizzesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#818181',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#66CC66',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#66CC66',
    fontWeight: '700',
    fontSize: 16,
  },
})
