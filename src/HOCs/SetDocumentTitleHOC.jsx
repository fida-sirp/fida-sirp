import React, { useEffect } from 'react';

function SetDocumentTitleHOC(WrappedComponent) {
  return props => {
    useEffect(() => {
      document.title = props.title || 'SIRP';
    });

    return (
      // Wraps the input component in a container, without mutating it.
      <WrappedComponent {...props} />
    );
  };
}

export default SetDocumentTitleHOC;

// import React, { useEffect } from 'react';

// function SetDocumentTitleHOC(props) {
//   useEffect(() => {
//     document.title = <text>{props.title} | SIRP</text>;
//   });
//   return (
//     // Wraps the input component in a container, without mutating it.
//     <WrappedComponent {...props} />
//   );
// }
// export default SetDocumentTitleHOC;
