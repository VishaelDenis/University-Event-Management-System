# Wiring FeedbackList into StudentDashboard.jsx

I don't have your actual `StudentDashboard.jsx` file, so here's the exact
pattern to drop in.

1. Import the component at the top of `StudentDashboard.jsx`:

```jsx
import FeedbackList from '../components/student/FeedbackManagement/FeedbackList';
```

2. If the dashboard uses a tab/section switcher, add a tab:

```jsx
const [activeTab, setActiveTab] = useState('bookings');

// ...in the tab nav:
<button
  className={activeTab === 'feedback' ? 'active' : ''}
  onClick={() => setActiveTab('feedback')}
>
  Feedback
</button>

// ...in the tab content area:
{activeTab === 'feedback' && <FeedbackList />}
```

3. If instead the dashboard just stacks sections vertically, simply render it:

```jsx
<section className="dashboard-section">
  <FeedbackList />
</section>
```

`FeedbackList` is self-contained (fetches its own data, owns its own
create/edit modal), so no props are required.
