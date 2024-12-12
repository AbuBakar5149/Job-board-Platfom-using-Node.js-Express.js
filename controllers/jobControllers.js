const Jobs = require("../models/jobs");
const getWelcomeMessage = (req, res, router) => {
  const welcomeMessage =
    "Welcome to our Job Board Platform! Below are all the available routes";

  const getAllRoutesInfo = () => {
    const routesInfo = [];
    router.stack.forEach((route) => {
      if (route.route) {
        const routeInfo = {
          path: route.route.path,
          methods: route.route.methods,
        };
        routesInfo.push(routeInfo);
      }
    });
    return routesInfo;
  };

  const allRoutesInfo = getAllRoutesInfo();
  res.send(
    `<h1>${welcomeMessage}</h1><pre>${JSON.stringify(
      allRoutesInfo,
      null,
      2
    )}</pre>`
  );
};

// Controller to list all jobs
const listAllJobs = async (req, res) => {
  try {
    const allJobs = await Jobs.findAll();
    if (allJobs.length === 0) {
      return res.status(200).json({ message: "Oops! No Jobs Found" });
    }
    return res
      .status(200)
      .json({ message: `${allJobs.length} Jobs Found`, Jobslist: allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to post a new job
const postJob = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      location,
      experienceInYear,
      salaryInLPA,
      jobdescription,
    } = req.body;

    const existingJob = await Jobs.findOne({ where: { jobTitle, company } });
    if (existingJob) {
      return res.status(201).send({
        message: "Job Already Posted!",
        description: `${existingJob.jobTitle} job from ${existingJob.company} already exists!`,
      });
    }

    const newJob = await Jobs.create({
      jobTitle,
      company,
      location,
      experienceInYear,
      salaryInLPA,
      jobdescription,
    });
    return res
      .status(200)
      .send({
        status: "Okay",
        message: "Job Posted Successfully!",
        data: newJob,
      });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

// Controller to filter jobs based on criteria
const filterJobs = async (req, res) => {
  try {
    const { jobTitle, company, location, experienceInYear, salaryInLPA } =
      req.body;

    if (
      !jobTitle &&
      !company &&
      !location &&
      !experienceInYear &&
      !salaryInLPA
    ) {
      return res
        .status(400)
        .json({ error: "At least one filter criteria is required" });
    }

    const filter = {};
    if (jobTitle) filter.jobTitle = jobTitle;
    if (company) filter.company = company;
    if (location) filter.location = location;
    if (experienceInYear) filter.experienceInYear = experienceInYear;
    if (salaryInLPA) filter.salaryInLPA = salaryInLPA;

    const filteredJobs = await Jobs.findAll({ where: filter });
    return res.status(200).json({
      message: `${filteredJobs.length} Filtered Jobs Found`,
      jobs: filteredJobs,
    });
  } catch (error) {
    console.error("Error filtering jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to calculate job statistics
const calculateJobStats = async (req, res) => {
  try {
    const allJobs = await Jobs.findAll();

    if (allJobs.length === 0) {
      return res
        .status(200)
        .json({ message: "No jobs available for calculations" });
    }

    const totalSalaries = allJobs.reduce(
      (sum, job) => sum + job.salaryInLPA,
      0
    );
    const averageSalary = totalSalaries / allJobs.length;

    return res
      .status(200)
      .json({
        status: "Okay",
        message: "Calculation results",
        totalJobs: allJobs.length,
        averageSalary,
      });
  } catch (error) {
    console.error("Error performing calculations on jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getWelcomeMessage,
  listAllJobs,
  postJob,
  filterJobs,
  calculateJobStats,
};
