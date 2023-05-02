/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
      id
      user
      image
      filename
      height
      width
      likes {
        items {
          id
          user
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
        nextToken
      }
      createdAt
      updatedAt
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
      user
      image
      filename
      height
      width
      likes {
        items {
          id
          user
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
        nextToken
      }
      createdAt
      updatedAt
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
      user
      image
      filename
      height
      width
      likes {
        items {
          id
          user
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
        nextToken
      }
      createdAt
      updatedAt
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
      user
      photoId
      photo {
        id
        user
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      photoLikesId
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
      user
      photoId
      photo {
        id
        user
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      photoLikesId
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
      user
      photoId
      photo {
        id
        user
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      photoLikesId
    }
  }
`;
