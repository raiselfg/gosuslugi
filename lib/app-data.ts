export const appInfo = {
  name: "Госуслуги",
  description: "Приложение Госуслуги",
  pageTitle: "Многодетная семья",
  lang: "ru",
} as const;

export const familyDocument = {
  title: "УДОСТОВЕРЕНИЕ МНОГОДЕТНОЙ СЕМЬИ",
  number: "104000003205937",
  statusLabel: "Статус многодетной семьи",
  status: "Установлен",
  establishedDateLabel: "Дата установления статуса",
  establishedDate: "29.10.2025",
  authorityLabel: "Орган, установивший статус",
  authority: "Администрация Фрунзенского района Санкт-Петербурга",
} as const;

export const familyMembers = {
  representatives: [
    {
      name: "ШЕВЧУК КАРИНА АРМАИСОВНА",
      support: "Бессрочно",
      birthDate: "08.02.1978",
    },
    {
      name: "ШЕВЧУК СЕРГЕЙ АЛЕКСЕЕВИЧ",
      support: "Бессрочно",
      birthDate: "05.10.1979",
    },
  ],
  children: [
    {
      name: "ШЕВЧУК МАРГАРИТА СЕРГЕЕВНА",
      support: "до 30.06.2029",
      birthDate: "13.07.2001",
    },
    {
      name: "ШЕВЧУК СОФЬЯ СЕРГЕЕВНА",
      support: "до 30.06.2029",
      birthDate: "19.10.2007",
    },
    {
      name: "ШЕВЧУК РОМАН СЕРГЕЕВИЧ",
      support: "до 30.06.2029",
      birthDate: "17.02.2014",
    },
  ],
} as const;

export const uiText = {
  back: "Назад",
  menu: "Меню",
  share: "Поделиться",
  documentDetails: "детали документа",
  flipCard: "Перевернуть",
  fullNameAndAge: "ФИО и возраст",
  legalRepresentatives: "Законные представители",
  children: "Дети",
  socialSupportActive: "Социальная поддержка действует",
  birthDate: "Дата рождения",
} as const;

export const installPromptText = {
  title: "Установить приложение",
  nativeDescription: "Будет доступно быстрее и сможет открываться offline",
  ios: "В Safari нажмите «Поделиться» → «На экран Домой».",
  android:
    "Откройте меню браузера ⋮ → «Установить приложение» или «Добавить на главный экран».",
  firefox:
    "Откройте меню браузера и выберите установку или добавление приложения на экран.",
  default:
    "Если системная кнопка не появилась, откройте меню браузера → «Установить приложение».",
  installButton: "Установить",
  dismissInstall: "Скрыть установку приложения",
} as const;

const getAgeWord = (age: number) => {
  const lastTwoDigits = age % 100;
  const lastDigit = age % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "лет";
  }

  if (lastDigit === 1) {
    return "год";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "года";
  }

  return "лет";
};

export const calcAge = (birthDate: string) => {
  const [day, month, year] = birthDate.split(".").map(Number);
  const birth = new Date(year, month - 1, day);
  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();
  const hasNotHadBirthdayThisYear =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());

  if (hasNotHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

export const formatPersonWithAge = (person: {
  name: string;
  birthDate: string;
}) => {
  const age = calcAge(person.birthDate);

  return `${person.name}, ${age} ${getAgeWord(age)}`;
};
