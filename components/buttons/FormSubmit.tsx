"use client";

import React from "react";
import { Button } from "../ui/button";

interface IFormSubmit {
  action: string;
  handleSubmit: () => void;
  handleEdit: () => void;
  isSubmitting: boolean;
  thread: string;
}

const FormSubmit: React.FC<IFormSubmit> = ({
  action,
  handleSubmit,
  handleEdit,
  isSubmitting,
  thread,
}): JSX.Element => {
  return (
    <Button
      onClick={action === "create" ? handleSubmit : handleEdit}
      variant="default"
      type="submit"
      disabled={isSubmitting || !thread}
    >
      {isSubmitting ? "Submitting..." : action === "create" ? "Create" : "Edit"}
    </Button>
  );
};

export default FormSubmit;
