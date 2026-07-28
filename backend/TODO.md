# Backend Fixes TODO

## Step 1: Fix EventService.java ✅
- [x] `event.setDate(...)` → `event.setEventDate(...)`
- [x] `event.setTime(...)` → `event.setEventTime(...)`
- [x] Add `event.setTitle(...)` and `event.setDescription(...)` 
- [x] Add `eventRepository.findByOrganizer_UserId()` method (moved to EventRepository)

## Step 2: Fix EventRequest.java ✅
- [x] Add `title` and `description` fields with getters/setters

## Step 3: Fix EventRepository.java ✅
- [x] Add `List<Event> findByOrganizer_UserId(Long organizerId)` method

## Step 4: Remove DummyEventController.java ✅
- [x] Remove duplicate mapping conflict with EventController

## Step 5: Remove DummySecurityConfig.java ✅
- [x] Remove duplicate SecurityFilterChain bean

## Step 6: Implement CORS Config properly ✅
- [x] Add WebMvcConfigurer bean in CorsConfig.java

---

All fixes applied successfully!

