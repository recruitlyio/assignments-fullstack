import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function JobSeekerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    relocate: false,
    remote: false,
    currentTitle: "",
    experienceYears: "",
    skills: "",
    preferredRoles: "",
    jobType: "",
    startDate: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const qeuryString = `?fullName=${encodeURIComponent(
      formData.fullName
    )}&email=${encodeURIComponent(
      formData.email
    )}&location=${encodeURIComponent(formData.location)}&relocate=${
      formData.relocate
    }&remote=${formData.remote}&currentTitle=${encodeURIComponent(
      formData.currentTitle
    )}&experienceYears=${encodeURIComponent(
      formData.experienceYears
    )}&skills=${encodeURIComponent(
      formData.skills
    )}&preferredRoles=${encodeURIComponent(
      formData.preferredRoles
    )}&jobType=${encodeURIComponent(
      formData.jobType
    )}&startDate=${encodeURIComponent(formData.startDate)}`;
    navigate(`/questions${qeuryString}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Job Seeker Form</h2>

      <div className="flex flex-col space-y-2">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Current Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="relocate"
          checked={formData.relocate}
          onChange={handleChange}
        />
        <label>Willing to relocate</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="remote"
          checked={formData.remote}
          onChange={handleChange}
        />
        <label>Prefer remote work</label>
      </div>

      <div className="flex flex-col space-y-2">
        <label>Current Job Title</label>
        <input
          type="text"
          name="currentTitle"
          value={formData.currentTitle}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Years of Experience</label>
        <input
          type="text"
          name="experienceYears"
          value={formData.experienceYears}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="e.g., React, Node.js, Figma"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Preferred Roles</label>
        <input
          type="text"
          name="preferredRoles"
          value={formData.preferredRoles}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="e.g., Frontend Developer, Product Manager"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Preferred Job Type</label>
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label>Start Date Availability</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <Button type="submit" className="mx-auto w-32">
        Submit
      </Button>
    </form>
  );
}
