export function removeDiacritics(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u064B-\u065F]/g, "") // Remove Arabic diacritics (Tashkeel)
    .replace(/[\u0670]/g, "ا") // Replace superscript alef with regular alef
    .replace(/[إأآا]/g, "ا") // Normalize alef variations
    .replace(/[ىي]/g, "ي") // Normalize ya variations
    .replace(/ة/g, "ه") // Normalize ta marbuta
    .normalize("NFC");
}
