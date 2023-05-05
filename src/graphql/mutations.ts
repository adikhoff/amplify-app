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
      profilePic {
        id
        user
        profile {
          id
          username
          displayname
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
      profilePic {
        id
        user
        profile {
          id
          username
          displayname
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
      profilePic {
        id
        user
        profile {
          id
          username
          displayname
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
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto(
    $input: CreatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    createPhoto(input: $input, condition: $condition) {
      id
      user
      profile {
        id
        username
        displayname
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
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto(
    $input: UpdatePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    updatePhoto(input: $input, condition: $condition) {
      id
      user
      profile {
        id
        username
        displayname
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
export const deletePhoto = /* GraphQL */ `
  mutation DeletePhoto(
    $input: DeletePhotoInput!
    $condition: ModelPhotoConditionInput
  ) {
    deletePhoto(input: $input, condition: $condition) {
      id
      user
      profile {
        id
        username
        displayname
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
        profile {
          id
          username
          displayname
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
        profile {
          id
          username
          displayname
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
        profile {
          id
          username
          displayname
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
