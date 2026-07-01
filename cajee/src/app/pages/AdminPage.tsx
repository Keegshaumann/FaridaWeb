import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { X, Plus, Trash2, Lock, Upload, Mail, Phone, User, BarChart3, TrendingUp, Users, MousePointer, Calendar, MapPin, FileText, ClipboardList } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { populateCaseStudies } from "../utils/populateCaseStudies";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";

interface CaseStudy {
  id: string;
  title: string;
  type: "case-study" | "blog";
  category: string;
  author?: string;
  patientAge?: string;
  condition?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  content?: string; // For blog posts
  image?: string;
  published: boolean;
  createdAt: string;
}

interface Signup {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  createdAt: string;
}

interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  visitType: "house-visit" | "hospital" | "clinic" | "phone-call" | "video-call";
  visitLocation?: string;
  serviceRequired: string;
  additionalServices?: string;
  medicalCondition?: string;
  urgency: "routine" | "urgent" | "emergency";
  referredBy?: string;
  notes?: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  appointmentDate?: string;
  createdAt: string;
  updatedAt?: string;
}

interface FormData {
  title: string;
  type: "case-study" | "blog";
  category: string;
  customCategory: string;
  author: string;
  patientAge: string;
  condition: string;
  challenge: string;
  solution: string;
  outcome: string;
  content: string;
  image: string;
  published: boolean;
}

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  visitType: "house-visit" | "hospital" | "clinic" | "phone-call" | "video-call";
  visitLocation: string;
  serviceRequired: string;
  additionalServices: string;
  medicalCondition: string;
  urgency: "routine" | "urgent" | "emergency";
  referredBy: string;
  notes: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  appointmentDate: string;
}

// Password for the /admin panel. Change this to your own before going live.
// Note: this is a basic client-side gate (see README "Security notes").
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"case-studies" | "signups" | "analytics" | "patients">("case-studies");
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [imageMethod, setImageMethod] = useState<"url" | "upload">("url");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "case-study",
    category: "",
    customCategory: "",
    author: "",
    patientAge: "",
    condition: "",
    challenge: "",
    solution: "",
    outcome: "",
    content: "",
    image: "",
    published: false,
  });
  const [patientFormData, setPatientFormData] = useState<PatientFormData>({
    name: "",
    email: "",
    phone: "",
    visitType: "house-visit",
    visitLocation: "",
    serviceRequired: "",
    additionalServices: "",
    medicalCondition: "",
    urgency: "routine",
    referredBy: "",
    notes: "",
    status: "pending",
    appointmentDate: "",
  });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("adminAuth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchCaseStudies();
      fetchSignups();
      fetchPatients();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      fetchCaseStudies();
      fetchSignups();
      fetchPatients();
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setPassword("");
  };

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/case-studies`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCaseStudies(data);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
    }
  };

  const fetchSignups = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/signups`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSignups(data);
      }
    } catch (error) {
      console.error("Error fetching signups:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/patients`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `https://${projectId}.supabase.co/functions/v1/server/case-studies/${editingId}`
        : `https://${projectId}.supabase.co/functions/v1/server/case-studies`;

      // Prepare data - use customCategory value if category is "custom"
      const dataToSend = {
        ...formData,
        category: formData.category === "custom" ? formData.customCategory : formData.category,
      };

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        fetchCaseStudies();
        resetForm();
      } else {
        const error = await response.text();
        alert(`Error saving case study: ${error}`);
      }
    } catch (error) {
      console.error("Error saving case study:", error);
      alert("Error saving case study");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/case-studies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        fetchCaseStudies();
      } else {
        alert("Error deleting case study");
      }
    } catch (error) {
      console.error("Error deleting case study:", error);
      alert("Error deleting case study");
    }
  };

  const handleDeleteSignup = async (id: string) => {
    if (!confirm("Are you sure you want to delete this signup?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/signups/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        fetchSignups();
      } else {
        alert("Error deleting signup");
      }
    } catch (error) {
      console.error("Error deleting signup:", error);
      alert("Error deleting signup");
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setFormData({
      title: caseStudy.title,
      type: caseStudy.type,
      category: caseStudy.category,
      customCategory: "",
      author: caseStudy.author || "",
      patientAge: caseStudy.patientAge || "",
      condition: caseStudy.condition || "",
      challenge: caseStudy.challenge || "",
      solution: caseStudy.solution || "",
      outcome: caseStudy.outcome || "",
      content: caseStudy.content || "",
      image: caseStudy.image || "",
      published: caseStudy.published,
    });
    setEditingId(caseStudy.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "case-study",
      category: "",
      customCategory: "",
      author: "",
      patientAge: "",
      condition: "",
      challenge: "",
      solution: "",
      outcome: "",
      content: "",
      image: "",
      published: false,
    });
    setEditingId(null);
    setShowForm(false);
    setImageMethod("url");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePopulateSamples = async () => {
    if (!confirm("This will add 6 sample case studies. Continue?")) return;
    
    try {
      const results = await populateCaseStudies();
      const successCount = results.filter(r => r.success).length;
      alert(`Successfully created ${successCount} out of ${results.length} case studies`);
      fetchCaseStudies();
    } catch (error) {
      console.error("Error populating samples:", error);
      alert("Error populating sample case studies");
    }
  };

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPatientId
        ? `https://${projectId}.supabase.co/functions/v1/server/patients/${editingPatientId}`
        : `https://${projectId}.supabase.co/functions/v1/server/patients`;

      const response = await fetch(url, {
        method: editingPatientId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(patientFormData),
      });

      if (response.ok) {
        fetchPatients();
        resetPatientForm();
      } else {
        const error = await response.text();
        alert(`Error saving patient: ${error}`);
      }
    } catch (error) {
      console.error("Error saving patient:", error);
      alert("Error saving patient");
    }
  };

  const handlePatientDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/patients/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        fetchPatients();
      } else {
        alert("Error deleting patient");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Error deleting patient");
    }
  };

  const handlePatientEdit = (patient: Patient) => {
    setPatientFormData({
      name: patient.name,
      email: patient.email || "",
      phone: patient.phone,
      visitType: patient.visitType,
      visitLocation: patient.visitLocation || "",
      serviceRequired: patient.serviceRequired,
      additionalServices: patient.additionalServices || "",
      medicalCondition: patient.medicalCondition || "",
      urgency: patient.urgency,
      referredBy: patient.referredBy || "",
      notes: patient.notes || "",
      status: patient.status,
      appointmentDate: patient.appointmentDate || "",
    });
    setEditingPatientId(patient.id);
    setShowPatientForm(true);
  };

  const resetPatientForm = () => {
    setPatientFormData({
      name: "",
      email: "",
      phone: "",
      visitType: "house-visit",
      visitLocation: "",
      serviceRequired: "",
      additionalServices: "",
      medicalCondition: "",
      urgency: "routine",
      referredBy: "",
      notes: "",
      status: "pending",
      appointmentDate: "",
    });
    setEditingPatientId(null);
    setShowPatientForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--pink-light)] to-[var(--purple-soft)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[var(--text-dark)] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-dark)] text-center mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
            />
            <Button
              type="submit"
              className="w-full bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full py-3"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E8F3] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-dark)]">
            Admin Panel
          </h1>
          <div className="flex gap-4">
            {activeTab === "case-studies" && (
              <Button
                onClick={() => {
                  resetForm();
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Case Study
              </Button>
            )}
            {activeTab === "patients" && (
              <Button
                onClick={() => {
                  resetPatientForm();
                  setEditingPatientId(null);
                  setShowPatientForm(true);
                }}
                className="bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Patient
              </Button>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("case-studies")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === "case-studies"
                ? "bg-[var(--text-dark)] text-white shadow-md"
                : "bg-white text-[var(--text-dark)] hover:bg-gray-50"
            }`}
          >
            Case Studies ({caseStudies.length})
          </button>
          <button
            onClick={() => setActiveTab("signups")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === "signups"
                ? "bg-[var(--text-dark)] text-white shadow-md"
                : "bg-white text-[var(--text-dark)] hover:bg-gray-50"
            }`}
          >
            Signup Requests ({signups.length})
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === "analytics"
                ? "bg-[var(--text-dark)] text-white shadow-md"
                : "bg-white text-[var(--text-dark)] hover:bg-gray-50"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("patients")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              activeTab === "patients"
                ? "bg-[var(--text-dark)] text-white shadow-md"
                : "bg-white text-[var(--text-dark)] hover:bg-gray-50"
            }`}
          >
            Patients ({patients.length})
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-[var(--text-dark)]">
                  {editingId ? "Edit Case Study" : "New Case Study"}
                </h2>
                <button
                  onClick={() => {
                    setEditingId(null);
                    resetForm();
                    setShowForm(false);
                  }}
                  className="text-[var(--text-muted)] hover:text-[var(--text-dark)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Type
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value as "case-study" | "blog" })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    >
                      <option value="case-study">Case Study</option>
                      <option value="blog">Blog Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Category
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    >
                      <option value="">Select...</option>
                      <option value="prosthetics">Prosthetics</option>
                      <option value="orthotics">Orthotics</option>
                      <option value="compression">Compression</option>
                      <option value="mobility">Mobility Aids</option>
                      <option value="breast">Breast Prosthetics</option>
                      <option value="custom">Custom Category</option>
                    </select>
                  </div>

                  {formData.category === "custom" && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                        Custom Category
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customCategory}
                        onChange={(e) =>
                          setFormData({ ...formData, customCategory: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    placeholder="e.g., Dr. Cajee Botes"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                {formData.type === "case-study" && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Patient Age
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patientAge}
                      onChange={(e) =>
                        setFormData({ ...formData, patientAge: e.target.value })
                      }
                      placeholder="e.g., 45 years"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    />
                  </div>
                )}

                {formData.type === "case-study" && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Condition
                    </label>
                    <textarea
                      required
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Image (optional)
                  </label>
                  
                  {/* Tab buttons */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageMethod("url")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        imageMethod === "url"
                          ? "bg-[var(--text-dark)] text-white"
                          : "bg-gray-100 text-[var(--text-muted)] hover:bg-gray-200"
                      }`}
                    >
                      URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMethod("upload")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        imageMethod === "upload"
                          ? "bg-[var(--text-dark)] text-white"
                          : "bg-gray-100 text-[var(--text-muted)] hover:bg-gray-200"
                      }`}
                    >
                      Upload File
                    </button>
                  </div>

                  {/* URL Input */}
                  {imageMethod === "url" && (
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                    />
                  )}

                  {/* File Upload */}
                  {imageMethod === "upload" && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--purple-soft)] file:text-[var(--text-dark)] hover:file:bg-[var(--purple-light)]"
                      />
                      {formData.image && formData.image.startsWith("data:") && (
                        <div className="mt-2">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border border-border"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Preview for URL */}
                  {imageMethod === "url" && formData.image && formData.image.startsWith("http") && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {formData.type === "case-study" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                        Challenge
                      </label>
                      <textarea
                        required
                        value={formData.challenge}
                        onChange={(e) =>
                          setFormData({ ...formData, challenge: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                        Solution
                      </label>
                      <textarea
                        required
                        value={formData.solution}
                        onChange={(e) =>
                          setFormData({ ...formData, solution: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                        Outcome
                      </label>
                      <textarea
                        required
                        value={formData.outcome}
                        onChange={(e) =>
                          setFormData({ ...formData, outcome: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                      />
                    </div>
                  </>
                )}

                {formData.type === "blog" && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                      Content (HTML allowed)
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={8}
                      placeholder="You can use HTML tags like <strong>, <em>, <p>, <br>, <ul>, <li>, etc."
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] font-mono text-sm"
                    />
                  </div>
                )}

                {/* Publish Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dark)] mb-1">
                      Publication Status
                    </label>
                    <p className="text-xs text-[var(--text-muted)]">
                      {formData.published ? "This will be visible to the public" : "This will be hidden from public view"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, published: !formData.published })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.published ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.published ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full py-3"
                  >
                    {editingId ? "Update" : "Create"} {formData.type === "blog" ? "Blog Post" : "Case Study"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      resetForm();
                      setShowForm(false);
                    }}
                    className="rounded-full px-8"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Patient Form Modal */}
        {showPatientForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-[var(--text-dark)]">
                  {editingPatientId ? "Edit Patient" : "New Patient"}
                </h2>
                <button
                  onClick={() => {
                    setEditingPatientId(null);
                    resetPatientForm();
                    setShowPatientForm(false);
                  }}
                  className="text-[var(--text-muted)] hover:text-[var(--text-dark)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handlePatientSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={patientFormData.name}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={patientFormData.email}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientFormData.phone}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Visit Type
                  </label>
                  <select
                    required
                    value={patientFormData.visitType}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, visitType: e.target.value as "house-visit" | "hospital" | "clinic" | "phone-call" | "video-call" })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  >
                    <option value="house-visit">House Visit</option>
                    <option value="hospital">Hospital</option>
                    <option value="clinic">Clinic</option>
                    <option value="phone-call">Phone Call</option>
                    <option value="video-call">Video Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Visit Location
                  </label>
                  <input
                    type="text"
                    value={patientFormData.visitLocation}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, visitLocation: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Service Required
                  </label>
                  <input
                    type="text"
                    required
                    value={patientFormData.serviceRequired}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, serviceRequired: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Additional Services
                  </label>
                  <input
                    type="text"
                    value={patientFormData.additionalServices}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, additionalServices: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Medical Condition
                  </label>
                  <input
                    type="text"
                    value={patientFormData.medicalCondition}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, medicalCondition: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Urgency
                  </label>
                  <select
                    required
                    value={patientFormData.urgency}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, urgency: e.target.value as "routine" | "urgent" | "emergency" })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Referred By
                  </label>
                  <input
                    type="text"
                    value={patientFormData.referredBy}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, referredBy: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Notes
                  </label>
                  <textarea
                    value={patientFormData.notes}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Status
                  </label>
                  <select
                    required
                    value={patientFormData.status}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, status: e.target.value as "pending" | "scheduled" | "completed" | "cancelled" })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dark)] mb-2">
                    Appointment Date
                  </label>
                  <input
                    type="datetime-local"
                    value={patientFormData.appointmentDate}
                    onChange={(e) =>
                      setPatientFormData({ ...patientFormData, appointmentDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[var(--text-dark)] hover:bg-[var(--text-dark)]/90 text-white rounded-full py-3"
                  >
                    {editingPatientId ? "Update" : "Create"} Patient
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingPatientId(null);
                      resetPatientForm();
                      setShowPatientForm(false);
                    }}
                    className="rounded-full px-8"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Case Studies List */}
        {activeTab === "case-studies" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--text-dark)]">
                All Case Studies ({caseStudies.length})
              </h2>
              {caseStudies.length === 0 && (
                <Button
                  onClick={handlePopulateSamples}
                  variant="outline"
                  className="rounded-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Load Sample Data
                </Button>
              )}
            </div>

            {caseStudies.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] mb-4">
                  No case studies yet. Create your first one or load sample data!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {caseStudies.map((caseStudy) => (
                  <div
                    key={caseStudy.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                            {caseStudy.title}
                          </h3>
                          <span className="px-2 py-1 bg-[var(--purple-soft)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                            {caseStudy.category}
                          </span>
                          {caseStudy.type === "blog" && (
                            <span className="px-2 py-1 bg-[var(--pink-light)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                              Blog
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            caseStudy.published 
                              ? "bg-green-100 text-green-700" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {caseStudy.published ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mb-2">
                          {caseStudy.condition || caseStudy.content?.substring(0, 100) + "..."}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {caseStudy.author && `By ${caseStudy.author} • `}
                          {caseStudy.patientAge && `${caseStudy.patientAge} • `}
                          {new Date(caseStudy.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(caseStudy)}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(caseStudy.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-full text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Signup Requests List */}
        {activeTab === "signups" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--text-dark)]">
                Signup Requests ({signups.length})
              </h2>
            </div>

            {signups.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] mb-4">
                  No signup requests yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {signups.map((signup) => (
                  <div
                    key={signup.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--text-dark)]">
                            {signup.name}
                          </h3>
                          <span className="px-2 py-1 bg-[var(--purple-soft)] text-[var(--text-dark)] text-xs font-medium rounded-full">
                            {signup.service}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mb-2">
                          {signup.email}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {signup.phone && `${signup.phone} • `}
                          {new Date(signup.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleDeleteSignup(signup.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-full text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <AnalyticsDashboard
              caseStudiesCount={caseStudies.length}
              signupsCount={signups.length}
              publishedCount={caseStudies.filter(cs => cs.published).length}
            />
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--text-dark)]">
                Patients ({patients.length})
              </h2>
            </div>

            {patients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--text-muted)] mb-4">
                  No patients yet. Create your first one!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {patients.map((patient) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case "completed":
                        return "bg-green-100 text-green-700";
                      case "scheduled":
                        return "bg-blue-100 text-blue-700";
                      case "pending":
                        return "bg-yellow-100 text-yellow-700";
                      case "cancelled":
                        return "bg-red-100 text-red-700";
                      default:
                        return "bg-gray-100 text-gray-600";
                    }
                  };

                  const getUrgencyColor = (urgency: string) => {
                    switch (urgency) {
                      case "emergency":
                        return "bg-red-100 text-red-700";
                      case "urgent":
                        return "bg-orange-100 text-orange-700";
                      case "routine":
                        return "bg-green-100 text-green-700";
                      default:
                        return "bg-gray-100 text-gray-600";
                    }
                  };

                  const getVisitTypeIcon = (visitType: string) => {
                    switch (visitType) {
                      case "house-visit":
                        return <MapPin className="w-4 h-4" />;
                      case "hospital":
                        return <ClipboardList className="w-4 h-4" />;
                      case "clinic":
                        return <FileText className="w-4 h-4" />;
                      case "phone-call":
                        return <Phone className="w-4 h-4" />;
                      case "video-call":
                        return <User className="w-4 h-4" />;
                      default:
                        return <MapPin className="w-4 h-4" />;
                    }
                  };

                  return (
                    <div
                      key={patient.id}
                      className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-[var(--pink-light)]/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-xl font-bold text-[var(--text-dark)]">
                              {patient.name}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                              {patient.status.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(patient.urgency)}`}>
                              {patient.urgency.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handlePatientEdit(patient)}
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handlePatientDelete(patient.id)}
                            variant="outline"
                            size="sm"
                            className="rounded-full text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Patient Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Contact Information */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-[var(--accent-purple)]" />
                            <span className="font-medium text-[var(--text-dark)]">Phone:</span>
                            <span className="text-[var(--text-muted)]">{patient.phone || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-[var(--accent-purple)]" />
                            <span className="font-medium text-[var(--text-dark)]">Email:</span>
                            <span className="text-[var(--text-muted)] truncate">{patient.email || "N/A"}</span>
                          </div>
                        </div>

                        {/* Visit Information */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            {getVisitTypeIcon(patient.visitType)}
                            <span className="font-medium text-[var(--text-dark)]">Visit Type:</span>
                            <span className="text-[var(--text-muted)] capitalize">{patient.visitType.replace("-", " ")}</span>
                          </div>
                          {patient.visitLocation && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-[var(--accent-purple)]" />
                              <span className="font-medium text-[var(--text-dark)]">Location:</span>
                              <span className="text-[var(--text-muted)]">{patient.visitLocation}</span>
                            </div>
                          )}
                          {patient.appointmentDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-[var(--accent-purple)]" />
                              <span className="font-medium text-[var(--text-dark)]">Appointment:</span>
                              <span className="text-[var(--text-muted)]">
                                {new Date(patient.appointmentDate).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="bg-[var(--purple-soft)]/30 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <ClipboardList className="w-4 h-4 text-[var(--accent-purple)] mt-1" />
                          <div className="flex-1">
                            <span className="font-semibold text-[var(--text-dark)] block mb-1">
                              Service Required:
                            </span>
                            <span className="text-sm text-[var(--text-dark)]">{patient.serviceRequired}</span>
                          </div>
                        </div>
                        {patient.additionalServices && (
                          <div className="flex items-start gap-2">
                            <Plus className="w-4 h-4 text-[var(--accent-pink)] mt-1" />
                            <div className="flex-1">
                              <span className="font-medium text-[var(--text-dark)] text-sm block mb-1">
                                Additional Services:
                              </span>
                              <span className="text-sm text-[var(--text-muted)]">{patient.additionalServices}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Medical Condition */}
                      {patient.medicalCondition && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <span className="font-semibold text-[var(--text-dark)] block mb-1">
                                Medical Condition:
                              </span>
                              <span className="text-sm text-[var(--text-muted)]">{patient.medicalCondition}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {patient.notes && (
                        <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-yellow-600 mt-1" />
                            <div className="flex-1">
                              <span className="font-semibold text-[var(--text-dark)] block mb-1">
                                Notes:
                              </span>
                              <span className="text-sm text-[var(--text-muted)]">{patient.notes}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Footer Meta */}
                      <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-border/50">
                        <div className="flex items-center gap-4">
                          {patient.referredBy && (
                            <span>
                              <strong>Referred by:</strong> {patient.referredBy}
                            </span>
                          )}
                          <span>
                            <strong>Created:</strong> {new Date(patient.createdAt).toLocaleDateString()}
                          </span>
                          {patient.updatedAt && (
                            <span>
                              <strong>Updated:</strong> {new Date(patient.updatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}