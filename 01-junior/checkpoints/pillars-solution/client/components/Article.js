
import React from 'react';

// exporting the constructor function (dumb component).

export default ({fullArticle}) => {
  const {title, content} = fullArticle

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
