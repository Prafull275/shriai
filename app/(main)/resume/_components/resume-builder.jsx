// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertTriangle,
//   Download,
//   Edit,
//   Loader2,
//   Monitor,
//   Save,
// } from "lucide-react";
// import { toast } from "sonner";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { saveResume } from "@/actions/resume";
// import { EntryForm } from "./entry-form";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/nextjs";
// import { entriesToMarkdown } from "@/app/lib/helper";
// import { resumeSchema } from "@/app/lib/schema";
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

// export default function ResumeBuilder({ initialContent }) {
//   const [activeTab, setActiveTab] = useState("edit");
//   const [previewContent, setPreviewContent] = useState(initialContent);
//   const { user } = useUser();
//   const [resumeMode, setResumeMode] = useState("preview");

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(resumeSchema),
//     defaultValues: {
//       contactInfo: {},
//       summary: "",
//       skills: "",
//       experience: [],
//       education: [],
//       projects: [],
//     },
//   });

//   const {
//     loading: isSaving,
//     fn: saveResumeFn,
//     data: saveResult,
//     error: saveError,
//   } = useFetch(saveResume);

//   // Watch form fields for preview updates
//   const formValues = watch();

//   useEffect(() => {
//     if (initialContent) setActiveTab("preview");
//   }, [initialContent]);

//   // Update preview content when form values change
//   useEffect(() => {
//     if (activeTab === "edit") {
//       const newContent = getCombinedContent();
//       setPreviewContent(newContent ? newContent : initialContent);
//     }
//   }, [formValues, activeTab]);

//   // Handle save result
//   useEffect(() => {
//     if (saveResult && !isSaving) {
//       toast.success("Resume saved successfully!");
//     }
//     if (saveError) {
//       toast.error(saveError.message || "Failed to save resume");
//     }
//   }, [saveResult, saveError, isSaving]);

//   const getContactMarkdown = () => {
//     const { contactInfo } = formValues;
//     const parts = [];
//     if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
//     if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
//     if (contactInfo.linkedin)
//       parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
//     if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

//     return parts.length > 0
//       ? `## <div align="center">${user.fullName}</div>
//         \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
//       : "";
//   };

//   const getCombinedContent = () => {
//     const { summary, skills, experience, education, projects } = formValues;
//     return [
//       getContactMarkdown(),
//       summary && `## Professional Summary\n\n${summary}`,
//       skills && `## Skills\n\n${skills}`,
//       entriesToMarkdown(experience, "Work Experience"),
//       entriesToMarkdown(education, "Education"),
//       entriesToMarkdown(projects, "Projects"),
//     ]
//       .filter(Boolean)
//       .join("\n\n");
//   };

//   const [isGenerating, setIsGenerating] = useState(false);

//   const generatePDF = async () => {
//     setIsGenerating(true);
//     try {
//       const element = document.getElementById("resume-pdf");
//       const opt = {
//         margin: [15, 15],
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(element).save();
//     } catch (error) {
//       console.error("PDF generation error:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };


//   const onSubmit = async (data) => {
//     try {
//       const formattedContent = previewContent
//         .replace(/\n/g, "\n") // Normalize newlines
//         .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
//         .trim();

//       console.log(previewContent, formattedContent);
//       await saveResumeFn(previewContent);
//     } catch (error) {
//       console.error("Save error:", error);
//     }
//   };

//   return (
//     <div data-color-mode="light" className="space-y-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-2">
//         <h1 className="font-bold gradient-title text-5xl md:text-6xl">
//           Resume Builder
//         </h1>
//         <div className="space-x-2">
//           <Button
//             variant="destructive"
//             onClick={handleSubmit(onSubmit)}
//             disabled={isSaving}
//           >
//             {isSaving ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="h-4 w-4" />
//                 Save
//               </>
//             )}
//           </Button>
//           <Button onClick={generatePDF} disabled={isGenerating}>
//             {isGenerating ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Generating PDF...
//               </>
//             ) : (
//               <>
//                 <Download className="h-4 w-4" />
//                 Download PDF
//               </>
//             )}
//           </Button>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="edit">Form</TabsTrigger>
//           <TabsTrigger value="preview">Markdown</TabsTrigger>
//         </TabsList>

//         <TabsContent value="edit">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Contact Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Email</label>
//                   <Input
//                     {...register("contactInfo.email")}
//                     type="email"
//                     placeholder="your@email.com"
//                     error={errors.contactInfo?.email}
//                   />
//                   {errors.contactInfo?.email && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.email.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Mobile Number</label>
//                   <Input
//                     {...register("contactInfo.mobile")}
//                     type="tel"
//                     placeholder="+1 234 567 8900"
//                   />
//                   {errors.contactInfo?.mobile && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.mobile.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">LinkedIn URL</label>
//                   <Input
//                     {...register("contactInfo.linkedin")}
//                     type="url"
//                     placeholder="https://linkedin.com/in/your-profile"
//                   />
//                   {errors.contactInfo?.linkedin && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.linkedin.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Twitter/X Profile
//                   </label>
//                   <Input
//                     {...register("contactInfo.twitter")}
//                     type="url"
//                     placeholder="https://twitter.com/your-handle"
//                   />
//                   {errors.contactInfo?.twitter && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.twitter.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Professional Summary</h3>
//               <Controller
//                 name="summary"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="Write a compelling professional summary..."
//                     error={errors.summary}
//                   />
//                 )}
//               />
//               {errors.summary && (
//                 <p className="text-sm text-red-500">{errors.summary.message}</p>
//               )}
//             </div>

//             {/* Skills */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Skills</h3>
//               <Controller
//                 name="skills"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="List your key skills..."
//                     error={errors.skills}
//                   />
//                 )}
//               />
//               {errors.skills && (
//                 <p className="text-sm text-red-500">{errors.skills.message}</p>
//               )}
//             </div>

//             {/* Experience */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Work Experience</h3>
//               <Controller
//                 name="experience"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Experience"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.experience && (
//                 <p className="text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </div>

//             {/* Education */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Education</h3>
//               <Controller
//                 name="education"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Education"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.education && (
//                 <p className="text-sm text-red-500">
//                   {errors.education.message}
//                 </p>
//               )}
//             </div>

//             {/* Projects */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Projects</h3>
//               <Controller
//                 name="projects"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Project"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.projects && (
//                 <p className="text-sm text-red-500">
//                   {errors.projects.message}
//                 </p>
//               )}
//             </div>
//           </form>
//         </TabsContent>

//         <TabsContent value="preview">
//           {activeTab === "preview" && (
//             <Button
//               variant="link"
//               type="button"
//               className="mb-2"
//               onClick={() =>
//                 setResumeMode(resumeMode === "preview" ? "edit" : "preview")
//               }
//             >
//               {resumeMode === "preview" ? (
//                 <>
//                   <Edit className="h-4 w-4" />
//                   Edit Resume
//                 </>
//               ) : (
//                 <>
//                   <Monitor className="h-4 w-4" />
//                   Show Preview
//                 </>
//               )}
//             </Button>
//           )}

//           {activeTab === "preview" && resumeMode !== "preview" && (
//             <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
//               <AlertTriangle className="h-5 w-5" />
//               <span className="text-sm">
//                 You will lose editied markdown if you update the form data.
//               </span>
//             </div>
//           )}
//           <div className="border rounded-lg">
//             <MDEditor
//               value={previewContent}
//               onChange={setPreviewContent}
//               height={800}
//               preview={resumeMode}
//             />
//           </div>
//           <div className="hidden">
//             <div id="resume-pdf">
//               <MDEditor.Markdown
//                 source={previewContent}
//                 style={{
//                   background: "white",
//                   color: "black",
//                 }}
//               />
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Check, Save } from "lucide-react";

import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import MinimalImageTemplate from "../templates/MinimalImageTemplate";
import { EntryForm } from "./entry-form";

const steps = [
  "Personal Info",
  "Professional Summary",
  "Experience",
  "Education",
  "Projects",
  "Skills",
];

const defaultResumeData = {
  contactInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  skills: "",
  experience: [],
  education: [],
  projects: [],
};

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [showAccentDropdown, setShowAccentDropdown] = useState(false);

  const [savedResumeData, setSavedResumeData] = useState(defaultResumeData);

  const { control, register, watch, getValues } = useForm({
    defaultValues: defaultResumeData,
    shouldUnregister: false,
  });

  const formValues = watch();

  const handlePrint = () => {
    window.print();
  };

  const handleSaveStep = () => {
    const values = getValues();

    setSavedResumeData((prev) => ({
      ...prev,
      contactInfo: values.contactInfo || prev.contactInfo,
      summary: values.summary ?? prev.summary,
      skills: values.skills ?? prev.skills,
      experience: values.experience || prev.experience,
      education: values.education || prev.education,
      projects: values.projects || prev.projects,
    }));
  };

  const handleNext = () => {
    handleSaveStep();
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    handleSaveStep();
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const buildTemplateData = () => ({
    personal_info: {
      full_name: savedResumeData.contactInfo?.fullName || "",
      email: savedResumeData.contactInfo?.email || "",
      phone: savedResumeData.contactInfo?.phone || "",
      location: savedResumeData.contactInfo?.location || "",
      profession: savedResumeData.contactInfo?.profession || "",
      linkedin: savedResumeData.contactInfo?.linkedin || "",
      website: savedResumeData.contactInfo?.website || "",
    },

    professional_summary: savedResumeData.summary || "",

    experience: (savedResumeData.experience || []).map((exp) => ({
      position: exp.title || "",
      company: exp.organization || "",
      start_date: exp.startDate || "",
      end_date: exp.endDate || "",
      is_current: exp.current || false,
      description: exp.description || "",
    })),

    education: (savedResumeData.education || []).map((edu) => ({
      degree: edu.title || "",
      institution: edu.organization || "",
      graduation_date: edu.startDate || "",
      description: edu.description || "",
    })),

    projects: (savedResumeData.projects || []).map((proj) => ({
      name: proj.title || "",
      description: proj.description || "",
    })),

    skills: savedResumeData.skills
      ? savedResumeData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
  });

  const renderTemplate = () => {
    const data = buildTemplateData();

    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimalImage":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Input placeholder="Full Name" {...register("contactInfo.fullName")} />
            <Input placeholder="Email" {...register("contactInfo.email")} />
            <Input placeholder="Phone" {...register("contactInfo.phone")} />
            <Input placeholder="Location" {...register("contactInfo.location")} />
            <Input placeholder="Profession" {...register("contactInfo.profession")} />
            <Input placeholder="LinkedIn URL" {...register("contactInfo.linkedin")} />
            <Input placeholder="Website" {...register("contactInfo.website")} />
          </div>
        );

      case 1:
        return (
          <Textarea
            placeholder="Write your professional summary..."
            className="h-32"
            {...register("summary")}
          />
        );

      case 2:
        return (
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <EntryForm
                key="experience-form"
                type="Experience"
                entries={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        );

      case 3:
        return (
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <EntryForm
                key="education-form"
                type="Education"
                entries={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        );

      case 4:
        return (
          <Controller
            name="projects"
            control={control}
            render={({ field }) => (
              <EntryForm
                key="project-form"
                type="Project"
                entries={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        );

      case 5:
        return (
          <Textarea
            placeholder="Skills (comma separated)"
            className="h-32"
            {...register("skills")}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #resume-print,
          #resume-print * {
            visibility: visible;
          }

          #resume-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      <div className="grid grid-cols-2 gap-6 p-8 bg-gradient-to-br from-slate-100 to-purple-100 min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 print:hidden relative">
          <div className="flex gap-3 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowTemplateDropdown(!showTemplateDropdown);
                  setShowAccentDropdown(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium"
              >
                Template
              </button>

              {showTemplateDropdown && (
                <div className="absolute top-12 left-0 w-64 bg-white border rounded-xl shadow-lg p-3 space-y-2 z-50">
                  {["classic", "modern", "minimal", "minimalImage"].map((template) => (
                    <div
                      key={template}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowTemplateDropdown(false);
                      }}
                      className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-100"
                    >
                      <span className="capitalize">{template}</span>
                      {selectedTemplate === template && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowAccentDropdown(!showAccentDropdown);
                  setShowTemplateDropdown(false);
                }}
                className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 font-medium"
              >
                Accent
              </button>

              {showAccentDropdown && (
                <div className="absolute top-12 left-0 bg-white border rounded-xl shadow-lg p-4 grid grid-cols-4 gap-4 z-50">
                  {[
                    "#2563eb",
                    "#7c3aed",
                    "#16a34a",
                    "#ef4444",
                    "#f97316",
                    "#14b8a6",
                    "#ec4899",
                    "#111827",
                  ].map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        setAccentColor(color);
                        setShowAccentDropdown(false);
                      }}
                      className="w-8 h-8 rounded-full cursor-pointer border-2"
                      style={{
                        backgroundColor: color,
                        borderColor: accentColor === color ? "#000" : "transparent",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <Button type="button" variant="outline" onClick={handleSaveStep}>
              <Save className="h-4 w-4 mr-2" />
              Save Step
            </Button>

            <Button type="button" onClick={handlePrint} className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={handlePrevious}
            >
              Previous
            </button>

            <span className="font-medium">{steps[currentStep]}</span>

            <button
              type="button"
              disabled={currentStep === steps.length - 1}
              onClick={handleNext}
            >
              Next
            </button>
          </div>

          <div className="space-y-4">{renderStep()}</div>
        </div>

        <div
          id="resume-print"
          className="bg-white p-6 rounded-2xl shadow-lg overflow-auto"
        >
          {renderTemplate()}
        </div>
      </div>
    </>
  );
}