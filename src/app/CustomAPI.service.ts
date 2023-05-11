/* tslint:disable */
/* eslint-disable */
import {Injectable} from "@angular/core";
import API, {graphqlOperation} from "@aws-amplify/api-graphql";
import {
  ListPhotosQuery,
  ModelPhotoFilterInput,
  ModelSortDirection,
  ModelStringKeyConditionInput,
  PhotosByDateQuery
} from "./API.service";

@Injectable({
  providedIn: "root"
})
export class CustomAPIService {
  async ListPhotosWithData(
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
              items {
                id
                photoId
                photoLikesId
                username
              }
            }
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
              items {
                id
                photoId
                photoLikesId
                username
              }
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

}
