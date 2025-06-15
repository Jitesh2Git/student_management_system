import { IconLock } from "@tabler/icons-react";

const FieldLabel = ({ label, editable }) => (
  <label className="text-[15px] font-medium text-gray-700 mb-1 flex items-center gap-1">
    {label}
    {editable ? (
      <span className="text-green-500 text-lg">*</span>
    ) : (
      <IconLock size={14} className="text-destructive mb-2" />
    )}
  </label>
);

export default FieldLabel;
