"use client";
import React from "react";
import type { ResumeFormData } from "./types";

type FormPanelProps = {
  data: ResumeFormData;
  onChange: (next: ResumeFormData) => void;
};

export default function FormPanel({ data, onChange }: FormPanelProps) {
  const update = (partial: Partial<ResumeFormData>) => onChange({ ...data, ...partial });

  const updateBasic = (key: keyof ResumeFormData["basicInfo"], value: string) =>
    update({ basicInfo: { ...data.basicInfo, [key]: value } });

  const addSkill = () => update({ skills: [...data.skills, ""] });
  const updateSkill = (idx: number, value: string) => {
    const next = [...data.skills];
    next[idx] = value;
    update({ skills: next });
  };
  const removeSkill = (idx: number) => update({ skills: data.skills.filter((_, i) => i !== idx) });

  return (
    <section className="w-full" data-component="FormPanel">
      <div className="flex flex-col gap-6">
        {/* Basic Info Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827]">기본정보</h3>
          </div>
          <div className="flex flex-col gap-3">
            {([
              ["name", "이름"],
              ["title", "직무"],
              ["email", "이메일"],
              ["phone", "전화번호"],
              ["location", "위치"],
            ] as const).map(([key, label]) => (
              <label key={key} className="flex flex-col gap-1">
                <span className="text-[14px] leading-5 text-[#111827]">{label}</span>
                <input
                  className="h-10 rounded-md border border-[#D1D5DB] px-2 text-[14px] leading-5 text-[#111827]"
                  value={data.basicInfo[key]}
                  onChange={(e) => updateBasic(key, e.target.value)}
                  placeholder={label}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827]">스킬</h3>
            <button className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]" onClick={addSkill}>
              + 스킬 추가
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {data.skills.map((s, idx) => (
              <div key={`skill-${idx}`} className="flex items-center gap-2">
                <input
                  className="h-10 rounded-md border border-[#D1D5DB] px-2 text-[14px] leading-5 text-[#111827] flex-1"
                  value={s}
                  onChange={(e) => updateSkill(idx, e.target.value)}
                  placeholder="예: React"
                />
                <button className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]" onClick={() => removeSkill(idx)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827]">경력</h3>
            <button
              className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]"
              onClick={() => update({ experience: [...data.experience, { company: "", role: "", period: "", bullets: ["", ""] }] })}
            >
              + 경력 추가
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp, idx) => (
              <div key={`exp-${idx}`} className="border border-[#E5E7EB] rounded-lg p-4 flex flex-col gap-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="회사명" value={exp.company} onChange={(e) => {
                    const next = [...data.experience];
                    next[idx] = { ...exp, company: e.target.value };
                    update({ experience: next });
                  }} />
                  <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="직무명" value={exp.role} onChange={(e) => {
                    const next = [...data.experience];
                    next[idx] = { ...exp, role: e.target.value };
                    update({ experience: next });
                  }} />
                  <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="근무기간" value={exp.period} onChange={(e) => {
                    const next = [...data.experience];
                    next[idx] = { ...exp, period: e.target.value };
                    update({ experience: next });
                  }} />
                </div>
                <div className="flex flex-col gap-2">
                  {exp.bullets.map((b, bi) => (
                    <input
                      key={`b-${bi}`}
                      className="h-10 rounded-md border border-[#D1D5DB] px-2"
                      placeholder="불릿"
                      value={b}
                      onChange={(e) => {
                        const next = [...data.experience];
                        const bullets = [...next[idx].bullets];
                        bullets[bi] = e.target.value;
                        next[idx] = { ...next[idx], bullets };
                        update({ experience: next });
                      }}
                    />
                  ))}
                  <button className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]" onClick={() => {
                    const next = [...data.experience];
                    next[idx] = { ...exp, bullets: [...exp.bullets, ""] };
                    update({ experience: next });
                  }}>+ 불릿 추가</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827]">프로젝트</h3>
            <button
              className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]"
              onClick={() => update({ projects: [...data.projects, { name: "", role: "", impact: "" }] })}
            >
              + 프로젝트 추가
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {data.projects.map((p, idx) => (
              <div key={`proj-${idx}`} className="border border-[#E5E7EB] rounded-lg p-4 flex flex-col gap-2">
                <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="프로젝트명" value={p.name} onChange={(e) => {
                  const next = [...data.projects];
                  next[idx] = { ...p, name: e.target.value };
                  update({ projects: next });
                }} />
                <textarea className="min-h-20 rounded-md border border-[#D1D5DB] p-2" placeholder="역할/무엇을 했는지" value={p.role} onChange={(e) => {
                  const next = [...data.projects];
                  next[idx] = { ...p, role: e.target.value };
                  update({ projects: next });
                }} />
                <textarea className="min-h-20 rounded-md border border-[#D1D5DB] p-2" placeholder="임팩트/성과" value={p.impact} onChange={(e) => {
                  const next = [...data.projects];
                  next[idx] = { ...p, impact: e.target.value };
                  update({ projects: next });
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] leading-[22px] font-semibold text-[#111827]">학력</h3>
            <button
              className="text-[#2563EB] px-2 py-2 rounded hover:bg-[#E5E7EB]"
              onClick={() => update({ education: [...data.education, { school: "", degree: "", period: "" }] })}
            >
              + 학력 추가
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {data.education.map((e, idx) => (
              <div key={`edu-${idx}`} className="border border-[#E5E7EB] rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="학교명" value={e.school} onChange={(ev) => {
                  const next = [...data.education];
                  next[idx] = { ...e, school: ev.target.value };
                  update({ education: next });
                }} />
                <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="학위" value={e.degree} onChange={(ev) => {
                  const next = [...data.education];
                  next[idx] = { ...e, degree: ev.target.value };
                  update({ education: next });
                }} />
                <input className="h-10 rounded-md border border-[#D1D5DB] px-2" placeholder="재학기간" value={e.period} onChange={(ev) => {
                  const next = [...data.education];
                  next[idx] = { ...e, period: ev.target.value };
                  update({ education: next });
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


