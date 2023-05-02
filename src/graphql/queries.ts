/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
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
export const listPhotos = /* GraphQL */ `
  query ListPhotos(
    $filter: ModelPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        photoLikesId
      }
      nextToken
    }
  }
`;
