import { Command, commandFromString, commandsToWebsites } from "./websites.ts";

type MappingWithQuery = {
  fn: (input: string) => URL;
  withQuery: true;
};

type MappingSimple = {
  fn: () => URL;
  withQuery: false;
};

export type RedirectMapper = MappingWithQuery | MappingSimple;

const genericMapperFunk = (
  command: Command,
  afterDomain: string,
  search: string,
  tld: string
) => {
  const domain = commandsToWebsites[command];
  let urlString = `https://www.${domain}.${tld}`;
  if (search.length > 0) {
    urlString = `${urlString}${afterDomain}${search}`;
  }
  return new URL(urlString);
};

const programOpenerMapperFunk = (command: Command) =>
  new URL(`${commandsToWebsites[command]}://`);

export abstract class RedirectMappersUtils {
  private static MAPPERS: { [key in Command]: RedirectMapper } = {
    fb: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("fb", "/search/top?q=", query, tld),
      withQuery: true,
    },
    g: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("g", "/search?q=", query, tld),
      withQuery: true,
    },
    yt: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("yt", "/results?search_query=", query, tld),
      withQuery: true,
    },
    amz: {
      fn: (query: string, tld = "co.uk"): URL =>
        genericMapperFunk("amz", "/s?k=", query, tld),
      withQuery: true,
    },
    nf: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("nf", "/search?q=", query, tld),
      withQuery: true,
    },
    gh: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("gh", "/search?q=", query, tld),
      withQuery: true,
    },
    rd: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("rd", "/search?q=", query, tld),
      withQuery: true,
    },
    ddd: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("ddd", "/?q=", query, tld),
      withQuery: true,
    },
    ig: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("ig", "/explore/search/keyword/?q=", query, tld),
      withQuery: true,
    },
    tw: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("tw", "/search?term=", query, tld),
      withQuery: true,
    },
    so: {
      fn: (query: string, tld = "com"): URL =>
        genericMapperFunk("so", "/search?q=", query, tld),
      withQuery: true,
    },
    lc: {
      fn: (query: string, tld = "com"): URL => {
        const domain = commandsToWebsites["lc"];
        const urlString = `https://www.${domain}.${tld}/problemset`;
        const lowerQuery = query.toLowerCase();
        if (
          lowerQuery === "easy" ||
          lowerQuery === "medium" ||
          lowerQuery === "hard"
        ) {
          return new URL(
            `${urlString}/algorithms/?difficulty=${query.toUpperCase()}&status=NOT_STARTED`
          );
        }
        return new URL(urlString);
      },
      withQuery: true,
    },
    wa: { fn: () => programOpenerMapperFunk("wa"), withQuery: false },
    vc: { fn: () => programOpenerMapperFunk("vc"), withQuery: false },
    gm: { fn: () => new URL("https://www.gmail.com"), withQuery: false },
    gd: { fn: () => new URL("https://drive.google.com"), withQuery: false },
    cal: { fn: () => new URL("https://calendar.google.com"), withQuery: false },
    mt: { fn: () => new URL("https://meet.google.com"), withQuery: false },
  };

  private static DEFAULT_CMD: Command = "g";

  static getReidrectfunk = (commString: string): RedirectMapper | null => {
    const command = commandFromString(commString);
    return command === null ? command : RedirectMappersUtils.MAPPERS[command];
  };

  static getDefaultRedirectfunk = (): RedirectMapper => {
    return RedirectMappersUtils.MAPPERS[RedirectMappersUtils.DEFAULT_CMD];
  };
}
