# Design Doc

## Context

I am tasked in creating a program/script that takes in a text document with a
list of match results from any given league and outputs the top three teams at
the end of every match day.

## Proposed Solution

This program will be written in Typescript to ensure the we have typesafe code.
Given the inital readthrough of the prompt, there are a couple of things I want
to ensure do not fall through the cracks:

- We are making sure that we are taking in the appropriate command line arguments
  - Solution: We are aborting when given too little or too many arguments because
    we only care about being provided the text document that contains all the scores
- We are accounting for input documents that are not neatly organized/not formatted
  correctly or neatly
  - Solution: We can catch each line's input & verify each line contains the right
    information through regex patterns. I will be making use of a familiar
    [regex generator](https://regex-generator.olafneumann.org/?sampleText=Capitola%20Seahorses%201%2C%20Aptos%20FC%200&flags=i&onlyPatterns=false&matchWholeLine=false&selection=)
    and making sure to generate unformatted text input docs and test this behavior

Another issue we have to account for is the fact that there is no set delimiter
for an end of a matchday. I plan on using an object to keep track of the teams &
their points; however, the downside to using an object to keep track of teams &
their points is that we'd need to create a different object that stores teams in
points & alphabetical order or map through the object and create a new
object/array in place to print.

To read through the text file provided, I will be using Node's built-in [`fs` package](https://nodejs.org/api/fs.html).

### Testing Approach

I will be testing my program as a whole using Test Drive Development (TDD). I've
recently found that TDD has given me a little bit more freedom to play around
with my implementation, especially when I am attempting to refactor some code and
DRY out parts of it. I will be using Jest as my testing framework.

### Continous Integration

Time permitting, I will be using Github Action & Pull Requests to ensure that
what goes into the `main` branch is code that has been reviewed at least once
& that the written tests are all passing!

## Revision 10/14/2022

After iterating through my initial approach, I finally came up with a working solution
very close to my initial approach. The CLI takes in a single argument, which is
the input file that the program will read. The program checks the validity of
each line via RegEx. I created a League Tracker object that kept track
of the teams and their points. The top teams were calculated based on this object
by creating an array, sorting it by points and if teams were tied on points, alphabetically.
In order to calculate the end of a matchday, I created an array that contained
all the teams that had played during the given matchday. Once a team was found
to have played in the given matchday, the matchday ended, results were printed,
and the program removed all the teams from this array and added the current teams
that are playing once again to restart the matchday. This approach led to an off-by-one
error, which I solved by checking to see if the matchday results array was populated
before ending the program. If the program found that the matchday results array was
still populated, it printed out the matchday information and the program ended.
