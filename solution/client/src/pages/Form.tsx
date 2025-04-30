import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

    const qeuryString = `?currentTitle=${encodeURIComponent(
      formData.currentTitle
    )}&experienceYears=${encodeURIComponent(
      formData.experienceYears
    )}&skills=${encodeURIComponent(
      formData.skills
    )}&preferredRoles=${encodeURIComponent(
      formData.preferredRoles
    )}&jobType=${encodeURIComponent(formData.jobType)}`;

    navigate(`/questions${qeuryString}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 border-2 border-slate-500 shadow-2xl rounded-md my-5"
    >
      <h2 className="text-2xl font-bold">Job Seeker Form</h2>

      <div className="flex flex-col space-y-2">
        <Label>Full Name</Label>
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Phone Number</Label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Current Location</Label>
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
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
        <Label>Willing to relocate</Label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="remote"
          checked={formData.remote}
          onChange={handleChange}
        />
        <Label>Prefer remote work</Label>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Current Job Title</Label>
        <Input
          type="text"
          name="currentTitle"
          value={formData.currentTitle}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Years of Experience</Label>
        <Input
          type="text"
          name="experienceYears"
          value={formData.experienceYears}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Skills (comma separated)</Label>
        <Input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          className="border p-2 rounded"
          placeholder="e.g., React, Node.js, Figma"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Preferred Roles</Label>
        <Input
          type="text"
          name="preferredRoles"
          value={formData.preferredRoles}
          onChange={handleChange}
          required
          className="border p-2 rounded"
          placeholder="e.g., Frontend Developer, Product Manager"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Preferred Job Type</Label>
        <Select
          onValueChange={(value) => {
            setFormData((current) => ({ ...current, preferredRoles: value }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"Full-time"}>Full-time</SelectItem>
            <SelectItem value={"Part-time"}>Part-time</SelectItem>
            <SelectItem value={"Contract"}>Contract</SelectItem>
            <SelectItem value={"Internship"}>Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="mx-auto w-full mb-10 cursor-pointer">
        Submit
      </Button>
    </form>
  );
}
