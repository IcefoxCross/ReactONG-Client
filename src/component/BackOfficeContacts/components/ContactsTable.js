import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const ContactsTable = ({ contactData }) => {
  const { name, phone, email, message, deletedAt } = contactData;
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{message}</TableCell>
      <TableCell>{new Date(deletedAt).toISOString().substring(0, 10)}</TableCell>
    </TableRow>
  );
};

export default ContactsTable;
