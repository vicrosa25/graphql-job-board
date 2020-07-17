const db = require("./db");

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  company: (root, args) => db.companies.get(args.id),
  jobs: () => db.jobs.list()
};

const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  }
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Mutation, Company, Job };
