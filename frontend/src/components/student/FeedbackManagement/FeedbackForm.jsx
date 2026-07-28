import React, { useEffect, useState } from 'react';
import { createFeedback, updateFeedback } from '../../../api/feedback';
import { getAllEvents } from '../../../api/event';
// NOTE: getAllEvents is assumed to live in api/event.js (the core events API
// used by VenueManagement/BookingManagement too). Adjust the import if your
// event list fetcher has a different name/path.

const STAR_VALUES = [1, 2, 3, 4, 5];

/**
 * props:
 *  - feedback: existing feedback object when editing, null/undefined when creating
 *  - onSaved: callback(savedFeedback) fired after a successful create/update
 *  - onCancel: callback fired when the user cancels out of the form
 */
const FeedbackForm = ({ feedback = null, onSaved, onCancel }) => {
  const isEditMode = Boolean(feedback && feedback.feedbackId);

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(feedback?.eventId ?? '');
  const [rating, setRating] = useState(feedback?.rating ?? 0);
  const [content, setContent] = useState(feedback?.content ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only need the events dropdown when creating new feedback tied to an event
    if (!isEditMode) {
      getAllEvents()
        .then((res) => setEvents(res?.data ?? res ?? []))
        .catch(() => setEvents([]));
    }
  }, [isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please write some feedback before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditMode) {
        const result = await updateFeedback(feedback.feedbackId, {
          content: content.trim(),
          rating: rating || null,
        });
        onSaved?.(result?.data ?? result);
      } else {
        const result = await createFeedback({
          eventId: eventId || null,
          rating: rating || null,
          content: content.trim(),
        });
        onSaved?.(result?.data ?? result);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Edit Feedback' : 'Share Your Feedback'}</h3>

      {error && <div className="feedback-form-error">{error}</div>}

      {!isEditMode && (
        <div className="feedback-form-field">
          <label htmlFor="feedback-event">Event (optional)</label>
          <select
            id="feedback-event"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          >
            <option value="">General feedback</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="feedback-form-field">
        <label>Rating</label>
        <div className="feedback-star-rating">
          {STAR_VALUES.map((star) => (
            <button
              type="button"
              key={star}
              className={`feedback-star ${star <= rating ? 'filled' : ''}`}
              onClick={() => setRating(star === rating ? 0 : star)}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="feedback-form-field">
        <label htmlFor="feedback-content">Your feedback</label>
        <textarea
          id="feedback-content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell us what you thought..."
          maxLength={2000}
        />
      </div>

      <div className="feedback-form-actions">
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : isEditMode ? 'Update Feedback' : 'Submit Feedback'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
