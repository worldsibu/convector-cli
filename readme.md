# Convector CLI

Convector CLI is the official Command-Line Interface for <a href="https://github.com/worldsibu/convector/" target="_blank">Convector Framework</a>. It is an open source project under an Apache 2.0 license to help you create Convector projects easily.

Current version `0.1.1`.

## Tests 👷‍♂️

Download Convector CLI, build it, link it to your global `node_modules`, and  use it.

1. First bring up all the source code dependencies by running `npm i`.
2. Then run `npm link` to enable it globally.

## Usage

Go to the folder where you want to create a Convector project and run `conv new <name-of-project>`. For example if you run inside `~/Code` then the CLI will create the project in `~/Code/<nameofproject>`.

### conv new

The way to kickoff a new project. It includes the posibility to create a new project along a new Chaincode right out of the box. `npm i` and get a project working for you.

```bash
# New project
conv new <project-name> [-c -chaincode <chaincode-name>]
```

### conv generate

The easiest way to include new chaincodes, and model and controller files.

```bash
# Creates a chaincode package with a `model` and `controller` default. This needs to be run inside a Convector project folder.
conv generate chaincode <chaincode-name>
``` 

```bash
# Creates the file in the current folder (by overriding the folder conventions).
conv generate model <chaincode-name>
```

```bash
# Creates the file in the current folder (by overriding the folder conventions).
conv generate controller <chaincode-name>
```

### Example of use.

```bash
# Create a whole project plus a chaincode
conv new coffeecoin -c token

# Get in the project folder
cd coffeecoin

# Add an extra Convector chaincode package
conv generate chaincode productIdentity
```

## Roadmap 🗺

Proposed current roadmap. Have ideas? Post them in the [Issues section](https://github.com/worldsibu/convector-cli/issues).

1. Individual generators for:
    1. Project root structure - `conv new`
    2. Package structure - `conv new -c <chaincode>` `conv generate`
    3. Model file - `conv generate model <model-name>`
    4. Controller file - `conv generate controller <controller-name>`
    5. Convector Tool: Dev Env and Chaincode Manager - `npm run env:restart` `npm run cc:start -- <chaincode-name> <version>`
2. Log usage information to internet.
3. [🤚 We are here] Unify other Convector CLIs into one.
4. Test methods generation from controller.
5. Error collection details - report.
6. Versioning of cc creation, distribute different versions of dependencies.
7. Download settings from the internet.

## Important ⚗️

This project is currently under development and it's changing fast but you can use it and provide feedback. We love community feedback!

## Support

* For recommendations, feature requests, or bugs go to our [issues section](https://github.com/worldsibu/convector-cli/issues).
* News on Convector, subscribe to our [Newsletter](https://worldsibu.io/subscribe/).
* Need support? Chat directly with our team, join our [Discord](https://discord.gg/twRwpWt).