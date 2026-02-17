/**
 * Data Management for Digital Lost & Found System
 * Uses localStorage to simulate a database for the MVP.
 */

const STORAGE_KEY = 'lost_found_items';
const CURRENT_USER = 'student1@example.com'; // Mock Logged-in User

// Rich Mock Data
const INITIAL_DATA = [
    {
        id: 1,
        type: 'lost',
        title: 'MacBook Pro 14"',
        description: 'Silver MacBook Pro M1. Has a "NASA" sticker on the lid. Left it in the library study room 304.',
        location: 'Library, Room 304',
        contact: 'alex.doe@university.edu',
        date: '2023-11-01',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student1@example.com'
    },
    {
        id: 2,
        type: 'found',
        title: 'Toyota Car Keys',
        description: 'Found a set of Toyota keys with a blue carabiner and a gym membership tag.',
        location: 'Student Center Parking',
        contact: 'campus.security@university.edu',
        date: '2023-11-02',
        image: 'https://images.unsplash.com/photo-1627140292147-380d396a5d43?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'security@university.edu'
    },
    {
        id: 3,
        type: 'lost',
        title: 'Black Leather Wallet',
        description: 'Tommy Hilfiger wallet. Contains ID card, driving license, and some cash. Please help!',
        location: 'Cafeteria Main Hall',
        contact: 'sarah.m@university.edu',
        date: '2023-10-30',
        image: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&q=80&w=1000',
        status: 'resolved',
        user: 'student2@example.com'
    },
    {
        id: 4,
        type: 'found',
        title: 'Calculus Textbook',
        description: 'James Stewart Calculus, 8th Edition. Found on a bench near the fountain.',
        location: 'Math Building Courtyard',
        contact: 'john.smith@university.edu',
        date: '2023-11-03',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student3@example.com'
    },
    {
        id: 5,
        type: 'lost',
        title: 'Golden Retriever Dog',
        description: 'Answers to "Buddy". Wearing a red collar. Ran off near the sports complex.',
        location: 'Sports Complex',
        contact: 'emily.r@university.edu',
        date: '2023-11-04',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student1@example.com'
    },
    {
        id: 6,
        type: 'found',
        title: 'AirPods Pro Case',
        description: 'White AirPods Pro case, empty. Found under seat 12 in Lecture Hall A.',
        location: 'Lecture Hall A',
        contact: 'janitor.staff@university.edu',
        date: '2023-10-29',
        image: 'https://images.unsplash.com/photo-1588156979435-379b9d802b0a?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'staff@university.edu'
    },
    {
        id: 7,
        type: 'lost',
        title: 'Prescription Glasses',
        description: 'Ray-Ban aviator style frames. Left them in the computer lab.',
        location: 'Computer Lab 2',
        contact: 'mike.t@university.edu',
        date: '2023-11-01',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student4@example.com'
    },
    {
        id: 8,
        type: 'found',
        title: 'Hydro Flask Water Bottle',
        description: 'Teal color, dented at the bottom. Has a sticker that says "Save the Bees".',
        location: 'Gym Locker Room',
        contact: 'gym.desk@university.edu',
        date: '2023-11-05',
        image: 'https://images.unsplash.com/photo-1602143407151-11115cdbf69c?auto=format&fit=crop&q=80&w=1000',
        status: 'resolved',
        user: 'student1@example.com'
    },
    {
        id: 9,
        type: 'lost',
        title: 'Blue Umbrella',
        description: 'Left it at the bus stop during the rain yesterday. It has a wooden handle.',
        location: 'North Bus Stop',
        contact: 'lisa.k@university.edu',
        date: '2023-11-04',
        image: 'https://images.unsplash.com/photo-1556905582-706f97a557d0?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student5@example.com'
    },
    {
        id: 10,
        type: 'found',
        title: 'Canon DSLR Camera',
        description: 'Found in a camera bag. Looks expensive. Turning it into security.',
        location: 'Arts Building',
        contact: 'campus.security@university.edu',
        date: '2023-11-02',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
        status: 'open',
        user: 'student6@example.com'
    }
];

// Initialize Data
function initData() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
}

// Get All Items
function getAllItems() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Get Items by Type (lost/found)
function getItemsByType(type) {
    const items = getAllItems();
    if (type === 'all') return items;
    return items.filter(item => item.type === type);
}

// Get Item by ID
function getItemById(id) {
    const items = getAllItems();
    return items.find(item => item.id == id);
}

// Get Items by User
function getItemsByUser(email) {
    const items = getAllItems();
    return items.filter(item => item.user === email);
}

// Add New Item
function addItem(item) {
    const items = getAllItems();
    const newItem = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'open',
        user: CURRENT_USER,
        ...item
    };
    items.unshift(newItem); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
}

// Update Item Status
function updateItemStatus(id, newStatus) {
    const items = getAllItems();
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index].status = newStatus;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return true;
    }
    return false;
}

// Initialize on load
initData();

// Dark Mode Handling
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Apply Dark Mode on Load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
