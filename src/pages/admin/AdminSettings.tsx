import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Users,
  FileText,
  Shield,
  Database,
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsState {
  siteName: string;
  siteUrl: string;
  supportEmail: string;
  supportPhone: string;
  timezone: string;
  language: string;
  currency: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  courseApprovalRequired: boolean;
  autoEnrollmentEmail: boolean;
  platformFee: number;
  maxFileSize: number;
  sessionTimeout: number;
  backupFrequency: string;
  emailProvider: string;
}

const defaultSettings: SettingsState = {
  siteName: "EduFlow Studio",
  siteUrl: "https://eduflow.example.com",
  supportEmail: "support@eduflow.example.com",
  supportPhone: "+1 (555) 123-4567",
  timezone: "America/New_York",
  language: "en",
  currency: "USD",
  maintenanceMode: false,
  emailNotifications: true,
  courseApprovalRequired: true,
  autoEnrollmentEmail: true,
  platformFee: 2.5,
  maxFileSize: 100,
  sessionTimeout: 30,
  backupFrequency: "daily",
  emailProvider: "SendGrid",
};

export const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleSettingChange = (key: keyof SettingsState, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your platform settings have been updated successfully.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(false);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your EduFlow platform configuration</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              variant="gradient"
              onClick={handleSave}
              disabled={!hasChanges}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic platform information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Site Name
                </label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Site URL
                </label>
                <Input
                  value={settings.siteUrl}
                  onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Timezone
                </label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="Europe/London">GMT/London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Language
                </label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Currency
              </label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                  <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Email & Support */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Email & Support</CardTitle>
                <CardDescription>Configure email and customer support settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Support Email
                </label>
                <Input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                  placeholder="support@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Support Phone
                </label>
                <Input
                  value={settings.supportPhone}
                  onChange={(e) => handleSettingChange("supportPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email Provider
              </label>
              <Select value={settings.emailProvider} onValueChange={(value) => handleSettingChange("emailProvider", value)}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SendGrid">SendGrid</SelectItem>
                  <SelectItem value="AWS_SES">AWS SES</SelectItem>
                  <SelectItem value="Mailgun">Mailgun</SelectItem>
                  <SelectItem value="SMTP">SMTP Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Course Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Course Settings</CardTitle>
                <CardDescription>Configure course management and publishing options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Course Approval Required</p>
                  <p className="text-sm text-muted-foreground">
                    Instructors must get approval before publishing courses
                  </p>
                </div>
                <Switch
                  checked={settings.courseApprovalRequired}
                  onCheckedChange={(value) => handleSettingChange("courseApprovalRequired", value)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Auto Enrollment Email</p>
                  <p className="text-sm text-muted-foreground">
                    Send confirmation email when students enroll in courses
                  </p>
                </div>
                <Switch
                  checked={settings.autoEnrollmentEmail}
                  onCheckedChange={(value) => handleSettingChange("autoEnrollmentEmail", value)}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Max File Upload Size (MB)
                </label>
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange("maxFileSize", Number(e.target.value))}
                  placeholder="100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment processing and fees</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Platform Fee (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={settings.platformFee}
                  onChange={(e) => handleSettingChange("platformFee", Number(e.target.value))}
                  placeholder="2.5"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Percentage fee charged on each course enrollment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access control options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Session Timeout (minutes)
                </label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", Number(e.target.value))}
                  placeholder="30"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Users will be logged out after this period of inactivity
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Platform will be unavailable to users during maintenance
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(value) => handleSettingChange("maintenanceMode", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for system events and updates
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(value) => handleSettingChange("emailNotifications", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database & Backup */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Database & Backup</CardTitle>
                <CardDescription>Configure database backups and maintenance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Backup Frequency
                </label>
                <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2">
                <Database className="h-4 w-4" />
                Run Database Maintenance
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <RotateCcw className="h-4 w-4" />
                Create Manual Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        {hasChanges && (
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <span className="text-sm text-foreground">You have unsaved changes. Click "Save Changes" to apply them.</span>
          </div>
        )}

        {!hasChanges && (
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm text-foreground">All settings are saved.</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
