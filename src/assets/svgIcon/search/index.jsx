import React from 'react';

function Search({ stroke = '#BDBDBD' }) {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5784 12.535C13.4447 11.3748 14.7808 8.22136 13.5626 5.49152C12.3445 2.76168 9.03333 1.4892 6.167 2.64936C3.30067 3.80951 1.96457 6.96297 3.18273 9.69281C4.40089 12.4226 7.71202 13.6951 10.5784 12.535Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.3594 11.3906L16.733 15.5565"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default Search;
