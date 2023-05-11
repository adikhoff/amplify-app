/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateProfile: OnCreateProfileSubscription;
  onUpdateProfile: OnUpdateProfileSubscription;
  onDeleteProfile: OnDeleteProfileSubscription;
  onCreatePhoto: OnCreatePhotoSubscription;
  onUpdatePhoto: OnUpdatePhotoSubscription;
  onDeletePhoto: OnDeletePhotoSubscription;
  onCreateLike: OnCreateLikeSubscription;
  onUpdateLike: OnUpdateLikeSubscription;
  onDeleteLike: OnDeleteLikeSubscription;
};

export type CreateProfileInput = {
  id?: string | null;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
};

export type ModelProfileConditionInput = {
  username?: ModelStringInput | null;
  displayname?: ModelStringInput | null;
  email?: ModelStringInput | null;
  bio?: ModelStringInput | null;
  age?: ModelStringInput | null;
  profilePicId?: ModelIDInput | null;
  score?: ModelIntInput | null;
  and?: Array<ModelProfileConditionInput | null> | null;
  or?: Array<ModelProfileConditionInput | null> | null;
  not?: ModelProfileConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
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
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Profile = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileInput = {
  id: string;
  username?: string | null;
  displayname?: string | null;
  email?: string | null;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
};

export type DeleteProfileInput = {
  id: string;
};

export type CreatePhotoInput = {
  id?: string | null;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  dateIndex: string;
  createdAt?: string | null;
};

export type ModelPhotoConditionInput = {
  username?: ModelStringInput | null;
  filename?: ModelStringInput | null;
  height?: ModelIntInput | null;
  width?: ModelIntInput | null;
  dateIndex?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelPhotoConditionInput | null> | null;
  or?: Array<ModelPhotoConditionInput | null> | null;
  not?: ModelPhotoConditionInput | null;
};

export type Photo = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: ModelLikeConnection | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelLikeConnection = {
  __typename: "ModelLikeConnection";
  items: Array<Like | null>;
  nextToken?: string | null;
};

export type Like = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type UpdatePhotoInput = {
  id: string;
  username?: string | null;
  filename?: string | null;
  height?: number | null;
  width?: number | null;
  dateIndex?: string | null;
  createdAt?: string | null;
};

export type DeletePhotoInput = {
  id: string;
};

export type CreateLikeInput = {
  id?: string | null;
  username: string;
  photoId: string;
  photoLikesId: string;
};

export type ModelLikeConditionInput = {
  username?: ModelStringInput | null;
  photoId?: ModelStringInput | null;
  and?: Array<ModelLikeConditionInput | null> | null;
  or?: Array<ModelLikeConditionInput | null> | null;
  not?: ModelLikeConditionInput | null;
  photoLikesId?: ModelIDInput | null;
};

export type UpdateLikeInput = {
  id: string;
  username?: string | null;
  photoId?: string | null;
  photoLikesId?: string | null;
};

export type DeleteLikeInput = {
  id: string;
};

export type ModelProfileFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  displayname?: ModelStringInput | null;
  email?: ModelStringInput | null;
  bio?: ModelStringInput | null;
  age?: ModelStringInput | null;
  profilePicId?: ModelIDInput | null;
  score?: ModelIntInput | null;
  and?: Array<ModelProfileFilterInput | null> | null;
  or?: Array<ModelProfileFilterInput | null> | null;
  not?: ModelProfileFilterInput | null;
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection";
  items: Array<Profile | null>;
  nextToken?: string | null;
};

export type ModelPhotoFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  filename?: ModelStringInput | null;
  height?: ModelIntInput | null;
  width?: ModelIntInput | null;
  dateIndex?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelPhotoFilterInput | null> | null;
  or?: Array<ModelPhotoFilterInput | null> | null;
  not?: ModelPhotoFilterInput | null;
};

export type ModelPhotoConnection = {
  __typename: "ModelPhotoConnection";
  items: Array<Photo | null>;
  nextToken?: string | null;
};

export type ModelLikeFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  photoId?: ModelStringInput | null;
  and?: Array<ModelLikeFilterInput | null> | null;
  or?: Array<ModelLikeFilterInput | null> | null;
  not?: ModelLikeFilterInput | null;
  photoLikesId?: ModelIDInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelSubscriptionProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  username?: ModelSubscriptionStringInput | null;
  displayname?: ModelSubscriptionStringInput | null;
  email?: ModelSubscriptionStringInput | null;
  bio?: ModelSubscriptionStringInput | null;
  age?: ModelSubscriptionStringInput | null;
  profilePicId?: ModelSubscriptionIDInput | null;
  score?: ModelSubscriptionIntInput | null;
  and?: Array<ModelSubscriptionProfileFilterInput | null> | null;
  or?: Array<ModelSubscriptionProfileFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  username?: ModelSubscriptionStringInput | null;
  filename?: ModelSubscriptionStringInput | null;
  height?: ModelSubscriptionIntInput | null;
  width?: ModelSubscriptionIntInput | null;
  dateIndex?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPhotoFilterInput | null> | null;
  or?: Array<ModelSubscriptionPhotoFilterInput | null> | null;
};

export type ModelSubscriptionLikeFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  username?: ModelSubscriptionStringInput | null;
  photoId?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionLikeFilterInput | null> | null;
  or?: Array<ModelSubscriptionLikeFilterInput | null> | null;
};

export type CreateProfileMutation = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileMutation = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteProfileMutation = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePhotoMutation = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePhotoMutation = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type DeletePhotoMutation = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateLikeMutation = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type UpdateLikeMutation = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type DeleteLikeMutation = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type GetProfileQuery = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListProfilesQuery = {
  __typename: "ModelProfileConnection";
  items: Array<{
    __typename: "Profile";
    id: string;
    username: string;
    displayname: string;
    email: string;
    bio?: string | null;
    age?: string | null;
    profilePicId?: string | null;
    score?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetPhotoQuery = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type ListPhotosQuery = {
  __typename: "ModelPhotoConnection";
  items: Array<{
    __typename: "Photo";
    id: string;
    username: string;
    filename: string;
    height?: number | null;
    width?: number | null;
    likes?: {
      __typename: "ModelLikeConnection";
      nextToken?: string | null;
    } | null;
    dateIndex: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetLikeQuery = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type ListLikesQuery = {
  __typename: "ModelLikeConnection";
  items: Array<{
    __typename: "Like";
    id: string;
    username: string;
    photoId: string;
    createdAt: string;
    updatedAt: string;
    photoLikesId: string;
  } | null>;
  nextToken?: string | null;
};

export type ProfilesByUsernameQuery = {
  __typename: "ModelProfileConnection";
  items: Array<{
    __typename: "Profile";
    id: string;
    username: string;
    displayname: string;
    email: string;
    bio?: string | null;
    age?: string | null;
    profilePicId?: string | null;
    score?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type PhotosByDateQuery = {
  __typename: "ModelPhotoConnection";
  items: Array<{
    __typename: "Photo";
    id: string;
    username: string;
    filename: string;
    height?: number | null;
    width?: number | null;
    likes?: {
      __typename: "ModelLikeConnection";
      nextToken?: string | null;
    } | null;
    dateIndex: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateProfileSubscription = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateProfileSubscription = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteProfileSubscription = {
  __typename: "Profile";
  id: string;
  username: string;
  displayname: string;
  email: string;
  bio?: string | null;
  age?: string | null;
  profilePicId?: string | null;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreatePhotoSubscription = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePhotoSubscription = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePhotoSubscription = {
  __typename: "Photo";
  id: string;
  username: string;
  filename: string;
  height?: number | null;
  width?: number | null;
  likes?: {
    __typename: "ModelLikeConnection";
    items: Array<{
      __typename: "Like";
      id: string;
      username: string;
      photoId: string;
      createdAt: string;
      updatedAt: string;
      photoLikesId: string;
    } | null>;
    nextToken?: string | null;
  } | null;
  dateIndex: string;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateLikeSubscription = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type OnUpdateLikeSubscription = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

export type OnDeleteLikeSubscription = {
  __typename: "Like";
  id: string;
  username: string;
  photoId: string;
  createdAt: string;
  updatedAt: string;
  photoLikesId: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateProfile(
    input: CreateProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<CreateProfileMutation> {
    const statement = `mutation CreateProfile($input: CreateProfileInput!, $condition: ModelProfileConditionInput) {
        createProfile(input: $input, condition: $condition) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateProfileMutation>response.data.createProfile;
  }
  async UpdateProfile(
    input: UpdateProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<UpdateProfileMutation> {
    const statement = `mutation UpdateProfile($input: UpdateProfileInput!, $condition: ModelProfileConditionInput) {
        updateProfile(input: $input, condition: $condition) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateProfileMutation>response.data.updateProfile;
  }
  async DeleteProfile(
    input: DeleteProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<DeleteProfileMutation> {
    const statement = `mutation DeleteProfile($input: DeleteProfileInput!, $condition: ModelProfileConditionInput) {
        deleteProfile(input: $input, condition: $condition) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteProfileMutation>response.data.deleteProfile;
  }
  async CreatePhoto(
    input: CreatePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<CreatePhotoMutation> {
    const statement = `mutation CreatePhoto($input: CreatePhotoInput!, $condition: ModelPhotoConditionInput) {
        createPhoto(input: $input, condition: $condition) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePhotoMutation>response.data.createPhoto;
  }
  async UpdatePhoto(
    input: UpdatePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<UpdatePhotoMutation> {
    const statement = `mutation UpdatePhoto($input: UpdatePhotoInput!, $condition: ModelPhotoConditionInput) {
        updatePhoto(input: $input, condition: $condition) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePhotoMutation>response.data.updatePhoto;
  }
  async DeletePhoto(
    input: DeletePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<DeletePhotoMutation> {
    const statement = `mutation DeletePhoto($input: DeletePhotoInput!, $condition: ModelPhotoConditionInput) {
        deletePhoto(input: $input, condition: $condition) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePhotoMutation>response.data.deletePhoto;
  }
  async CreateLike(
    input: CreateLikeInput,
    condition?: ModelLikeConditionInput
  ): Promise<CreateLikeMutation> {
    const statement = `mutation CreateLike($input: CreateLikeInput!, $condition: ModelLikeConditionInput) {
        createLike(input: $input, condition: $condition) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateLikeMutation>response.data.createLike;
  }
  async UpdateLike(
    input: UpdateLikeInput,
    condition?: ModelLikeConditionInput
  ): Promise<UpdateLikeMutation> {
    const statement = `mutation UpdateLike($input: UpdateLikeInput!, $condition: ModelLikeConditionInput) {
        updateLike(input: $input, condition: $condition) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateLikeMutation>response.data.updateLike;
  }
  async DeleteLike(
    input: DeleteLikeInput,
    condition?: ModelLikeConditionInput
  ): Promise<DeleteLikeMutation> {
    const statement = `mutation DeleteLike($input: DeleteLikeInput!, $condition: ModelLikeConditionInput) {
        deleteLike(input: $input, condition: $condition) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteLikeMutation>response.data.deleteLike;
  }
  async GetProfile(id: string): Promise<GetProfileQuery> {
    const statement = `query GetProfile($id: ID!) {
        getProfile(id: $id) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProfileQuery>response.data.getProfile;
  }
  async ListProfiles(
    filter?: ModelProfileFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListProfilesQuery> {
    const statement = `query ListProfiles($filter: ModelProfileFilterInput, $limit: Int, $nextToken: String) {
        listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
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
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListProfilesQuery>response.data.listProfiles;
  }
  async GetPhoto(id: string): Promise<GetPhotoQuery> {
    const statement = `query GetPhoto($id: ID!) {
        getPhoto(id: $id) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPhotoQuery>response.data.getPhoto;
  }
  async ListPhotos(
    filter?: ModelPhotoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPhotosQuery> {
    const statement = `query ListPhotos($filter: ModelPhotoFilterInput, $limit: Int, $nextToken: String) {
        listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            filename
            height
            width
            likes {
              __typename
              nextToken
            }
            dateIndex
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPhotosQuery>response.data.listPhotos;
  }
  async GetLike(id: string): Promise<GetLikeQuery> {
    const statement = `query GetLike($id: ID!) {
        getLike(id: $id) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLikeQuery>response.data.getLike;
  }
  async ListLikes(
    filter?: ModelLikeFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLikesQuery> {
    const statement = `query ListLikes($filter: ModelLikeFilterInput, $limit: Int, $nextToken: String) {
        listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            photoId
            createdAt
            updatedAt
            photoLikesId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListLikesQuery>response.data.listLikes;
  }
  async ProfilesByUsername(
    username: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelProfileFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ProfilesByUsernameQuery> {
    const statement = `query ProfilesByUsername($username: String!, $sortDirection: ModelSortDirection, $filter: ModelProfileFilterInput, $limit: Int, $nextToken: String) {
        profilesByUsername(
          username: $username
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
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
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      username
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ProfilesByUsernameQuery>response.data.profilesByUsername;
  }
  async PhotosByDate(
    dateIndex: string,
    createdAt?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelPhotoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<PhotosByDateQuery> {
    const statement = `query PhotosByDate($dateIndex: String!, $createdAt: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelPhotoFilterInput, $limit: Int, $nextToken: String) {
        photosByDate(
          dateIndex: $dateIndex
          createdAt: $createdAt
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            username
            filename
            height
            width
            likes {
              __typename
              nextToken
            }
            dateIndex
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      dateIndex
    };
    if (createdAt) {
      gqlAPIServiceArguments.createdAt = createdAt;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <PhotosByDateQuery>response.data.photosByDate;
  }
  OnCreateProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
  > {
    const statement = `subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
        onCreateProfile(filter: $filter) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
    >;
  }

  OnUpdateProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
  > {
    const statement = `subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
        onUpdateProfile(filter: $filter) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
    >;
  }

  OnDeleteProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
  > {
    const statement = `subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
        onDeleteProfile(filter: $filter) {
          __typename
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
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
    >;
  }

  OnCreatePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePhoto">>
  > {
    const statement = `subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onCreatePhoto(filter: $filter) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePhoto">>
    >;
  }

  OnUpdatePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePhoto">>
  > {
    const statement = `subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onUpdatePhoto(filter: $filter) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePhoto">>
    >;
  }

  OnDeletePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePhoto">>
  > {
    const statement = `subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onDeletePhoto(filter: $filter) {
          __typename
          id
          username
          filename
          height
          width
          likes {
            __typename
            items {
              __typename
              id
              username
              photoId
              createdAt
              updatedAt
              photoLikesId
            }
            nextToken
          }
          dateIndex
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePhoto">>
    >;
  }

  OnCreateLikeListener(
    filter?: ModelSubscriptionLikeFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateLike">>
  > {
    const statement = `subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
        onCreateLike(filter: $filter) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateLike">>
    >;
  }

  OnUpdateLikeListener(
    filter?: ModelSubscriptionLikeFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateLike">>
  > {
    const statement = `subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
        onUpdateLike(filter: $filter) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateLike">>
    >;
  }

  OnDeleteLikeListener(
    filter?: ModelSubscriptionLikeFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteLike">>
  > {
    const statement = `subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
        onDeleteLike(filter: $filter) {
          __typename
          id
          username
          photoId
          createdAt
          updatedAt
          photoLikesId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteLike">>
    >;
  }
}
