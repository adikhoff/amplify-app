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
        
     public class RequestClass {
        String firstName;
        String lastName;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public RequestClass(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public RequestClass() {
        }
    }