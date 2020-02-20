import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {getInstructions} from '../api';
import {addData} from '../actions';

import ListItem from '../components/ListItem';

export default function Home(props) {
  const dispatch = useDispatch();

  // 1 - declare variables
  const [isFetching, setIsFetching] = useState(false);

  // access redux store state
  const dataReducer = useSelector(state => state.dataReducer);
  const {data} = dataReducer;
  //==================

  // 2 - main code begins here
  useEffect(() => getData(), []);

  //======

  //3 - get flatlist data
  const getData = () => {
    setIsFetching(true);

    getInstructions()
      .then(res => res.data)
      .then(datas => dispatch(addData(datas)))
      .catch(error => alert(error.message))
      .finally(() => setIsFetching(false));
  };

  //4 - render flatlist item
  const renderItem = ({item, index}) => {
    return <ListItem item={item} index={index} />;
  };

  //5 - render
  if (isFetching) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `flat_${index}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
