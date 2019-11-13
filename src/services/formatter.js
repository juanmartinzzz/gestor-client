import React from "react";

export const date = date => {
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const dateString = date.toDateString();

  return `${dateString} a las ${hours}:${minutes}`;
};

export const currency = value =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const multiline = value => {
  if (value) {
    return value.split("\n").map((line, index) => <p key={index}>{line}</p>);
  }
};
