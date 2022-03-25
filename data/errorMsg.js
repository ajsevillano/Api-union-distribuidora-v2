export const errorMsgs = [
  {
    name: 'notValidId',
    response: {
      code: 400,
      status: 'Not a valid ID',
      message: 'The product id must be a valid number',
    },
  },
  {
    name: 'notValidRange',
    response: {
      code: 400,
      status: 'Not a valid range',
      message: 'Not a valid range for the ID',
    },
  },
  {
    name: 'errorMsgNoBody',
    response: {
      code: 400,
      status: `The body can't be empty`,
      message: `An object with the fields: needs to be send as body`,
    },
  },
  {
    name: 'errorInvalidFilter',
    response: {
      code: 400,
      status: `Filter not found`,
      message: `Only "category" filter is allowed`,
    },
  },
  {
    name: 'tooManyFilters',
    response: {
      code: 400,
      status: `Only one filter`,
      message: `This API only takes the filter category at this time`,
    },
  },
  {
    name: 'queryCantBeEmpty',
    response: {
      code: 400,
      status: `The filter can't be empty`,
      message: `The filter value can't be empty`,
    },
  },
];
