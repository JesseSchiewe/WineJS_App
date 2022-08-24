import React from 'react';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#ffffff',
  backgroundColor: '#000000'
};
const groupBadgeStyles = {
  backgroundColor: '#000000',
  borderRadius: '0em',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: 12,
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
  control: styles => ({ ...styles, backgroundColor: 'black' }),
  option: (styles, { data }) => ({...styles, backgroundColor: 'black', color:data.color}),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
    backgroundColor: '#1a1a1d',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    backgroundColor: '#1a1a1d',
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};
