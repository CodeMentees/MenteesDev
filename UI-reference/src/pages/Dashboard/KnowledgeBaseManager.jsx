import { useState, useEffect } from "react";
import { getDocuments, uploadDocument, deleteDocument } from "../../services/knowledgeService";
import { toast } from "../../utils/toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "../../components/ConfirmModal";

export default function KnowledgeBaseManager() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Form state
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState(null);

  // Delete modal state
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const data = await getDocuments(search, categoryFilter);
      setDocs(data.documents || []);
    } catch (err) {
      toast.error(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly or fetch on change
    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDocs();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        // Pre-fill title from filename
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const fileExt = file.name.split(".").pop().toLowerCase();
    if (fileExt !== "txt" && fileExt !== "md") {
      toast.error("Only text (.txt) and markdown (.md) files are supported for indexing.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("category", category);

      await uploadDocument(formData);
      toast.success("🎉 Document uploaded and indexed successfully!");
      
      // Reset form
      setFile(null);
      setTitle("");
      setCategory("general");
      const fileInput = document.getElementById("doc-file-input");
      if (fileInput) fileInput.value = "";

      // Refresh list
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedDocId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDocument(selectedDocId);
      toast.success("Document removed from knowledge base.");
      fetchDocs();
    } catch (err) {
      toast.error(err.message || "Failed to delete document");
    } finally {
      setShowDeleteConfirm(false);
      setSelectedDocId(null);
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Knowledge Base Hub</h1>
        <p className="text-muted">Upload and manage internal documents to train the RAG AI Assistant.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* UPLOAD FORM */}
        <div className="lg:col-span-1">
          <div className="panel flex flex-col gap-5">
            <h2 className="text-lg font-semibold border-b border-default pb-3">Index New Document</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-secondary">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Benefits and Perks Policy"
                  className="w-full px-3 py-2 border border-default rounded bg-surface text-dash-ink dark:text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-secondary">Category</label>
                <select
                  className="w-full px-3 py-2 border border-default rounded bg-surface text-dash-ink dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="general">General Wiki</option>
                  <option value="hr">HR & Operations</option>
                  <option value="technical">Engineering & Setup</option>
                  <option value="benefits">Benefits & Perks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-secondary">Select File (.txt, .md)</label>
                <input
                  id="doc-file-input"
                  type="file"
                  required
                  accept=".txt,.md"
                  className="w-full text-sm text-secondary border border-dashed border-default p-4 rounded-lg bg-surface cursor-pointer hover:border-teal-500 transition"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted mt-1">Upload plain text or markdown to allow parsing.</p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner size="sm" className="text-white" />
                    <span>Parsing & Indexing...</span>
                  </>
                ) : (
                  "Upload & Index"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* DOCUMENTS LIST */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-default pb-4">
              <h2 className="text-lg font-semibold">Indexed Documents</h2>
              
              {/* FILTERS */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2">
                <select
                  className="px-3 py-2 border border-default rounded bg-surface text-sm text-dash-ink dark:text-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="general">General Wiki</option>
                  <option value="hr">HR & Operations</option>
                  <option value="technical">Engineering & Setup</option>
                  <option value="benefits">Benefits & Perks</option>
                </select>
                <div className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Search docs..."
                    className="px-3 py-2 border border-default rounded bg-surface text-sm text-dash-ink dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="btn btn-secondary text-sm px-4">
                    Find
                  </button>
                </div>
              </form>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" className="text-teal-600" />
              </div>
            ) : docs.length === 0 ? (
              <div className="text-center py-12 text-muted">
                <p className="text-lg font-medium">No documents found</p>
                <p className="text-sm">Try tweaking your search or upload a new file.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted border-b border-default">
                    <tr>
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">File Name</th>
                      <th className="pb-3">Uploaded By</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-default">
                    {docs.map((doc) => (
                      <tr key={doc._id} className="hover:bg-surface/50 transition">
                        <td className="py-3 font-medium text-dash-ink dark:text-white">{doc.title}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                              doc.category === "hr"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                : doc.category === "technical"
                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                : doc.category === "benefits"
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {doc.category === "hr"
                              ? "HR"
                              : doc.category === "technical"
                              ? "Tech"
                              : doc.category === "benefits"
                              ? "Perks"
                              : "Wiki"}
                          </span>
                        </td>
                        <td className="py-3 max-w-[150px] truncate text-muted" title={doc.fileName}>
                          {doc.fileName || "Plain Text"}
                        </td>
                        <td className="py-3 text-muted">{doc.uploadedBy?.name || "System"}</td>
                        <td className="py-3 text-muted">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteClick(doc._id)}
                            className="text-red-600 hover:text-red-800 transition font-semibold text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Document"
        message="Are you sure you want to delete this document from the knowledge base? The AI will no longer have access to its contents to answer user questions."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
