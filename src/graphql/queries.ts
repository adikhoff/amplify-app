/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      username
      displayname
      email
      bio
      age
      profilePicId
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        displayname
        email
        bio
        age
        profilePicId
        score
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
      id
      username
      filename
      height
      width
      likes {
        items {
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
          __typename
        }
        nextToken
        __typename
      }
      dateIndex
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        filename
        height
        width
        likes {
          nextToken
          __typename
        }
        dateIndex
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      username
      photoId
      createdAt
      updatedAt
      photoLikesId
      __typename
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        photoId
        createdAt
        updatedAt
        photoLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLikesCount = /* GraphQL */ `
  query GetLikesCount($id: ID!) {
    getLikesCount(id: $id) {
      id
      photoId
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLikesCounts = /* GraphQL */ `
  query ListLikesCounts(
    $filter: ModelLikesCountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikesCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        photoId
        count
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const profilesByUsername = /* GraphQL */ `
  query ProfilesByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profilesByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        displayname
        email
        bio
        age
        profilePicId
        score
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const photosByDate = /* GraphQL */ `
  query PhotosByDate(
    $dateIndex: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    photosByDate(
      dateIndex: $dateIndex
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        filename
        height
        width
        likes {
          nextToken
          __typename
        }
        dateIndex
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
