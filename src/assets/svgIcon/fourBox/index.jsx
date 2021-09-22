import React from 'react';

function FourBox() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="4.61538"
        height="4.61538"
        rx="1"
        transform="matrix(-1 0 0 1 4.61523 6.61719)"
        fill="white"
      />
      <rect
        width="4.61538"
        height="4.61538"
        rx="1"
        transform="matrix(-1 0 0 1 11.2305 0)"
        fill="white"
      />
      <rect
        x="-0.25"
        y="0.25"
        width="4.11538"
        height="4.11538"
        rx="0.75"
        transform="matrix(-1 0 0 1 10.7305 6.61719)"
        stroke="white"
        stroke-width="0.5"
      />
      <rect
        x="-0.25"
        y="0.25"
        width="4.11538"
        height="4.11538"
        rx="0.75"
        transform="matrix(-1 0 0 1 4.11523 0)"
        stroke="white"
        stroke-width="0.5"
      />
    </svg>
  );
}

export default FourBox;
