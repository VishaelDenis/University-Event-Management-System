import React from 'react';

/**
 * props:
 *  - filters: { minRating: number|'', eventId: string, search: string }
 *  - onChange: (nextFilters) => void
 *  - events: list of events to populate the event dropdown (optional)
 */
const FeedbackFilters = ({ filters, onChange, events = [] }) => {
  const handleFieldChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const handleReset = () => {
    onChange({ minRating: '', eventId: '', search: '' });
  };

  return (
    <div className="feedback-filters">
      <div className="feedback-filters-field">
        <label htmlFor="filter-search">Search</label>
        <input
          id="filter-search"
          type="text"
          placeholder="Search feedback text..."
          value={filters.search}
          onChange={(e) => handleFieldChange('search', e.target.value)}
        />
      </div>

      <div className="feedback-filters-field">
        <label htmlFor="filter-rating">Minimum rating</label>
        <select
          id="filter-rating"
          value={filters.minRating}
          onChange={(e) => handleFieldChange('minRating', e.target.value)}
        >
          <option value="">Any rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}+ stars
            </option>
          ))}
        </select>
      </div>

      {events.length > 0 && (
        <div className="feedback-filters-field">
          <label htmlFor="filter-event">Event</label>
          <select
            id="filter-event"
            value={filters.eventId}
            onChange={(e) => handleFieldChange('eventId', e.target.value)}
          >
            <option value="">All events</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="button" className="feedback-filters-reset" onClick={handleReset}>
        Clear filters
      </button>
    </div>
  );
};

export default FeedbackFilters;
