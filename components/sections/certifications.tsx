import Image from 'next/image'

type Certification = {
  title: string
  issuer: string
  issued?: string
  hours?: string
  badge?: string
  image?: string
}

export default function Certifications() {
  const certifications: Certification[] = [
    {
      title: 'AWS Academy Machine Learning Foundations',
      issuer: 'AWS Academy',
      issued: 'Apr 17, 2025',
      hours: '20 hours',
      badge: 'https://www.credly.com/go/8qsCD963',
      image: '/certificates/aws-ml.png',
    },
    {
      title: 'Google Cloud Computing Foundations Certificate',
      issuer: 'Google Cloud',
      issued: 'May 21, 2025',
      badge: 'https://www.credly.com/badges/fa0e7b15-7c0b-4f06-b236-323079d79cdc/public_url',
      image: '/certificates/google-cloud-foundations.png',
    },
    {
      title: 'NPTEL – Python for Data Science',
      issuer: 'NPTEL (IIT Madras)',
      issued: 'Aug 2024',
      badge: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs68/Course/NPTEL24CS68S23680336302691007.pdf',
      image: '/certificates/nptel-python-data-science.png',
    },
    {
      title: 'Build a Secure Google Cloud Network Skill Badge',
      issuer: 'Google Cloud',
      issued: 'May 21, 2025',
      badge: 'https://www.credly.com/badges/1c58e544-dcd7-4a30-bb6f-a611e6dffb53/public_url',
      image: '/certificates/gcp-secure-network.png',
    },
    {
      title: 'Operating Systems Basics',
      issuer: 'Cisco',
      issued: 'Oct 27, 2025',
      badge: 'https://www.credly.com/badges/d321c58f-9a6a-4855-bee9-542d72538d67/public_url',
      image: '/certificates/operating-systems-basics.png',
    },
    {
      title: 'Set Up an App Dev Environment on Google Cloud Skill Badge',
      issuer: 'Google Cloud',
      issued: 'May 21, 2025',
      badge: 'https://www.credly.com/badges/5b05029c-b59e-4fa0-b321-d19bcef81828/public_url',
      image: '/certificates/gcp-app-dev-env.png',
    },
    {
      title: 'Networking Basics',
      issuer: 'Cisco',
      issued: 'Nov 03, 2025',
      badge: 'https://www.credly.com/badges/96d945d8-c9d4-47d9-ac56-645bdd02d58a/public_url',
      image: '/certificates/networking-basics.png',
    },
    {
      title: 'Prepare Data for ML APIs on Google Cloud Skill Badge',
      issuer: 'Google Cloud',
      issued: 'May 21, 2025',
      badge: 'https://www.credly.com/badges/66adece9-9b78-480a-bc63-4a939fee01ff/public_url',
      image: '/certificates/gcp-ml-apis.png',
    },
    {
      title: 'Infosys Springboard – Principles of Generative AI Certification',
      issuer: 'Infosys',
      issued: 'Jun 30, 2025',
      badge: 'https://verify.onwingspan.com',
      image: '/certificates/Infosys_Springboard_AI.png',
    },
    {
      title: 'Scaler – Python Course for Beginners (Certificate of Excellence)',
      issuer: 'Scaler',
      issued: 'Jan 18, 2025',
      badge: 'https://moonshot.scaler.com/s/sl/r9Pn4uZ0cP?_gl=1*wcf5ou*_gcl_aw*R0NMLjE3NzA1NDM0MDcuQ2owS0NRaUFoYUhNQmhEMkFSSXNBUEFVX0Q0VnQzV2gtVnFfVThWRmVfMWxxanpvX28ydjZjWkZnZEVTN0Z2YV9MNzJsa0JwYmUwbnhVOGFBdC14RUFMd193Y0I.*_gcl_au*MTUyNjc2ODQ2NS4xNzcwNTQzMzc0LjYyMjY0NzU5Mi4xNzcwNTQzMzc4LjE3NzA1NDM0MDY.*FPAU*MTUyNjc2ODQ2NS4xNzcwNTQzMzc0*_ga*NjQ3ODU0NTA2LjE3NzA1NDMzNzg.*_ga_53S71ZZG1X*czE3NzA1NDMzNzckbzEkZzEkdDE3NzA1NDM0NDckajUyJGwwJGgxMTQ0MDEyOTYz',
      image: '/certificates/Scaler%20python.png',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Certifications & Badges
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/60 hover:shadow-lg transition-all flex flex-col gap-4"
            >
              <div className="flex-1 flex flex-col gap-4">
                {cert.image && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted/20">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground leading-tight">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                  {(cert.issued || cert.hours) && (
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {cert.issued && <span className="px-2 py-1 rounded-full bg-muted/20">Issued {cert.issued}</span>}
                      {cert.hours && <span className="px-2 py-1 rounded-full bg-muted/20">{cert.hours}</span>}
                    </div>
                  )}
                </div>
              </div>

              {cert.badge && (
                <div className="mt-auto">
                  <a
                    href={cert.badge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    View credential
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
