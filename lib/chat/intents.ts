// Keyword matching for typed messages (English and Filipino).
// The guided bot is button-first; this just routes free text to the right journey.

export type Intent =
  | "emergency"
  | "card"
  | "injury"
  | "complaint"
  | "minor"
  | "person"
  | "plan"
  | "prices"
  | "firstTime"
  | "classes"
  | "coach"
  | "book"
  | "shop"
  | "orders"
  | "meal"
  | "member"
  | "info"
  | "careers"
  | "thanks"
  | "greeting";

// Checked in this order: safety first, then everything else.
const rules: [Intent, RegExp][] = [
  ["emergency", /\b(emergency|911|bleeding|dumudugo|fainted|nahimatay|can'?t breathe|hindi makahinga|heart attack|collapsed?)\b/i],
  ["card", /\b(?:\d[ -]?){13,19}\b|\b(cvv|card number|pin ng gcash|gcash pin)\b/i],
  ["injury", /\b(injur\w*|pain|masakit|sakit|hurts?|sprain\w*|knee|tuhod|likod|back pain|pregnan\w*|buntis|surgery|operasyon|operation|asthma|hika|diabet\w*|high blood|condition)\b/i],
  ["complaint", /\b(complain\w*|reklamo|rude|bastos|harass\w*|unsafe|dirty|madumi|worst|scam|angry|galit|disappointed)\b/i],
  ["minor", /\b(1[0-7]|[5-9]) ?(years? old|yrs? old|y\/o|taong gulang)\b|\b(high ?school|minor|grade \d+|menor de edad)\b/i],
  ["person", /\b(person|human|staff|agent|real people|tao|kausap|front desk|manager)\b/i],
  ["member", /\b(freeze|cancel\w*|renew\w*|billing|charged?|nawala|lost (my|item)|account|refund\w*)\b/i],
  ["orders", /\b(order|deliver\w*|shipping|ship|pick ?-?up|return\w*|exchange|hm-\d+)\b/i],
  ["shop", /\b(protein|whey|creatine|supplement\w*|pre-?workout|vitamin\w*|bcaa|electrolyte\w*|shirt|tee|hoodie|tank|cap|merch|shaker|towel|bag|straps?|size|flavou?r|shop|bili)\b/i],
  ["meal", /\b(meal|diet|food|pagkain|kain|nutrition|calorie\w*|macros?)\b/i],
  ["classes", /\b(class\w*|schedule|sked|hiit|boxing|muay|core|abs|mobility|gx|group)\b/i],
  ["coach", /\b(coach\w*|trainer\w*|instructor)\b/i],
  ["book", /\b(book\w*|assessment|visit|tour|bisita|appointment|consult\w*|free trial)\b/i],
  ["prices", /\b(price\w*|magkano|how much|rates?|fee|cost|presyo|bayad|membership\w*|monthly|annual|quarterly|day ?pass)\b/i],
  ["firstTime", /\b(first ?time|beginner|nervous|kinakabahan|takot|never been|baguhan|newbie)\b/i],
  ["plan", /\b(lose|payat|weight|taba|fat|muscle|laki|bulk|strong\w*|lakas|plan|program\w*|recommend\w*|goal)\b/i],
  ["info", /\b(open|hours?|bukas|address|where|saan|location|parking|contact|phone|email|number|directions?)\b/i],
  ["careers", /\b(jobs?|hiring|careers?|apply|trabaho|refer\w*|kaibigan|friend)\b/i],
  ["thanks", /\b(thanks?|thank you|salamat|ty)\b/i],
  ["greeting", /\b(hi|hello|hey|kumusta|musta|good (morning|afternoon|evening))\b/i],
];

export function detectIntent(text: string): Intent | null {
  for (const [intent, re] of rules) if (re.test(text)) return intent;
  return null;
}

const filipinoWords =
  /\b(ang|ng|mga|ko|mo|ba|po|opo|naman|gusto|pwede|puwede|ako|kayo|sa|yung|lang|magkano|saan|paano|ano|kailan|bakit|wala|meron|salamat|hindi|oo)\b/i;

/** Guesses whether a message is in Filipino/Taglish. */
export function looksFilipino(text: string) {
  const hits = text.match(new RegExp(filipinoWords.source, "gi"))?.length ?? 0;
  return hits >= 2;
}

/** Accepts 09XXXXXXXXX or +639XXXXXXXXX, spaces and dashes allowed. */
export function normalizeMobile(text: string) {
  const digits = text.replace(/[\s-]/g, "");
  if (/^09\d{9}$/.test(digits)) return digits;
  if (/^\+?639\d{9}$/.test(digits)) return `0${digits.slice(-10)}`;
  return null;
}
