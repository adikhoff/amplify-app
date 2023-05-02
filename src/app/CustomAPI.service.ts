/* tslint:disable */
/* eslint-disable */
import {Injectable} from "@angular/core";
import API, {graphqlOperation} from "@aws-amplify/api-graphql";
import {ListPhotosQuery, ModelPhotoFilterInput} from "./API.service";

@Injectable({
  providedIn: "root"
})
export class CustomAPIService {
  async ListPhotosWithLikes(
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
            user
            image
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
                user
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
}
