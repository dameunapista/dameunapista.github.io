import React from 'react';
import ReactDOM from 'react-dom';
import ReactStars from 'react-stars';
import FaExternalLink from 'react-icons/lib/fa/external-link';

export function linkFormatter(cell, row){
  return <a href={cell} target="_blank"><FaExternalLink color="black" size="16" /></a>
}

export function NumEscapes(props){
  return (
    <label id="lblNumEscapes">{props.value}</label>
  );
}

export function starsFormatter(cell, row){
  return <ReactStars value={cell} count={3} edit={false}/>;
}