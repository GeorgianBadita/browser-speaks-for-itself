# browser-speaks-for-itself

browser-speaks-for-itself

## Context

This is a small tool that I created to increase productivity while browsing, similar to this [tool](https://www.quora.com/What-is-Facebooks-bunnylol).

## How it works

Its functionality is really easy. Let's say you want to search for something on youtube. Normally, you'd type 'youtube' in the search bar, then in youtube's own search you'd type the tile of the video you want. Using  ```browser-speaks-for-itself```, you'd just type ```yt [video title]``` and you will be directly redirected to the youtube search result page.

## How to run
Command to run the app: ```deno --allow-net run server.ts```

All you need to do is deploy this app somewhere, or run it locally and point your browser default search engine to it, as shown [here](https://support.google.com/chrome/answer/95426?hl=en-GB&co=GENIE.Platform%3DDesktop)


## Supported commands

| Command      | Arguments | Behaviour |
| ----------- | ----------- |- |
| fb      | [query]       |If no query is provided, will redirect to https://www.facebook.com, otherwise https://www.facebook.com/search/top?q=[query]|
| g   | [query]        |If no query is provided, will redirect to https://www.google.com, otherwise https://www.google.com/search?q=[query] |
| yt   | [query]        |If no query is provided, will redirect to https://www.youtube.com, otherwise https://www.youtube.com/results?search_query=[query] |
| amz   | [query]        |If no query is provided, will redirect to https://www.amazon.co.uk, otherwise https://www.amazon.co.uk/s?k=[query] |
| nf   | [query]        |If no query is provided, will redirects to https://netflix.com, othwerise  https://netflix.com/search?q=[query] |
| wa   | -        |The same as whatsapp:// |
| vc   | -        |The same as vscode:// |
| gh   | [query]        |If no query is provided, will redirect to https://github.com, otherwise https://github.com/search?q=[query] |
| rd   | [query]        |If no query is provided, will redirect to https://www.reddit.com, otherwise https://www.reddit.com/search/?q=[query] |
| ddd   | [query]        |If no query is provided, will redirect to https://duckduckgo.com, otherwise https://duckduckgo.com/?q=[query] |
| gm   | -        |Redirects to https://mail.google.com |
| gd   | -        |Redirects to https://drive.google.com/drive |
| ig   | [query]        |If no query is provided, will redirect to https://www.instagram.com, otherwise https://www.instagram.com/explore/search/keyword/?q=[query] |
| tw   | [query]        |If no query is provided, will redirect to https://www.twitch.tv, otherwise https://www.twitch.tv/search?term=[query] |
| cal   | -        |Redirects to https://calendar.google.com |
| mt   | -        |Redirects to https://meet.google.com |
| DEFAULT   | -        |Redirects to https://www.google.com |


