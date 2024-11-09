import { DocumentProvider } from "@/context/document-context";
import React from "react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DocumentProvider>{children}</DocumentProvider>
  );
};

export default AdminLayout;
