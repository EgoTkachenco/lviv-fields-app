export const SETTINGS_LOCALE_STORAGE_KEY =
  process.env.NEXT_PUBLIC_SETTINGS_LOCALE_STORAGE_KEY || 'lviv_map_1.1_conf'
export const TOKEN_NAME =
  process.env.NEXT_PUBLIC_TOKEN_NAME || 'lviv_map_access_token'
export const USER_STORE_NAME =
  process.env.NEXT_PUBLIC_USER_STORE_NAME || 'lviv_map__user'

export const FIELD_TYPES = {
  // owned: 'Власні земельні ділянки',
  // rented: 'Орендовані земельні ділянки',
  // risk: 'Ризикові земельні ділянки',
  owned: 'Власні ділянки',
  rented: 'Орендовані ділянки',
  subrent: 'Інші ділянки',
}

export const FIELD_TYPES_COLORS = {
  owned: '#008000',
  rented: '#ffff00',
  subrent: '#6699CC',
}

export const FIELD_CATEGORIES = {
  free: 'Вільні ділянки',
  planted: 'Засаджені ділянки',
  // uprooted: 'Викорчувані ділянки',
}

export const MAP_TYPES = {
  registry: 'Реєстр',
  plantation: 'Насадження',
}

export const VARIETIES_COLORS = {
  'Ред Джонапринца': '#CD6B92',
  Гала: '#FF9A91',
  Пінова: '#FF8D54',
  'Гренні Сміт': '#BAE8B7',
  Голден: '#FFE779',
  Айдаред: '#FD777A',
  Моді: '#F12E5F',
  Фуджі: '#F26161',
  'Ред-Чіф': '#D7436F',
  'Грін Стар': '#EBF791',
  Флорина: '#EE96B2',
}
