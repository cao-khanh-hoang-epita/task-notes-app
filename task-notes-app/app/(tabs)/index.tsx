// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTaskContext, Task } from '../../contexts/TaskContext';

export default function HomeScreen() {
 const { tasks, updateTaskStatus, deleteTask } = useTaskContext();
 const screenWidth = Dimensions.get('window').width;
 const columnWidth = screenWidth * 0.8;

 const getStatusStyle = (status: Task['status']) => {
   switch (status) {
     case 'Not Started':
       return styles.notStartedBadge;
     case 'In Progress':
       return styles.inProgressBadge;
     case 'Done':
       return styles.doneBadge;
   }
 };

 const moveBack = (taskId: string, currentStatus: Task['status']) => {
   const statusBack: Record<Task['status'], Task['status']> = {
     'In Progress': 'Not Started',
     'Done': 'In Progress',
     'Not Started': 'Not Started'
   };
   updateTaskStatus(taskId, statusBack[currentStatus]);
 };

 const renderTaskCard = ({ item }: { item: Task }) => (
   <View style={styles.taskCard}>
     <View style={styles.taskHeader}>
       <Text style={styles.taskTitle}>{item.title}</Text>
       <View style={styles.actionButtons}>
         {item.status !== 'Not Started' && (
           <TouchableOpacity 
             style={[styles.moveBackButton]}
             onPress={() => moveBack(item.id, item.status)}
           >
             <Feather name="arrow-left" size={16} color="#E6F3E6" />
           </TouchableOpacity>
         )}
         <TouchableOpacity 
           style={[styles.statusBadge, getStatusStyle(item.status)]}
           onPress={() => cycleTaskStatus(item.id, item.status)}
         >
           <Feather name="arrow-right" size={16} color="#E6F3E6" />
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.deleteButton}
           onPress={() => deleteTask(item.id)}
         >
           <Feather name="trash-2" size={16} color="#E6F3E6" />
         </TouchableOpacity>
       </View>
     </View>
     <Text style={styles.taskDescription}>{item.description}</Text>
   </View>
 );

 const cycleTaskStatus = (taskId: string, currentStatus: Task['status']) => {
   const statusCycle: Record<Task['status'], Task['status']> = {
     'Not Started': 'In Progress',
     'In Progress': 'Done',
     'Done': 'Not Started'
   };
   updateTaskStatus(taskId, statusCycle[currentStatus]);
 };

 const renderColumn = (status: Task['status']) => {
   const columnTasks = tasks.filter(task => task.status === status);
   return (
     <View style={[styles.column, { width: columnWidth }]}>
       <Text style={styles.columnTitle}>{status}</Text>
       <FlatList
         data={columnTasks}
         renderItem={renderTaskCard}
         keyExtractor={item => item.id}
         scrollEnabled={true}
         showsVerticalScrollIndicator={false}
       />
     </View>
   );
 };

 return (
   <View style={styles.container}>
     <View style={styles.header}>
       <View style={styles.headerLeft}>
         <Text style={styles.headerEmoji}>📝</Text>
         <Text style={styles.headerTitle}>Task Notes</Text>
       </View>
       <Link href="/addtask" asChild>
         <TouchableOpacity style={styles.addButton}>
           <Feather name="plus" size={24} color="#E6F3E6" />
         </TouchableOpacity>
       </Link>
     </View>
     
     <ScrollView 
       horizontal 
       style={styles.boardContainer}
       showsHorizontalScrollIndicator={false}
       snapToInterval={columnWidth}
       decelerationRate="fast"
       contentContainerStyle={styles.boardContentContainer}
     >
       {renderColumn('Not Started')}
       {renderColumn('In Progress')}
       {renderColumn('Done')}
     </ScrollView>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#0A1A0A',
 },
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingHorizontal: 20,
   paddingTop: 60,
   paddingBottom: 20,
   backgroundColor: '#112211',
 },
 headerLeft: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
 },
 headerEmoji: {
   fontSize: 24,
 },
 headerTitle: {
   fontSize: 24,
   fontWeight: '700',
   color: '#E6F3E6',
 },
 addButton: {
   backgroundColor: '#1A2C1A',
   width: 50,
   height: 50,
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   borderWidth: 1,
   borderColor: '#2A3C2A',
 },
 boardContainer: {
   flex: 1,
 },
 boardContentContainer: {
   paddingHorizontal: 20,
   paddingVertical: 20,
   gap: 20,
 },
 column: {
   backgroundColor: '#112211',
   borderRadius: 12,
   padding: 15,
   height: '100%',
 },
 columnTitle: {
   fontSize: 18,
   fontWeight: '600',
   marginBottom: 15,
   color: '#E6F3E6',
   textAlign: 'center',
 },
 taskCard: {
   backgroundColor: '#1A2C1A',
   borderRadius: 10,
   padding: 15,
   marginBottom: 15,
   borderWidth: 1,
   borderColor: '#2A3C2A',
 },
 taskHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 10,
 },
 taskTitle: {
   fontSize: 16,
   fontWeight: '600',
   flex: 1,
   marginRight: 10,
   color: '#E6F3E6',
 },
 taskDescription: {
   fontSize: 14,
   color: '#A0B0A0',
 },
 actionButtons: {
   flexDirection: 'row',
   gap: 10,
 },
 moveBackButton: {
   backgroundColor: '#152A15',
   borderColor: '#254A25',
   paddingHorizontal: 10,
   paddingVertical: 5,
   borderRadius: 15,
   borderWidth: 1,
 },
 statusBadge: {
   paddingHorizontal: 10,
   paddingVertical: 5,
   borderRadius: 15,
   borderWidth: 1,
 },
 deleteButton: {
   backgroundColor: '#2A1515',
   borderColor: '#4A2525',
   paddingHorizontal: 10,
   paddingVertical: 5,
   borderRadius: 15,
   borderWidth: 1,
 },
 notStartedBadge: {
   backgroundColor: '#2A1515',
   borderColor: '#4A2525',
 },
 inProgressBadge: {
   backgroundColor: '#152A15',
   borderColor: '#254A25',
 },
 doneBadge: {
   backgroundColor: '#15152A',
   borderColor: '#25254A',
 },
});