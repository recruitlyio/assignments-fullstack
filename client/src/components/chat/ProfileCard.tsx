import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  User,
  Mail,
  Clock,
  Code,
  GraduationCap,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { Profile } from "../../types/types";

interface ProfileCardProps {
  profile: Profile | null;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const isEmpty =
    !profile ||
    (!profile.name &&
      !profile.contact &&
      profile.yearsOfExperience === undefined &&
      (!profile.skills || profile.skills.length === 0) &&
      (!profile.education || profile.education.length === 0) &&
      !profile.currentTitle);

  return (
    <Card className="w-full max-w-md h-full shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-center text-gray-700 flex items-center justify-center gap-2">
          <User size={20} className="text-primary" />
          Candidate Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        {!isEmpty ? (
          <div className="space-y-6">
            {profile?.name && (
              <ProfileHeader
                name={profile.name}
                currentTitle={profile.currentTitle}
              />
            )}

            {profile?.contact && (
              <ProfileItem
                icon={<Mail className="h-5 w-5 text-primary flex-shrink-0" />}
              >
                <span className="text-sm text-gray-800 overflow-hidden text-ellipsis">
                  {profile.contact}
                </span>
              </ProfileItem>
            )}

            {profile?.yearsOfExperience !== undefined && (
              <ProfileItem
                icon={<Clock className="h-5 w-5 text-primary flex-shrink-0" />}
              >
                <span className="text-sm text-gray-800">
                  {profile.yearsOfExperience}{" "}
                  {profile.yearsOfExperience === 1 ? "year" : "years"} of
                  experience
                </span>
              </ProfileItem>
            )}

            {profile?.skills && profile.skills.length > 0 && (
              <SkillsSection skills={profile.skills} />
            )}

            {profile?.education && profile.education.length > 0 && (
              <EducationSection education={profile.education} />
            )}
          </div>
        ) : (
          <EmptyProfileState />
        )}
      </CardContent>
    </Card>
  );
}

function ProfileHeader({
  name,
  currentTitle,
}: {
  name: string;
  currentTitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2">
        {name
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </div>
      <h2 className="text-xl font-semibold text-center">{name}</h2>
      {currentTitle && (
        <div className="flex items-center gap-1 mt-1 text-gray-600">
          <Briefcase size={16} />
          <span>{currentTitle}</span>
        </div>
      )}
    </div>
  );
}

function ProfileItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 items-center">
      {icon}
      {children}
    </div>
  );
}

function SkillsSection({ skills }: { skills: string[] }) {
  return (
    <div className="space-y-2">
      <ProfileItem
        icon={<Code className="h-5 w-5 text-primary flex-shrink-0" />}
      >
        <span className="font-medium">Skills</span>
      </ProfileItem>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ education }: { education: string[] }) {
  return (
    <div className="space-y-2">
      <ProfileItem
        icon={<GraduationCap className="h-5 w-5 text-primary flex-shrink-0" />}
      >
        <span className="font-medium">Education</span>
      </ProfileItem>
      <ul className="space-y-1 pl-7 list-disc">
        {education.map((edu, index) => (
          <li key={index} className="text-sm text-gray-800">
            {edu}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyProfileState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <BookOpen className="h-12 w-12 mb-3 opacity-50" />
      <p className="text-center">
        Profile information will appear here as it's learned during the
        conversation.
      </p>
    </div>
  );
}
