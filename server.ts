// MAPPING
// +---------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// | Command |    Arguments     |                                                                                       Behaviour                                                                                        |
// +---------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
// | fb      | [query]          | If no query is provided, will redirect to https://www.facebook.com, otherwise https://www.facebook.com/search/top?q=[query]                                                            |
// | g       | [query]          | If no query is provided, will redirect to https://www.google.com, otherwise https://www.google.com/search?q=[query]                                                                    |
// | yt      | [query]          | If no query is provided, will redirect to https://www.youtube.com, otherwise https://www.youtube.com/results?search_query=[query]                                                      |
// | amz     | [query]          | If no query is provided, will redirect to https://www.amazon.co.uk, otherwise https://www.amazon.co.uk/s?k=[query]                                                                     |
// | nf      | [query]          | If no query is provided, will redirects to https://netflix.com, othwerise  https://netflix.com/search?q=[query]                                                                        |                                                                         |
// | wa      |    -             | The same as whatsapp://                                                                                                                                                                |
// | vc      |    -             | The same as vscode://                                                                                                                                                                  |
// | gh      | [query]          | If no query is provided, will redirect to https://github.com, otherwise https://github.com/search?q=[query]                                                                            |
// | rd      | [query]          | If no query is provided, will redirect to https://www.reddit.com, otherwise https://www.reddit.com/search/?q=[query]                                                                   |
// | ddd     | [query]          | If no query is provided, will redirect to https://duckduckgo.com, otherwise https://duckduckgo.com/?q=[query]                                                                          |
// | gm      |    -             | Redirects to https://mail.google.com                                                                                                                                                   |
// | gd      |    -             | Redirects to https://drive.google.com/drive                                                                                                                                            |
// | ig      | [query]          | If no query is provided, will redirect to https://www.instagram.com, otherwise https://www.instagram.com/explore/search/keyword/?q=[query]                                             |
// | tw      | [query]          | If no query is provided, will redirect to https://www.twitch.tv, otherwise https://www.twitch.tv/search?term=[query]                                                                   |
// | cal     |    -             | Redirects to https://calendar.google.com                                                                                                                                               |
// | mt      |    -             | Redirects to https://meet.google.com                                                                                                                                                   |
// | DEFAULT |    -             | Redirects to https://www.google.com                                                                                                                                                    |
// +---------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

import { getQuery } from "https://deno.land/x/oak@v11.0.0/helpers.ts";
import {
  Application,
  Router,
  Status,
} from "https://deno.land/x/oak@v11.0.0/mod.ts";
import { Command } from "./redirect-mappers/domains.ts";
import {
  RedirectMapper,
  RedirectMappersUtils,
} from "./redirect-mappers/redirect-mappers.ts";

const router = new Router();

// deno-lint-ignore no-explicit-any
const doRedirect = (url: string | URL, ctx: any): void => {
  ctx.response.status = Status.Found;
  ctx.response.redirect(url);
};

router.get("/search", (ctx) => {
  const params = getQuery(ctx, { mergeParams: true });
  const query = params["q"] ?? "";

  const split = query.split(" ");
  if (split.length == 0 || query.length == 0) {
    doRedirect("https://www.google.com", ctx);
    return;
  }

  // TODO: Redo this whole function as it is a bit hacky
  let redirectFunk = RedirectMappersUtils.getReidrectfunk(split[0]);
  let command = "g" as Command;
  if (redirectFunk === null) {
    redirectFunk = RedirectMappersUtils.getReidrectfunk(command);
  } else {
    command = split[0] as Command;
    split.shift();
  }

  const url = (redirectFunk as RedirectMapper)(command, split.join(" "));
  doRedirect(url, ctx);
  return;
}).get("/", (ctx) => {
  doRedirect("https://www.google.com", ctx);
  return;
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
