# Booking Management Module — Vithusan

Drop these folders into your local clone of `University-Event-Management-System`
(they mirror the repo's existing paths, so files will overwrite the matching
stub files 1:1).

## What's implemented

**Backend** (`backend/src/main/java/com/eventmanagement/...`)
- `model/Booking.java` — entity mapped to the existing `bookings` table
  (`event_id`, `student_id`, `participants_count`, `created_at`, `updated_at`).
- `repository/BookingRepository.java` — lookups by student, by event, and a
  duplicate-booking check.
- `service/BookingService.java` — create / update count / delete + validation
  (positive count, event & student must exist, one booking per student per
  event, matching the DB's unique constraint).
- `controller/BookingController.java`:
  - `POST   /api/bookings` — create a booking
  - `GET    /api/bookings/{id}`
  - `GET    /api/bookings/student/{studentId}`
  - `GET    /api/bookings/event/{eventId}`
  - `PUT    /api/bookings/{id}` — update participant count
  - `DELETE /api/bookings/{id}`
- `dto/request/BookingRequest.java` — unchanged (already had the right shape).
- `exception/GlobalExceptionHandler.java` — added the missing handler for
  `BadRequestException` (it existed but wasn't wired up), needed for the
  service's validation errors to return HTTP 400 instead of 500.

**Frontend** (`frontend/src/...`)
- `api/booking.js` — completed API client (create/read/update/delete).
- `components/student/BookingManagement/`
  - `BookingManagement.jsx` — new container component: loads the student's
    bookings, wires the form/filters/list together.
  - `BookingForm.jsx` — event dropdown (pulled from `/api/events`) + count
    input, creates a booking.
  - `BookingList.jsx` — table of the student's bookings with inline
    "Update" (count) and "Delete" actions.
  - `BookingFilters.jsx` — search-by-event box using the existing
    `SearchBar` shared component.
- `components/student/StudentDashboard.jsx` — now renders
  `<BookingManagement />` (Feedback/Help sections left as-is, that's other
  developers' scope).
- `App.js` — added the missing `import "./styles/global.css"` so the new
  styles actually apply.
- `styles/global.css` — a few small classes for the form/table
  (`.booking-form`, `.form-error`, etc).

## Notes / assumptions

- Login/JWT isn't wired up yet in the repo (`SecurityConfig` permits all,
  `AuthContext` has no login logic), so there's no way to derive the current
  student's ID from a token yet. `BookingManagement.jsx` uses
  `useAuth().user?.userId` if available, and otherwise falls back to a small
  manual "Student ID" input (stored in `localStorage`) purely so the module
  is testable today. Once login is implemented, that fallback can be deleted.
- Seat/capacity validation against the event's capacity was intentionally
  left out — the module doc lists it under "Future Improvements".
- The `Event` entity currently has no `title` field even though the DB schema
  has one (that's the Event module owner's scope), so the event dropdown and
  booking list fall back to `Event #{id}` plus date/time when `title` isn't
  present, and will pick up the real title automatically once that's added.
.