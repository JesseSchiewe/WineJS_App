export const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'black' }),
  menu: (styles) => ({ ...styles, backgroundColor: 'black' }),
  input: (styles) => ({ ...styles, color: 'white'  }),
  dropdownIndicator: (styles) => ({ ...styles, color: 'white'  }),
  // group: ( styles, data ) => ({ ...styles, backgroundColor: 'black' }),
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: 'black',
      color: 'white',

      ':active': {
        color: 'white',
      },
    };
  },
  singleValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'black',
      color: 'white',
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'black',
      color: 'white',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  }),
};