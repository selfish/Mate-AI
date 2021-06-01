import { FEN, TXT, TIT } from "./types.js"
export default {
  title: "Chess concepts",
  blocks: [
    { type: TIT, text: "A Zero-Sum Game " },
    { type: TXT, text: "Chess is a zero-sum game. Any advantages gained by Player A implies disadvantages for Player B. Advantages can come in the form of capturing opponent pieces, or having pieces in favourable positions. Therefore, when assigning a score from our AI’s perspective, a positive score implies an overall advantage for our AI and disadvantage for its opponent, while a negative score implies an overall disadvantage for our AI and advantage for its opponent." }
  ],
}
