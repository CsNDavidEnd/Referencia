import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../Firebase';
import firebase from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

const SubjectsScreen = () => {
    //db.collection('subjects').getDoc().then((snapshot) => {
    //    console.log(snapshot);
    //})

    //const docRef = doc(db, "subjects");
    //const docSnap = getDoc(docRef);

    //if (docSnap.exists()) {
    //    console.log("Document data:", docSnap.data());
    //} else {
    //    // docSnap.data() will be undefined in this case
    //    console.log("No such document!");
    //}
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <View>

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

export default SubjectsScreen