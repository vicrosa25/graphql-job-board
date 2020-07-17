import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { loadCompany } from "./graphqlRequests";
import { JobList } from "./JobList";

export const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    async function getCompany() {
      setCompany(await loadCompany(companyId));
    }
    getCompany();
  }, [companyId]);

  return company ? (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  ) : null;
};
