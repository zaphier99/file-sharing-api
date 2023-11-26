# File Sharing API
**Setting up the API:**
1. Clone this repo to your local file
2. Install all the dependencies with `npm install`
3. Run the command `npm start`

**Create your environment variables:**
- Create a `.env` file on the root directory of the folder
   Variables needed:
    - `FOLDER`: This is where you will put the exact directory of the specific folder, default will be generated in the root folder (e.g. "C:/sample-folder")
    - `PORT`: The port of the app will use, default is 3000 (e.g. "3000")
    - `RATE_LIMIT_MAX`: The limit number of API requests from the user with the same IP Address, default is 20 (e.g. "2")
    - `INACTIVITY_PERIOD`: The number of minutes to determine inactivity of the files uploaded, default is 5 (e.g. "5")
    - `STORAGE_PROVIDER`: The type of storage provider you will use, default is local (e.g. "google")
- Sample `.env`
  
  ```
    FOLDER='C:/sample'
    PORT=3000
    RATE_LIMIT_MAX=10
    INACTIVITY_PERIOD=2
    STORAGE_PROVIDER='local'
  ```

**Unit Tests**
1. Run the command `npm test` to run all the unit test
2. Run the command `npm run test:unit <specific test module>` to run a specific unit test
3. Run the command `npm run test:integration` to run integration testing
