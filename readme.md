# Convector CLI

Convector CLI is the official Command-Line Interface for Convector Framework. It is an open source project under an Apache 2.0 license to help you create Convector projects easily.

## Tests 👷‍♂️

1. First bring up all the source code dependencies by running `npm i`.
2. Then run `npm i -g` to enable it globally.
3. Finally go to the folder where you want the project to be created and do `cv new <nameofproject>`. For example if you go to `~/Code` then the CLI will create the project in `~/Code/<nameofproject>`.

## Usage

* `cv new <project-name> [-c -chaincode <chaincode-name>]` - Creates the whole structure for a chaincodes project.
* `cv generate chaincode <chaincode-name>` - Creates a chaincode package with a `model` and `controller` default. This needs to be run inside a Convector project folder (i.e.: the one `cv new ...` created).
* `cv generate model <chaincode-name>` - Creates the file in the current folder (by overriding the folder conventions).
* `cv generate controller <chaincode-name>` - Creates the file in the current folder (by overriding the folder conventions).

## Important ⚗️

This project is currently under development. Got issues? Feel free to let us know in the Issues section of this repo or in our <a href="https://discord.gg/twRwpWt" target="_blank">Discord channel</a>.