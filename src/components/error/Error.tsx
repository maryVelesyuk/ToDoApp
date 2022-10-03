import React from "react";
import s from "./Error.module.css";

interface ErrorProps {
  error: string | null | undefined;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return <div className={s.error}>{error}</div>;
};
