import React from 'react';
import BeautyStars from "beauty-stars"
import { FaExternalLinkAlt } from 'react-icons/fa';

export function linkFormatter(cell, row){
  return <a href={cell} target="_blank"><FaExternalLinkAlt color="black" size="16" /></a>
}

export function NumEscapes(props){
  return (
    <label id="lblNumEscapes">{props.value}</label>
  );
}

export function starsFormatter(cell, row){
  return <BeautyStars value={cell} maxStars={3} editable={false} size={'18px'}/>;
}