import React, {useState, useEffect, useReducer, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';

// useReducer 
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

// useMemo
const population = [
  {name: 'James', age: 28}, 
  {name: 'Maria', age: 64},
  {name: 'Amy', age: 35}, 
  {name: 'Sam', age: 42},
  {name: 'Tommas', age: 38},
  {name: 'Michael', age: 67},
  {name: 'Jhon', age: 40}
];

export default function App() {
  // useState example
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // useReducer example
  const [state, dispach] = useReducer(reducer, initialState);
  // useMemo example
  const totalAge = useMemo(() => {
    console.log('Calculating total...');
    let age = 0;
    population.forEach( x => {
      age += x.age;
    });

    return age;
  }, [population]);
  const averageAge = useMemo(() => {
    console.log('Calculating average...');
    let countPopul = population.length; 
    return (totalAge/countPopul).toFixed();
  }, [population]);

  const incrementNumber = async () => setCount(count + 1)
  // useEffect example
  useEffect( () => {
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await res.json();
    setUsers(json);
    setLoading(false);
  };
  
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
      <View>
        <Text style={styles.textMemo}>Population {population.map(x => ` Name: ${x.name} age: ${x.age}`)}</Text>
        <Text style={styles.textMemo}>Total Age: {totalAge}</Text>
        <Text style={styles.textMemo}>Average Age: {averageAge}</Text>
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
  },
  textCountReducer: {
    fontSize: 38,
  },
  textMemo: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  }
});
