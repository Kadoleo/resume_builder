"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormPanel from "@/components/FormPanel";
import PreviewPanel from "@/components/PreviewPanel";
import type { ResumeFormData, ResumeTemplate } from "@/components/types";
import { exportNodeToPdf } from "@/lib/pdf";

export default function BuilderPage() {
  const [data, setData] = React.useState<ResumeFormData>({
    basicInfo: { name: "", title: "", email: "", phone: "", location: "" },
    skills: [],
    experience: [],
    projects: [],
    education: [],
  });
  const [template, setTemplate] = React.useState<ResumeTemplate>("classic");

  React.useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("resume-builder:v1") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ResumeFormData;
        setData(parsed);
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("resume-builder:v1", JSON.stringify(data));
    alert("저장되었습니다.");
  };

  const handleLoad = () => {
    const raw = localStorage.getItem("resume-builder:v1");
    if (!raw) {
      alert("저장된 데이터가 없습니다.");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as ResumeFormData;
      setData(parsed);
      alert("불러왔습니다.");
    } catch {
      alert("불러오기 실패");
    }
  };

  const handlePdf = async () => {
    const node = document.getElementById("resume-preview");
    if (!node) return;
    await exportNodeToPdf(node, "resume.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onSave={handleSave} onLoad={handleLoad} onPdf={handlePdf} />
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] text-[#4B5563]">템플릿</div>
            <div className="flex gap-2">
              {(["classic","modern","minimal","sidebar","mono"] as ResumeTemplate[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={[
                    "px-3 py-2 rounded border text-sm",
                    template === t ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#111827] border-[#E5E7EB] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 min-w-0">
              <FormPanel data={data} onChange={setData} />
            </div>
            <div className="md:col-span-2 min-w-0">
              <PreviewPanel data={data} template={template} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


