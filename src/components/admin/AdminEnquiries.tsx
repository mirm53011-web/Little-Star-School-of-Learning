import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  X,
  Save,
  Check,
  Download
} from 'lucide-react';
import { EnquirySubmission } from '../../types';
import { updateEnquiryStatus, deleteEnquiry } from '../../lib/schoolDataService';

interface AdminEnquiriesProps {
  enquiries: EnquirySubmission[];
}

export const AdminEnquiries: React.FC<AdminEnquiriesProps> = ({ enquiries }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Contacted' | 'In Review' | 'Resolved'>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);
  const [currentStaffNote, setCurrentStaffNote] = useState('');
  const [currentStatus, setCurrentStatus] = useState<EnquirySubmission['status']>('New');
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        item.parentName.toLowerCase().includes(q) ||
        item.studentName.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.classGrade.toLowerCase().includes(q) ||
        (item.message && item.message.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [enquiries, statusFilter, searchQuery]);

  const openDetails = (enquiry: EnquirySubmission) => {
    setSelectedEnquiry(enquiry);
    setCurrentStaffNote(enquiry.staffNotes || '');
    setCurrentStatus(enquiry.status);
    setSaveSuccess(false);
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      await updateEnquiryStatus(selectedEnquiry.id, currentStatus, currentStaffNote);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setSelectedEnquiry({
        ...selectedEnquiry,
        status: currentStatus,
        staffNotes: currentStaffNote
      });
    } catch (err) {
      console.error('Failed to update enquiry:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this admission enquiry?')) {
      try {
        await deleteEnquiry(id);
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      } catch (err) {
        console.error('Failed to delete enquiry:', err);
      }
    }
  };

  const exportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Parent Name', 'Student Name', 'Class Grade', 'Phone', 'Email', 'Status', 'Date', 'Message', 'Staff Notes'];
    const rows = enquiries.map((e) => [
      `"${e.parentName.replace(/"/g, '""')}"`,
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.classGrade.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.staffNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Little_Star_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>Admission & Parent Enquiries</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time submissions from parents and prospective students via the public website
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="export-enquiries-csv-btn"
            onClick={exportCSV}
            disabled={enquiries.length === 0}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by parent, student name, phone, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="md:col-span-6 flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {(['All', 'New', 'Contacted', 'In Review', 'Resolved'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
              {st !== 'All' && (
                <span className="ml-1.5 opacity-80 text-[10px]">
                  ({enquiries.filter(e => e.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Submissions List */}
        <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
          {filteredEnquiries.map((item) => (
            <div
              key={item.id}
              onClick={() => openDetails(item)}
              className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                selectedEnquiry?.id === item.id
                  ? 'border-amber-500 ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-900 text-sm">{item.parentName}</h4>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    Class: {item.classGrade}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      item.status === 'New'
                        ? 'bg-red-100 text-red-800'
                        : item.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : item.status === 'In Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
                <p>
                  <strong className="text-slate-800">Student:</strong> {item.studentName}
                </p>
                <p className="flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{item.phone}</span>
                </p>
              </div>

              {item.message && (
                <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl line-clamp-2 italic">
                  "{item.message}"
                </p>
              )}

              <div className="flex items-center justify-between mt-3 pt-2 text-xs">
                <span className="text-slate-400 text-[11px]">
                  {item.staffNotes ? 'Staff note recorded' : 'No staff notes'}
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${item.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No enquiries found</p>
              <p className="text-xs">Adjust search filters or check back after new submissions.</p>
            </div>
          )}
        </div>

        {/* Selected Enquiry Detail Panel */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 self-start sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Enquiry Details</h3>
                <p className="text-xs text-slate-400">ID: {selectedEnquiry.id}</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Status & staff notes updated successfully!</span>
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p><strong className="text-slate-900">Parent / Guardian:</strong> {selectedEnquiry.parentName}</p>
              <p><strong className="text-slate-900">Student Name:</strong> {selectedEnquiry.studentName}</p>
              <p><strong className="text-slate-900">Applying For:</strong> {selectedEnquiry.classGrade}</p>
              <p className="flex items-center space-x-1.5">
                <strong className="text-slate-900">Phone:</strong>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-amber-700 font-semibold hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </p>
              {selectedEnquiry.email && (
                <p className="flex items-center space-x-1.5">
                  <strong className="text-slate-900">Email:</strong>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-700 hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </p>
              )}
              <p>
                <strong className="text-slate-900">Date Received:</strong>{' '}
                {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </p>
              {selectedEnquiry.message && (
                <div className="pt-2 border-t border-slate-200/80">
                  <strong className="text-slate-900 block mb-1">Parent Message / Questions:</strong>
                  <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}
            </div>

            {/* Status & Staff Notes Form */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Follow-up Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="New">🔴 New (Uncontacted)</option>
                  <option value="Contacted">🔵 Contacted (In Discussion)</option>
                  <option value="In Review">🟡 In Review / Documents Pending</option>
                  <option value="Resolved">🟢 Resolved / Admission Confirmed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Internal Administrative Notes
                </label>
                <textarea
                  rows={3}
                  value={currentStaffNote}
                  onChange={(e) => setCurrentStaffNote(e.target.value)}
                  placeholder="e.g., Called father on 15th March. Scheduled campus visit with Principal Javid Bhat on Monday..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  id="save-enquiry-status-btn"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isUpdating ? 'Saving...' : 'Save Follow-up & Notes'}</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl transition-colors"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
