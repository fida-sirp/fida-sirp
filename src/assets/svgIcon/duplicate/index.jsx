import React from 'react';

const Duplicate = props => (
  // <svg
  //   {...props}
  //   width="16"
  //   height="16"
  //   viewBox="0 0 25 25"
  //   fill="#FFF"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path
  //     d="M22 8.5V2.5C22 1.67157 21.3284 1 20.5 1H2.5C1.67157 1 1 1.67157 1 2.5V19C1 19.8284 1.67157 20.5 2.5 20.5H8.5"
  //     stroke="white"
  //     stroke-width="1.5"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  //   <path
  //     d="M1 5.5H22"
  //     stroke="white"
  //     stroke-width="1.5"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  //   <path
  //     fill-rule="evenodd"
  //     clip-rule="evenodd"
  //     d="M17.5 23.5C20.8137 23.5 23.5 20.8137 23.5 17.5C23.5 14.1863 20.8137 11.5 17.5 11.5C14.1863 11.5 11.5 14.1863 11.5 17.5C11.5 20.8137 14.1863 23.5 17.5 23.5Z"
  //     stroke="white"
  //     stroke-width="1.5"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  //   <path
  //     d="M17.5 14.5V20.5"
  //     stroke="white"
  //     stroke-width="1.5"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  //   <path
  //     d="M14.5 17.5H20.5"
  //     stroke="white"
  //     stroke-width="1.5"
  //     stroke-linecap="round"
  //     stroke-linejoin="round"
  //   />
  // </svg>

<svg 
width="18" 
height="18"
{...props} 
viewBox="0 0 25 25" 
fill="none" 
xmlns="http://www.w3.org/2000/svg"
>
<path d="M22 8.5V2.5C22 1.67157 21.3284 1 20.5 1H2.5C1.67157 1 1 1.67157 1 2.5V19C1 19.8284 1.67157 20.5 2.5 20.5H8.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 5.5H22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 23.5C20.8137 23.5 23.5 20.8137 23.5 17.5C23.5 14.1863 20.8137 11.5 17.5 11.5C14.1863 11.5 11.5 14.1863 11.5 17.5C11.5 20.8137 14.1863 23.5 17.5 23.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 14.5V20.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 17.5H20.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default Duplicate;
