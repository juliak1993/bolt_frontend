import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
} from 'lucide-react';

type SurveyType = 'GTL' | 'Gyro' | 'MWD' | 'Unknown';
type RunType = SurveyType;

interface RunFilters {
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
  run_type?: RunType;
}

interface Run {
  id: string;
  run_number: string;
  run_name: string;
  survey_type: SurveyType;
  well?: {
    well_name: string;
  };
  survey_files_count: number;
  created_at: string;
  user: {
    username: string;
  };
}

interface RunsResponse {
  count: number;
  results: Run[];
}

export const RunListPage: React.FC = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<RunFilters>({
    page: 1,
    page_size: 20,
    ordering: '-created_at',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [runToDelete, setRunToDelete] = useState<Run | null>(null);

  const isLoading = false;
  const data: RunsResponse = {
    count: 45,
    results: [
      {
        id: '1',
        run_number: 'RUN-2024-001',
        run_name: 'North Field Survey',
        survey_type: 'GTL',
        well: { well_name: 'Well A-123' },
        survey_files_count: 12,
        created_at: '2024-03-01T10:30:00Z',
        user: { username: 'john.doe' },
      },
      {
        id: '2',
        run_number: 'RUN-2024-002',
        run_name: 'East Sector Analysis',
        survey_type: 'Gyro',
        well: { well_name: 'Well B-456' },
        survey_files_count: 8,
        created_at: '2024-02-28T14:15:00Z',
        user: { username: 'jane.smith' },
      },
      {
        id: '3',
        run_number: 'RUN-2024-003',
        run_name: 'Deep Well Measurement',
        survey_type: 'MWD',
        well: { well_name: 'Well C-789' },
        survey_files_count: 15,
        created_at: '2024-02-27T09:00:00Z',
        user: { username: 'mike.johnson' },
      },
      {
        id: '4',
        run_number: 'RUN-2024-004',
        run_name: 'Initial Survey Run',
        survey_type: 'Unknown',
        survey_files_count: 0,
        created_at: '2024-02-26T16:45:00Z',
        user: { username: 'sarah.williams' },
      },
      {
        id: '5',
        run_number: 'RUN-2024-005',
        run_name: 'West Quadrant GTL',
        survey_type: 'GTL',
        well: { well_name: 'Well D-321' },
        survey_files_count: 20,
        created_at: '2024-02-25T11:20:00Z',
        user: { username: 'john.doe' },
      },
    ],
  };

  const canEdit = true;

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1,
    }));
  };

  const handleFilterChange = (field: keyof RunFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value || undefined,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleDeleteClick = (run: Run) => {
    setRunToDelete(run);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!runToDelete) return;
    setDeleteDialogOpen(false);
    setRunToDelete(null);
  };

  const getRunTypeColor = (type: SurveyType) => {
    const colors = {
      GTL: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
      Gyro: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      MWD: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      Unknown: 'bg-secondary-100 text-secondary-700 dark:bg-charcoal-800 dark:text-gray-400',
    };
    return colors[type] || colors.Unknown;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const totalPages = Math.ceil(data.count / (filters.page_size || 20));
  const currentPage = filters.page || 1;
  const startItem = (currentPage - 1) * (filters.page_size || 20) + 1;
  const endItem = Math.min(currentPage * (filters.page_size || 20), data.count);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white">
                Survey Runs
              </h1>
              <p className="mt-1 text-sm text-secondary-500 dark:text-gray-400">
                Manage and track all survey runs
              </p>
            </div>
            {canEdit && (
              <button
                onClick={() => navigate('/runs/new/complete')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md shadow-primary-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-charcoal-900 active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Create Run</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white/40 dark:bg-charcoal-900/60 backdrop-blur-2xl rounded-2xl shadow-glass border border-secondary-200/30 dark:border-primary-500/20 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-secondary-200/30 dark:border-primary-500/20">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search by run number or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 rounded-xl text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-charcoal-900 ${
                    showFilters
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-2 border-primary-200 dark:border-primary-800'
                      : 'bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm text-secondary-700 dark:text-gray-300 border border-secondary-200/50 dark:border-primary-500/30 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md shadow-primary-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-charcoal-900 active:scale-98"
                >
                  Search
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-secondary-200/30 dark:border-primary-500/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                      Run Type
                    </label>
                    <select
                      value={filters.run_type || ''}
                      onChange={(e) => handleFilterChange('run_type', e.target.value as RunType)}
                      className="w-full px-3 py-2.5 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 rounded-xl text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">All Types</option>
                      <option value="GTL">GTL</option>
                      <option value="Gyro">Gyro</option>
                      <option value="MWD">MWD</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.ordering || '-created_at'}
                      onChange={(e) => handleFilterChange('ordering', e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-primary-500/30 rounded-xl text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="-created_at">Newest First</option>
                      <option value="created_at">Oldest First</option>
                      <option value="run_number">Run Number (A-Z)</option>
                      <option value="-run_number">Run Number (Z-A)</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilters({ page: 1, page_size: 20, ordering: '-created_at' });
                        setSearchTerm('');
                      }}
                      className="w-full px-4 py-2.5 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-charcoal-700/90 text-secondary-700 dark:text-gray-300 font-medium rounded-xl border border-secondary-200/50 dark:border-primary-500/30 hover:border-primary-500/40 transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : data?.results && data.results.length > 0 ? (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50/50 dark:bg-charcoal-800/50 border-b border-secondary-200/30 dark:border-primary-500/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Run Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Run Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Well
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Surveys
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Created By
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-secondary-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200/30 dark:divide-primary-500/20">
                    {data.results.map((run) => (
                      <tr
                        key={run.id}
                        className="hover:bg-white/40 dark:hover:bg-charcoal-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900 dark:text-white">
                            {run.run_number}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-secondary-900 dark:text-white">
                            {run.run_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRunTypeColor(
                              run.survey_type
                            )}`}
                          >
                            {run.survey_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-700 dark:text-gray-300">
                            {run.well?.well_name || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              run.survey_files_count > 0
                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                                : 'bg-secondary-100 text-secondary-600 dark:bg-charcoal-800 dark:text-gray-400'
                            }`}
                          >
                            <FileText className="w-3 h-3" />
                            {run.survey_files_count}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-700 dark:text-gray-300">
                            {formatDate(run.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-700 dark:text-gray-300">
                            {run.user.username}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/runs/${run.id}`)}
                              className="p-1.5 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {canEdit && (
                              <>
                                <button
                                  onClick={() => navigate(`/runs/${run.id}/edit`)}
                                  className="p-1.5 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                                  title="Edit run"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(run)}
                                  className="p-1.5 text-secondary-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                                  title="Delete run"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-secondary-200/30 dark:divide-primary-500/20">
                {data.results.map((run) => (
                  <div
                    key={run.id}
                    className="p-4 hover:bg-white/40 dark:hover:bg-charcoal-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-1">
                          {run.run_number}
                        </h3>
                        <p className="text-sm text-secondary-700 dark:text-gray-300 mb-2">
                          {run.run_name}
                        </p>
                      </div>
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRunTypeColor(
                          run.survey_type
                        )}`}
                      >
                        {run.survey_type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <span className="text-secondary-500 dark:text-gray-400">Well:</span>
                        <p className="text-secondary-900 dark:text-white font-medium">
                          {run.well?.well_name || '-'}
                        </p>
                      </div>
                      <div>
                        <span className="text-secondary-500 dark:text-gray-400">Surveys:</span>
                        <p className="text-secondary-900 dark:text-white font-medium">
                          {run.survey_files_count}
                        </p>
                      </div>
                      <div>
                        <span className="text-secondary-500 dark:text-gray-400">Created:</span>
                        <p className="text-secondary-900 dark:text-white font-medium">
                          {formatDate(run.created_at)}
                        </p>
                      </div>
                      <div>
                        <span className="text-secondary-500 dark:text-gray-400">By:</span>
                        <p className="text-secondary-900 dark:text-white font-medium">
                          {run.user.username}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-secondary-200/30 dark:border-primary-500/20">
                      <button
                        onClick={() => navigate(`/runs/${run.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-charcoal-700/90 text-secondary-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-secondary-200/50 dark:border-primary-500/30 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {canEdit && (
                        <>
                          <button
                            onClick={() => navigate(`/runs/${run.id}/edit`)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-lg border border-primary-200 dark:border-primary-800 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(run)}
                            className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg border border-primary-200 dark:border-primary-800 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 sm:px-6 py-4 border-t border-secondary-200/30 dark:border-primary-500/20 bg-secondary-50/50 dark:bg-charcoal-800/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-secondary-700 dark:text-gray-300">
                    Showing <span className="font-medium">{startItem}</span> to{' '}
                    <span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{data.count}</span> results
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-secondary-200/50 dark:border-primary-500/30 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm text-secondary-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30'
                                : 'bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm text-secondary-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-charcoal-700/90 border border-secondary-200/50 dark:border-primary-500/30 hover:border-primary-500/40'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <span className="sm:hidden px-3 py-2 text-sm font-medium text-secondary-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-secondary-200/50 dark:border-primary-500/30 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm text-secondary-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-charcoal-700/90 hover:border-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 dark:bg-charcoal-800 mb-4">
                <FileText className="w-8 h-8 text-secondary-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                No runs found
              </h3>
              <p className="text-secondary-500 dark:text-gray-400 mb-6">
                Get started by creating your first survey run
              </p>
              {canEdit && (
                <button
                  onClick={() => navigate('/runs/new/complete')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md shadow-primary-500/30 transition-all duration-200 active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  Create First Run
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {deleteDialogOpen && runToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setDeleteDialogOpen(false)}
            />
            <div className="relative bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-2xl rounded-2xl shadow-glass max-w-md w-full p-6 border border-secondary-200/50 dark:border-primary-500/30">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                    Delete Run
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-gray-400 mb-4">
                    Are you sure you want to delete "{runToDelete.run_name}"? This action will
                    soft delete the run and it can be recovered later.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteDialogOpen(false)}
                      className="flex-1 px-4 py-2.5 bg-white/50 dark:bg-charcoal-800/80 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-charcoal-700/90 text-secondary-700 dark:text-gray-300 font-medium rounded-xl border border-secondary-200/50 dark:border-primary-500/30 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl shadow-md shadow-primary-500/30 transition-all active:scale-98"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="flex-shrink-0 p-1 hover:bg-white/50 dark:hover:bg-charcoal-800/80 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-secondary-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
