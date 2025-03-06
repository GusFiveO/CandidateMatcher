type Candidate = {
  name: string;
  email: string;
  phone: string;
  experiences: {
    title: string;
    company: string;
    duration: string;
  }[];
};

type SampleData = {
  candidate: Candidate;
  analysis: string;
};

export const sampleData: SampleData[] = [
  {
    candidate: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1234567890",
      experiences: [
        {
          title: "Software Engineer",
          company: "Tech Innovators",
          duration: "2 years",
        },
        {
          title: "Junior Developer",
          company: "Code Masters",
          duration: "1 year",
        },
      ],
    },
    analysis:
      "Alice has 3 years of experience in software development with a steady progression in roles.",
  },
  {
    candidate: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+0987654321",
      experiences: [
        {
          title: "Data Analyst",
          company: "Data Insights Inc.",
          duration: "4 years",
        },
        { title: "Intern", company: "Number Crunchers", duration: "6 months" },
      ],
    },
    analysis:
      "Bob has extensive experience in data analysis with a strong foundation as an intern.",
  },
  {
    candidate: {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+1122334455",
      experiences: [
        {
          title: "Project Manager",
          company: "Efficient Solutions",
          duration: "5 years",
        },
        {
          title: "Team Lead",
          company: "Agile Innovators",
          duration: "3 years",
        },
      ],
    },
    analysis:
      "Charlie has significant leadership experience with a strong background in project management.",
  },
  {
    candidate: {
      name: "Diana Prince",
      email: "diana.prince@example.com",
      phone: "+6789012345",
      experiences: [
        {
          title: "UX Designer",
          company: "Design Studios",
          duration: "3 years",
        },
        {
          title: "Graphic Designer",
          company: "Creative Minds",
          duration: "2 years",
        },
      ],
    },
    analysis:
      "Diana has a diverse design background with expertise in both UX and graphic design.",
  },
  {
    candidate: {
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      phone: "+5566778899",
      experiences: [
        {
          title: "Cybersecurity Specialist",
          company: "Secure Systems",
          duration: "6 years",
        },
        { title: "IT Support", company: "Tech Solutions", duration: "1 year" },
      ],
    },
    analysis:
      "Ethan has a robust background in cybersecurity with initial experience in IT support.",
  },
  {
    candidate: {
      name: "Fiona Lee",
      email: "fiona.lee@example.com",
      phone: "+9988776655",
      experiences: [
        {
          title: "Marketing Manager",
          company: "Brand Builders",
          duration: "4 years",
        },
        {
          title: "Marketing Intern",
          company: "Ad Experts",
          duration: "8 months",
        },
      ],
    },
    analysis:
      "Fiona has a solid marketing background with experience in both managerial and intern roles.",
  },
  {
    candidate: {
      name: "George Clark",
      email: "george.clark@example.com",
      phone: "+4455667788",
      experiences: [
        {
          title: "Financial Analyst",
          company: "Money Matters",
          duration: "3 years",
        },
        { title: "Accountant", company: "Number Masters", duration: "2 years" },
      ],
    },
    analysis:
      "George has a strong financial background with experience in both analysis and accounting.",
  },
  {
    candidate: {
      name: "Hannah Davis",
      email: "hannah.davis@example.com",
      phone: "+3344556677",
      experiences: [
        {
          title: "HR Manager",
          company: "People Partners",
          duration: "5 years",
        },
        {
          title: "Recruitment Specialist",
          company: "Talent Finders",
          duration: "2 years",
        },
      ],
    },
    analysis:
      "Hannah has extensive HR experience with a focus on recruitment and management.",
  },
  {
    candidate: {
      name: "Ian White",
      email: "ian.white@example.com",
      phone: "+2233445566",
      experiences: [
        { title: "Sales Manager", company: "Sales Stars", duration: "4 years" },
        {
          title: "Sales Representative",
          company: "Product Movers",
          duration: "1 year",
        },
      ],
    },
    analysis:
      "Ian has a strong sales background with experience in both managerial and representative roles.",
  },
  {
    candidate: {
      name: "Julia Green",
      email: "julia.green@example.com",
      phone: "+1122334455",
      experiences: [
        { title: "Content Writer", company: "Wordsmiths", duration: "3 years" },
        { title: "Editor", company: "Story Crafters", duration: "2 years" },
      ],
    },
    analysis:
      "Julia has a strong background in content creation with experience in both writing and editing.",
  },
];
