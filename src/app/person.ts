export class Person {
  id: number;
  name: string;
  url: string;
  birth_year: string;
}

export class GetPeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: Person[];
}

export const defaultPeopleResponse: GetPeopleResponse = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};
