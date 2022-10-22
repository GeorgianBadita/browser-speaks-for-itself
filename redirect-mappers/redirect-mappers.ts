import { Command, commandFromString, commandsToDomains } from "./domains.ts";

export interface RedirectMapper {
  (command: Command, query: string): URL;
}

const genericMapperFunk = (
  command: Command,
  afterDomain: string,
  search: string,
  locale: string,
) => {
  const domain = commandsToDomains[command];
  let urlString = `https://www.${domain}.${locale}`;
  if (search.length > 0) {
    urlString = `${urlString}${afterDomain}${search}`;
  }
  return new URL(urlString);
};

const programOpenerMapperFunk = (
  command: Command,
  _search: string,
  _locale: string,
) => new URL(`${commandsToDomains[command]}://`);

export abstract class RedirectMappersUtils {
  private static MAPPERS: { [key in Command]: RedirectMapper } = {
    fb: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search/top?q=", query, locale),
    g: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search?q=", query, locale),
    yt: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/results?search_query=", query, locale),
    amz: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search?q=", query, locale),
    nf: (command: Command, query: string, locale = "co.uk"): URL =>
      genericMapperFunk(command, "/s?k=", query, locale),
    gh: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search?q=", query, locale),
    rd: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search?q=", query, locale),
    ddd: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/?q=", query, locale),
    ig: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(
        command,
        "/explore/search/keyword/?q=",
        query,
        locale,
      ),
    tw: (command: Command, query: string, locale = "com"): URL =>
      genericMapperFunk(command, "/search?term=", query, locale),
    wa: (command: Command, query: string, locale = "com") =>
      programOpenerMapperFunk(command, query, locale),
    vc: (command: Command, query: string, locale = "com") =>
      programOpenerMapperFunk(command, query, locale),
    gm: (_command: Command, _query: string, _locale = "com") =>
      new URL("https://www.gmail.com"),
    gd: (_command: Command, _query: string, _locale = "com") =>
      new URL("https://drive.google.com"),
    cal: (_command: Command, _query: string, _locale = "com") =>
      new URL("https://calendar.google.com"),
    mt: (_command: Command, _query: string, _locale = "com") =>
      new URL("https://meet.google.com"),
  };

  static getReidrectfunk = (
    commString: string,
  ): RedirectMapper | null => {
    const command = commandFromString(commString);
    return command === null ? command : RedirectMappersUtils.MAPPERS[command];
  };
}
