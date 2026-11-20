/** Details Coach J.R. collects in the chat, handed to the contact form through sessionStorage (never the URL). */
export const CHAT_PREFILL_KEY = "hm-chat-prefill";

export type ChatPrefill = { topic?: string; about?: string; message?: string; name?: string; mobile?: string; method?: string; time?: string };

export function saveChatPrefill(data: ChatPrefill) {
  try {
    window.sessionStorage.setItem(CHAT_PREFILL_KEY, JSON.stringify(data));
  } catch {
    /* storage blocked: the form simply opens empty */
  }
}
