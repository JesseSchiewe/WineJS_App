import chroma from 'chroma-js';
import React from 'react';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#ffffff',
  backgroundColor: '#000000',
};
const groupBadgeStyles = {
  backgroundColor: '#000000',
  borderRadius: '0em',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: 10,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  // padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export const formatGroupLabel = data => (
  <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export const colorStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'black' }),
  menu: (styles) => ({ ...styles, backgroundColor: 'black' }),
  input: (styles) => ({ ...styles, color: 'white'  }),
  // group: ( styles, data ) => ({ ...styles, backgroundColor: 'black' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.4).css()
          : undefined,
      },
      margin: '0px',
      padding: '0px',
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
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.2).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};