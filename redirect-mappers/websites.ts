export enum Websites {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  YOUTUBE = "youtube",
  AMAZON = "amazon",
  WHATSAPP = "whatsapp",
  VSCODE = "vscode",
  GITHUB = "github",
  INSTAGRAM = "instagram",
  DUCKDUCKGO = "duckduckgo",
  GMAIL = "gmail",
  GOOGLE_DRIVE = "drive",
  GOOGLE_CALENDAR = "calendar",
  GOOGLE_MEET = "meet",
  REDDIT = "reddit",
  TWITCH = "twitch",
  NETFLIX = "netflix",
  LEETCODE = "leetcode",
  STACKOVERFLOW = "stackoverflow",
}

const ALL_COMMANDS = [
  "fb",
  "g",
  "yt",
  "amz",
  "wa",
  "vc",
  "gh",
  "rd",
  "ddd",
  "gm",
  "gd",
  "ig",
  "tw",
  "cal",
  "mt",
  "nf",
  "lc",
  "so",
] as const;

type CommandsTuple = typeof ALL_COMMANDS;
export type Command = CommandsTuple[number];

export const commandsToWebsites: { [key in Command]: Websites } = {
  fb: Websites.FACEBOOK,
  yt: Websites.YOUTUBE,
  g: Websites.GOOGLE,
  amz: Websites.AMAZON,
  wa: Websites.WHATSAPP,
  vc: Websites.VSCODE,
  gh: Websites.GITHUB,
  rd: Websites.REDDIT,
  ddd: Websites.DUCKDUCKGO,
  gm: Websites.GMAIL,
  gd: Websites.GOOGLE_DRIVE,
  ig: Websites.INSTAGRAM,
  tw: Websites.TWITCH,
  cal: Websites.GOOGLE_CALENDAR,
  mt: Websites.GOOGLE_MEET,
  nf: Websites.NETFLIX,
  lc: Websites.LEETCODE,
  so: Websites.STACKOVERFLOW,
};

export const commandFromString = (command: string): Command | null => {
  const maybeCommand = ALL_COMMANDS.find((cmd) => cmd === command);
  if (maybeCommand) {
    return maybeCommand;
  }
  return null;
};
