/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
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
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
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
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
export const createLikesCount = /* GraphQL */ `
  mutation CreateLikesCount(
    $input: CreateLikesCountInput!
    $condition: ModelLikesCountConditionInput
  ) {
    createLikesCount(input: $input, condition: $condition) {
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
export const updateLikesCount = /* GraphQL */ `
  mutation UpdateLikesCount(
    $input: UpdateLikesCountInput!
    $condition: ModelLikesCountConditionInput
  ) {
    updateLikesCount(input: $input, condition: $condition) {
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
export const deleteLikesCount = /* GraphQL */ `
  mutation DeleteLikesCount(
    $input: DeleteLikesCountInput!
    $condition: ModelLikesCountConditionInput
  ) {
    deleteLikesCount(input: $input, condition: $condition) {
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
