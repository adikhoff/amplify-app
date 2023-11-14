/* Amplify Params - DO NOT EDIT
	API_DEKKERREUNIE_GRAPHQLAPIIDOUTPUT
	API_DEKKERREUNIE_PHOTOTABLE_ARN
	API_DEKKERREUNIE_PHOTOTABLE_NAME
	API_DEKKERREUNIE_PROFILETABLE_ARN
	API_DEKKERREUNIE_PROFILETABLE_NAME
	ENV
	REGION
	STORAGE_PHOTOS_BUCKETNAME
Amplify Params - DO NOT EDIT */

package example;

import com.amazonaws.services.lambda.runtime.Context; 
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class LambdaRequestHandler implements RequestHandler<RequestClass, ResponseClass>{   

    public ResponseClass handleRequest(RequestClass request, Context context){
        String greetingString = String.format("Hello %s %s!", request.firstName, request.lastName);
        return new ResponseClass(greetingString);
    }
}