import type { JSX } from "react";
export interface Message {
    text: string | JSX.Element;
    type: "user" | "bot";
  }
  