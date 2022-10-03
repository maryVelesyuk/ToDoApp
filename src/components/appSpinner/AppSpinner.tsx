import React from "react";
import Spinner from "../spinner/Spinner";
import s from "./AppSpinner.module.css";

export const AppSpinner: React.FC = () => {
  return (
    <div className={s.app_spinner}>
      <div className={s.spinner}>
        <Spinner />
      </div>
    </div>
  );
};
