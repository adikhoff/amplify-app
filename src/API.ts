/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProfileInput = {
  id?: string | null,
  username: string,
  displayname: string,
  email: string,
  bio?: string | null,
  age?: string | null,
  profilePicId?: string | null,
  score?: number | null,
};

export type ModelProfileConditionInput = {
  username?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  age?: ModelStringInput | null,
  profilePicId?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelProfileConditionInput | null > | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  not?: ModelProfileConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Profile = {
  __typename: "Profile",
  id: string,
  username: string,
  displayname: string,
  email: string,
  bio?: string | null,
  age?: string | null,
  profilePicId?: string | null,
  score?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateProfileInput = {
  id: string,
  username?: string | null,
  displayname?: string | null,
  email?: string | null,
  bio?: string | null,
  age?: string | null,
  profilePicId?: string | null,
  score?: number | null,
};

export type DeleteProfileInput = {
  id: string,
};

export type CreatePhotoInput = {
  id?: string | null,
  username: string,
  filename: string,
  height?: number | null,
  width?: number | null,
  dateIndex: string,
  createdAt?: string | null,
};

export type ModelPhotoConditionInput = {
  username?: ModelStringInput | null,
  filename?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  dateIndex?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPhotoConditionInput | null > | null,
  or?: Array< ModelPhotoConditionInput | null > | null,
  not?: ModelPhotoConditionInput | null,
};

export type Photo = {
  __typename: "Photo",
  id: string,
  username: string,
  filename: string,
  height?: number | null,
  width?: number | null,
  likes?: ModelLikeConnection | null,
  dateIndex: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelLikeConnection = {
  __typename: "ModelLikeConnection",
  items:  Array<Like | null >,
  nextToken?: string | null,
};

export type Like = {
  __typename: "Like",
  id: string,
  username: string,
  photoId: string,
  createdAt: string,
  updatedAt: string,
  photoLikesId: string,
};

export type UpdatePhotoInput = {
  id: string,
  username?: string | null,
  filename?: string | null,
  height?: number | null,
  width?: number | null,
  dateIndex?: string | null,
  createdAt?: string | null,
};

export type DeletePhotoInput = {
  id: string,
};

export type CreateLikeInput = {
  id?: string | null,
  username: string,
  photoId: string,
  photoLikesId: string,
};

export type ModelLikeConditionInput = {
  username?: ModelStringInput | null,
  photoId?: ModelStringInput | null,
  and?: Array< ModelLikeConditionInput | null > | null,
  or?: Array< ModelLikeConditionInput | null > | null,
  not?: ModelLikeConditionInput | null,
  photoLikesId?: ModelIDInput | null,
};

export type UpdateLikeInput = {
  id: string,
  username?: string | null,
  photoId?: string | null,
  photoLikesId?: string | null,
};

export type DeleteLikeInput = {
  id: string,
};

export type ModelProfileFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  age?: ModelStringInput | null,
  profilePicId?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  not?: ModelProfileFilterInput | null,
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection",
  items:  Array<Profile | null >,
  nextToken?: string | null,
};

export type ModelPhotoFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  filename?: ModelStringInput | null,
  height?: ModelIntInput | null,
  width?: ModelIntInput | null,
  dateIndex?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPhotoFilterInput | null > | null,
  or?: Array< ModelPhotoFilterInput | null > | null,
  not?: ModelPhotoFilterInput | null,
};

export type ModelPhotoConnection = {
  __typename: "ModelPhotoConnection",
  items:  Array<Photo | null >,
  nextToken?: string | null,
};

export type ModelLikeFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  photoId?: ModelStringInput | null,
  and?: Array< ModelLikeFilterInput | null > | null,
  or?: Array< ModelLikeFilterInput | null > | null,
  not?: ModelLikeFilterInput | null,
  photoLikesId?: ModelIDInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  displayname?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  age?: ModelSubscriptionStringInput | null,
  profilePicId?: ModelSubscriptionIDInput | null,
  score?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  filename?: ModelSubscriptionStringInput | null,
  height?: ModelSubscriptionIntInput | null,
  width?: ModelSubscriptionIntInput | null,
  dateIndex?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPhotoFilterInput | null > | null,
  or?: Array< ModelSubscriptionPhotoFilterInput | null > | null,
};

export type ModelSubscriptionLikeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  photoId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLikeFilterInput | null > | null,
  or?: Array< ModelSubscriptionLikeFilterInput | null > | null,
};

export type CreateProfileMutationVariables = {
  input: CreateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type CreateProfileMutation = {
  createProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfileMutationVariables = {
  input: UpdateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfileMutationVariables = {
  input: DeleteProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type DeleteProfileMutation = {
  deleteProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePhotoMutationVariables = {
  input: CreatePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type CreatePhotoMutation = {
  createPhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePhotoMutationVariables = {
  input: UpdatePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type UpdatePhotoMutation = {
  updatePhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePhotoMutationVariables = {
  input: DeletePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type DeletePhotoMutation = {
  deletePhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLikeMutationVariables = {
  input: CreateLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type CreateLikeMutation = {
  createLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type UpdateLikeMutationVariables = {
  input: UpdateLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type UpdateLikeMutation = {
  updateLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type DeleteLikeMutationVariables = {
  input: DeleteLikeInput,
  condition?: ModelLikeConditionInput | null,
};

export type DeleteLikeMutation = {
  deleteLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type GetProfileQueryVariables = {
  id: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProfilesQueryVariables = {
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProfilesQuery = {
  listProfiles?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      id: string,
      username: string,
      displayname: string,
      email: string,
      bio?: string | null,
      age?: string | null,
      profilePicId?: string | null,
      score?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPhotoQueryVariables = {
  id: string,
};

export type GetPhotoQuery = {
  getPhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPhotosQueryVariables = {
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhotosQuery = {
  listPhotos?:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      username: string,
      filename: string,
      height?: number | null,
      width?: number | null,
      likes?:  {
        __typename: "ModelLikeConnection",
        nextToken?: string | null,
      } | null,
      dateIndex: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLikeQueryVariables = {
  id: string,
};

export type GetLikeQuery = {
  getLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type ListLikesQueryVariables = {
  filter?: ModelLikeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLikesQuery = {
  listLikes?:  {
    __typename: "ModelLikeConnection",
    items:  Array< {
      __typename: "Like",
      id: string,
      username: string,
      photoId: string,
      createdAt: string,
      updatedAt: string,
      photoLikesId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProfilesByUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProfilesByUsernameQuery = {
  profilesByUsername?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      id: string,
      username: string,
      displayname: string,
      email: string,
      bio?: string | null,
      age?: string | null,
      profilePicId?: string | null,
      score?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PhotosByDateQueryVariables = {
  dateIndex: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PhotosByDateQuery = {
  photosByDate?:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      username: string,
      filename: string,
      height?: number | null,
      width?: number | null,
      likes?:  {
        __typename: "ModelLikeConnection",
        nextToken?: string | null,
      } | null,
      dateIndex: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnCreateProfileSubscription = {
  onCreateProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnUpdateProfileSubscription = {
  onUpdateProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnDeleteProfileSubscription = {
  onDeleteProfile?:  {
    __typename: "Profile",
    id: string,
    username: string,
    displayname: string,
    email: string,
    bio?: string | null,
    age?: string | null,
    profilePicId?: string | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnCreatePhotoSubscription = {
  onCreatePhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnUpdatePhotoSubscription = {
  onUpdatePhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnDeletePhotoSubscription = {
  onDeletePhoto?:  {
    __typename: "Photo",
    id: string,
    username: string,
    filename: string,
    height?: number | null,
    width?: number | null,
    likes?:  {
      __typename: "ModelLikeConnection",
      items:  Array< {
        __typename: "Like",
        id: string,
        username: string,
        photoId: string,
        createdAt: string,
        updatedAt: string,
        photoLikesId: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    dateIndex: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnCreateLikeSubscription = {
  onCreateLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type OnUpdateLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnUpdateLikeSubscription = {
  onUpdateLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};

export type OnDeleteLikeSubscriptionVariables = {
  filter?: ModelSubscriptionLikeFilterInput | null,
};

export type OnDeleteLikeSubscription = {
  onDeleteLike?:  {
    __typename: "Like",
    id: string,
    username: string,
    photoId: string,
    createdAt: string,
    updatedAt: string,
    photoLikesId: string,
  } | null,
};
