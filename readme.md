# Convector CLI

Convector CLI is the official Command-Line Interface for Convector Framework. It is an open source project under an Apache 2.0 license to help you create Convector projects easily.

## Tests 👷‍♂️

Download Convector CLI, build it, link it to your global `node_modules`, and  use it.

1. First bring up all the source code dependencies by running `npm i`.
2. Then run `npm link` to enable it globally.

## Usage

Go to the folder where you want to create a Convector project and run `conv new <name-of-project>`. For example if you run inside `~/Code` then the CLI will create the project in `~/Code/<nameofproject>`.

* `conv new <project-name> [-c -chaincode <chaincode-name>]` - Creates the whole structure for a chaincodes project.
* `conv generate chaincode <chaincode-name>` - Creates a chaincode package with a `model` and `controller` default. This needs to be run inside a Convector project folder (i.e.: the one `conv new ...` created).
* `conv generate model <chaincode-name>` - Creates the file in the current folder (by overriding the folder conventions).
* `conv generate controller <chaincode-name>` - Creates the file in the current folder (by overriding the folder conventions).

Example

```bash
# Create a whole project plus a chaincode
conv new coffeecoin -c token
# Add an extra Convector chaincode package
conv generate chaincode productIdentity
```

## Important ⚗️

This project is currently under development. Got issues? Feel free to let us know in the Issues section of this repo or in our <a href="https://discord.gg/twRwpWt" target="_blank">Discord channel</a>.