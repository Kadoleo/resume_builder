import React from "react";
import type { ResumeFormData, ResumeTemplate } from "./types";

type PreviewPanelProps = {
  data: ResumeFormData;
  template?: ResumeTemplate;
};

export default function PreviewPanel({ data, template = "classic" }: PreviewPanelProps) {
  const { basicInfo, skills, experience, projects, education } = data;
  return (
    <aside className="w-full" id="resume-preview">
      <div className={[
        "bg-white p-6 flex flex-col gap-4",
        template === "classic" && "rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        template === "modern" && "rounded-xl border border-[#E5E7EB]",
        template === "minimal" && "rounded-none border border-transparent",
        template === "sidebar" && "rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        template === "mono" && "rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-[#111827]",
      ].filter(Boolean).join(" ")}
      >
        <div>
          <h1 className="text-[24px] leading-8 font-bold text-[#111827]">
            {basicInfo.name || "이름"}
          </h1>
          <h2 className="text-[18px] leading-6 text-[#111827]">
            {basicInfo.title || "직무"}
          </h2>
        </div>
        <div className="text-[14px] leading-5 text-[#4B5563]">
          {[basicInfo.email, basicInfo.phone, basicInfo.location]
            .filter(Boolean)
            .join(" • ") || "email • phone • location"}
        </div>
        {template === "sidebar" && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-[#F3F4F6] rounded-lg p-4 flex flex-col gap-3">
              <div>
                <h1 className="text-[20px] leading-7 font-bold text-[#111827]">{basicInfo.name || "이름"}</h1>
                <h2 className="text-[14px] leading-5 text-[#111827]">{basicInfo.title || "직무"}</h2>
              </div>
              <div className="text-[12px] leading-4 text-[#4B5563]">
                {[basicInfo.email, basicInfo.phone, basicInfo.location].filter(Boolean).join(" • ") || "email • phone • location"}
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {skills.map((s, idx) => (
                    <span key={`${s}-${idx}`} className="rounded-2xl bg-white border border-[#E5E7EB] text-[12px] leading-4 px-2 py-1">{s}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              {experience.length > 0 && (
                <section>
                  <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">경력</h3>
                  <div className="flex flex-col gap-3">
                    {experience.map((exp, idx) => (
                      <div key={`exp-${idx}`} className="flex flex-col gap-1">
                        <div className="text-[14px] leading-5 text-[#111827]">{exp.company} • {exp.role} • {exp.period}</div>
                        <ul className="list-none m-0 p-0 flex flex-col gap-1">
                          {exp.bullets.map((b, i) => (
                            <li key={`exp-b-${i}`} className="text-[14px] leading-5 text-[#111827]"><span className="mr-2">•</span>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {projects.length > 0 && (
                <section>
                  <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">프로젝트</h3>
                  <div className="flex flex-col gap-3">
                    {projects.map((p, idx) => (
                      <div key={`proj-${idx}`} className="text-[14px] leading-5 text-[#111827]">
                        <div className="font-medium">{p.name}</div>
                        <div>역할/무엇을 했는지: {p.role}</div>
                        <div>임팩트/성과: {p.impact}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {education.length > 0 && (
                <section>
                  <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">학력</h3>
                  <div className="flex flex-col gap-3">
                    {education.map((e, idx) => (
                      <div key={`edu-${idx}`} className="text-[14px] leading-5 text-[#111827]">{e.school} • {e.degree} • {e.period}</div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}

        {template !== "sidebar" && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span
                key={`${s}-${idx}`}
                className="rounded-2xl bg-[#E5E7EB] text-[#111827] text-[14px] leading-5 px-2.5 py-1"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {experience.length > 0 && (
          <section>
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">
              경력
            </h3>
            <div className="flex flex-col gap-3">
              {experience.map((exp, idx) => (
                <div key={`exp-${idx}`} className="flex flex-col gap-1">
                  <div className="text-[14px] leading-5 text-[#111827]">
                    {exp.company} • {exp.role} • {exp.period}
                  </div>
                  <ul className="list-none m-0 p-0 flex flex-col gap-1">
                    {exp.bullets.map((b, i) => (
                      <li key={`exp-b-${i}`} className="text-[14px] leading-5 text-[#111827]">
                        <span className="mr-2">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">
              프로젝트
            </h3>
            <div className="flex flex-col gap-3">
              {projects.map((p, idx) => (
                <div key={`proj-${idx}`} className="text-[14px] leading-5 text-[#111827]">
                  <div className="font-medium">{p.name}</div>
                  <div>역할/무엇을 했는지: {p.role}</div>
                  <div>임팩트/성과: {p.impact}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827] mb-2">
              학력
            </h3>
            <div className="flex flex-col gap-3">
              {education.map((e, idx) => (
                <div key={`edu-${idx}`} className="text-[14px] leading-5 text-[#111827]">
                  {e.school} • {e.degree} • {e.period}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}


