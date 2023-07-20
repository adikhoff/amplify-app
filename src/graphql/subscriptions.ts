/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
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
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onCreatePhoto(filter: $filter) {
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
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onUpdatePhoto(filter: $filter) {
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
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onDeletePhoto(filter: $filter) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
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
export const onCreateLikesCount = /* GraphQL */ `
  subscription OnCreateLikesCount(
    $filter: ModelSubscriptionLikesCountFilterInput
  ) {
    onCreateLikesCount(filter: $filter) {
      id
      photoId
      countIndex
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLikesCount = /* GraphQL */ `
  subscription OnUpdateLikesCount(
    $filter: ModelSubscriptionLikesCountFilterInput
  ) {
    onUpdateLikesCount(filter: $filter) {
      id
      photoId
      countIndex
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLikesCount = /* GraphQL */ `
  subscription OnDeleteLikesCount(
    $filter: ModelSubscriptionLikesCountFilterInput
  ) {
    onDeleteLikesCount(filter: $filter) {
      id
      photoId
      countIndex
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
