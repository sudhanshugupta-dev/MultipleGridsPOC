import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const GET_TASKS = gql`
  query {
    getTasks {
      id
      title
      completed
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $completed: Boolean) {
    updateTask(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

export default function TaskScreen() {
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleAdd = async () => {
    try{
    if (!taskText.trim()) return;
    await addTask({ variables: { title: taskText.trim() } });
    setTaskText('');
    refetch();
    }
    catch(error){
      console.error("We get some error", error)
    }
  };

  const handleDelete = async (id) => {
    try{
    await deleteTask({ variables: { id } });
    refetch();
    }
    catch(error){
      console.error(error);
    }
  };

  const handleToggleComplete = async (id, current) => {
    try{
    await updateTask({ variables: { id, completed: !current } });
    refetch();
    }
    catch(error){
        console.log(error)
    }
  };

  const handleUpdateTitle = async (id) => {
    try{
    if (!editingText.trim()) return;
    await updateTask({ variables: { id, title: editingText.trim() } });
    setEditingId(null);
    setEditingText('');
    refetch();
    }
    catch(error){
      console.error(error)
    }
  };

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter task title"
          value={taskText}
          onChangeText={setTaskText}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.getTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {editingId === item.id ? (
              <>
                <TextInput
                  value={editingText}
                  onChangeText={setEditingText}
                  style={styles.editInput}
                />
                <TouchableOpacity
                  onPress={() => handleUpdateTitle(item.id)}
                  style={styles.saveButton}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && { textDecorationLine: 'line-through', color: '#888' },
                  ]}
                >
                  {item.title}
                </Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditingId(item.id);
                      setEditingText(item.title);
                    }}
                    style={styles.editButton}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleToggleComplete(item.id, item.completed)}
                    style={styles.toggleButton}
                  >
                    <Text style={styles.buttonText}>
                      {item.completed ? 'Undo' : 'Done'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />
    <Button
      title="Next"
      onPress={() => router.push('/openGraphQl')} // 👈 Correct usage
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputRow: { flexDirection: 'row', marginBottom: 15 },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  taskCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: { fontSize: 16, marginBottom: 10 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 6,
    borderRadius: 6,
  },
  toggleButton: {
    backgroundColor: '#17a2b8',
    padding: 6,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 6,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 6,
    marginTop: 5,
  },
  editInput: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    height:'30%',
    paddingHorizontal: 10,
    height: 35,
    marginBottom: 5,
  },
  buttonText: { color: '#fff' },
  loading: { textAlign: 'center', marginTop: 30 },
  error: { color: 'red', textAlign: 'center', marginTop: 30 },
});





// // App.js

// import React, { useEffect, useState } from 'react';
// import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
// } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const BALL_SIZE = 40;
// const PADDLE_WIDTH = 120;
// const PADDLE_HEIGHT = 20;
// const PADDLE_Y = height - 100;

// function BallGame() {
//   const ballX = useSharedValue(width / 2);
//   const ballY = useSharedValue(height / 2);
//   const velocityX = useSharedValue(4);
//   const velocityY = useSharedValue(5);
//   const paddleX = useSharedValue(width / 2 - PADDLE_WIDTH / 2);

//   const [score, setScore] = useState(0);

//   const updateScore = () => setScore((prev) => prev + 1);

//   // Game loop
//   useEffect(() => {
//     let animationId;

//     const update = () => {
//       ballX.value += velocityX.value;
//       ballY.value += velocityY.value;

//       // Wall collision
//       if (ballX.value <= BALL_SIZE / 2 || ballX.value >= width - BALL_SIZE / 2) {
//         velocityX.value *= -1;
//       }

//       if (ballY.value <= BALL_SIZE / 2) {
//         velocityY.value *= -1;
//       }

//       // Paddle collision
//       if (
//         ballY.value + BALL_SIZE / 2 >= PADDLE_Y &&
//         ballX.value >= paddleX.value &&
//         ballX.value <= paddleX.value + PADDLE_WIDTH
//       ) {
//         velocityY.value *= -1;
//         ballY.value = PADDLE_Y - BALL_SIZE / 2;

//         runOnJS(updateScore)();
//       }

//       // Missed paddle - reset ball
//       if (ballY.value > height) {
//         ballX.value = width / 2;
//         ballY.value = height / 2;
//         velocityX.value = 4;
//         velocityY.value = 5;
//         runOnJS(setScore)(0);
//       }

//       animationId = requestAnimationFrame(update);
//     };

//     animationId = requestAnimationFrame(update);

//     return () => cancelAnimationFrame(animationId);
//   }, []);

//   // Paddle gesture
//   const gesture = Gesture.Pan()
//     .onUpdate((e) => {
//       paddleX.value = Math.max(0, Math.min(width - PADDLE_WIDTH, e.absoluteX - PADDLE_WIDTH / 2));
//     });

//   const paddleStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: paddleX.value }],
//   }));

//   const ballStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: ballX.value - BALL_SIZE / 2 },
//       { translateY: ballY.value - BALL_SIZE / 2 },
//     ],
//   }));

//   return (
//     <GestureDetector gesture={gesture}>
//       <View style={styles.container}>
//         <Text style={styles.score}>Score: {score}</Text>
//         <Animated.View style={[styles.ball, ballStyle]} />
//         <Animated.View style={[styles.paddle, paddleStyle]} />
//       </View>
//     </GestureDetector>
//   );
// }

// export default function Ponggame() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BallGame />
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1e1e1e',
//   },
//   score: {
//     fontSize: 24,
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 40,
//   },
//   ball: {
//     position: 'absolute',
//     width: BALL_SIZE,
//     height: BALL_SIZE,
//     borderRadius: BALL_SIZE / 2,
//     backgroundColor: '#00f0ff',
//   },
//   paddle: {
//     position: 'absolute',
//     bottom: 100,
//     width: PADDLE_WIDTH,
//     height: PADDLE_HEIGHT,
//     backgroundColor: '#ff4081',
//     borderRadius: 10,
//   },
// });
