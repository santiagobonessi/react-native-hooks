import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await res.json();
    setUsers(json);
    setLoading(false);
  };

  const incrementNumber = async () => setCount(count + 1)
  

  useEffect( () => {
    fetchUsers();
  },[]);

  return (
    <View style={styles.container}>
      <Text 
      style={styles.textName}
      >
        {loading === true ? 'Loading...' : users[0].name}
      </Text>
      <Text 
      style={styles.textCount}
      onPress={incrementNumber}
      >
        {count} ⬆️
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  textCount: {
    fontSize: 26,
  },
});
