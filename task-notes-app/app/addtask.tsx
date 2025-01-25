// app/addtask.tsx
import React, { useState } from 'react';
import { 
 View, 
 Text, 
 StyleSheet, 
 TextInput, 
 TouchableOpacity, 
 Platform,
 SafeAreaView,
 TouchableWithoutFeedback,
 Keyboard
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTaskContext } from '../contexts/TaskContext';

export default function AddTaskScreen() {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [status, setStatus] = useState<'Not Started' | 'In Progress' | 'Done'>('Not Started');
 const router = useRouter();
 const { addTask } = useTaskContext();

 const handleSaveTask = () => {
   if (!title.trim()) {
     alert('Please enter a task title');
     return;
   }
   
   addTask({ title, description, status });
   router.back();
 };

 return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <SafeAreaView style={styles.container}>
       <View style={styles.innerContainer}>
         <TouchableOpacity 
           style={styles.backButton} 
           onPress={() => router.back()}
         >
           <Feather name="arrow-left" size={24} color="#E6F3E6" />
         </TouchableOpacity>
         
         <Text style={styles.title}>Add a New Task</Text>
         
         <View style={styles.formContainer}>
           <Text style={styles.inputLabel}>Task Title</Text>
           <TextInput 
             style={styles.input} 
             placeholder="Enter task title"
             placeholderTextColor="#4A5F4A"
             value={title}
             onChangeText={setTitle}
           />
           
           <Text style={styles.inputLabel}>Task Description</Text>
           <TextInput
             style={[styles.input, styles.multilineInput]}
             placeholder="Enter task description"
             placeholderTextColor="#4A5F4A"
             multiline
             value={description}
             onChangeText={setDescription}
           />

           <Text style={styles.inputLabel}>Status</Text>
           <Picker
             selectedValue={status}
             onValueChange={(itemValue) => setStatus(itemValue)}
             style={styles.picker}
           >
             <Picker.Item label="Not Started" value="Not Started" color="#E6F3E6" />
             <Picker.Item label="In Progress" value="In Progress" color="#E6F3E6" />
             <Picker.Item label="Done" value="Done" color="#E6F3E6" />
           </Picker>
         </View>

         <View style={styles.buttonContainer}>
           <TouchableOpacity 
             style={styles.saveButton} 
             onPress={handleSaveTask}
           >
             <Text style={styles.saveButtonText}>Save Task</Text>
             <Feather name="check" size={24} color="#E6F3E6" />
           </TouchableOpacity>
         </View>
       </View>
     </SafeAreaView>
   </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#0A1A0A',
 },
 innerContainer: {
   flex: 1,
   padding: 20,
 },
 backButton: {
   marginBottom: 20,
   width: 40,
   height: 40,
   justifyContent: 'center',
 },
 title: {
   fontSize: 28,
   fontWeight: '700',
   marginBottom: 30,
   color: '#E6F3E6',
 },
 formContainer: {
   flex: 1,
 },
 inputLabel: {
   color: '#E6F3E6',
   fontSize: 16,
   marginBottom: 8,
   fontWeight: '600',
 },
 input: {
   borderWidth: 1,
   borderColor: '#2A3C2A',
   borderRadius: 10,
   padding: 15,
   marginBottom: 20,
   backgroundColor: '#112211',
   color: '#E6F3E6',
 },
 multilineInput: {
   height: 120,
   textAlignVertical: 'top',
 },
 picker: {
   color: '#E6F3E6',
   marginTop: -84,
   backgroundColor: 'transparent',
 },
 buttonContainer: {
   paddingVertical: 20,
 },
 saveButton: {
   backgroundColor: '#1A2C1A',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   padding: 15,
   borderRadius: 10,
   borderWidth: 1,
   borderColor: '#2A3C2A',
 },
 saveButtonText: {
   color: '#E6F3E6',
   fontSize: 18,
   fontWeight: '600',
   marginRight: 10,
 },
});