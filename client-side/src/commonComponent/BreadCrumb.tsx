import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";
interface BreadcrumbProps {
  data: { key?: any; urllink?: string; icon: React.ReactNode; label: string }[];
}

const BreadcrumbProp: React.FC<BreadcrumbProps> = ({ data }) => {
  return (
    <div>
      <Breadcrumbs className="breadcrump">
        {data.map((bred) => (
          <a className="breadcrum-items" color="inherit">
            {bred.key}
            {bred.icon}
            {bred.label}
          </a>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbProp;
