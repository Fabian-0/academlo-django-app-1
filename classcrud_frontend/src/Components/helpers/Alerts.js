import React from "react";

export function FormError({ error }) {
  return (
    <div className="alert alert-warning my-3" role="alert">
      <span>{error}</span>
    </div>
  )
};

export function AlertDangerous({alertText}) {
  return (
    <div className="alert alert-danger d-flex align-items-center my-3" role="alert">
      <div>
        {alertText}
      </div>
    </div>
  )
}