import React, {useState, useEffect, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increase':{
      return { count : state.count + 9 }
    }
    case 'decrease': {
      return { count : state.count - 9 }
    }
    default: {
      return state;
    } 
  }
};

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [state, dispach] = useReducer(reducer, initialState);
  
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
      <>
      <Text 
      style={styles.textName}
      >
        {loading === true ? 'Loading...' : 'Users: ' + users.map(u => ' ' + u.name)}
      </Text>
      <Text 
      style={styles.textCount}
      onPress={incrementNumber}
      >
        {count} ⬆️1️⃣
      </Text>
      </>
      <View style={styles.viewReducer}>
        <Text 
        style={styles.textCountReducer}
        onPress={() => dispach({type:'increase' })}
        > ⬆️9️⃣</Text>
        <Text style={styles.textCountReducer}>{state.count}</Text>
        <Text 
        style={styles.textCountReducer}
        onPress={() => dispach({type:'decrease'})}
        > ⬇️9️⃣</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textName: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  textCount: {
    fontSize: 40,
  },
  viewReducer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCountReducer: {
    fontSize: 38,
  },
});
