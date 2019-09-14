# nodejs-ppl-like-you

# Description
API that sends 10 potential investor similar with a person described in the query parameters.

1. the endpoint is exposed at people-like-you
2. each of the terms in the query parameters is optional
3. the endpoint returns a JSON response with an array of scored suggested matches
4. the suggestions are sorted by descending score
5. each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)
