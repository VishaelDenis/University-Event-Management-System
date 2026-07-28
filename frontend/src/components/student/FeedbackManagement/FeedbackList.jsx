import React, { useEffect, useMemo, useState } from 'react';
import { getMyFeedback, deleteFeedback as deleteFeedbackApi } from '../../../api/feedback';
import FeedbackForm from './FeedbackForm';
import FeedbackFilters from './FeedbackFilters';

const FeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [filters, setFilters] = useState({ minRating: '', eventId: '', search: '' });

  const loadFeedback = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getMyFeedback();
      setFeedbackItems(res?.data ?? res ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load feedback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleCreateClick = () => {
    setEditingFeedback(null);
    setShowForm(true);
  };

  const handleEditClick = (feedback) => {
    setEditingFeedback(feedback);
    setShowForm(true);
  };

  const handleDeleteClick = async (feedbackId) => {
    if (!window.confirm('Delete this feedback? This cannot be undone.')) return;
    try {
      await deleteFeedbackApi(feedbackId);
      setFeedbackItems((prev) => prev.filter((f) => f.feedbackId !== feedbackId));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete feedback.');
    }
  };

  const handleSaved = (savedFeedback) => {
    setShowForm(false);
    setEditingFeedback(null);
    setFeedbackItems((prev) => {
      const exists = prev.some((f) => f.feedbackId === savedFeedback.feedbackId);
      if (exists) {
        return prev.map((f) => (f.feedbackId === savedFeedback.feedbackId ? savedFeedback : f));
      }
      return [savedFeedback, ...prev];
    });
  };

  const events = useMemo(() => {
    const map = new Map();
    feedbackItems.forEach((f) => {
      if (f.eventId && !map.has(f.eventId)) {
        map.set(f.eventId, { eventId: f.eventId, title: f.eventTitle });
      }
    });
    return Array.from(map.values());
  }, [feedbackItems]);

  const filteredItems = useMemo(() => {
    return feedbackItems.filter((f) => {
      if (filters.minRating && (!f.rating || f.rating < Number(filters.minRating))) {
        return false;
      }
      if (filters.eventId && String(f.eventId) !== String(filters.eventId)) {
        return false;
      }
      if (filters.search && !f.content.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [feedbackItems, filters]);

  return (
    <div className="feedback-management">
      <div className="feedback-management-header">
        <h2>My Feedback</h2>
        <button type="button" onClick={handleCreateClick}>
          + New Feedback
        </button>
      </div>

      <FeedbackFilters filters={filters} onChange={setFilters} events={events} />

      {error && <div className="feedback-list-error">{error}</div>}

      {loading ? (
        <p>Loading feedback...</p>
      ) : filteredItems.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <ul className="feedback-list">
          {filteredItems.map((f) => (
            <li key={f.feedbackId} className="feedback-list-item">
              <div className="feedback-list-item-header">
                <span className="feedback-list-item-event">
                  {f.eventTitle || 'General feedback'}
                </span>
                {f.rating ? (
                  <span className="feedback-list-item-rating">{'★'.repeat(f.rating)}</span>
                ) : (
                  <span className="feedback-list-item-rating feedback-list-item-rating-none">
                    No rating
                  </span>
                )}
              </div>
              <p className="feedback-list-item-content">{f.content}</p>
              <div className="feedback-list-item-meta">
                <span>{new Date(f.createdAt).toLocaleString()}</span>
                <div className="feedback-list-item-actions">
                  <button type="button" onClick={() => handleEditClick(f)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDeleteClick(f.feedbackId)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="feedback-form-modal">
          <FeedbackForm
            feedback={editingFeedback}
            onSaved={handleSaved}
            onCancel={() => {
              setShowForm(false);
              setEditingFeedback(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
