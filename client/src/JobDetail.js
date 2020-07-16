import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { loadJob } from "./graphqlRequests";

export const JobDetail = () => {
  const [job, setJob] = useState(null);
  const { jobId } = useParams();

  useEffect(() => {
    async function getJob() {
      setJob(await loadJob(jobId));
    }
    getJob();
  }, [jobId]);

  if (!job) return null;
  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
