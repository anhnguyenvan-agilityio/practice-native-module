import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import { Auth } from 'aws-amplify';
import gql from 'graphql-tag';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

const LIST_POST = gql`
  query listPost($limit: Int) {
    listPost(limit: $limit) {
      posts {
        id
        businessId
        drummerId
        offerId
        createdAt
        title
        description
      }
      nextToken
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost(
    $businessId: String
    $offerId: String
    $title: String
    $description: String
  ) {
    createPost(
      businessId: $businessId
      offerId: $offerId
      title: $title
      description: $description
    ) {
      id
      businessId
      drummerId
      offerId
      createdAt
      title
      description
    }
  }
`;

const TEST_LOCAL = gql`
  {
    testLocal @client
  }
`;

const Home = props => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ borderWidth: 3, borderColor: 'red' }}>
      <ScrollView>
        <Query
          query={LIST_POST}
          variables={{ limit: 100 }}
          notifyOnNetworkStatusChange
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, refetch, networkStatus }) => {
            // if (networkStatus === 4) {
            //   return <Text>REFETCHING.....</Text>;
            // }
            if (loading && !data.listPost) {
              return <Text>LOADING AHIHI</Text>;
            }
            // if (error) {
            //   return <Text>`Error! ${error}`</Text>;
            // }
            console.log(data);
            return (
              <View>
                {data.listPost.posts.map((item, index) => (
                  <View
                    key={index}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      borderWidth: 1,
                      borderColor: 'red',
                    }}
                  >
                    <Text>Id: {item.id}</Text>
                    <Text>Business Id: {item.businessId}</Text>
                    <Text>Drummer Id: {item.drummerId}</Text>
                    <Text>Offer Id: {item.offerId}</Text>
                    <Text>Created At: {item.createdAt}</Text>
                    <Text>Title: {item.title}</Text>
                    <Text>Description: {item.description}</Text>
                  </View>
                ))}
                <Button title="Refetch data" onPress={() => refetch()} />
              </View>
            );
          }}
        </Query>
        <View>
          <Text>ADD NEW POST</Text>
          <Mutation
            mutation={CREATE_POST}
            update={(cache, { data: { createPost } }) => {
              const { listPost } = cache.readQuery({
                query: LIST_POST,
                variables: { limit: 100 },
              });
              console.log('CREATE POST MUTATION');
              console.log('CREATED POST ==>', createPost);
              console.log([...listPost.posts, createPost]);
              cache.writeQuery({
                query: LIST_POST,
                variables: { limit: 100 },
                data: {
                  listPost: {
                    posts: [...listPost.posts, createPost],
                    nextToken: null,
                    __typename: 'PaginatedPost',
                  },
                },
              });
            }}
          >
            {createPost => (
              <Button
                title="Add Post"
                onPress={() => {
                  createPost({
                    variables: {
                      businessId: '2c1c4933-259a-4c2e-9e7c-a3dedc3cd0c2',
                      offerId: '210fc560-64a0-4360-a558-97e6f52d7174',
                      title: '111111',
                      description: '111111',
                    },
                  });
                }}
              />
            )}
          </Mutation>
        </View>
        <ApolloConsumer>
          {client => (
            <Button
              title="test save local"
              onPress={() => {
                console.log('here');
                client.writeData({
                  data: {
                    testLocal: Math.floor(Math.random() * 100),
                  },
                });
              }}
            />
          )}
        </ApolloConsumer>
        <Query query={TEST_LOCAL}>
          {({ data }) => <Text>{data && data.testLocal}</Text>}
        </Query>
        <Button
          title="Go to TestHook"
          onPress={() =>
            props.navigation.navigate('TestHook', {
              itemId: 1,
              name: Math.floor(Math.random() * 100),
            })
          }
        />
      </ScrollView>
    </View>
  );
};

export default Home;
