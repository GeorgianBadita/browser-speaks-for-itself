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
// | lc      |[easy|medium|hard]| If no difficulty is provided, redirects to https://www.leetcode.com/problemset/all/, otherwise redirects to the problems with specified difficulty                                     |
// | so      | [query]          | If no query is provided, redirects to https://www.stackoverflow.com, otherwise redirects to https://stackoverflow.com/search?q=[query]                                                 |
// | DEFAULT |    -             | Redirects to https://www.google.com                                                                                                                                                    |
// +---------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
import { getQuery } from "https://deno.land/x/oak@v15.0.0/helpers.ts";
import {
  Application,
  Context,
  Router,
  Status,
} from "https://deno.land/x/oak@v15.0.0/mod.ts";
import { RedirectMappersUtils } from "./redirect-mappers/redirect-mappers.ts";

const router = new Router();

const doRedirect = (url: string | URL, ctx: Context): void => {
  ctx.response.status = Status.Found;
  ctx.response.redirect(url);
};

router
  .get("/search", (ctx) => {
    const params = getQuery(ctx, { mergeParams: true });
    const query = params["q"] ?? "";
    const key = params["key"] ?? "";

    if (key.length === 0 || key !== Deno.env.get("ACCESS_KEY")) {
      // Rickroll
      doRedirect(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
        ctx
      );
      return;
    }

    const split = query.split(" ");
    if (split.length == 0 || query.length == 0) {
      doRedirect("https://www.google.com", ctx);
      return;
    }

    const [maybeCommand, ...rest] = split;

    let redirectFunk = RedirectMappersUtils.getReidrectfunk(maybeCommand);

    if (redirectFunk === null) {
      const defRedirect = RedirectMappersUtils.getDefaultRedirectfunk();
      const url = defRedirect.withQuery
        ? defRedirect.fn(encodeURI(split.join(" ")))
        : defRedirect.fn();
      doRedirect(url, ctx);
      return;
    }

    const url = redirectFunk.withQuery
      ? redirectFunk.fn(encodeURI(rest.join(" ")))
      : redirectFunk.fn();

    doRedirect(url, ctx);
    return;
  })
  .get("/", (ctx) => {
    // Rickroll
    doRedirect(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
      ctx
    );
    return;
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
