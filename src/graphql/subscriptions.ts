/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onCreatePhoto(filter: $filter) {
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
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onUpdatePhoto(filter: $filter) {
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
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onDeletePhoto(filter: $filter) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
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
