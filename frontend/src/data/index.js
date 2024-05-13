// Course Data
const SubjectList = ["Maths", "IT", "English", "Physics", "Biology", "History"];
const LanguageList = [
    "Afrikaans",
    "Albanian - shqip",
    "Amharic - አማርኛ",
    "Arabic - العربية",
    "Aragonese - aragonés",
    "Armenian - հայերեն",
    "Asturian - asturianu",
    "Azerbaijani - azərbaycan dili",
    "Basque - euskara",
    "Belarusian - беларуская",
    "Bengali - বাংলা",
    "Bosnian - bosanski",
    "Breton - brezhoneg",
    "Bulgarian - български",
    "Catalan - català",
    "Central Kurdish - کوردی (دەستنوسی عەرەبی)",
    "Chinese - 中文",
    "Chinese (Hong Kong) - 中文（香港）",
    "Chinese (Simplified) - 中文（简体）",
    "Chinese (Traditional) - 中文（繁體）",
    "Corsican",
    "Croatian - hrvatski",
    "Czech - čeština",
    "Danish - dansk",
    "Dutch - Nederlands",
    "English",
    "English (Australia)",
    "English (Canada)",
    "English (India)",
    "English (New Zealand)",
    "English (South Africa)",
    "English (United Kingdom)",
    "English (United States)",
    "Esperanto - esperanto",
    "Estonian - eesti",
    "Faroese - føroyskt",
    "Filipino",
    "Finnish - suomi",
    "French - français",
    "French (Canada) - français (Canada)",
    "French (France) - français (France)",
    "French (Switzerland) - français (Suisse)",
    "Galician - galego",
    "Georgian - ქართული",
    "German - Deutsch",
    "German (Austria) - Deutsch (Österreich)",
    "German (Germany) - Deutsch (Deutschland)",
    "German (Liechtenstein) - Deutsch (Liechtenstein)",
    "German (Switzerland) - Deutsch (Schweiz)",
    "Greek - Ελληνικά",
    "Guarani",
    "Gujarati - ગુજરાતી",
    "Hausa",
    "Hawaiian - ʻŌlelo Hawaiʻi",
    "Hebrew - עברית",
    "Hindi - हिन्दी",
    "Hungarian - magyar",
    "Icelandic - íslenska",
    "Indonesian - Indonesia",
    "Interlingua",
    "Irish - Gaeilge",
    "Italian - italiano",
    "Italian (Italy) - italiano (Italia)",
    "Italian (Switzerland) - italiano (Svizzera)",
    "Japanese - 日本語",
    "Kannada - ಕನ್ನಡ",
    "Kazakh - қазақ тілі",
    "Khmer - ខ្មែរ",
    "Korean - 한국어",
    "Kurdish - Kurdî",
    "Kyrgyz - кыргызча",
    "Lao - ລາວ",
    "Latin",
    "Latvian - latviešu",
    "Lingala - lingála",
    "Lithuanian - lietuvių",
    "Macedonian - македонски",
    "Malay - Bahasa Melayu",
    "Malayalam - മലയാളം",
    "Maltese - Malti",
    "Marathi - मराठी",
    "Mongolian - монгол",
    "Nepali - नेपाली",
    "Norwegian - norsk",
    "Norwegian Bokmål - norsk bokmål",
    "Norwegian Nynorsk - nynorsk",
    "Occitan",
    "Oriya - ଓଡ଼ିଆ",
    "Oromo - Oromoo",
    "Pashto - پښتو",
    "Persian - فارسی",
    "Polish - polski",
    "Portuguese - português",
    "Portuguese (Brazil) - português (Brasil)",
    "Portuguese (Portugal) - português (Portugal)",
    "Punjabi - ਪੰਜਾਬੀ",
    "Quechua",
    "Romanian - română",
    "Romanian (Moldova) - română (Moldova)",
    "Romansh - rumantsch",
    "Russian - русский",
    "Scottish Gaelic",
    "Serbian - српски",
    "Serbo - Croatian",
    "Shona - chiShona",
    "Sindhi",
    "Sinhala - සිංහල",
    "Slovak - slovenčina",
    "Slovenian - slovenščina",
    "Somali - Soomaali",
    "Southern Sotho",
    "Spanish - español",
    "Spanish (Argentina) - español (Argentina)",
    "Spanish (Latin America) - español (Latinoamérica)",
    "Spanish (Mexico) - español (México)",
    "Spanish (Spain) - español (España)",
    "Spanish (United States) - español (Estados Unidos)",
    "Sundanese",
    "Swahili - Kiswahili",
    "Swedish - svenska",
    "Tajik - тоҷикӣ",
    "Tamil - தமிழ்",
    "Tatar",
    "Telugu - తెలుగు",
    "Thai - ไทย",
    "Tigrinya - ትግርኛ",
    "Tongan - lea fakatonga",
    "Turkish - Türkçe",
    "Turkmen",
    "Twi",
    "Ukrainian - українська",
    "Urdu - اردو",
    "Uyghur",
    "Uzbek - o‘zbek",
    "Vietnamese - Tiếng Việt",
    "Walloon - wa",
    "Welsh - Cymraeg",
    "Western Frisian",
    "Xhosa",
    "Yiddish",
    "Yoruba - Èdè Yorùbá",
    "Zulu - isiZulu"
];
const TypeList = ["Guided Project","Course","Project","Specialization","Professional Certificate","MasterTrack Certificate"];
const LevelList = ["Beginner","Intermediate","Advanced"];
const DurationList = ["Less Than 2 Hours", "1-4 Weeks", "1-3 Months", "3-6 Months", "6-9 Months", "9-12 Months", "More Than 1 Year"];
const SkillsList = ["Leadership and Management", "Communication", "Strategy", "Data Analysis"];

// File Types
const FileIconList = [
    {
        name: 'pdf',
        src: 'https://cdn.icon-icons.com/icons2/2753/PNG/512/ext_pdf_filetype_icon_176234.png'
    },
    {
        name: 'csv',
        src: 'https://cdn.icon-icons.com/icons2/2753/PNG/512/ext_csv_filetype_icon_176252.png'
    },
    {
        name: 'doc',
        src: 'https://cdn.icon-icons.com/icons2/2753/PNG/512/ext_doc_filetype_icon_176249.png'
    },
    {
        name: 'xlsx',
        src: 'https://cdn.icon-icons.com/icons2/2753/PNG/512/ext_xls_filetype_icon_176238.png'
    },
    {
        name: 'mp4',
        src: 'https://cdn.icon-icons.com/icons2/2101/PNG/512/social_media_youtube_video_play_icon_128997.png'
    },
    {
        name: 'mkv',
        src: 'https://cdn.icon-icons.com/icons2/2101/PNG/512/social_media_youtube_video_play_icon_128997.png'
    },
    {
        name: 'zip',
        src: 'https://cdn.icon-icons.com/icons2/886/PNG/512/file-expand_Zip_icon-icons.com_68944.png'
    },
    {
        name: 'rar',
        src: 'https://cdn.icon-icons.com/icons2/886/PNG/512/file-expand_Zip_icon-icons.com_68944.png'
    },
    {
        name: 'link',
        src: 'https://cdn.icon-icons.com/icons2/906/PNG/512/link_icon-icons.com_70055.png'
    },
]

//


export { SubjectList, LanguageList, TypeList, LevelList, DurationList, SkillsList, FileIconList }