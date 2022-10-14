# Jane Soccer Challenge

## Getting Started

Install the following before cloning this repo:

- Node v16.17.1
- yarn 1.22.17

I personally use [`asdf`](https://asdf-vm.com/) as my version manager, so `asdf install`
should install the node version that is given within [`.tool-versions`](./.tool-versions)
file; however, I have also added in an `.nvmrc` file which you can use with a node
version manager of your liking to install.

After `node` has been installed, you can install the dependencies using `yarn install`
or simply `yarn`. Before moving on, we want to build our project by using `yarn build`,
which will compile all the typescript into javascript inside our `dist` folder.

## Usage

There are a couple ways you can use this project

1. Using `node`
   - After running `yarn build`, a `dist` directory was created containing all the
     compiled javascript. We can run our project using `node` and the following command:
     `node dist/index.js inputs/formatted.txt`
2. Using `ts-node`

   - We don't need to create a build for this one. We can simply run:
     `yarn ts-node index.ts inputs/unformatted.txt`
   - There are [additional scripts](./README.md#additional-scripts) that are
     included inside `package.json` to faciliate the running of these scripts

3. Using the included binary
   - I have created and added a binary, which we can also use. First, we have to
     make sure that the build is up to date by running `yarn build`. We will then
     be able to run the binary using the following command:
     `bin/getSoccerResults inputs/small-league.txt`
   - If the included binary does not have the correct permissions, you can run
     `chmod +x bin/getSoccerResults` to add the correct permission

## Testing

In order to run the entire test suite included in this repository, you can run
`yarn test`, which will run the entire test suite once.

Additional test suite scripts include:

- `test:watch` which runs the suite in watch mode
- `test:ci` which is meant to run the suite inside the Github Actions CI Environment

## Linting

I have added `eslint` and `prettier` to ensure good code quality. You can run the
linter with `yarn lint:ts` to check the linting on the `.ts` files within `src` folder.
Markdown files are also linted, but not enforced in CI.

## Typescript Usage

I have included typescript in this project because I enjoy the type safety net
it provies. In order to check the typesafety of this project, you can run the
following command: `yarn typecheck`

## Included Documentation

I have included a Design Doc along with its revision inside the `docs` directory
under [`docs/DesignDoc.md`](./docs/DesignDoc.md)

## Additional Scripts

I also added additional scripts that run the commands on certain types of files
that I've included inside [`inputs`](./inputs/).

- `start:formatted` runs the formatted text input
- `start:empty` runs the empty text input
- `start:smallLeague` runs the small league text input
- `start:unformatted` runs the unformatted text input
