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

// export const RedWineFlavorSelector = (changeaction) => (
//   // set value for default selection
//   const [selectedValue, setSelectedValue] = useState([]);
//   // handle onChange event of the dropdown
//   const handleChange = (e) => {
//     setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
//   }

//     <Select
//         closeMenuOnSelect={false}
//         isMulti        
//         name="redWineFlavorSelector"
//         placeholder="Flavor Selector"
//         options={RedWineFlavorOptions}
//         formatGroupLabel={formatGroupLabel}
        
//         value={RedWineFlavor.filter(obj => selectedValue.includes(obj.value))} // set selected values
//         onChange={handleChange}

//         // onChange={([...selected]) => {
//         //   //console.log([selected])
//         //   //return([selected])
//         //   console.log(selectedValue)
//         // }}

//         // onChange={() => {
//         //   handleChange()
//         // }}

// /*         // onChange={([...selected]) => {
//         //   // React Select return object instead of value for selection
//         //   // return { value: selected };
//         //   setValue(selected)
//         //   console.log([selected])
//         // }} */

//         //onChange={console.log([selected])}
//         //onChange={console.log([this.Select])}
//         // onMenuClose={{RedWineFlavorOptions: e ? e.map(x => x.value) : [] }}
        
//         // onChange={(e) => {
//         //     let value = Array.from(e.target.selectedOptions, option => option.value);
//         //     this.setState({values: value});
//         //     console.log(value)
//         // }}

//         styles={colorStyles}
//     />
// );

// export const RedWineFlavorSelector = (setval) => {
//   // set value for default selection
//   const [selectedValue, setSelectedValue] = useState([]);
//   // handle onChange event of the dropdown
//   const handleChange = (e) => {
//     setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
//     console.log(selectedValue)
//   }
//   // const handleMenuClose = ([...selected]) => {
//   //   //setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
//   //   console.log(selected)
//   //   //setSelectedValue([e]);
//   //   console.log(selectedValue)
//   // }

//   return(
//     <Select
//         closeMenuOnSelect={false}
//         isMulti        
//         name="redWineFlavorSelector"
//         placeholder="Flavor Selector"
//         options={RedWineFlavorOptions}
//         formatGroupLabel={formatGroupLabel}
//         defaultValue=""
//         onChange={([...selected]) => {
//           //console.log([selected])
//           //return([selected])
//           setSelectedValue(selected)
//           console.log(selected)
//           console.log(selectedValue)
//         }}
        
//         //value={RedWineFlavorOptions.filter(obj => selectedValue.includes(obj.value))} // set selected values
//         //onChange={handleChange}
//       //onMenuClose={handleMenuClose}
//         // onMenuClose={([...selected]) => {
//         //   //console.log([selected])
//         //   //return([selected])
//         //   console.log(selected)
//         // }}


//         styles={colorStyles}
//     />
//   )
// };

