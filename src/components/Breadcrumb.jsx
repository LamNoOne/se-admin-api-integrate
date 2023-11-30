import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react";
import { Fragment} from "react";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </React.Fragment>
  );
};

export default Breadcrumb;