// Mental Health Platform JavaScript

// Application Data
const appData = {
  "students": [
    {
      "id": "stu001",
      "name": "Arjun Kumar",
      "department": "Computer Science",
      "semester": "6th",
      "avatar": "seed",
      "avatarStage": "sprout",
      "totalCheckIns": 15,
      "streakDays": 5,
      "recentMoods": [
        {"date": "2025-09-15", "mood": 3, "emoji": "😟", "note": "Exam stress building up"},
        {"date": "2025-09-14", "mood": 4, "emoji": "😐", "note": "Okay day, studied well"},
        {"date": "2025-09-13", "mood": 2, "emoji": "😰", "note": "Can't focus, heart racing"}
      ],
      "completedModules": ["Exam Panic Management", "Breathing Techniques"]
    },
    {
      "id": "stu002", 
      "name": "Priya Sharma",
      "department": "Psychology",
      "semester": "4th",
      "avatar": "cloud",
      "avatarStage": "rain",
      "totalCheckIns": 8,
      "streakDays": 3,
      "recentMoods": [
        {"date": "2025-09-15", "mood": 5, "emoji": "😊", "note": "Feeling better after therapy session"},
        {"date": "2025-09-14", "mood": 3, "emoji": "😟", "note": "Anxious about presentation"},
        {"date": "2025-09-13", "mood": 4, "emoji": "😐", "note": "Neutral day"}
      ],
      "completedModules": ["Sleep Hygiene", "Mindful Journaling"]
    },
    {
      "id": "stu003",
      "name": "Rohit Patel", 
      "department": "Engineering",
      "semester": "8th",
      "avatar": "lantern",
      "avatarStage": "glow",
      "totalCheckIns": 22,
      "streakDays": 12,
      "recentMoods": [
        {"date": "2025-09-15", "mood": 4, "emoji": "😐", "note": "Graduation prep stress"},
        {"date": "2025-09-14", "mood": 5, "emoji": "😊", "note": "Good progress on project"},
        {"date": "2025-09-13", "mood": 5, "emoji": "😊", "note": "Confident about future"}
      ],
      "completedModules": ["Career Anxiety", "Goal Setting", "Time Management"]
    }
  ],
  "crisisEvents": [
    {
      "id": "crisis001",
      "studentId": "stu001",
      "timestamp": "2025-09-15T22:30:00Z",
      "message": "I feel overwhelmed and useless, can't handle this anymore",
      "riskLevel": "high",
      "status": "escalated",
      "counselorId": "coun001",
      "resolvedAt": null
    },
    {
      "id": "crisis002",
      "studentId": "stu002",
      "timestamp": "2025-09-14T15:45:00Z",
      "message": "Having really dark thoughts lately",
      "riskLevel": "medium", 
      "status": "resolved",
      "counselorId": "coun002",
      "resolvedAt": "2025-09-14T16:30:00Z"
    }
  ],
  "counselors": [
    {
      "id": "coun001",
      "name": "Dr. Sarah Johnson",
      "specialization": "Crisis Intervention",
      "status": "available",
      "activeCases": 2
    },
    {
      "id": "coun002",
      "name": "Dr. Raj Mehta", 
      "specialization": "Student Counseling",
      "status": "busy",
      "activeCases": 4
    }
  ],
  "moodTrends": {
    "departments": {
      "Computer Science": {"avg": 3.2, "trend": "declining", "studentCount": 245},
      "Psychology": {"avg": 3.8, "trend": "stable", "studentCount": 156},  
      "Engineering": {"avg": 3.5, "trend": "improving", "studentCount": 312},
      "Business": {"avg": 4.1, "trend": "stable", "studentCount": 189}
    },
    "timePatterns": {
      "examWeeks": {"avgMood": 2.8, "crisisEvents": 15},
      "regularWeeks": {"avgMood": 3.9, "crisisEvents": 3},
      "holidays": {"avgMood": 4.3, "crisisEvents": 1}
    }
  },
  "microlearningModules": [
    {
      "id": "mod001",
      "title": "Exam Panic Management",
      "duration": "3 min",
      "completions": 156,
      "rating": 4.2,
      "content": "Learn 3 quick techniques to calm exam anxiety"
    },
    {
      "id": "mod002", 
      "title": "Sleep Hygiene Basics",
      "duration": "4 min",
      "completions": 203,
      "rating": 4.5,
      "content": "Simple habits for better sleep and mental health"
    },
    {
      "id": "mod003",
      "title": "Breathing Techniques",
      "duration": "2 min", 
      "completions": 298,
      "rating": 4.7,
      "content": "Quick breathing exercises for immediate stress relief"
    }
  ],
  "seasonalNudges": {
    "autumn": {
      "theme": "Reflection",
      "message": "Jot one lesson learned from this semester",
      "action": "Start a reflection journal"
    },
    "diwali": {
      "theme": "Emotional Detox",
      "message": "Let go of one worry; write it down, then choose a small action",
      "action": "Write and release exercise"
    }
  },
  "policyRecommendations": [
    {
      "priority": "high",
      "recommendation": "Add mid-semester break in October",
      "evidence": "Mood scores drop 40% during weeks 6-8 of semester", 
      "impactEstimate": "Could reduce crisis events by 25%"
    },
    {
      "priority": "medium",
      "recommendation": "Extend counselor chat hours to 11 PM",
      "evidence": "30% of crisis events occur between 9-11 PM",
      "impactEstimate": "Faster response times, reduced escalation"
    }
  ]
};

// Global state
let currentRole = 'student';
let currentStudent = appData.students[0]; // Default to Arjun
let selectedAvatar = null;
let isOnboardingComplete = false;

// Crisis detection keywords
const crisisKeywords = [
    'suicide', 'kill myself', 'want to die', 'end it all', 'no point living', 
    'feel useless', 'can\'t go on', 'worthless', 'hopeless', 'give up',
    'hurt myself', 'end everything', 'better off dead'
];

// Mood emojis mapping
const moodEmojis = {
    1: '😰',
    2: '😟',
    3: '😐',
    4: '🙂',
    5: '😊'
};

// Avatar evolution mapping
const avatarEvolution = {
    seed: {
        stages: ['🌱', '🌿', '🌳', '🌸'],
        names: ['Seed', 'Sprout', 'Tree', 'Blossom']
    },
    cloud: {
        stages: ['☁️', '🌧️', '🌈', '🌅'],
        names: ['Cloud', 'Rain', 'Rainbow', 'Sunrise']
    },
    lantern: {
        stages: ['🏮', '💡', '✨', '🌟'],
        names: ['Lantern', 'Glow', 'Sparkle', 'Star']
    }
};

// DOM Elements
const roleModal = document.getElementById('roleModal');
const crisisModal = document.getElementById('crisisModal');
const studentInterface = document.getElementById('studentInterface');
const counselorInterface = document.getElementById('counselorInterface');
const adminInterface = document.getElementById('adminInterface');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadStudentData();
    renderMicrolearningModules();
    showRoleSelection();
});

function initializeApp() {
    // Set up role switching
    const roleSwitchBtn = document.getElementById('roleSwitch');
    roleSwitchBtn.addEventListener('click', showRoleSelection);

    // Close crisis modal
    document.getElementById('closeCrisis').addEventListener('click', () => {
        crisisModal.classList.add('hidden');
    });
}

function setupEventListeners() {
    // Role selection
    document.querySelectorAll('[data-role]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchRole(e.target.dataset.role);
        });
    });

    // Onboarding avatar selection
    document.querySelectorAll('.avatar-choice').forEach(choice => {
        choice.addEventListener('click', selectAvatar);
    });

    // Complete onboarding
    document.getElementById('completeOnboarding').addEventListener('click', completeOnboarding);

    // Mood slider
    const moodSlider = document.getElementById('moodSlider');
    if (moodSlider) {
        moodSlider.addEventListener('input', updateMoodEmoji);
        document.getElementById('submitMood').addEventListener('click', submitMood);
    }

    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    
    if (chatInput && sendBtn) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        sendBtn.addEventListener('click', sendMessage);
    }

    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', handleAction);
    });

    // Seasonal action
    const seasonalBtn = document.getElementById('seasonalAction');
    if (seasonalBtn) {
        seasonalBtn.addEventListener('click', () => {
            addChatMessage('MindBot', 'Great choice! Reflection helps us grow. What\'s one valuable lesson you\'ve learned recently? 🍂');
        });
    }
}

function showRoleSelection() {
    roleModal.classList.remove('hidden');
}

function switchRole(role) {
    currentRole = role;
    roleModal.classList.add('hidden');
    
    // Hide all interfaces
    studentInterface.classList.add('hidden');
    counselorInterface.classList.add('hidden');
    adminInterface.classList.add('hidden');
    
    // Show selected interface
    switch(role) {
        case 'student':
            studentInterface.classList.remove('hidden');
            if (!isOnboardingComplete) {
                document.getElementById('onboarding').classList.remove('hidden');
            }
            break;
        case 'counselor':
            counselorInterface.classList.remove('hidden');
            renderCrisisQueue();
            break;
        case 'admin':
            adminInterface.classList.remove('hidden');
            renderAdminDashboard();
            break;
    }
}

function selectAvatar(e) {
    // Remove previous selection
    document.querySelectorAll('.avatar-choice').forEach(choice => {
        choice.classList.remove('selected');
    });
    
    // Select current
    e.currentTarget.classList.add('selected');
    selectedAvatar = e.currentTarget.dataset.avatar;
    
    // Enable completion button
    document.getElementById('completeOnboarding').disabled = false;
}

function completeOnboarding() {
    if (!selectedAvatar) return;
    
    currentStudent.avatar = selectedAvatar;
    currentStudent.avatarStage = avatarEvolution[selectedAvatar].names[0].toLowerCase();
    
    isOnboardingComplete = true;
    document.getElementById('onboarding').classList.add('hidden');
    loadStudentData();
}

function loadStudentData() {
    // Update avatar display
    const avatarEl = document.getElementById('studentAvatar');
    const nameEl = document.getElementById('studentName');
    const streakEl = document.getElementById('checkInStreak');
    const progressEl = document.getElementById('avatarProgress');
    
    if (avatarEl && currentStudent) {
        const avatarType = currentStudent.avatar;
        const stageIndex = getStageIndex(currentStudent.avatarStage);
        avatarEl.textContent = avatarEvolution[avatarType].stages[stageIndex];
        
        nameEl.textContent = `Hi ${currentStudent.name.split(' ')[0]}!`;
        streakEl.textContent = currentStudent.streakDays;
        
        // Calculate progress (based on check-ins)
        const progress = Math.min((currentStudent.totalCheckIns % 10) * 10, 100);
        progressEl.style.width = progress + '%';
    }
}

function getStageIndex(stageName) {
    const stages = ['seed', 'sprout', 'tree', 'blossom', 'cloud', 'rain', 'rainbow', 'sunrise', 'lantern', 'glow', 'sparkle', 'star'];
    const index = stages.indexOf(stageName.toLowerCase());
    return Math.max(0, Math.min(index % 4, 3));
}

function updateMoodEmoji() {
    const slider = document.getElementById('moodSlider');
    const emojiEl = document.getElementById('currentMoodEmoji');
    
    if (slider && emojiEl) {
        emojiEl.textContent = moodEmojis[slider.value];
    }
}

function submitMood() {
    const slider = document.getElementById('moodSlider');
    const noteEl = document.getElementById('moodNote');
    const moodValue = parseInt(slider.value);
    
    // Add to recent moods
    const today = new Date().toISOString().split('T')[0];
    const newMood = {
        date: today,
        mood: moodValue,
        emoji: moodEmojis[moodValue],
        note: noteEl.value
    };
    
    currentStudent.recentMoods.unshift(newMood);
    currentStudent.totalCheckIns++;
    currentStudent.streakDays++;
    
    // Show consequences if mood is low
    if (moodValue <= 2) {
        document.getElementById('consequenceSection').classList.remove('hidden');
    } else {
        document.getElementById('consequenceSection').classList.add('hidden');
    }
    
    // Update avatar progress
    loadStudentData();
    
    // Add congratulatory chat message
    addChatMessage('MindBot', getMotivationalMessage(moodValue));
    
    // Reset form
    noteEl.value = '';
    slider.value = 3;
    updateMoodEmoji();
}

function getMotivationalMessage(mood) {
    const messages = {
        1: "I hear you're going through a tough time. Remember, it's okay to feel this way. You're not alone. 💙",
        2: "Thanks for checking in. These feelings are temporary. What's one small thing that helped you before?",
        3: "Neutral days are normal too. You showed up today, and that matters. 🌱",
        4: "Great to see you're feeling better! Keep building on these positive moments. ✨",
        5: "Wonderful! Your consistency in checking in is helping you grow. Keep shining! 😊"
    };
    return messages[mood] || "Thanks for sharing how you're feeling today.";
}

function handleAction(e) {
    const action = e.currentTarget.dataset.action;
    
    switch(action) {
        case 'breathe':
            addChatMessage('MindBot', '🫁 Let\'s do a quick breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat 3 times.');
            break;
        case 'journal':
            addChatMessage('MindBot', '✍️ Writing can help process difficult emotions. What thoughts would you like to express right now?');
            break;
        case 'talk':
            addChatMessage('MindBot', '💬 I\'m here to listen. Would you like to share what\'s on your mind, or would you prefer to connect with a human counselor?');
            break;
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('You', message);
    
    // Check for crisis keywords
    if (detectCrisis(message)) {
        showCrisisModal();
        return;
    }
    
    // Generate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage('MindBot', botResponse);
    }, 1000);
    
    chatInput.value = '';
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = sender === 'You' ? 'message user-message' : 'message bot-message';
    
    messageEl.innerHTML = `
        <span class="message-sender">${sender}</span>
        <p>${message}</p>
    `;
    
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function detectCrisis(message) {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
}

function showCrisisModal() {
    crisisModal.classList.remove('hidden');
    
    // Log crisis event
    const crisisEvent = {
        id: 'crisis' + Date.now(),
        studentId: currentStudent.id,
        timestamp: new Date().toISOString(),
        message: document.getElementById('chatInput').value,
        riskLevel: 'high',
        status: 'escalated',
        counselorId: null,
        resolvedAt: null
    };
    
    appData.crisisEvents.unshift(crisisEvent);
}

function generateBotResponse(message) {
    const responses = [
        "I hear you. It's brave of you to share your feelings. How long have you been feeling this way?",
        "Thank you for trusting me with your thoughts. What usually helps when you feel like this?",
        "Your feelings are valid. Sometimes talking through things can help. What's been on your mind lately?",
        "I appreciate you opening up. Remember, difficult feelings are temporary. What's one thing you're grateful for today?",
        "It sounds like you're going through something challenging. Would it help to explore some coping strategies together?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function renderMicrolearningModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    if (!modulesGrid) return;
    
    modulesGrid.innerHTML = '';
    
    appData.microlearningModules.forEach(module => {
        const moduleEl = document.createElement('div');
        moduleEl.className = 'module-card';
        moduleEl.innerHTML = `
            <div class="module-header">
                <h4>${module.title}</h4>
                <span class="module-duration">${module.duration}</span>
            </div>
            <p>${module.content}</p>
            <div class="module-stats">
                <span>${module.completions} completions</span>
                <span>⭐ ${module.rating}</span>
            </div>
        `;
        
        moduleEl.addEventListener('click', () => {
            addChatMessage('MindBot', `Great choice! The "${module.title}" module contains valuable techniques. Let me know if you'd like to discuss any part of it! 🧠`);
        });
        
        modulesGrid.appendChild(moduleEl);
    });
}

function renderCrisisQueue() {
    const crisisList = document.getElementById('crisisList');
    if (!crisisList) return;
    
    crisisList.innerHTML = '';
    
    const activeCrises = appData.crisisEvents.filter(crisis => crisis.status !== 'resolved');
    
    activeCrises.forEach(crisis => {
        const student = appData.students.find(s => s.id === crisis.studentId);
        const crisisEl = document.createElement('div');
        crisisEl.className = `crisis-item ${crisis.riskLevel}-risk`;
        
        crisisEl.innerHTML = `
            <div class="crisis-header">
                <div>
                    <div class="crisis-student">${student ? student.name : 'Unknown Student'}</div>
                    <div class="crisis-time">${new Date(crisis.timestamp).toLocaleString()}</div>
                </div>
                <div class="status status--error">${crisis.riskLevel.toUpperCase()} RISK</div>
            </div>
            <div class="crisis-message">"${crisis.message}"</div>
            <div class="crisis-actions">
                <button class="btn btn--primary btn--sm" onclick="acceptCrisis('${crisis.id}')">Accept Case</button>
                <button class="btn btn--secondary btn--sm" onclick="viewContext('${crisis.studentId}')">View Context</button>
            </div>
        `;
        
        crisisList.appendChild(crisisEl);
    });
}

function acceptCrisis(crisisId) {
    const crisis = appData.crisisEvents.find(c => c.id === crisisId);
    if (crisis) {
        crisis.counselorId = 'coun001'; // Current counselor
        crisis.status = 'in-progress';
        renderCrisisQueue();
        alert('Case accepted. Student will be connected to you directly.');
    }
}

function viewContext(studentId) {
    const student = appData.students.find(s => s.id === studentId);
    if (student) {
        const recentMoods = student.recentMoods.slice(0, 3);
        const moodHistory = recentMoods.map(m => `${m.date}: ${m.emoji} "${m.note}"`).join('\n');
        alert(`Student Context:\n\nName: ${student.name}\nDepartment: ${student.department}\nRecent Moods:\n${moodHistory}`);
    }
}

function renderAdminDashboard() {
    renderMoodChart();
    renderPolicyRecommendations();
}

function renderMoodChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;
    
    const departments = Object.keys(appData.moodTrends.departments);
    const avgMoods = departments.map(dept => appData.moodTrends.departments[dept].avg);
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: departments,
            datasets: [{
                label: 'Average Mood Score',
                data: avgMoods,
                backgroundColor: colors,
                borderColor: colors.map(c => c + '80'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Department Mood Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Mood Score (1-5)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Department'
                    }
                }
            }
        }
    });
}

function renderPolicyRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    if (!recommendationsList) return;
    
    recommendationsList.innerHTML = '';
    
    appData.policyRecommendations.forEach(rec => {
        const recEl = document.createElement('div');
        recEl.className = `recommendation-item ${rec.priority}-priority`;
        
        recEl.innerHTML = `
            <div class="recommendation-header">
                <h4>${rec.recommendation}</h4>
                <span class="priority-badge ${rec.priority}">${rec.priority}</span>
            </div>
            <div class="recommendation-evidence">📊 Evidence: ${rec.evidence}</div>
            <div class="recommendation-impact">💡 Impact: ${rec.impactEstimate}</div>
        `;
        
        recommendationsList.appendChild(recEl);
    });
}

// Initialize mood emoji on page load
document.addEventListener('DOMContentLoaded', function() {
    updateMoodEmoji();
});