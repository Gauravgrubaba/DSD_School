import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminAdmissionStep3 = ({ step, formDataFromBackend, handleBack, setStep }) => {
  const [historyData, setHistoryData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [declaration, setDeclaration] = useState({
    signature: "",
    signatoryName: "",
    relation: "",
    date: "",
    confirm: false
  });
  const [editMode, setEditMode] = useState(true);
  const pdfRef = useRef(null);

  // Load existing data from backend
  useEffect(() => {
    if (formDataFromBackend) {
      setHistoryData(formDataFromBackend.history || []);
      setDocuments(formDataFromBackend.documents || []);
      setDeclaration(formDataFromBackend.declaration || {});
    }
  }, [formDataFromBackend]);

  const handleHistoryChange = (rowIdx, colIdx, value) => {
    const updated = [...historyData];
    if (!updated[rowIdx]) updated[rowIdx] = Array(6).fill("");
    updated[rowIdx][colIdx] = value;
    setHistoryData(updated);
  };

  const handleDocumentChange = (index, field, value) => {
    const updated = [...documents];
    if (!updated[index]) updated[index] = {};
    updated[index][field] = value;
    setDocuments(updated);
  };

  const handleDeclarationChange = (field, value) => {
    setDeclaration(prev => ({ ...prev, [field]: value }));
  };

  const saveForm = () => {
    // Here you can send `historyData`, `documents`, and `declaration` to your backend
    alert("Data saved successfully!");
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("admission_form_step3.pdf");
  };

 

  return (
    <div className="space-y-6" ref={pdfRef}>
      

      {/* --- Brief History --- */}
      <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
        Brief History of the Child
      </h2>
      <div className="overflow-x-auto border border-black rounded-lg mb-8">
        <table className="w-full min-w-[750px] text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              {["Sr.No", "School Name", "City", "Board", "Year Completed", "Grade", "Reason of Leaving"].map((h, i) => (
                <th key={i} className="border border-black px-3 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                <td className="border border-black px-3 py-2 font-semibold">{row + 1}</td>
                {[...Array(6)].map((_, i) => (
                  <td key={i} className="border border-black px-2 py-1">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                      value={historyData[row]?.[i] || ""}
                      onChange={e => handleHistoryChange(row, i, e.target.value)}
                      disabled={!editMode}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Documents Checklist --- */}
      <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
        Checklist of Documents
      </h2>
      <div className="overflow-x-auto border border-black rounded-lg mb-8">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black px-3 py-2">Sr.No</th>
              <th className="border border-black px-3 py-2">Document</th>
              <th className="border border-black px-3 py-2 text-center">Yes</th>
              <th className="border border-black px-3 py-2 text-center">No</th>
              <th className="border border-black px-3 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Attested Birth Certificate",
              "Report Card",
              "Achievements Certificate",
              "Disability Certificate",
              "Proof of Residence",
              "Transfer Certificate",
              "Aadhar Card",
              "Bank Account Number"
            ].map((doc, index) => (
              <tr key={index}>
                <td className="border border-black px-3 py-2 text-center">{index + 1}</td>
                <td className="border border-black px-3 py-2">{doc}</td>
                <td className="border border-black px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={documents[index]?.yes || false}
                    onChange={(e) => handleDocumentChange(index, "yes", e.target.checked)}
                    disabled={!editMode}
                  />
                </td>
                <td className="border border-black px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={documents[index]?.no || false}
                    onChange={(e) => handleDocumentChange(index, "no", e.target.checked)}
                    disabled={!editMode}
                  />
                </td>
                <td className="border border-black px-3 py-2">
                  <input
                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    value={documents[index]?.remark || ""}
                    onChange={e => handleDocumentChange(index, "remark", e.target.value)}
                    disabled={!editMode}
                    placeholder="Remark"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Declaration --- */}
      <h2 className="text-lg sm:text-xl font-bold text-center border-b border-black pb-3 uppercase tracking-widest">
        Declaration
      </h2>
      <div className="space-y-4 text-sm leading-relaxed border border-black p-6 rounded-xl bg-gray-50">
        <p>
          I declare that all the information provided in this application form is true, complete, and correct to the best of my knowledge and belief.
        </p>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1 border border-black accent-green-600"
            checked={declaration.confirm}
            onChange={(e) => handleDeclarationChange("confirm", e.target.checked)}
            disabled={!editMode}
          />
          <label className="text-sm font-medium leading-tight">
            I confirm that all the information provided above is true and correct.
          </label>
        </div>
      </div>

      {/* --- Signature Details --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {[
          { label: "Signature", name: "signature", placeholder: "Signature" },
          { label: "Full Name of the Signatory", name: "signatoryName", placeholder: "Full Name" },
          { label: "Relationship to the Child", name: "relation", placeholder: "e.g., Father, Mother" },
          { label: "Date", name: "date", type: "date" }
        ].map((field, i) => (
          <div key={i}>
            <label className="text-sm font-medium">{field.label}</label>
            <input
              type={field.type || "text"}
              className="w-full border border-black px-3 py-2 mt-1 rounded-md"
              placeholder={field.placeholder}
              value={declaration[field.name]}
              onChange={e => handleDeclarationChange(field.name, e.target.value)}
              disabled={!editMode}
            />
          </div>
        ))}
      </div>

      {/* --- Navigation --- */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg w-full sm:w-auto"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep(4)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg w-full sm:w-auto"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default AdminAdmissionStep3;
