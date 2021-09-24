import React from 'react';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export const formatGroupLabel = data => (
  <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export const colorStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data }) => ({...styles, backgroundColor: 'white', color:data.color}),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
    backgroundColor: '#F9F7FF',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    backgroundColor: '#F9F7FF',
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};
