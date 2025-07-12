import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // Clear existing data
  await prisma.contact.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.settings.deleteMany()
  await prisma.technology.deleteMany()
  await prisma.certification.deleteMany()

  // Create settings
  await prisma.settings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Ramy Bouchareb Portfolio",
      siteDescription: "DevOps-focused Full-Stack Developer",
      email: "ramy@ramybouchareb.me",
      phone: "+216 54 123 456",
      location: "Tunis, Tunisia",
      githubUrl: "https://github.com/RamyBouchareb25",
      linkedinUrl: "https://linkedin.com/in/ramy-bouchareb",
      twitterUrl: "https://twitter.com/ramybouchareb",
    },
  })

  // Create sample projects
  const projectsData = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with Next.js and Stripe",
      longDescription:
        "A comprehensive e-commerce platform built with Next.js, featuring user authentication, product management, shopping cart, and payment processing with Stripe.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://ecommerce.example.com",
      featured: true,
      order: 1,
    },
    {
      title: "DevOps Dashboard",
      description: "Monitoring dashboard for containerized applications",
      longDescription:
        "A real-time monitoring dashboard for Docker containers and Kubernetes clusters, built with React and integrated with Prometheus and Grafana.",
      technologies: ["React", "Docker", "Kubernetes", "Prometheus", "Grafana"],
      githubUrl: "https://github.com/example/devops-dashboard",
      featured: true,
      order: 2,
    },
  ]

  const projects = await Promise.all(
    projectsData.map(async (project) => {
      return prisma.project.create({
        data: project,
      })
    }),
  )

  // Create sample skills
  const skillsData = [
    { name: "JavaScript", category: "Frontend", level: 90, icon: "🟨", color: "#f7df1e", order: 1 },
    { name: "TypeScript", category: "Frontend", level: 85, icon: "🔷", color: "#3178c6", order: 2 },
    { name: "React", category: "Frontend", level: 88, icon: "⚛️", color: "#61dafb", order: 3 },
    { name: "Next.js", category: "Frontend", level: 85, icon: "▲", color: "#000000", order: 4 },
    { name: "Node.js", category: "Backend", level: 82, icon: "🟢", color: "#339933", order: 5 },
    { name: "Docker", category: "DevOps", level: 80, icon: "🐳", color: "#2496ed", order: 6 },
    { name: "Kubernetes", category: "DevOps", level: 75, icon: "☸️", color: "#326ce5", order: 7 },
    { name: "PostgreSQL", category: "Database", level: 78, icon: "🐘", color: "#336791", order: 8 },
  ]

  const skills = await Promise.all(
    skillsData.map(async (skill) => {
      return prisma.skill.create({
        data: skill,
      })
    }),
  )

  // Create sample technologies
  const technologiesData = [
    {
      name: "React",
      category: "Framework",
      description: "A JavaScript library for building user interfaces",
      icon: "⚛️",
      color: "#61dafb",
      website: "https://reactjs.org",
      featured: true,
      order: 1,
    },
    {
      name: "Docker",
      category: "Tool",
      description: "Platform for developing, shipping, and running applications",
      icon: "🐳",
      color: "#2496ed",
      website: "https://docker.com",
      featured: true,
      order: 2,
    },
    {
      name: "TypeScript",
      category: "Language",
      description: "Typed superset of JavaScript",
      icon: "🔷",
      color: "#3178c6",
      website: "https://typescriptlang.org",
      featured: true,
      order: 3,
    },
  ]

  await Promise.all(
    technologiesData.map(async (tech) => {
      return prisma.technology.create({
        data: tech,
      })
    }),
  )

  // Create sample certifications
  const certificationsData = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      description: "Professional-level certification for designing distributed systems on AWS",
      credentialId: "AWS-SAA-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      issueDate: new Date("2023-06-15"),
      expiryDate: new Date("2026-06-15"),
      featured: true,
      order: 1,
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      description: "Certification for Kubernetes administration skills",
      credentialId: "CKA-789012",
      credentialUrl: "https://training.linuxfoundation.org/certification/verify",
      issueDate: new Date("2023-08-20"),
      expiryDate: new Date("2026-08-20"),
      featured: true,
      order: 2,
    },
  ]

  await Promise.all(
    certificationsData.map(async (cert) => {
      return prisma.certification.create({
        data: cert,
      })
    }),
  )

  // Create sample blog posts
  const blogPostsData = [
    {
      title: "Getting Started with Docker and Kubernetes",
      slug: "getting-started-docker-kubernetes",
      excerpt: "Learn the basics of containerization and orchestration",
      content:
        "# Getting Started with Docker and Kubernetes\n\nContainerization has revolutionized how we deploy applications...",
      published: true,
      featured: true,
      tags: ["Docker", "Kubernetes", "DevOps"],
      readTime: 8,
      views: 1250,
    },
    {
      title: "Building Scalable APIs with Next.js",
      slug: "building-scalable-apis-nextjs",
      excerpt: "Best practices for creating robust API endpoints",
      content: "# Building Scalable APIs with Next.js\n\nNext.js provides excellent tools for building APIs...",
      published: true,
      featured: false,
      tags: ["Next.js", "API", "TypeScript"],
      readTime: 12,
      views: 890,
    },
  ]

  const blogPosts = await Promise.all(
    blogPostsData.map(async (post) => {
      return prisma.blogPost.create({
        data: post,
      })
    }),
  )

  // Seed Contact Messages
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        name: "Sarah Johnson",
        email: "sarah@company.com",
        subject: "DevOps Consulting Opportunity",
        message:
          "Hi John, I came across your portfolio and I'm impressed with your DevOps expertise. We have an exciting opportunity for a DevOps consultant role at our startup. Would you be interested in discussing this further?",
        read: false,
      },
    }),
    prisma.contact.create({
      data: {
        name: "Mike Chen",
        email: "mike.chen@techcorp.com",
        subject: "Full-Stack Developer Position",
        message:
          "Hello John, we're looking for a senior full-stack developer with your skill set. Your experience with Next.js and Kubernetes is exactly what we need. Let's schedule a call to discuss the role and compensation.",
        read: false,
      },
    }),
    prisma.contact.create({
      data: {
        name: "Emily Rodriguez",
        email: "emily@startup.io",
        subject: "Project Collaboration",
        message:
          "Hi there! I loved your blog post about microservices with NestJS. We're building a similar architecture and would love to collaborate or get some consulting help. Are you available for freelance work?",
        read: true,
      },
    }),
  ])

  console.log("✅ Seed completed successfully!")
  console.log(`📊 Created:`)
  console.log(`  - ${projects.length} projects`)
  console.log(`  - ${skills.length} skills`)
  console.log(`  - ${blogPosts.length} blog posts`)
  console.log(`  - ${contacts.length} contact messages`)
  console.log(`Database seeded successfully!`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:")
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
