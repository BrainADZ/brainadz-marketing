"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Gauge,
  GraduationCap,
  IndianRupee,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Sparkles,
  Target,
  Upload,
  User,
  Users,
} from "lucide-react";

type ApiJob = {
  _id: string;
  title: string;
  description: string;
  type: "full-time" | "part-time" | "internship";
  location: string;
  qualificationAndExperience: string;
  experienceMin: number;
  experienceMax: number;
  salaryLabel: string;
  responsibilities: string[];
  requirements: string[];
  goodToHave: string[];
  isActive: boolean;
  createdAt: string;
};

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  summary: string;
  qualificationAndExperience: string;
  responsibilities: string[];
  requirements: string[];
  skillsGoodToHave: string[];
};

const WHY_JOIN_ITEMS = [
  {
    icon: Sparkles,
    number: "01",
    title: "Creative ownership",
    desc: "Turn ideas into live campaigns, brand assets and digital experiences that people actually see.",
  },
  {
    icon: Target,
    number: "02",
    title: "Outcome-led work",
    desc: "Understand the goal behind every task and see how your work contributes to client growth.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Cross-functional exposure",
    desc: "Collaborate across strategy, SEO, paid media, development, design, content and video.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Performance-based growth",
    desc: "Progress through consistency, ownership, problem solving and the quality of your execution.",
  },
  {
    icon: Users,
    number: "05",
    title: "Strong team collaboration",
    desc: "Work closely with specialists instead of operating in silos, with clearer communication and feedback.",
  },
  {
    icon: Gauge,
    number: "06",
    title: "Fast learning environment",
    desc: "Build practical skill through real briefs, real timelines and real-world marketing challenges.",
  },
];

const HOW_WE_WORK = [
  {
    number: "01",
    title: "Understand the brief",
    desc: "Start with the client, audience, business goal and the outcome that matters.",
  },
  {
    number: "02",
    title: "Build the right solution",
    desc: "Bring strategy, creative and technology together instead of solving problems in isolation.",
  },
  {
    number: "03",
    title: "Execute with ownership",
    desc: "Move with clarity, communicate early and take responsibility for quality and timelines.",
  },
  {
    number: "04",
    title: "Learn and improve",
    desc: "Use feedback and performance data to sharpen the next version of the work.",
  },
];

function formatType(type: ApiJob["type"]) {
  if (type === "full-time") return "Full-time";
  if (type === "part-time") return "Part-time";
  return "Internship";
}

function formatExp(min: number, max: number) {
  if (min === max) return `${min} ${min === 1 ? "year" : "years"}`;
  return `${min}-${max} years`;
}

export default function CareersPage() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bulletIconClass = "mt-1 h-4 w-4 shrink-0 text-[#1467f5]";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const [jobAppliedFor, setJobAppliedFor] = useState("");
  const [jobAppliedForId, setJobAppliedForId] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === activeJobId) ?? null,
    [jobs, activeJobId],
  );

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setExperience("");
    setLocation("");
    setNoticePeriod("");
    setMessage("");
    setResume(null);
    setFormError(null);

    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[\s()-]/g, "");
    return /^\+?[0-9]{10,15}$/.test(cleaned);
  };

  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    setJobsError(null);

    try {
      if (!API) {
        console.error("Career API is not configured: NEXT_PUBLIC_API_BASE_URL is missing.");
        setJobsError(
          "Current openings are temporarily unavailable. Please try again shortly or contact our HR team."
        );
        return;
      }

      const res = await fetch(`${API}/jobs`, { cache: "no-store" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Failed to load career openings", {
          status: res.status,
          message: data?.message,
        });
        setJobsError(
          "Current openings are temporarily unavailable. Please try again shortly or contact our HR team."
        );
        return;
      }

      const list: ApiJob[] = Array.isArray(data?.data) ? data.data : [];
      const active = list.filter((job) => job.isActive);

      const mapped: Job[] = active.map((job) => ({
        id: job._id,
        title: job.title,
        department: "General",
        location: job.location,
        type: formatType(job.type),
        experience: formatExp(job.experienceMin, job.experienceMax),
        salary: job.salaryLabel || "Not disclosed",
        summary: job.description,
        qualificationAndExperience: job.qualificationAndExperience || "",
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        skillsGoodToHave: job.goodToHave || [],
      }));

      setJobs(mapped);

      if (mapped.length > 0) {
        setActiveJobId((previous) => previous ?? mapped[0].id);
        setJobAppliedFor((previous) => previous || mapped[0].title);
        setJobAppliedForId((previous) => previous ?? mapped[0].id);
      } else {
        setActiveJobId(null);
        setJobAppliedFor("General Application");
        setJobAppliedForId(null);
      }
    } catch (error) {
      console.error("Career jobs request failed", error);
      setJobsError(
        "Current openings are temporarily unavailable. Please try again shortly or contact our HR team."
      );
    } finally {
      setJobsLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const selectJob = (job: Job, scrollToApply = false) => {
    setActiveJobId(job.id);
    setJobAppliedFor(job.title);
    setJobAppliedForId(job.id);

    if (scrollToApply) {
      requestAnimationFrame(() => {
        document.getElementById("apply")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  const selectGeneralApplication = () => {
    setJobAppliedFor("General Application");
    setJobAppliedForId(null);
    requestAnimationFrame(() => {
      document.getElementById("apply")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    setFormError(null);

    if (!API) {
      console.error("Career API is not configured: NEXT_PUBLIC_API_BASE_URL is missing.");
      return setFormError(
        "Online applications are temporarily unavailable. Please contact our HR team using the details on this page."
      );
    }
    if (!fullName.trim()) return setFormError("Please enter your full name.");
    if (!phone.trim() || !validatePhone(phone)) {
      return setFormError("Please enter a valid phone number.");
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return setFormError("Please enter a valid email address.");
    }
    if (!jobAppliedFor) return setFormError("Please select a role.");
    if (!resume) return setFormError("Please upload your resume.");
    if (resume.size > 5 * 1024 * 1024) {
      return setFormError("Resume file must be under 5 MB.");
    }

    const allowedResumeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (resume.type && !allowedResumeTypes.includes(resume.type)) {
      return setFormError("Please upload a PDF, DOC, or DOCX resume.");
    }

    try {
      setSubmitting(true);

      const fd = new FormData();
      if (jobAppliedForId) fd.append("jobId", jobAppliedForId);
      fd.append("jobTitle", jobAppliedFor);
      fd.append("fullName", fullName.trim());
      fd.append("phone", phone.trim());
      fd.append("email", email.trim());

      if (experience.trim()) fd.append("experience", experience.trim());
      if (location.trim()) fd.append("location", location.trim());
      if (noticePeriod.trim()) fd.append("noticePeriod", noticePeriod.trim());
      if (message.trim()) fd.append("message", message.trim());

      fd.append("resume", resume);

      const res = await fetch(`${API}/careers/`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Career application submission failed", {
          status: res.status,
          message: data?.message,
        });
        setFormError(
          "We could not submit your application right now. Please try again or contact our HR team."
        );
        return;
      }

      setSuccess(true);
      resetForm();
      document.getElementById("apply")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      console.error("Career application request failed", error);
      setFormError(
        "We could not submit your application right now. Please try again or contact our HR team."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="career-theme dm-sans min-h-screen bg-white text-[#111111]">
      {/* HERO */}
      <section className="relative min-h-[420px] overflow-hidden bg-black sm:min-h-[500px] lg:min-h-[560px]">
        <img
          src="/banner/career.webp"
          alt="BrainADZ office and team workspace"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.82)_32%,rgba(0,0,0,0.48)_62%,rgba(0,0,0,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.06)_48%,rgba(0,0,0,0.38)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1800px] flex-col px-5 py-8 sm:min-h-[500px] sm:px-8 lg:min-h-[560px] lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[14px] font-medium leading-none"
          >
            <Link href="/" className="text-[#E1122B] transition hover:text-white">
              Home
            </Link>
            <span className="text-white/70">/</span>
            <span className="text-white">Careers</span>
          </nav>

          <h1 className="mt-7 max-w-[900px] text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[48px] lg:text-[58px]">
            Build work that moves brands — and your career — forward.
          </h1>

          <div className="mt-auto max-w-[760px] pb-6 sm:pb-10 lg:pb-12">
            <p className="text-[18px] font-normal leading-[1.5] tracking-[-0.02em] text-white/88 sm:text-[22px] lg:text-[25px]">
              Join a team where strategy, creativity, technology and performance come together on
              real client challenges. Learn fast, take ownership and see your work go live.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#openings"
                className="inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-[#E1122B] px-7 text-[13px] font-semibold text-white transition hover:bg-black"
              >
                View open positions
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </a>

              <button
                type="button"
                onClick={selectGeneralApplication}
                className="inline-flex min-h-14 items-center justify-center gap-5 rounded-full border border-white/45 bg-black/25 px-7 text-[13px] font-semibold text-white transition hover:border-[#E1122B] hover:bg-[#E1122B]"
              >
                Send your profile
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER STATS SECTION — matched to Consulting hero layout */}
      <section className="border-y border-black/10 bg-[#fbfbfb] text-black">
        <div className="mx-auto grid max-w-[1800px] px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-10">
          {[
            ["150+", "Full-time experts"],
            ["600+", "Projects delivered"],
            ["550+", "Clients served"],
            ["10+", "Years of experience"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`border-b border-black/10 py-7 sm:px-8 ${
                index < 2 ? "sm:border-b" : "sm:border-b-0"
              } ${index % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} ${
                index < 3 ? "lg:border-r" : "lg:border-r-0"
              } lg:border-b-0 first:sm:pl-0 last:sm:pr-0`}
            >
              <p className="text-[38px] font-medium leading-none tracking-[-0.05em] text-[#E1122B] sm:text-[48px]">
                {value}
              </p>
              <p className="mt-3 max-w-[360px] text-[15px] leading-6 text-black/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section className="border-b border-white/10 bg-[#050505] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">
            <div className="relative">
              <div className="absolute -left-6 -top-6 hidden h-28 w-28 border-l border-t border-[#1467f5]/50 lg:block" />
              <div className="overflow-hidden rounded-[10px] border border-white/10 bg-[#0d0d0d]">
                <Image
                  src="/teams/teams.png"
                  alt="BrainADZ Marketing team collaborating"
                  width={1000}
                  height={720}
                  className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[620px]"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  priority={false}
                />
              </div>

              <div className="relative -mt-16 ml-auto mr-4 max-w-[320px] rounded-[8px] border border-white/12 bg-[#0c0c0c]/95 p-5 shadow-2xl backdrop-blur sm:mr-7 lg:mr-[-18px]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78a2ff]">
                  What matters here
                </p>
                <p className="mt-3 text-[18px] font-semibold leading-7 text-white">
                  Clear thinking. Strong execution. Real ownership.
                </p>
              </div>
            </div>

            <div className="max-w-[760px]">
              <SectionEyebrow>Career growth</SectionEyebrow>
              <h2 className="mt-5 text-[38px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[50px] lg:text-[62px]">
                Work where ideas become outcomes, not just presentations.
              </h2>

              <p className="mt-7 text-[16px] leading-8 text-white/58">
                BrainADZ works across marketing, design, media, websites, SEO, performance,
                automation and brand experiences. That means your role sits close to real business
                problems and real execution — giving you practical exposure across the full growth
                journey.
              </p>

              <p className="mt-4 text-[16px] leading-8 text-white/58">
                We value people who ask better questions, communicate clearly, care about quality
                and can take a task from brief to completion with responsibility.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  "Live client project exposure",
                  "Cross-team collaboration",
                  "Direct feedback and learning",
                  "Performance-led career growth",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[6px] border border-white/10 bg-white/[0.025] px-4 py-4"
                  >
                    <BadgeCheck className="h-5 w-5 shrink-0 text-[#1467f5]" strokeWidth={1.9} />
                    <span className="text-[14px] font-medium text-white/78">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="border-b border-white/10 bg-[#090909] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <SectionEyebrow>Why BrainADZ</SectionEyebrow>
              <h2 className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px]">
                A place to build sharper skills and stronger work.
              </h2>
            </div>
            <p className="max-w-[700px] text-[16px] leading-8 text-white/52 lg:ml-auto">
              The best learning happens when expectations are clear, work is meaningful and people
              are trusted with responsibility. Our environment is designed around exactly that.
            </p>
          </div>

          <div className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 xl:grid-cols-3">
            {WHY_JOIN_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group min-h-[300px] border-b border-r border-white/10 bg-[#0b0b0b] p-6 transition duration-300 hover:bg-[#101010] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-white/12 bg-white/[0.03] transition group-hover:border-[#1467f5]/50 group-hover:bg-[#1467f5]/10">
                      <Icon className="h-5 w-5 text-[#78a2ff]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-white/22">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-10 text-[22px] font-semibold tracking-[-0.025em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[420px] text-[14px] leading-7 text-white/48">
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-white/10 bg-[#050505] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-[820px]">
            <SectionEyebrow>How we work</SectionEyebrow>
            <h2 className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px] lg:text-[58px]">
              A simple standard: understand deeply, execute clearly, improve continuously.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[8px] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {HOW_WE_WORK.map((item) => (
              <div key={item.number} className="bg-[#090909] p-6 sm:p-8">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-[#78a2ff]">
                  {item.number}
                </p>
                <h3 className="mt-8 text-[20px] font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-white/48">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPENINGS */}
      <section id="openings" className="scroll-mt-24 bg-[#080808] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionEyebrow>Open positions</SectionEyebrow>
              <h2 className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px] lg:text-[58px]">
                Find the role where you can do your best work.
              </h2>
              <p className="mt-5 max-w-[850px] text-[16px] leading-8 text-white/52">
                Explore current opportunities across design, development, SEO, social media,
                content, performance marketing, video and business growth.
              </p>
            </div>

            <button
              type="button"
              onClick={selectGeneralApplication}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-[5px] border border-white/16 px-5 text-[13px] font-semibold text-white transition hover:border-[#1467f5] hover:bg-[#1467f5]"
            >
              No perfect match? Send profile
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-[12px]">
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-white/55">
              {jobsLoading
                ? "Checking openings..."
                : jobsError
                  ? "Openings temporarily unavailable"
                  : `${jobs.length} active opening${jobs.length === 1 ? "" : "s"}`}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-white/55">
              Full-time · Part-time · Internship
            </span>
          </div>

          {jobsError && (
            <div className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.035] px-5 py-4">
              <p className="text-[14px] font-semibold text-white">
                We’re updating our current openings.
              </p>
              <p className="mt-1.5 max-w-[760px] text-[13px] leading-6 text-white/50">
                {jobsError}
              </p>
            </div>
          )}

          {!jobsLoading && !jobsError && jobs.length === 0 && (
            <div className="mt-8 rounded-[8px] border border-white/10 bg-[#0d0d0d] p-8 sm:p-10">
              <p className="text-[22px] font-semibold text-white">No active openings right now.</p>
              <p className="mt-3 max-w-[620px] text-[14px] leading-7 text-white/50">
                We still review strong profiles for future opportunities. Send us your resume and
                tell us what kind of role you are interested in.
              </p>
              <button
                type="button"
                onClick={selectGeneralApplication}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[5px] bg-[#1467f5] px-5 text-[13px] font-semibold text-white transition hover:bg-[#0f56d6]"
              >
                Submit general application
              </button>
            </div>
          )}

          {jobs.length > 0 && (
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start xl:gap-8">
              <div className="space-y-3">
                {jobs.map((job) => {
                  const active = activeJobId === job.id;

                  return (
                    <button
                      key={job.id}
                      type="button"
                      aria-expanded={active}
                      onClick={() => selectJob(job)}
                      className={`group w-full rounded-[8px] border p-5 text-left transition duration-300 sm:p-6 ${
                        active
                          ? "border-[#1467f5]/70 bg-[#0d1628] shadow-[0_16px_50px_rgba(20,103,245,0.08)]"
                          : "border-white/10 bg-[#0d0d0d] hover:border-white/22 hover:bg-[#101010]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[19px] font-semibold tracking-[-0.02em] text-white sm:text-[21px]">
                            {job.title}
                          </p>
                          <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-white/44">
                            {job.summary}
                          </p>
                        </div>

                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                            active
                              ? "border-[#1467f5]/60 bg-[#1467f5]/12"
                              : "border-white/10 bg-white/[0.02]"
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition ${
                              active ? "rotate-180 text-[#78a2ff]" : "text-white/36"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-[12px] text-white/46">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#78a2ff]" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#78a2ff]" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-[#78a2ff]" />
                          {job.experience}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <IndianRupee className="h-4 w-4 text-[#78a2ff]" />
                          {job.salary}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[8px] border border-white/12 bg-[#0d0d0d] p-6 sm:p-8 lg:sticky lg:top-28 lg:p-9">
                {selectedJob ? (
                  <>
                    <div className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78a2ff]">
                          Role details
                        </p>
                        <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">
                          {selectedJob.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => selectJob(selectedJob, true)}
                        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[5px] bg-[#1467f5] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0f56d6]"
                      >
                        Apply now
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-6 text-[15px] leading-7 text-white/56">{selectedJob.summary}</p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <JobMeta icon={<MapPin />} label="Location" value={selectedJob.location} />
                      <JobMeta icon={<Clock />} label="Job type" value={selectedJob.type} />
                      <JobMeta icon={<Briefcase />} label="Experience" value={selectedJob.experience} />
                      <JobMeta icon={<IndianRupee />} label="Salary" value={selectedJob.salary} />
                    </div>

                    {selectedJob.qualificationAndExperience?.trim() && (
                      <div className="mt-8 border-t border-white/10 pt-7">
                        <h4 className="flex items-center gap-2 text-[14px] font-semibold text-white">
                          <GraduationCap className="h-4 w-4 text-[#78a2ff]" />
                          Qualification & experience
                        </h4>
                        <p className="mt-3 whitespace-pre-line text-[14px] leading-7 text-white/52">
                          {selectedJob.qualificationAndExperience}
                        </p>
                      </div>
                    )}

                    <div className="mt-8 grid gap-8 border-t border-white/10 pt-7 xl:grid-cols-2">
                      <JobBulletList
                        title="What you will do"
                        items={selectedJob.responsibilities}
                        bulletIconClass={bulletIconClass}
                      />
                      <JobBulletList
                        title="What we are looking for"
                        items={selectedJob.requirements}
                        bulletIconClass={bulletIconClass}
                      />
                    </div>

                    {selectedJob.skillsGoodToHave.length > 0 && (
                      <div className="mt-8 border-t border-white/10 pt-7">
                        <JobBulletList
                          title="Good to have"
                          items={selectedJob.skillsGoodToHave}
                          bulletIconClass={bulletIconClass}
                          columns
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-10 text-center">
                    <Briefcase className="mx-auto h-7 w-7 text-white/25" />
                    <p className="mt-4 text-[14px] text-white/45">Select a role to view details.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* APPLY */}
      <section
        id="apply"
        className="scroll-mt-24 border-t border-white/10 bg-[#050505] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 xl:gap-24">
            <div className="lg:sticky lg:top-28">
              <SectionEyebrow>Apply now</SectionEyebrow>
              <h2 className="mt-5 text-[40px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px] lg:text-[58px]">
                Your next role could start with one good conversation.
              </h2>

              <p className="mt-6 max-w-[640px] text-[16px] leading-8 text-white/52">
                Share your profile with our team. We review applications based on relevant skill,
                role fit, experience, communication and the quality of work you have done.
              </p>

              <div className="mt-9 rounded-[8px] border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
                <h3 className="text-[15px] font-semibold text-white">Before you submit</h3>
                <ul className="mt-5 space-y-3 text-[13px] leading-6 text-white/52">
                  <li className="flex gap-2.5">
                    <CheckCircle2 className={bulletIconClass} strokeWidth={2} />
                    PDF, DOC or DOCX resume up to 5 MB.
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2 className={bulletIconClass} strokeWidth={2} />
                    Mention current location, experience and notice period.
                  </li>
                  <li className="flex gap-2.5">
                    <CheckCircle2 className={bulletIconClass} strokeWidth={2} />
                    Add portfolio or relevant work links inside your message/resume where useful.
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-[8px] border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/34">
                  HR contact
                </p>
                <div className="mt-4 space-y-4 text-[14px] text-white/58">
                  <Link
                    href="https://wa.me/919574511152"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                      <MessageCircle className="h-4 w-4 text-[#78a2ff]" />
                    </span>
                    +91 95745 11152
                  </Link>

                  <Link
                    href="mailto:hr@brainadzmarketing.com"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                      <Mail className="h-4 w-4 text-[#78a2ff]" />
                    </span>
                    hr@brainadzmarketing.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-white/12 bg-[#0d0d0d] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="border-b border-white/10 px-5 py-5 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[18px] font-semibold text-white">Application form</p>
                    <p className="mt-1 text-[12px] text-white/38">Fields marked * are required.</p>
                  </div>
                  {jobAppliedFor && (
                    <span className="w-fit rounded-full border border-[#1467f5]/35 bg-[#1467f5]/10 px-3 py-1.5 text-[11px] font-semibold text-[#8db0ff]">
                      {jobAppliedFor}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-8 lg:p-10">
                {success ? (
                  <div className="rounded-[8px] border border-emerald-400/20 bg-emerald-400/[0.055] p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[19px] font-semibold text-white">Application submitted.</p>
                        <p className="mt-2 max-w-[560px] text-[14px] leading-7 text-white/52">
                          Thank you for sharing your profile. Our team will review it and contact you
                          if your background matches a current or upcoming opportunity.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSuccess(false)}
                          className="mt-6 min-h-11 rounded-[5px] bg-[#1467f5] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0f56d6]"
                        >
                          Submit another application
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    {formError && (
                      <div
                        role="alert"
                        className="rounded-[6px] border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-[13px] font-medium text-red-300"
                      >
                        {formError}
                      </div>
                    )}

                    <div>
                      <FormLabel htmlFor="jobAppliedFor">Applying for *</FormLabel>
                      <select
                        id="jobAppliedFor"
                        value={jobAppliedFor}
                        onChange={(event) => {
                          const value = event.target.value;
                          setJobAppliedFor(value);

                          if (value === "General Application") {
                            setJobAppliedForId(null);
                            return;
                          }

                          const found = jobs.find((job) => job.title === value);
                          setJobAppliedForId(found?.id ?? null);
                          if (found) setActiveJobId(found.id);
                        }}
                        required
                        className="mt-2 h-14 w-full rounded-[6px] border border-white/12 bg-[#070707] px-4 text-[14px] text-white outline-none transition focus:border-[#1467f5]"
                      >
                        {jobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                        <option value="General Application">General Application (Any Suitable Role)</option>
                      </select>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        id="fullName"
                        label="Full name *"
                        icon={<User />}
                        value={fullName}
                        onChange={setFullName}
                        type="text"
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                      />
                      <FormField
                        id="phone"
                        label="Phone *"
                        icon={<Phone />}
                        value={phone}
                        onChange={setPhone}
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        autoComplete="tel"
                        required
                      />
                      <FormField
                        id="email"
                        label="Email *"
                        icon={<Mail />}
                        value={email}
                        onChange={setEmail}
                        type="email"
                        placeholder="you@domain.com"
                        autoComplete="email"
                        required
                      />
                      <FormField
                        id="location"
                        label="Current location"
                        icon={<MapPin />}
                        value={location}
                        onChange={setLocation}
                        type="text"
                        placeholder="e.g. Delhi NCR"
                        autoComplete="address-level2"
                      />
                      <FormField
                        id="experience"
                        label="Total experience"
                        icon={<Briefcase />}
                        value={experience}
                        onChange={setExperience}
                        type="text"
                        placeholder="e.g. 2 years"
                      />
                      <FormField
                        id="noticePeriod"
                        label="Notice period"
                        icon={<Clock />}
                        value={noticePeriod}
                        onChange={setNoticePeriod}
                        type="text"
                        placeholder="e.g. Immediate / 15 days"
                      />
                    </div>

                    <div>
                      <FormLabel htmlFor="resume">Resume *</FormLabel>
                      <div className="mt-2 rounded-[6px] border border-dashed border-white/16 bg-[#070707] p-4 transition focus-within:border-[#1467f5]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-white/10 bg-white/[0.03]">
                            <Upload className="h-4 w-4 text-[#78a2ff]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <input
                              id="resume"
                              required
                              ref={resumeInputRef}
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="w-full text-[12px] text-white/58 outline-none file:mr-3 file:rounded-[4px] file:border-0 file:bg-[#1467f5] file:px-3 file:py-2 file:text-[11px] file:font-semibold file:text-white hover:file:bg-[#0f56d6]"
                              onChange={(event) => {
                                const file = event.target.files?.[0] || null;
                                setFormError(null);

                                if (file && file.size > 5 * 1024 * 1024) {
                                  setFormError("Resume must be under 5 MB.");
                                  event.currentTarget.value = "";
                                  setResume(null);
                                  return;
                                }

                                setResume(file);
                              }}
                            />
                            <p className="mt-1.5 text-[11px] text-white/30">PDF, DOC or DOCX · Max 5 MB</p>
                          </div>
                        </div>

                        {resume && (
                          <p className="mt-3 truncate border-t border-white/10 pt-3 text-[12px] text-white/48">
                            Selected: <span className="font-semibold text-white/80">{resume.name}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <div className="mt-2 flex items-start gap-3 rounded-[6px] border border-white/12 bg-[#070707] px-4 py-3 transition focus-within:border-[#1467f5]">
                        <FileText className="mt-1 h-4 w-4 shrink-0 text-[#78a2ff]" />
                        <textarea
                          id="message"
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                          rows={5}
                          placeholder="Tell us briefly about your experience, strongest skills, portfolio link or why this role interests you."
                          className="w-full resize-none bg-transparent text-[14px] leading-7 text-white outline-none placeholder:text-white/24"
                        />
                      </div>
                    </div>

                    <button
                      disabled={submitting}
                      type="submit"
                      className="group flex h-14 w-full items-center justify-center gap-4 rounded-[5px] bg-[#1467f5] px-6 text-[14px] font-semibold text-white transition hover:bg-[#0f56d6] disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      {submitting ? "Submitting application..." : "Submit application"}
                      {!submitting && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>

                    <p className="text-center text-[11px] leading-5 text-white/28">
                      By submitting this form, you agree that BrainADZ may use the information you
                      provide for recruitment-related communication.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#78a2ff]">
      <span className="h-px w-7 bg-[#1467f5]" />
      {children}
    </div>
  );
}

function JobMeta({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[6px] border border-white/10 bg-[#080808] p-4">
      <div className="flex items-center gap-2 text-[#78a2ff] [&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/28">
        {label}
      </p>
      <p className="mt-1.5 text-[13px] font-medium text-white/72">{value}</p>
    </div>
  );
}

function JobBulletList({
  title,
  items,
  bulletIconClass,
  columns = false,
}: {
  title: string;
  items: string[];
  bulletIconClass: string;
  columns?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div>
      <h4 className="text-[14px] font-semibold text-white">{title}</h4>
      <ul
        className={`mt-4 gap-x-6 space-y-3 text-[14px] leading-7 text-white/52 ${
          columns ? "sm:columns-2" : ""
        }`}
      >
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex break-inside-avoid gap-2.5">
            <CheckCircle2 className={bulletIconClass} strokeWidth={2} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/48"
    >
      {children}
    </label>
  );
}

function FormField({
  id,
  label,
  icon,
  value,
  onChange,
  type,
  placeholder,
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  type: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <div className="mt-2 flex min-h-14 items-center gap-3 rounded-[6px] border border-white/12 bg-[#070707] px-4 py-3 transition focus-within:border-[#1467f5]">
        <span className="shrink-0 text-[#78a2ff] [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/24"
        />
      </div>
    </div>
  );
}