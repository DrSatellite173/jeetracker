const STORAGE_KEY = 'jeetracker.tasks';

const defaultTasks = [
  { id: crypto.randomUUID(), name: 'Review project roadmap', priority: 'High', category: 'Work', done: false },
  { id: crypto.randomUUID(), name: '30 minute workout', priority: 'Medium', category: 'Health', done: true },
  { id: crypto.randomUUID(), name: 'Study React patterns', priority: 'Low', category: 'Learning', done: false }
];

const form = document.querySelector('#taskForm');
const taskNameInput = document.querySelector('#taskName');
const taskPriorityInput = document.querySelector('#taskPriority');
const taskCategoryInput = document.querySelector('#taskCategory');
const taskList = document.querySelector('#taskList');
const dateBadge = document.querySelector('#dateBadge');
const openTasksLabel = document.querySelector('#openTasks');
const completedTasksLabel = document.querySelector('#completedTasks');
const completionRateLabel = document.querySelector('#completionRate');
const focusLabel = document.querySelector('#focusLabel');

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultTasks;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultTasks;
  } catch (error) {
    return defaultTasks;
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateDateBadge() {
  const now = new Date();
  dateBadge.textContent = now.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function updateStats() {
  const openCount = tasks.filter((task) => !task.done).length;
  const completedCount = tasks.filter((task) => task.done).length;
  const total = tasks.length || 1;
  const rate = Math.round((completedCount / total) * 100);

  openTasksLabel.textContent = String(openCount);
  completedTasksLabel.textContent = String(completedCount);
  completionRateLabel.textContent = `${rate}%`;
  focusLabel.textContent = `${openCount} task${openCount === 1 ? '' : 's'} left`;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (!tasks.length) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No tasks yet. Add your first one above.';
    taskList.appendChild(emptyState);
    updateStats();
    return;
  }

  const template = document.querySelector('#taskItemTemplate');

  tasks.forEach((task) => {
    const item = template.content.firstElementChild.cloneNode(true);
    const title = item.querySelector('.task-title');
    const checkButton = item.querySelector('.check-button');
    const deleteButton = item.querySelector('.delete-button');
    const priorityTag = item.querySelector('.priority-tag');
    const categoryTag = item.querySelector('.category-tag');

    if (task.done) {
      item.classList.add('completed');
    }

    title.textContent = task.name;
    priorityTag.textContent = task.priority;
    priorityTag.dataset.priority = task.priority;
    categoryTag.textContent = task.category;

    checkButton.addEventListener('click', () => {
      task.done = !task.done;
      saveTasks();
      render();
    });

    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((entry) => entry.id !== task.id);
      saveTasks();
      render();
    });

    taskList.appendChild(item);
  });

  updateStats();
}

function render() {
  renderTasks();
  updateDateBadge();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = taskNameInput.value.trim();
  if (!value) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    name: value,
    priority: taskPriorityInput.value,
    category: taskCategoryInput.value,
    done: false
  });

  saveTasks();
  form.reset();
  taskPriorityInput.value = 'Medium';
  taskCategoryInput.value = 'Work';
  taskNameInput.focus();
  render();
});

render();
