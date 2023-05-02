/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
      id
      name
      email
      bio
      age
      profilePic {
        id
        user
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
      }
      score
      photos {
        items {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        nextToken
      }
      createdAt
      updatedAt
      profileProfilePicId
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
      id
      name
      email
      bio
      age
      profilePic {
        id
        user
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
      }
      score
      photos {
        items {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        nextToken
      }
      createdAt
      updatedAt
      profileProfilePicId
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
      id
      name
      email
      bio
      age
      profilePic {
        id
        user
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
      }
      score
      photos {
        items {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        nextToken
      }
      createdAt
      updatedAt
      profileProfilePicId
    }
  }
`;
export const onCreatePhoto = /* GraphQL */ `
  subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onCreatePhoto(filter: $filter) {
      id
      user
      profile {
        id
        name
        email
        bio
        age
        profilePic {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        score
        photos {
          nextToken
        }
        createdAt
        updatedAt
        profileProfilePicId
      }
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
      profilePhotosId
    }
  }
`;
export const onUpdatePhoto = /* GraphQL */ `
  subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onUpdatePhoto(filter: $filter) {
      id
      user
      profile {
        id
        name
        email
        bio
        age
        profilePic {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        score
        photos {
          nextToken
        }
        createdAt
        updatedAt
        profileProfilePicId
      }
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
      profilePhotosId
    }
  }
`;
export const onDeletePhoto = /* GraphQL */ `
  subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
    onDeletePhoto(filter: $filter) {
      id
      user
      profile {
        id
        name
        email
        bio
        age
        profilePic {
          id
          user
          image
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        score
        photos {
          nextToken
        }
        createdAt
        updatedAt
        profileProfilePicId
      }
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
      profilePhotosId
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
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
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
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
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
        profile {
          id
          name
          email
          bio
          age
          score
          createdAt
          updatedAt
          profileProfilePicId
        }
        image
        filename
        height
        width
        likes {
          nextToken
        }
        createdAt
        updatedAt
        profilePhotosId
      }
      createdAt
      updatedAt
      photoLikesId
    }
  }
`;
