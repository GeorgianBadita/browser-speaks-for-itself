export enum Domains {
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
}

const ALL_COMMANDS = [
  "fb",
  "g",
  "yt",
  "am",
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
] as const;

type CommandsTuple = typeof ALL_COMMANDS;
export type Command = CommandsTuple[number];

export const commandsToDomains: { [key in Command]: Domains } = {
  "fb": Domains.FACEBOOK,
  "yt": Domains.YOUTUBE,
  "g": Domains.GOOGLE,
  "am": Domains.AMAZON,
  "wa": Domains.WHATSAPP,
  "vc": Domains.VSCODE,
  "gh": Domains.GITHUB,
  "rd": Domains.REDDIT,
  "ddd": Domains.DUCKDUCKGO,
  "gm": Domains.GMAIL,
  "gd": Domains.GOOGLE_DRIVE,
  "ig": Domains.INSTAGRAM,
  "tw": Domains.TWITCH,
  "cal": Domains.GOOGLE_CALENDAR,
  "mt": Domains.GOOGLE_MEET,
};

export const commandFromString = (command: string): Command | null => {
  return ALL_COMMANDS.includes(command as Command) ? command as Command : null;
};