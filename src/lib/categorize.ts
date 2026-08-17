export function categorizeJobs(jobs: any[]) {
  const categorized: Record<string, any[]> = {
    'Result': [],
    'Admit Card': [],
    'Latest Job': [],
    'Answer Key': [],
    'Syllabus': [],
    'Admission': [],
    'Certificate': [],
    'Outsourcing/Offline Job': [],
    'Important': []
  };

  jobs.forEach((job: any) => {
    const slug = (job.recordId || '').toLowerCase();
    const title = (job.title || '').toLowerCase();
    const cat = (job.category || '').toLowerCase();
    
    const match = (word: string) => slug.includes(word) || title.includes(word) || cat.includes(word);

    if (match('result')) categorized['Result'].push(job);
    else if (match('admit card') || match('admitcard')) categorized['Admit Card'].push(job);
    else if (match('answer key') || match('answerkey')) categorized['Answer Key'].push(job);
    else if (match('syllabus')) categorized['Syllabus'].push(job);
    else if (match('admission')) categorized['Admission'].push(job);
    else if (match('certificate')) categorized['Certificate'].push(job);
    else if (match('offline') || match('outsourcing')) categorized['Outsourcing/Offline Job'].push(job);
    else if (match('important') || match('scholarship')) categorized['Important'].push(job);
    else categorized['Latest Job'].push(job);
  });

  // Sort alphabetically by title
  for (const key in categorized) {
    categorized[key].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  }

  return categorized;
}
