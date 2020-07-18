import { isLoggedIn, getAccessToken } from "./auth";
const endPointURI = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables
    })
  };

  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }

  const response = await fetch(endPointURI, request);
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }
  return responseBody.data;
}

export async function createJob(input) {
  const mutation = `mutation CreateJob($input: CreateJobInput){
    job: createJob(input: $input) {
      id
      title
      description
    }
  }`;

  const { job } = await graphqlRequest(mutation, { input });
  return job;
}

export async function loadJob(id) {
  const query = `query JobQyery ($id: ID!){
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`;
  const { job } = await graphqlRequest(query, { id });
  return job;
}

export async function loadCompany(id) {
  const query = `query companyQyery ($id: ID!){
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const { company } = await graphqlRequest(query, { id });
  return company;
}

export async function loadJobs() {
  const query = `{
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}
