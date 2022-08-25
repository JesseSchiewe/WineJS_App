import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function HorizontalSelector(props) {

    console.log(props);

    return(
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                //   width: 'fit-content',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                //   bgcolor: 'background.paper',
                    color: 'text.secondary',
                    '& svg': {
                    m: 1.5,
                    },
                    '& hr': {
                    mx: 0.5,
                    },
                }}
                >
                <Stack className="HorizontalStack" direction="row" spacing={0.1} >            
                    {props.options.map((title)=>{
                        return(
                            <button key={title} className='HorizontalMenuButton' onClick={() => props.clickhandler(title)}>{title}</button>
                        )
                    })}
                </Stack>        
            </Box>
        </div>
    );
}