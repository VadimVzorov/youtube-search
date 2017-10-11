import { Filter } from './filter';

export const FILTERS: Filter[] = [
  {id: 0, name: 'Video Language (2 letters e.g. EN for English)', data_type: 'text', answer: ''},
  {id: 1, name: 'Channel Keywords', data_type: 'text', answer: '' },
  {id: 2, name: 'Min. subscribers', data_type: 'number', answer: ''},
  {id: 3, name: 'Max. subscribers', data_type: 'number', answer: ''},
];
