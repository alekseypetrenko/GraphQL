import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_root, { id }) => Company.findById(id),
  },

  Mutation: {
    createJob: (_root, { input }, { auth }) => {
      if (!auth) {
        throw new Error("unauthorized");
      }
      return Job.create(input);
    },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
