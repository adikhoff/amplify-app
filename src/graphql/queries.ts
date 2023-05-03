/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        bio
        age
        profilePic {
          id
          user
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
      nextToken
    }
  }
`;
export const getPhoto = /* GraphQL */ `
  query GetPhoto($id: ID!) {
    getPhoto(id: $id) {
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
          filename
          height
          width
          createdAt
          updatedAt
          profilePhotosId
        }
        createdAt
        updatedAt
        photoLikesId
      }
      nextToken
    }
  }
`;
export const profilesByName = /* GraphQL */ `
  query ProfilesByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profilesByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        bio
        age
        profilePic {
          id
          user
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
      nextToken
    }
  }
`;
