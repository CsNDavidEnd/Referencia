import { Text, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DocumentSnapshot, doc, documentId, getDoc, query, collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { db, auth } from '../Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Quiz from './TakingQuizScreen'


const _proba_quizzes = ({navigation}) => {

    const handleQuizPress = () => {
      /*navigation.reset({
        index: 0,
        routes: [{ name: 'TakingQuizScreen' }],
      });*/
      navigation.navigate('TakingQuizScreen');
    };

    const [quizzes, setQuizzes] = useState([]);
    async function list() {
        const q = query(collection(db, "quizzes"));
    
        const querySnapshot = await getDocs(q);
        return querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());

            const quizList = [];
            const quiz = doc.data();
            quizList.push({
                id: doc.id,
                name: quiz.name,
                category: quiz.category,
            });
            setQuizzes(quizList);

        });
    
    }
    
    /*
  useEffect(() => {
    const unsubscribe = db.collection('quizzes')
      .onSnapshot((snapshot) => {
        const quizList = [];

        snapshot.forEach((doc) => {
          const quiz = doc.data();
          quizList.push({
            id: doc.id,
            name: quiz.name,
            category: quiz.category,
          });
        });

        setQuizzes(quizList);
      });

    return () => unsubscribe();
  }, []);
    
        db.collection('quizzes')
        .get()
        .then(querySnapshot => {
          console.log('Total quizzes: ', querySnapshot.size);
      
          querySnapshot.forEach(documentSnapshot => {
            console.log('Quiz id: ', documentSnapshot.id, documentSnapshot.data());
          });
        });
      */
      
      
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View>
                <Text onPress={list}> List quizzes </Text>
                <Text>      </Text>
                {quizzes.map((quiz) => (
                    <TouchableOpacity key={quiz.id}>
                        <Text>Quiz id: {quiz.id} </Text>
                        <Text onPress={() => handleQuizPress(quiz)}>Quiz name: {quiz.name}</Text>
                        <Text>Quiz category: {quiz.category}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5'
    }
})


export default _proba_quizzes;
