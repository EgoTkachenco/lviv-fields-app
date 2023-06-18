import { FIELD_TYPES } from '../../store/help/constants'

export const model = [
  { id: 'identifier', name: '№ п/п' },
  { id: 'area', name: 'Районування' },
  { id: 'field', name: '№ поля' },
  { id: 'plant_year', name: 'рік посадки поля' },
  {
    id: 'landlord_by_public_cadastral',
    name: 'Орендодавець згідно Публічної кадастрової карти',
  },
  { id: 'cadastr', name: 'Кадастровий номер' },
  { id: 'size', name: 'Площа земельної ділянки, га', type: 'number' },
  { id: 'contract_date', name: 'Дата договору', type: 'date' },
  { id: 'lease_term', name: 'Строк оренди, років', type: 'number' },
  {
    id: 'lease_term_in_contract',
    name: 'Строк оренди у договорі орендодавця',
    type: 'number',
  },
  { id: 'percent', name: '%', type: 'number' },
  { id: 'owner_dismatch', name: 'Не співпадає власник згідно державного акту' },
  { id: 'note', name: 'Примітки' },
  {
    id: 'sublease_MRIA_FARMING',
    name: 'Договір суборенди ТОВ "МРІЯ ФАРМІНГ ЛЬВІВ"до 06.06.2021 (7 років)',
  },
  {
    id: 'sublease_Colodiy_Mykola',
    name: 'Договір суборенди Колодій Микола Іванович',
  },
  {
    id: 'state_registration_date',
    name: 'Дата державної реєстрації права',
    type: 'date',
  },
  {
    id: 'assessment_date',
    name: 'Дата оцінки ділянки, згідно Держгеокадастру',
    type: 'date',
  },
  { id: 'sum', name: 'Сума, грн', type: 'number' },

  { id: 'state_act_number', name: 'Серія, номер державного акту' },
  { id: 'state_act_date', name: 'Дата видачі державного акту', type: 'date' },
  { id: 'field_type', name: 'Тип землі' },
  { id: 'passport', name: 'Паспорт' },
  { id: 'passport_who', name: 'Виданий ким' },

  { id: 'passport_date', name: 'Виданий, дата', type: 'date' },
  { id: 'identifier_code', name: 'Ідентифікаційний номер' },
  { id: 'phone', name: 'телефон' },
  { id: 'note_2', name: 'примітка' },
  { id: 'additional_relation', name: "Родинний зв'язок" },
  { id: 'additional_name', name: 'ПІБ' },
  { id: 'additional_passport', name: 'паспорт' },
  { id: 'additional_code', name: 'ідентифікаційний код' },
  { id: 'additional_phone', name: 'телефон' },
]
export const sizes = [
  '250px',
  '100px',
  '90px',
  '370px',
  '305px',
  '220px',
  '136px',
  '172px',
  '292px',
  '52px',
  '340px',
  '140px',
  '360px',
  '208px',
  '250px',
  '100px',
  '100px',

  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
]
export const owner_sizes = [
  '250px',
  '250px',
  '300px',
  '300px',
  '300px',
  '250px',
  '200px',
  '150px',
  '250px',
  '250px',
  '250px',
  '300px',
  '300px',
  '400px',
  '300px',
]
export const field_sizes = [
  '250px',
  '200px',
  '300px',
  '150px',
  '150px',
  '200px',
  '300px',
]
export const plantation_sizes = ['250px', '100px', '300px', '150px', '150px']

export const owner_model = [
  { id: 'cadastr', name: 'Кадастровий номер', isRead: true },
  { id: 'type', name: 'Тип', isRead: true, type: 'relation' },
  { id: 'contract_name', name: 'Договір', isRead: true, notFilterable: true },
  {
    id: 'contract_start',
    name: 'Дата укладання',
    isRead: true,
    notFilterable: true,
  },
  {
    id: 'contract_note',
    name: 'Примiтки до договору',
    isRead: true,
    notFilterable: true,
  },
  // {
  //   id: 'rent_contract',
  //   name: 'Оренда(№договору, дата, дод.угода)',
  //   isRead: true,
  // },
  // {
  //   id: 'owner_contract',
  //   name: 'Власність(№договору, дата, дод.угода)',
  //   isRead: true,
  // },
  // {
  //   id: 'sub_contract',
  //   name: 'Суборенда (№договору, дата, дод.угода)',
  //   isRead: true,
  // },
  { id: 'full_name', name: 'ПІБ' },
  { id: 'birth_date', name: 'Дата народження', type: 'date' },
  { id: 'passport', name: 'Паспорт', notFilterable: true },
  { id: 'passport_who', name: 'Ким видано паспорт', notFilterable: true },
  { id: 'passport_date', name: 'Дата видачі паспорту', notFilterable: true },
  { id: 'iin', name: 'ІПН' },
  { id: 'registration_address', name: 'Місце реєстрації', notFilterable: true },
  { id: 'address', name: 'Місце проживання', notFilterable: true },
  { id: 'phone', name: 'Телефон' },
  {
    id: 'note',
    name: "Примітка(родинний зв'язок, телефон)",
    notFilterable: true,
  },
]
export const field_model = [
  { id: 'cadastr', name: 'Кадастровий номер', isRead: true },
  { id: 'size', name: 'Площа земельної ділянки' },
  { id: 'location', name: '№ поля', type: 'relation' },
  { id: 'area_size', name: 'Площа поля' },
  { id: 'plant_year', name: 'Рік засадження' },
  {
    id: 'repair',
    name: 'Ремонт поля (рік, к-сть рядів, поле)',
    notFilterable: true,
  },
  {
    id: 'note',
    name: 'Примітка (нормативно-грошова оцінка по роках)',
    notFilterable: true,
  },
]
export const plantation_model = [
  { id: 'cadastr', name: 'Кадастровий номер', isRead: true },
  { id: 'location', name: '№ поля', isRead: true, type: 'relation' },
  {
    id: 'plantations',
    name: 'Сорт/к-сть рядів',
    isRead: true,
    notFilterable: true,
  },
  {
    id: 'harvest',
    name: 'Врожай (рік/кг)',
  },
  {
    id: 'harvest_tier',
    name: 'Клас (рік/I,II,III)',
  },
]

export const formatOwner = (el) => {
  return {
    ...el,
    type: FIELD_TYPES[el.field.type],
    contract_name: el.field.contract_name,
    contract_start: el.field.contract_start,
    contract_note: el.field.contract_note,
    cadastr: el?.field.cadastr,
  }
}

export const formatField = (el) => {
  return {
    ...el,
    cadastr: el.cadastr,
    location: el.area.name,
  }
}

export const formatPlantation = (el) => {
  return {
    ...el,
    cadastr: el.cadastr,
    location: el.area?.name,
    plantations: el.plantations.map((el) => (
      <div key={el.id}>
        {el?.variety?.name || '---'} - {el.size || 0}
      </div>
    )),
  }
}
