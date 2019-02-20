# Changelog

## 1.0.6

* Now a default test file is created for the default chaincode when creating a new project. It's a reference/starting point. Also includes all the plumbing to run `npm run test`. #23
* Improvements on the README file for faster starting point.
* `update-paths.js` included to avoid local environment lock in regarding Hurley's path (hyperledger-fabric-network). It is ran automatically when doing a build at the root level.
* CamelCase/PascalCase bug fixes for regular tasks such as package, install, and tests. #20
* Updated Hurley version as well Fabric client libraries.
