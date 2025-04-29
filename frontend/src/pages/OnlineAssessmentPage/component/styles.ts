const inputBase =
  "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2";
const inputNormal =
  "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500";
const inputError =
  "border-red-500 focus:ring-red-500 focus:border-red-500";
const labelBase = "block text-sm font-medium text-gray-700 mb-1";
const errorText = "mt-1 text-xs text-red-600";
const requiredMark = "text-red-500";

export const styles = {
  pageContainer: "max-w-4xl mx-auto p-4 md:p-8 space-y-8", // Added page container style
  formContainer:
    "p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6",
  fieldGroup: "space-y-1",
  label: labelBase,
  requiredMark: requiredMark,
  input: `${inputBase} ${inputNormal}`,
  inputWithError: `${inputBase} ${inputError}`,
  textarea: `${inputBase} ${inputNormal}`,
  textareaWithError: `${inputBase} ${inputError}`,
  select: `${inputBase} ${inputNormal}`,
  selectWithError: `${inputBase} ${inputError}`,
  errorText: errorText,
  fieldset: "space-y-4",
  legend: `${labelBase} mb-1`, 
  experienceGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-start",
  experienceLabel: "block text-xs font-medium text-gray-600 mb-1",
  submitButton:
    "w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  submitButtonDisabled: "opacity-50 cursor-not-allowed",
  questionsContainer: "mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm space-y-6",
  questionsTitle: "text-xl font-semibold text-gray-800 border-b pb-2 mb-4", 
  questionItem: "p-4 bg-white border border-gray-100 rounded-md shadow-xs space-y-2",
  questionText: "text-md font-medium text-gray-900", 
  guidelinesText: "text-sm text-gray-700", 
  skillsText: "text-sm text-gray-600 italic", 
};

export const combineClasses = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
}
