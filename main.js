import Virastar from "virastar";
import clipboardy from "clipboardy";
import {
  toPersianChars,
  halfSpace,
  digitsFaToEn,
  digitsArToFa,
} from "@persian-tools/persian-tools";

const text = await clipboardy.read();
const normalized = toPersianChars(text);
const virastar = new Virastar({
  fix_english_numbers: false,
  fix_arabic_numbers: false,
});
const cleaned = virastar.cleanup(normalized);
const withHalfSpace = halfSpace(cleaned);
const withLineBreaks = withHalfSpace
  .replace(/(?<![0-9۰-۹٠-٩])\.(?=[ \t]+\S)/g, ".\n")
  .replace(/([;؛!?؟])(?=[ \t]+\S)/g, "$1\n");
const finalized = digitsFaToEn(digitsArToFa(withLineBreaks));
await clipboardy.write(finalized);
