












'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMale, FaFemale, FaMoon, FaSun, FaCamera, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";

export default function NikahPage() {
  const [dark, setDark] = useState(true);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    father: "",
    mother: "",
    village: "",
    address: "",
    mobile: "",
    mehr: "",
    witness: "",
  });

  const bg = dark
    ? "from-slate-950 via-slate-900 to-black text-white"
    : "from-pink-100 via-indigo-100 to-white text-black";

  const card = dark
    ? "bg-white/5 border-white/10"
    : "bg-white border-gray-200";

  const handlePhoto = (e: any) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  // 🖨️ PDF with Signature Box
  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFontSize(16);
    pdf.text("🕌 Islamic Nikah Form", 20, 20);

    pdf.setFontSize(12);
    let y = 40;
    pdf.text(`Role: ${role}`, 20, y); y += 10;

    Object.entries(form).forEach(([k, v]) => {
      pdf.text(`${k.toUpperCase()} : ${v}`, 20, y);
      y += 8;
    });

    y += 10;
    pdf.text("Signatures:", 20, y); y += 10;

    const sigWidth = 60;
    const sigHeight = 0; // text only
    const gap = 10;

    pdf.text("Groom: ____________________", 20, y);
    pdf.text("Bride: ____________________", 20 + sigWidth + gap, y);
    y += 15;
    pdf.text("Witness: ____________________", 20, y);
    pdf.text("Kazi: ____________________", 20 + sigWidth + gap, y);
    y += 20;
    pdf.text("Date: ____________________", 20, y);

    pdf.save("Nikah_With_Signature.pdf");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} flex items-center justify-center p-6`}>
      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-xl w-full p-8 rounded-3xl shadow-2xl border ${card}`}
      >
        <h1 className="text-2xl font-bold text-center text-emerald-400 mb-6">
          🕌 Nikah Registration
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="mb-4">পাত্র / পাত্রী  নির্বাচন করুন</h2>
            <div className="flex justify-center gap-6">
              <SelectCard
                icon={<FaMale size={36} />}
                label="পাত্র"
                color="emerald"
                onClick={() => { setRole("পাত্র"); setStep(2); }}
              />
              <SelectCard
                icon={<FaFemale size={36} />}
                label="পাত্রী"
                color="pink"
                onClick={() => { setRole("পাত্রী"); setStep(2); }}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="text-center">
            <p className="mb-4">Profile Photo Upload</p>
            <label className="cursor-pointer">
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-emerald-400 shadow-xl overflow-hidden">
                {photo ? (
                  <img src={photo} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <FaCamera size={28} />
                  </div>
                )}
              </div>
              <input type="file" hidden onChange={handlePhoto} />
            </label>
            <Nav next={() => setStep(3)} />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <Input label="নাম" k="name" form={form} setForm={setForm} dark={dark} />
            <Input label="পিতার নাম" k="father" form={form} setForm={setForm} dark={dark} />
            <Input label="মাতার নাম" k="mother" form={form} setForm={setForm} dark={dark} />
            <Nav prev={() => setStep(2)} next={() => setStep(4)} />
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <Input label="গ্রাম" k="village" form={form} setForm={setForm} dark={dark} />
            <Input label="সম্পূর্ণ ঠিকানা" k="address" form={form} setForm={setForm} dark={dark} />
            <Input label="মোবাইল নাম্বার" k="mobile" form={form} setForm={setForm} dark={dark} />
            <Nav prev={() => setStep(3)} next={() => setStep(5)} />
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <Input label="মোহরানা" k="mehr" form={form} setForm={setForm} dark={dark} />
            <Input label="সাক্ষীর নাম" k="witness" form={form} setForm={setForm} dark={dark} />
            <Nav prev={() => setStep(4)} next={() => setStep(6)} />
          </>
        )}

        {/* FINAL STEP */}
        {step === 6 && (
          <div className="text-center">
            <button
              onClick={downloadPDF}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 mx-auto"
            >
              <FaFilePdf /> Download PDF with Signature
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* Components */
function Input({ label, k, form, setForm, dark }: any) {
  return (
    <input
      placeholder={label}
      value={form[k]}
      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
      className={`w-full p-3 rounded-lg mb-4 border
        ${dark ? "bg-black/40 border-white/20 text-white" : "bg-white border-gray-300"}`}
    />
  );
}

function Nav({ prev, next }: any) {
  return (
    <div className="flex justify-between mt-4">
      {prev && <button onClick={prev} className="px-4 py-2 bg-white/10 rounded-lg">Back</button>}
      <button onClick={next} className="px-5 py-2 bg-emerald-500 text-black rounded-lg">Next</button>
    </div>
  );
}

function SelectCard({ icon, label, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl shadow-xl bg-${color}-500/10 hover:bg-${color}-500 hover:text-black transition`}
    >
      {icon}
      <p className="mt-2 font-semibold">{label}</p>
    </button>
  );
}

















// 'use client';

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaMale, FaFemale, FaCamera, FaFilePdf } from "react-icons/fa";
// import jsPDF from "jspdf";

// export default function NikahStepPage() {
//   const [step, setStep] = useState(1);
//   const [role, setRole] = useState("");
//   const [photo, setPhoto] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     father: "",
//     mother: "",
//     village: "",
//     address: "",
//     mobile: "",
//     mehr: "",
//     witness: "",
//   });

//   const next = () => setStep(step + 1);
//   const prev = () => setStep(step - 1);

//   const handlePhoto = (e: any) => {
//     const file = e.target.files[0];
//     if (file) setPhoto(URL.createObjectURL(file));
//   };

//   // 📄 Biodata PDF
//   const downloadBiodataPDF = () => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(18);
//     pdf.text("Islamic Nikah Biodata", 20, 20);
//     pdf.setFontSize(12);

//     let y = 40;
//     pdf.text(`Role: ${role}`, 20, y); y += 10;

//     Object.entries(form).forEach(([k, v]) => {
//       pdf.text(`${k.toUpperCase()} : ${v}`, 20, y);
//       y += 8;
//     });

//     pdf.save("Nikah_Biodata.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex justify-center items-center p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white max-w-xl w-full p-8 rounded-2xl shadow-2xl"
//       >
//         <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
//           💍 Step-by-Step Nikah Form
//         </h1>

//         {/* STEP 1 */}
//         {step === 1 && (
//           <motion.div className="text-center">
//             <h2 className="font-semibold mb-4">Select Groom / Bride</h2>
//             <div className="flex justify-center gap-6">
//               <button
//                 onClick={() => { setRole("Groom"); next(); }}
//                 className="p-6 bg-indigo-100 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white"
//               >
//                 <FaMale size={36} /> <p>Groom</p>
//               </button>

//               <button
//                 onClick={() => { setRole("Bride"); next(); }}
//                 className="p-6 bg-pink-100 rounded-xl shadow-lg hover:bg-pink-600 hover:text-white"
//               >
//                 <FaFemale size={36} /> <p>Bride</p>
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* STEP 2 */}
//         {step === 2 && (
//           <motion.div className="text-center">
//             <h2 className="font-semibold mb-4">Upload Profile Photo</h2>
//             <label className="cursor-pointer">
//               <div className="w-28 h-28 mx-auto rounded-full border-4 border-pink-400 shadow-lg overflow-hidden">
//                 {photo ? (
//                   <img src={photo} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="h-full flex items-center justify-center text-gray-400">
//                     <FaCamera size={30} />
//                   </div>
//                 )}
//               </div>
//               <input type="file" hidden onChange={handlePhoto} />
//             </label>
//             <button onClick={next} className="btn mt-6">Next</button>
//           </motion.div>
//         )}

//         {/* STEP 3 */}
//         {step === 3 && (
//           <>
//             <Input label="Name" v="name" form={form} setForm={setForm} />
//             <Input label="Father Name" v="father" form={form} setForm={setForm} />
//             <Input label="Mother Name" v="mother" form={form} setForm={setForm} />
//             <Nav prev={prev} next={next} />
//           </>
//         )}

//         {/* STEP 4 */}
//         {step === 4 && (
//           <>
//             <Input label="Village (Gram)" v="village" form={form} setForm={setForm} />
//             <Input label="Full Address" v="address" form={form} setForm={setForm} />
//             <Input label="Mobile Number" v="mobile" form={form} setForm={setForm} />
//             <Nav prev={prev} next={next} />
//           </>
//         )}

//         {/* STEP 5 */}
//         {step === 5 && (
//           <>
//             <Input label="Mehr Amount" v="mehr" form={form} setForm={setForm} />
//             <Input label="Witness Name" v="witness" form={form} setForm={setForm} />
//             <Nav prev={prev} next={next} />
//           </>
//         )}

//         {/* FINAL */}
//         {step === 6 && (
//           <div className="text-center">
//             <h2 className="font-semibold mb-4">Download PDF</h2>
//             <button
//               onClick={downloadBiodataPDF}
//               className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 mx-auto"
//             >
//               <FaFilePdf /> Download PDF
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// /* 🔹 Reusable Input */
// function Input({ label, v, form, setForm }: any) {
//   return (
//     <input
//       placeholder={label}
//       value={form[v]}
//       onChange={(e) => setForm({ ...form, [v]: e.target.value })}
//       className="w-full border p-3 rounded-lg shadow-sm mb-4"
//     />
//   );
// }

// /* 🔹 Navigation Buttons */
// function Nav({ prev, next }: any) {
//   return (
//     <div className="flex justify-between">
//       <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-lg">
//         Back
//       </button>
//       <button onClick={next} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
//         Next
//       </button>
//     </div>
//   );
// }
















// 'use client';

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaMale, FaFemale, FaFilePdf, FaCamera } from "react-icons/fa";
// import jsPDF from "jspdf";

// export default function NikahPage() {
//   const [role, setRole] = useState<"Groom" | "Bride" | null>(null);
//   const [photo, setPhoto] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     father: "",
//     mother: "",
//     age: "",
//     profession: "",
//     address: "",
//     mobile: "",
//     mehr: "",
//     witnesses: "",
//   });

//   // 📸 Profile Photo
//   const handlePhoto = (e: any) => {
//     const file = e.target.files[0];
//     if (file) setPhoto(URL.createObjectURL(file));
//   };

//   // 📄 Biodata PDF Download
//   const downloadBiodataPDF = () => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(18);
//     pdf.text("Islamic Nikah Biodata", 20, 20);

//     pdf.setFontSize(12);
//     let y = 40;
//     pdf.text(`Role: ${role}`, 20, y); y += 10;

//     Object.entries(form).forEach(([key, value]) => {
//       pdf.text(`${key.toUpperCase()} : ${value}`, 20, y);
//       y += 8;
//     });

//     pdf.save("Nikah_Biodata.pdf"); // ⬅️ Direct Download
//   };

//   // 🕌 Nikah Contract PDF Download
//   const downloadNikahContractPDF = () => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(18);
//     pdf.text("Official Nikah Contract", 20, 20);

//     pdf.setFontSize(12);
//     pdf.text(`Name: ${form.name}`, 20, 40);
//     pdf.text(`Father: ${form.father}`, 20, 50);
//     pdf.text(`Mother: ${form.mother}`, 20, 60);
//     pdf.text(`Mehr Amount: ${form.mehr}`, 20, 70);
//     pdf.text(`Witnesses: ${form.witnesses}`, 20, 80);

//     pdf.text("Date: ____________________", 20, 100);
//     pdf.text("Signature of Groom: ____________________", 20, 120);
//     pdf.text("Signature of Bride: ____________________", 20, 135);
//     pdf.text("Kazi Signature: ____________________", 20, 150);

//     pdf.save("Nikah_Contract.pdf"); // ⬅️ Direct Download
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8"
//       >
//         <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//           💍 Islamic Nikah Registration
//         </h1>

//         {/* Groom / Bride Select */}
//         <div className="flex justify-center gap-6 mb-8">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={() => setRole("Groom")}
//             className={`p-6 rounded-xl shadow-xl ${
//               role === "Groom" ? "bg-indigo-600 text-white" : "bg-indigo-100"
//             }`}
//           >
//             <FaMale size={36} />
//             <p className="mt-2 font-semibold">Groom</p>
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={() => setRole("Bride")}
//             className={`p-6 rounded-xl shadow-xl ${
//               role === "Bride" ? "bg-pink-600 text-white" : "bg-pink-100"
//             }`}
//           >
//             <FaFemale size={36} />
//             <p className="mt-2 font-semibold">Bride</p>
//           </motion.button>
//         </div>

//         {/* Photo Upload */}
//         <div className="flex justify-center mb-6">
//           <label className="cursor-pointer text-center">
//             <div className="w-28 h-28 rounded-full border-4 border-pink-400 shadow-lg overflow-hidden mx-auto">
//               {photo ? (
//                 <img src={photo} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-400">
//                   <FaCamera size={28} />
//                 </div>
//               )}
//             </div>
//             <input type="file" hidden onChange={handlePhoto} />
//             <p className="text-sm mt-2">Upload Profile Photo</p>
//           </label>
//         </div>

//         {/* Form Fields */}
//         <div className="grid md:grid-cols-2 gap-4">
//           {Object.keys(form).map((key) => (
//             <input
//               key={key}
//               placeholder={key.toUpperCase()}
//               className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
//               value={(form as any)[key]}
//               onChange={(e) =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//             />
//           ))}
//         </div>

//         {/* Download Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mt-8">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={downloadBiodataPDF}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <FaFilePdf /> Download Biodata PDF
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={downloadNikahContractPDF}
//             className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <FaFilePdf /> Download Nikah Contract PDF
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }












// 'use client';

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FaMale, FaFemale, FaFilePdf, FaCamera } from "react-icons/fa";
// import jsPDF from "jspdf";

// export default function NikahPage() {
//   const [role, setRole] = useState<"groom" | "bride" | null>(null);
//   const [photo, setPhoto] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     father: "",
//     mother: "",
//     age: "",
//     profession: "",
//     address: "",
//     mobile: "",
//     mehr: "",
//     witnesses: "",
//   });

//   // 📸 Photo Upload
//   const handlePhoto = (e: any) => {
//     const file = e.target.files[0];
//     if (file) setPhoto(URL.createObjectURL(file));
//   };

//   // 📄 Biodata PDF
//   const generateBiodataPDF = () => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(16);
//     pdf.text("Islamic Nikah Biodata", 20, 20);

//     let y = 40;
//     Object.entries(form).forEach(([key, value]) => {
//       pdf.text(`${key.toUpperCase()} : ${value}`, 20, y);
//       y += 10;
//     });

//     pdf.save("Nikah_Biodata.pdf");
//   };

//   // 🕌 Nikah Contract PDF
//   const generateNikahPDF = () => {
//     const pdf = new jsPDF();
//     pdf.setFontSize(16);
//     pdf.text("Official Nikah Contract", 20, 20);

//     pdf.setFontSize(12);
//     pdf.text(`Name: ${form.name}`, 20, 40);
//     pdf.text(`Father: ${form.father}`, 20, 50);
//     pdf.text(`Mehr Amount: ${form.mehr}`, 20, 60);
//     pdf.text(`Witnesses: ${form.witnesses}`, 20, 70);
//     pdf.text(`Date: __________`, 20, 90);
//     pdf.text(`Signature (Groom): __________`, 20, 110);
//     pdf.text(`Signature (Bride): __________`, 20, 125);

//     pdf.save("Nikah_Contract.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100 flex items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl p-8"
//       >
//         {/* 💍 Title */}
//         <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
//           💍 Islamic Nikah Registration
//         </h1>

//         {/* 👰🤵 Select Groom / Bride */}
//         <div className="flex justify-center gap-6 mb-8">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={() => setRole("groom")}
//             className={`p-6 rounded-xl shadow-lg ${
//               role === "groom"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-indigo-100"
//             }`}
//           >
//             <FaMale size={40} />
//             <p className="mt-2 font-semibold">Groom</p>
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={() => setRole("bride")}
//             className={`p-6 rounded-xl shadow-lg ${
//               role === "bride"
//                 ? "bg-pink-600 text-white"
//                 : "bg-pink-100"
//             }`}
//           >
//             <FaFemale size={40} />
//             <p className="mt-2 font-semibold">Bride</p>
//           </motion.button>
//         </div>

//         {/* 📸 Profile Upload */}
//         <div className="flex justify-center mb-6">
//           <label className="cursor-pointer text-center">
//             <div className="w-28 h-28 rounded-full shadow-lg border-4 border-pink-400 overflow-hidden mx-auto">
//               {photo ? (
//                 <img src={photo} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-400">
//                   <FaCamera size={30} />
//                 </div>
//               )}
//             </div>
//             <input type="file" hidden onChange={handlePhoto} />
//             <p className="text-sm mt-2">Upload Photo</p>
//           </label>
//         </div>

//         {/* 🕌 Islamic Nikah Fields */}
//         <div className="grid md:grid-cols-2 gap-4">
//           {Object.keys(form).map((key) => (
//             <input
//               key={key}
//               placeholder={key.toUpperCase()}
//               className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
//               value={(form as any)[key]}
//               onChange={(e) =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//             />
//           ))}
//         </div>

//         {/* 📄 PDF Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mt-8">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={generateBiodataPDF}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <FaFilePdf /> Biodata PDF
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             onClick={generateNikahPDF}
//             className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
//           >
//             <FaFilePdf /> Nikah Contract PDF
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }





// "use client";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { FaMale, FaFemale, FaRing, FaCamera } from "react-icons/fa";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function NikahStepForm() {
//   const [step, setStep] = useState(1);
//   const previewRef = useRef();

//   const [formData, setFormData] = useState({
//     role: "",
//     photo: null,
//     name: "",
//     mobile: "",
//     age: "",
//     education: "",
//     institute: "",
//     profession: "",
//     father: "",
//     mother: "",
//     mahr: "",
//     wali: "",
//     witness1: "",
//     witness2: "",
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handlePhoto = (e) =>
//     setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });

//   const next = () => {
//     if (step === 1 && !formData.role) return alert("পাত্র / পাত্রী নির্বাচন করুন");
//     if (step === 2 && (!formData.name || !formData.mobile))
//       return alert("নাম ও মোবাইল দিন");
//     setStep(step + 1);
//   };

//   const back = () => setStep(step - 1);

//   const downloadPDF = async () => {
//     const canvas = await html2canvas(previewRef.current);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
//     pdf.save("Nikah-Biodata.pdf");
//   };

//   return (
//     <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#020617,_#000)] flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(16,185,129,0.25)] text-white"
//       >
//         {/* Header */}
//         <div className="text-center mb-6">
//           <FaRing className="mx-auto text-emerald-400 text-3xl mb-2" />
//           <h1 className="text-2xl font-bold text-emerald-400">
//             Nikah Registration
//           </h1>
//           <p className="text-gray-400">Step {step} of 6</p>
//         </div>

//         {/* STEP 1 – Groom / Bride */}
//         {step === 1 && (
//           <motion.div className="grid grid-cols-2 gap-4">
//             {["groom", "bride"].map((r) => (
//               <div
//                 key={r}
//                 onClick={() => setFormData({ ...formData, role: r })}
//                 className={`cursor-pointer p-6 rounded-2xl border text-center
//                 ${
//                   formData.role === r
//                     ? "border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.6)]"
//                     : "border-white/20"
//                 }`}
//               >
//                 {r === "groom" ? (
//                   <FaMale className="mx-auto text-4xl text-blue-400" />
//                 ) : (
//                   <FaFemale className="mx-auto text-4xl text-pink-400" />
//                 )}
//                 <p className="mt-2">{r === "groom" ? "পাত্র" : "পাত্রী"}</p>
//               </div>
//             ))}
//           </motion.div>
//         )}

//         {/* STEP 2 – Photo + Basic */}
//         {step === 2 && (
//           <motion.div className="space-y-4">
//             <label className="flex items-center gap-4 cursor-pointer">
//               <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
//                 {formData.photo ? (
//                   <img src={formData.photo} className="w-full h-full object-cover" />
//                 ) : (
//                   <FaCamera className="text-2xl text-gray-400" />
//                 )}
//               </div>
//               <span className="text-sm text-gray-300">Profile Photo Upload</span>
//               <input type="file" hidden onChange={handlePhoto} />
//             </label>

//             <input name="name" onChange={handleChange} className="input" placeholder="পূর্ণ নাম" />
//             <input name="mobile" onChange={handleChange} className="input" placeholder="মোবাইল নাম্বার" />
//             <input name="age" onChange={handleChange} className="input" placeholder="বয়স" />
//           </motion.div>
//         )}

//         {/* STEP 3 – Education */}
//         {step === 3 && (
//           <motion.div className="space-y-4">
//             <input name="education" onChange={handleChange} className="input" placeholder="সর্বোচ্চ শিক্ষা" />
//             <input name="institute" onChange={handleChange} className="input" placeholder="শিক্ষা প্রতিষ্ঠান" />
//             <input name="profession" onChange={handleChange} className="input" placeholder="পেশা" />
//           </motion.div>
//         )}

//         {/* STEP 4 – Family */}
//         {step === 4 && (
//           <motion.div className="space-y-4">
//             <input name="father" onChange={handleChange} className="input" placeholder="পিতার নাম" />
//             <input name="mother" onChange={handleChange} className="input" placeholder="মাতার নাম" />
//           </motion.div>
//         )}

//         {/* STEP 5 – Islamic Nikah Info */}
//         {step === 5 && (
//           <motion.div className="space-y-4">
//             <input name="mahr" onChange={handleChange} className="input" placeholder="মাহর (টাকা/স্বর্ণ)" />
//             <input name="wali" onChange={handleChange} className="input" placeholder="ওয়ালি" />
//             <input name="witness1" onChange={handleChange} className="input" placeholder="সাক্ষী ১" />
//             <input name="witness2" onChange={handleChange} className="input" placeholder="সাক্ষী ২" />
//           </motion.div>
//         )}

//         {/* STEP 6 – Preview + PDF */}
//         {step === 6 && (
//           <div ref={previewRef} className="space-y-2 text-sm bg-black/40 p-4 rounded-xl">
//             <p className="text-emerald-400 font-semibold">Nikah Biodata Preview</p>
//             {formData.photo && (
//               <img src={formData.photo} className="w-24 h-24 rounded-full object-cover mb-2" />
//             )}
//             {Object.entries(formData).map(
//               ([k, v]) =>
//                 k !== "photo" && <p key={k}><b>{k}:</b> {v}</p>
//             )}
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           {step > 1 && (
//             <button onClick={back} className="px-6 py-2 rounded-xl border border-gray-600">
//               Back
//             </button>
//           )}
//           {step < 6 ? (
//             <button onClick={next} className="ml-auto px-6 py-2 rounded-xl bg-emerald-400 text-black font-semibold">
//               Next
//             </button>
//           ) : (
//             <button onClick={downloadPDF} className="ml-auto px-6 py-2 rounded-xl bg-cyan-400 text-black font-semibold">
//               Download PDF
//             </button>
//           )}
//         </div>
//       </motion.div>

//       {/* Input Style */}
//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 12px 16px;
//           border-radius: 14px;
//           background: rgba(255,255,255,0.08);
//           border: 1px solid rgba(255,255,255,0.2);
//           color: white;
//           outline: none;
//         }
//         .input:focus {
//           border-color: #34d399;
//           box-shadow: 0 0 0 2px rgba(52,211,153,0.4);
//         }
//       `}</style>
//     </div>
//   );
// }

