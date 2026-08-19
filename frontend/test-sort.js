const rawJobs = [
  { recordId: "upsc-2016", title: "UPSC 2016" },
  { recordId: "upsc-2026", title: "UPSC 2026" },
  { recordId: "upsc-2018", title: "UPSC 2018" },
  { recordId: "upsc-2017", title: "UPSC 2017" },
];

const jobs = rawJobs.sort((a, b) => {
  const getFourDigits = (str) => {
    if (!str) return 0;
    const match = str.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  };
  
  const numA = getFourDigits(a.recordId);
  const numB = getFourDigits(b.recordId);
  
  if (numA !== numB) {
    return numB - numA; // High to low
  }
  
  return 0;
});

console.log(jobs);
