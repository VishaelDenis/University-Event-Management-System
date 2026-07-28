# Daniel — Feedback Management

Rebuilt after seeing your real compiler errors. Key fix: your `User`/`Event`
entities use **`Long`** IDs (not `Integer`) — every file here now uses `Long`
consistently for `studentId`, `eventId`, and `feedbackId`.

## ⚠️ Do this first, or it will NOT compile

**1. `UserRepository` needs `findByEmail()`.**
This is the actual cause of the `cannot find symbol :39` error in your
screenshot — it's not about `@Valid`, it's that `userRepository.findByEmail(email)`
doesn't exist yet. See `backend/UserRepository-PATCH-NEEDED.txt` for the exact
method to add. This is technically Karikalan's task item, but your controller
depends on it, so add it yourself if it's not there yet — just don't clobber
the rest of his `UserRepository.java` if he's already written other methods.

**2. `EventRepository` must already exist** as
`JpaRepository<Event, Long>` somewhere in `repository/`. `FeedbackService`
calls `eventRepository.findById(...)`. This isn't in Daniel's task list, so
it's presumably already in the repo as a shared/core file — if it isn't,
you'll need a minimal one:
```java
public interface EventRepository extends JpaRepository<Event, Long> {}
```

**3. Confirm these getter names exist on `User`/`Event`** (I'm assuming
these based on the compiler output, but haven't seen the actual files):
- `User`: `getUserId()` → `Long`, `getName()` → `String`, `getEmail()` → `String`
- `Event`: `getEventId()` → `Long`, `getTitle()` → `String`

If any of those three don't match, the fastest fix is to send me the actual
`User.java` / `Event.java` and I'll patch these files in one pass instead of
guessing again.

## What's included

### Backend (`backend/src/main/java/com/eventmanagement/`)
- `model/Feedback.java` — entity mapped to the `feedback` table
- `repository/FeedbackRepository.java` — `findByStudent`, `findByEvent`,
  `findByRatingGreaterThanEqual`, average rating query, count query
- `service/FeedbackService.java` — `createFeedback`, `editText`,
  `deleteFeedback`, plus list/filter helpers with ownership checks
- `controller/FeedbackController.java` — `POST /api/feedback`,
  `PUT /api/feedback/{id}`, `DELETE /api/feedback/{id}`, plus
  `GET /api/feedback`, `GET /api/feedback/my-feedback`,
  `GET /api/feedback/event/{eventId}`, `GET /api/feedback/filter`,
  `GET /api/feedback/event/{eventId}/average-rating`
- `dto/request/FeedbackRequest.java`, `FeedbackUpdateRequest.java`
- `dto/response/FeedbackResponse.java`, `ApiResponse.java`
- `exception/BadRequestException.java`, `ResourceNotFoundException.java`
- `UserRepository-PATCH-NEEDED.txt` — the one method you must add to
  `UserRepository` (see above)

### Frontend (`frontend/src/`)
- `api/feedback.js` — axios calls wired to the endpoints above
- `components/student/FeedbackManagement/FeedbackList.jsx` — list UI,
  fetches the logged-in student's feedback, owns the create/edit modal
- `components/student/FeedbackManagement/FeedbackForm.jsx` — create/edit
  form (star rating + text + optional event picker)
- `components/student/FeedbackManagement/FeedbackFilters.jsx` — filter by
  search text, minimum rating, and event
- `StudentDashboard-wiring.md` — snippet to drop `<FeedbackList />` into
  `StudentDashboard.jsx`

Also make sure your `pom.xml` has `spring-boot-starter-validation` (needed
for `@Valid`/`@NotBlank`/`@Min`/`@Max` used in the DTOs) — see the pom.xml
I sent earlier if you still need that.

## Copying into your repo

```bash
# from inside your cloned University-Event-Management-System repo
cp feedback-management/backend/src/main/java/com/eventmanagement/model/Feedback.java \
   backend/src/main/java/com/eventmanagement/model/

cp feedback-management/backend/src/main/java/com/eventmanagement/repository/FeedbackRepository.java \
   backend/src/main/java/com/eventmanagement/repository/

cp feedback-management/backend/src/main/java/com/eventmanagement/service/FeedbackService.java \
   backend/src/main/java/com/eventmanagement/service/

cp feedback-management/backend/src/main/java/com/eventmanagement/controller/FeedbackController.java \
   backend/src/main/java/com/eventmanagement/controller/

cp -r feedback-management/backend/src/main/java/com/eventmanagement/dto/. \
      backend/src/main/java/com/eventmanagement/dto/

# only copy these two if they don't already exist in exception/:
cp feedback-management/backend/src/main/java/com/eventmanagement/exception/*.java \
   backend/src/main/java/com/eventmanagement/exception/

cp feedback-management/frontend/src/api/feedback.js frontend/src/api/
cp -r feedback-management/frontend/src/components/student/FeedbackManagement \
      frontend/src/components/student/
```

Then:
1. Add `findByEmail()` to `UserRepository` (see `UserRepository-PATCH-NEEDED.txt`)
2. Confirm `EventRepository` exists
3. Wire `<FeedbackList />` into `StudentDashboard.jsx` per `StudentDashboard-wiring.md`
4. Rebuild — `mvn clean compile` (or reload Maven in IntelliJ)
