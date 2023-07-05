export function refreshExpireDate() {
    return new Date(
        new Date().setDate(
            new Date().getDate() +
                parseInt(process.env.REFRESH_EXPIRATION.slice(0, -1), 10)
        )
    );
}

export const alphabet = {
    ء: "ء",
    ا: "ا",
    آ: "آ",
    ئ: "ئ",
    ب: "ب",
    پ: "پ",
    ت: "ت",
    ث: "ث",
    ج: "ج",
    چ: "چ",
    ح: "ح",
    خ: "خ",
    د: "د",
    ذ: "ذ",
    ر: "ر",
    ز: "ز",
    ژ: "ژ",
    س: "س",
    ش: "ش",
    ص: "ص",
    ض: "ض",
    ط: "ط",
    ظ: "ظ",
    ع: "ع",
    غ: "غ",
    ف: "ف",
    ق: "ق",
    ك: "ك",
    ک: "ک",
    گ: "گ",
    ل: "ل",
    م: "م",
    ن: "ن",
    و: "و",
    ه: "ه",
    ى: "ى",
    ی: "ی",
    ي: "ي",
};
