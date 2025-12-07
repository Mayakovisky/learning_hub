import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Award, Edit2, Save, X } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
  avatar: string;
  role: string;
  coursesCompleted: number;
  achievements: number;
  followers: number;
}

const defaultProfile: UserProfile = {
  name: "Alex Student",
  email: "alex.student@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "December 1, 2023",
  bio: "Passionate learner dedicated to mastering web development and design. Love collaborative learning and sharing knowledge with the community.",
  avatar: "AS",
  role: "Student",
  coursesCompleted: 12,
  achievements: 18,
  followers: 234,
};

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [editForm, setEditForm] = useState<UserProfile>(defaultProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your profile information and preferences
            </p>
          </div>
          {!isEditing && (
            <Button onClick={handleEdit} variant="gradient">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Header Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <div className="h-24 w-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {profile.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {profile.name}
                </h2>
                <p className="text-muted-foreground mb-3">{profile.bio}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary">{profile.role}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {profile.joinDate}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 md:border-l md:border-border md:pl-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {profile.coursesCompleted}
                  </p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {profile.achievements}
                  </p>
                  <p className="text-xs text-muted-foreground">Achievements</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {profile.followers}
                  </p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            {isEditing && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} variant="gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-foreground">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                    className="w-full"
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-foreground">{profile.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-foreground">{profile.location}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                />
              ) : (
                <p className="text-foreground">{profile.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account security and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your password regularly for security
                </p>
              </div>
              <Button size="sm" variant="outline">Change</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button size="sm" variant="outline">Enable</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Manage your notification preferences
                </p>
              </div>
              <Button size="sm" variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-destructive/50 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and data
                </p>
              </div>
              <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
