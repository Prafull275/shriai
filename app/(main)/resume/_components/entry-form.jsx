// // app/resume/_components/entry-form.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format, parse } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { entrySchema } from "@/app/lib/schema";
// import { Sparkles, PlusCircle, X, Pencil, Save, Loader2 } from "lucide-react";
// import { improveWithAI } from "@/actions/resume";
// import { toast } from "sonner";
// import useFetch from "@/hooks/use-fetch";

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM", new Date());
//   return format(date, "MMM yyyy");
// };

// export function EntryForm({ type, entries, onChange }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const {
//     register,
//     handleSubmit: handleValidation,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(entrySchema),
//     defaultValues: {
//       title: "",
//       organization: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       current: false,
//     },
//   });

//   const current = watch("current");

//   const handleAdd = handleValidation((data) => {
//     const formattedEntry = {
//       ...data,
//       startDate: formatDisplayDate(data.startDate),
//       endDate: data.current ? "" : formatDisplayDate(data.endDate),
//     };

//     onChange([...entries, formattedEntry]);

//     reset();
//     setIsAdding(false);
//   });

//   const handleDelete = (index) => {
//     const newEntries = entries.filter((_, i) => i !== index);
//     onChange(newEntries);
//   };

//   const {
//     loading: isImproving,
//     fn: improveWithAIFn,
//     data: improvedContent,
//     error: improveError,
//   } = useFetch(improveWithAI);

//   // Add this effect to handle the improvement result
//   useEffect(() => {
//     if (improvedContent && !isImproving) {
//       setValue("description", improvedContent);
//       toast.success("Description improved successfully!");
//     }
//     if (improveError) {
//       toast.error(improveError.message || "Failed to improve description");
//     }
//   }, [improvedContent, improveError, isImproving, setValue]);

//   // Replace handleImproveDescription with this
//   const handleImproveDescription = async () => {
//     const description = watch("description");
//     if (!description) {
//       toast.error("Please enter a description first");
//       return;
//     }

//     await improveWithAIFn({
//       current: description,
//       type: type.toLowerCase(), // 'experience', 'education', or 'project'
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <div className="space-y-4">
//         {entries.map((item, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {item.title} @ {item.organization}
//               </CardTitle>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 type="button"
//                 onClick={() => handleDelete(index)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">
//                 {item.current
//                   ? `${item.startDate} - Present`
//                   : `${item.startDate} - ${item.endDate}`}
//               </p>
//               <p className="mt-2 text-sm whitespace-pre-wrap">
//                 {item.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {isAdding && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Add {type}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Title/Position"
//                   {...register("title")}
//                   error={errors.title}
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500">{errors.title.message}</p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Input
//                   placeholder="Organization/Company"
//                   {...register("organization")}
//                   error={errors.organization}
//                 />
//                 {errors.organization && (
//                   <p className="text-sm text-red-500">
//                     {errors.organization.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Input
//                   type="month"
//                   {...register("startDate")}
//                   error={errors.startDate}
//                 />
//                 {errors.startDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.startDate.message}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Input
//                   type="month"
//                   {...register("endDate")}
//                   disabled={current}
//                   error={errors.endDate}
//                 />
//                 {errors.endDate && (
//                   <p className="text-sm text-red-500">
//                     {errors.endDate.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="current"
//                 {...register("current")}
//                 onChange={(e) => {
//                   setValue("current", e.target.checked);
//                   if (e.target.checked) {
//                     setValue("endDate", "");
//                   }
//                 }}
//               />
//               <label htmlFor="current">Current {type}</label>
//             </div>

//             <div className="space-y-2">
//               <Textarea
//                 placeholder={`Description of your ${type.toLowerCase()}`}
//                 className="h-32"
//                 {...register("description")}
//                 error={errors.description}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               onClick={handleImproveDescription}
//               disabled={isImproving || !watch("description")}
//             >
//               {isImproving ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Improving...
//                 </>
//               ) : (
//                 <>
//                   <Sparkles className="h-4 w-4 mr-2" />
//                   Improve with AI
//                 </>
//               )}
//             </Button>
//           </CardContent>
//           <CardFooter className="flex justify-end space-x-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => {
//                 reset();
//                 setIsAdding(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button type="button" onClick={handleAdd}>
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Entry
//             </Button>
//           </CardFooter>
//         </Card>
//       )}

//       {!isAdding && (
//         <Button
//           className="w-full"
//           variant="outline"
//           onClick={() => setIsAdding(true)}
//         >
//           <PlusCircle className="h-4 w-4 mr-2" />
//           Add {type}
//         </Button>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PlusCircle, X, Sparkles, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

export function EntryForm({ type, entries = [], onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const emptyForm = useMemo(
    () => ({
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }),
    []
  );

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    shouldUnregister: true,
    defaultValues: emptyForm,
  });

  useEffect(() => {
    reset(emptyForm);
    setIsAdding(false);
  }, [type, reset, emptyForm]);

  const current = watch("current");
  const description = watch("description");

  const { loading, fn, data } = useFetch(improveWithAI);

  useEffect(() => {
    if (data) {
      setValue("description", data);
      toast.success("Description improved");
    }
  }, [data, setValue]);

  const improve = async () => {
    if (!description?.trim()) return;
    await fn({ current: description, type: type.toLowerCase() });
  };

  const handleAdd = handleSubmit((data) => {
    let cleanedData;

    if (type === "Experience") {
      cleanedData = {
        title: data.title?.trim() || "",
        organization: data.organization?.trim() || "",
        startDate: data.startDate || "",
        endDate: data.current ? "" : data.endDate || "",
        description: data.description?.trim() || "",
        current: !!data.current,
      };
    } else if (type === "Education") {
      cleanedData = {
        title: data.title?.trim() || "",
        organization: data.organization?.trim() || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        description: data.description?.trim() || "",
        current: false,
      };
    } else {
      cleanedData = {
        title: data.title?.trim() || "",
        organization: "",
        startDate: "",
        endDate: "",
        description: data.description?.trim() || "",
        current: false,
      };
    }

    onChange([...(entries || []), cleanedData]);
    reset(emptyForm);
    setIsAdding(false);
  });

  const handleDelete = (index) => {
    onChange((entries || []).filter((_, i) => i !== index));
  };

  const labels = {
    title:
      type === "Project"
        ? "Project Title"
        : type === "Education"
        ? "Degree / Course"
        : "Job Title",
    organization:
      type === "Education" ? "School / College" : "Company / Organization",
    description:
      type === "Project"
        ? "Describe the project, tech stack, features, and impact"
        : type === "Education"
        ? "Describe coursework, achievements, or highlights"
        : "Describe responsibilities and achievements",
  };

  const renderCard = (item) => {
    if (type === "Project") {
      return (
        <>
          <h4 className="font-semibold text-sm">
            {item.title || "Untitled Project"}
          </h4>
          {item.description && (
            <p className="text-sm mt-2 whitespace-pre-wrap">
              {item.description}
            </p>
          )}
        </>
      );
    }

    if (type === "Education") {
      return (
        <>
          <h4 className="font-semibold text-sm">
            {item.title || "Untitled Education"}
          </h4>
          {item.organization && (
            <p className="text-sm mt-1 text-muted-foreground">
              {item.organization}
            </p>
          )}
          {item.startDate && (
            <p className="text-xs text-muted-foreground mt-1">
              {item.startDate}
              {item.endDate ? ` - ${item.endDate}` : ""}
            </p>
          )}
          {item.description && (
            <p className="text-sm mt-2 whitespace-pre-wrap">
              {item.description}
            </p>
          )}
        </>
      );
    }

    return (
      <>
        <h4 className="font-semibold text-sm">
          {item.title || "Untitled Role"}
          {item.organization ? ` @ ${item.organization}` : ""}
        </h4>
        {(item.startDate || item.endDate || item.current) && (
          <p className="text-xs text-muted-foreground mt-1">
            {item.startDate || ""}
            {(item.startDate || item.endDate || item.current) ? " - " : ""}
            {item.current ? "Present" : item.endDate || ""}
          </p>
        )}
        {item.description && (
          <p className="text-sm mt-2 whitespace-pre-wrap">
            {item.description}
          </p>
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {entries.length > 0 &&
        entries.map((item, index) => (
          <Card
            key={`${type}-${index}-${item.title}-${item.organization}`}
            className="p-4 flex justify-between items-start"
          >
            <div>{renderCard(item)}</div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleDelete(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}

      {!isAdding && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            reset(emptyForm);
            setIsAdding(true);
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}

      {isAdding && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold">Add {type}</h3>

          {type !== "Project" && (
            <Input
              placeholder={labels.organization}
              {...register("organization")}
            />
          )}

          <Input placeholder={labels.title} {...register("title")} />

          {type !== "Project" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input type="month" {...register("startDate")} />
                <Input
                  type="month"
                  {...register("endDate")}
                  disabled={type === "Experience" && current}
                />
              </div>

              {type === "Experience" && (
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!current}
                    onChange={(e) => {
                      setValue("current", e.target.checked);
                      if (e.target.checked) setValue("endDate", "");
                    }}
                  />
                  Currently working here
                </div>
              )}
            </>
          )}

          <Textarea
            placeholder={labels.description}
            className="h-28"
            {...register("description")}
          />

          <Button
            type="button"
            variant="ghost"
            onClick={improve}
            disabled={loading || !description?.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Enhance with AI
              </>
            )}
          </Button>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset(emptyForm);
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              Add
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}