import React from 'react';

export const Badge = ({ status }) => {
  const styles = {
    CONFIRMED: "bg-success/15 text-success border border-success/20",
    FAILED: "bg-danger/15 text-danger border border-danger/20",
    PENDING: "bg-warning/15 text-warning border border-warning/20",
    "LOW STOCK": "bg-warning/15 text-warning border border-warning/20 pulse-subtle",
    "IN STOCK": "bg-success/15 text-success border border-success/20",
    "OUT OF STOCK": "bg-danger/15 text-danger border border-danger/20"
  };

  const badgeStyle = styles[status] || "bg-muted/15 text-muted-foreground border border-muted/20";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${badgeStyle}`}>
      {status}
    </span>
  );
};
