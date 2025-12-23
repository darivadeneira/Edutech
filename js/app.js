// ==========================================
// DOCENTETECH - App Logic
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initFormValidation();
    initTagSelection();
    initToolSelection();
    initChatFunctionality();
    initDashboardFilters();
});

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Form Validation
// ==========================================
function initFormValidation() {
    // Registro Paso 1
    const form1 = document.getElementById('registroForm1');
    if (form1) {
        const passwordInput = form1.querySelector('input[type="password"]');
        
        // Password strength indicator
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }

        form1.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = passwordInput ? passwordInput.value : '';

            if (nombre && email && password.length >= 8) {
                // Store data in sessionStorage
                sessionStorage.setItem('userData', JSON.stringify({
                    nombre: nombre,
                    email: email
                }));
                
                // Navigate to step 2
                window.location.href = 'registro-paso2.html';
            } else {
                alert('Por favor completa todos los campos correctamente. La contraseña debe tener al menos 8 caracteres.');
            }
        });
    }

    // Registro Paso 2
    const form2 = document.getElementById('registroForm2');
    if (form2) {
        form2.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get selected materias
            const materias = Array.from(document.querySelectorAll('.tag.selected'))
                .map(tag => tag.dataset.value);
            
            // Get selected tools
            const herramientas = Array.from(document.querySelectorAll('.tool-card.selected'))
                .map(card => card.dataset.tool);
            
            // Get experiencia
            const experiencia = this.querySelector('input[name="experiencia"]:checked')?.value;
            
            // Get tutoriales preference
            const tutoriales = this.querySelector('input[name="tutoriales"]:checked')?.value;
            
            // Get desafios
            const desafios = Array.from(this.querySelectorAll('.checkbox-group input:checked'))
                .map(checkbox => checkbox.value);

            // Store preferences
            sessionStorage.setItem('userPreferences', JSON.stringify({
                materias,
                experiencia,
                tutoriales,
                desafios,
                herramientas
            }));

            // Navigate to dashboard
            window.location.href = 'dashboard.html';
        });
    }
}

// Password strength checker
function updatePasswordStrength(password) {
    const strengthIndicator = document.querySelector('.password-strength');
    if (!strengthIndicator) return;

    let strength = 0;
    let strengthText = '';
    let strengthClass = '';

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    switch (strength) {
        case 0:
        case 1:
            strengthText = 'Muy débil';
            strengthClass = 'weak';
            break;
        case 2:
            strengthText = 'Débil';
            strengthClass = 'weak';
            break;
        case 3:
            strengthText = 'Media';
            strengthClass = 'medium';
            break;
        case 4:
            strengthText = 'Fuerte';
            strengthClass = 'strong';
            break;
        case 5:
            strengthText = 'Muy fuerte';
            strengthClass = 'strong';
            break;
    }

    strengthIndicator.textContent = strengthText;
    strengthIndicator.className = 'password-strength ' + strengthClass;
}

// ==========================================
// Tag Selection (Materias)
// ==========================================
function initTagSelection() {
    const materiasContainer = document.getElementById('materiasContainer');
    if (!materiasContainer) return;

    const tags = materiasContainer.querySelectorAll('.tag-selectable');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

// ==========================================
// Tool Selection
// ==========================================
function initToolSelection() {
    const herramientasContainer = document.getElementById('herramientasContainer');
    if (!herramientasContainer) return;

    const toolCards = herramientasContainer.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

// ==========================================
// Dashboard Filters
// ==========================================
function initDashboardFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked chip
            this.classList.add('active');
            
            // Filter tutorials - Get text from the last span (not the icon)
            const filterValue = this.querySelector('span:last-child').textContent.trim();
            console.log('Filtering by:', filterValue);
            filterTutorialsByTool(filterValue);
        });
    });

    // Tutorial card interactions
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Opening tutorial:', this.querySelector('.tutorial-title').textContent);
            // In a real app, this would open the tutorial
        });
    });
}

// ==========================================
// Tutorial Data by Platform
// ==========================================
const tutorialsByPlatform = {
    'Zoom': [
        {
            icon: '🎥',
            tool: 'Zoom',
            title: 'Cómo crear salas de reunión en Zoom',
            description: 'Aprende a organizar grupos pequeños de estudiantes en salas separadas durante tus clases virtuales.',
            badge: 'Video',
            duration: '5:30',
            views: '2.3k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: '🎥',
            tool: 'Zoom',
            title: 'Grabar y compartir clases en Zoom',
            description: 'Tutorial completo sobre cómo grabar tus clases en la nube y compartirlas con estudiantes.',
            badge: 'Video',
            duration: '6:45',
            views: '1.9k',
            rating: '4.7',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: '🎥',
            tool: 'Zoom',
            title: 'Usar anotaciones y pizarra en Zoom',
            description: 'Descubre cómo usar las herramientas de anotación para hacer tus clases más interactivas.',
            badge: 'Guía',
            duration: '8 min',
            views: '1.5k',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: '🎥',
            tool: 'Zoom',
            title: 'Gestionar participantes y seguridad',
            description: 'Aprende a configurar salas de espera, controlar el micrófono y evitar interrupciones.',
            badge: 'Video',
            duration: '7:20',
            views: '2.1k',
            rating: '4.8',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
    ],
    'Google Classroom': [
        {
            icon: '📚',
            tool: 'Google Classroom',
            title: 'Subir tareas y calificar en Classroom',
            description: 'Guía paso a paso para asignar tareas, recibir entregas y proporcionar retroalimentación.',
            badge: 'Guía',
            duration: '10 min',
            views: '1.8k',
            rating: '4.9',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: '📚',
            tool: 'Google Classroom',
            title: 'Crear una clase desde cero en Classroom',
            description: 'Aprende a configurar tu primera clase, agregar estudiantes y organizar materiales.',
            badge: 'Video',
            duration: '9:15',
            views: '3.2k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: '📚',
            tool: 'Google Classroom',
            title: 'Usar rúbricas para calificación',
            description: 'Crea rúbricas personalizadas que faciliten la evaluación objetiva de tareas.',
            badge: 'Guía',
            duration: '12 min',
            views: '1.4k',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: '📚',
            tool: 'Google Classroom',
            title: 'Integrar Meet y Drive en Classroom',
            description: 'Descubre cómo conectar todas las herramientas de Google para una experiencia fluida.',
            badge: 'Video',
            duration: '8:30',
            views: '2.5k',
            rating: '4.7',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }
    ],
    'Moodle': [
        {
            icon: '🎓',
            tool: 'Moodle',
            title: 'Configurar un curso desde cero en Moodle',
            description: 'Guía completa para estructurar tu curso, añadir recursos y configurar actividades.',
            badge: 'Nuevo',
            duration: '9:00',
            views: '892',
            rating: '4.8',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        },
        {
            icon: '🎓',
            tool: 'Moodle',
            title: 'Crear cuestionarios y exámenes',
            description: 'Aprende a diseñar evaluaciones con diferentes tipos de preguntas y configuraciones.',
            badge: 'Video',
            duration: '11:30',
            views: '1.6k',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        },
        {
            icon: '🎓',
            tool: 'Moodle',
            title: 'Gestionar calificaciones en Moodle',
            description: 'Tutorial sobre el libro de calificaciones, escalas y exportación de resultados.',
            badge: 'Guía',
            duration: '15 min',
            views: '1.1k',
            rating: '4.7',
            level: 'Avanzado',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        },
        {
            icon: '🎓',
            tool: 'Moodle',
            title: 'Usar foros y actividades colaborativas',
            description: 'Fomenta la discusión y el trabajo en equipo con herramientas de colaboración.',
            badge: 'Video',
            duration: '10:45',
            views: '945',
            rating: '4.8',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        }
    ],
    'Teams': [
        {
            icon: '👥',
            tool: 'Teams',
            title: 'Compartir pantalla en Microsoft Teams',
            description: 'Descubre cómo compartir tu pantalla, una ventana específica o una pizarra interactiva.',
            badge: 'Video',
            duration: '8:15',
            views: '1.5k',
            rating: '4.7',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            icon: '👥',
            tool: 'Teams',
            title: 'Crear equipos y canales en Teams',
            description: 'Organiza tu clase con equipos para diferentes materias y canales temáticos.',
            badge: 'Guía',
            duration: '12 min',
            views: '2.1k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            icon: '👥',
            tool: 'Teams',
            title: 'Asignar tareas en Teams',
            description: 'Aprende a crear, distribuir y calificar tareas directamente en Teams.',
            badge: 'Video',
            duration: '9:30',
            views: '1.8k',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            icon: '👥',
            tool: 'Teams',
            title: 'Usar OneNote para notas colaborativas',
            description: 'Integra OneNote en Teams para crear cuadernos de clase compartidos.',
            badge: 'Guía',
            duration: '11 min',
            views: '1.3k',
            rating: '4.6',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ],
    'Canva': [
        {
            icon: '🎨',
            tool: 'Canva',
            title: 'Diseñar presentaciones atractivas en Canva',
            description: 'Crea presentaciones profesionales usando plantillas y herramientas de diseño fáciles.',
            badge: 'Video',
            duration: '6:45',
            views: '3.1k',
            rating: '4.9',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            icon: '🎨',
            tool: 'Canva',
            title: 'Crear infografías educativas',
            description: 'Diseña infografías visuales que hagan el aprendizaje más atractivo.',
            badge: 'Video',
            duration: '8:20',
            views: '2.4k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            icon: '🎨',
            tool: 'Canva',
            title: 'Hacer videos animados sencillos',
            description: 'Aprende a crear videos educativos con animaciones y transiciones.',
            badge: 'Guía',
            duration: '14 min',
            views: '1.9k',
            rating: '4.7',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            icon: '🎨',
            tool: 'Canva',
            title: 'Diseñar materiales imprimibles',
            description: 'Crea hojas de trabajo, pósters y certificados personalizados.',
            badge: 'Video',
            duration: '7:15',
            views: '2.7k',
            rating: '4.9',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ],
    'Kahoot': [
        {
            icon: '🎮',
            tool: 'Kahoot',
            title: 'Crear un quiz interactivo en Kahoot',
            description: 'Aprende a diseñar cuestionarios divertidos que mantengan a tus estudiantes motivados.',
            badge: 'Nuevo',
            duration: '7:20',
            views: '542',
            rating: '5.0',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
            icon: '🎮',
            tool: 'Kahoot',
            title: 'Usar Kahoot en modo equipo',
            description: 'Fomenta la colaboración con quizzes diseñados para trabajo en grupo.',
            badge: 'Video',
            duration: '6:30',
            views: '1.2k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
            icon: '🎮',
            tool: 'Kahoot',
            title: 'Analizar resultados y estadísticas',
            description: 'Interpreta los datos de tus Kahoots para mejorar la enseñanza.',
            badge: 'Guía',
            duration: '10 min',
            views: '876',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        {
            icon: '🎮',
            tool: 'Kahoot',
            title: 'Crear desafíos para tarea',
            description: 'Asigna Kahoots como tarea que los estudiantes pueden completar en casa.',
            badge: 'Video',
            duration: '5:45',
            views: '1.5k',
            rating: '4.7',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        }
    ],
    'Drive': [
        {
            icon: '💾',
            tool: 'Google Drive',
            title: 'Organizar archivos y carpetas en Drive',
            description: 'Técnicas efectivas para mantener tu Drive ordenado y fácil de navegar.',
            badge: 'Nuevo',
            duration: '5:00',
            views: '1.2k',
            rating: '4.6',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        },
        {
            icon: '💾',
            tool: 'Google Drive',
            title: 'Compartir y gestionar permisos',
            description: 'Aprende a compartir archivos de forma segura con estudiantes y colegas.',
            badge: 'Video',
            duration: '7:45',
            views: '2.3k',
            rating: '4.8',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        },
        {
            icon: '💾',
            tool: 'Google Drive',
            title: 'Usar Google Forms para encuestas',
            description: 'Crea formularios y encuestas para recopilar información de manera eficiente.',
            badge: 'Guía',
            duration: '11 min',
            views: '1.9k',
            rating: '4.9',
            level: 'Intermedio',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        },
        {
            icon: '💾',
            tool: 'Google Drive',
            title: 'Colaborar en documentos en tiempo real',
            description: 'Trabaja simultáneamente con otros en Docs, Sheets y Slides.',
            badge: 'Video',
            duration: '6:20',
            views: '2.8k',
            rating: '4.7',
            level: 'Principiante',
            gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        }
    ]
};

// ==========================================
// Filter Tutorials by Tool
// ==========================================
function filterTutorialsByTool(toolName) {
    const tutorialsGrid = document.querySelector('.tutorials-grid');
    
    if (!tutorialsGrid) return;
    
    // If "Todas" is selected, show default content
    if (toolName === 'Todas') {
        location.reload(); // Simple reload to show all
        return;
    }
    
    // Get tutorials for selected tool
    const tutorials = tutorialsByPlatform[toolName];
    
    if (!tutorials) {
        console.log('No tutorials found for:', toolName);
        return;
    }
    
    // Clear current tutorials
    tutorialsGrid.innerHTML = '';
    
    // Create tutorial cards
    tutorials.forEach(tutorial => {
        const card = createTutorialCard(tutorial);
        tutorialsGrid.appendChild(card);
    });
    
    // Hide "Recently Added" section when filtering
    const recentlyAddedSection = document.querySelectorAll('.tutorials-section')[1];
    if (recentlyAddedSection && toolName !== 'Todas') {
        recentlyAddedSection.style.display = 'none';
    } else if (recentlyAddedSection) {
        recentlyAddedSection.style.display = 'block';
    }
}

// ==========================================
// Create Tutorial Card
// ==========================================
function createTutorialCard(tutorial) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    
    // Determine badge class
    let badgeClass = 'badge-video';
    if (tutorial.badge === 'Guía') badgeClass = 'badge-guide';
    if (tutorial.badge === 'Nuevo') badgeClass = 'badge-new';
    
    // Determine level class
    let levelClass = 'level-beginner';
    if (tutorial.level === 'Intermedio') levelClass = 'level-intermediate';
    if (tutorial.level === 'Avanzado') levelClass = 'level-advanced';
    
    card.innerHTML = `
        <div class="tutorial-thumbnail">
            <div class="thumbnail-placeholder" style="background: ${tutorial.gradient};">
                <span class="play-icon">▶</span>
            </div>
            <span class="tutorial-badge ${badgeClass}">${tutorial.badge}</span>
            <span class="tutorial-duration">${tutorial.duration}</span>
        </div>
        <div class="tutorial-content">
            <div class="tutorial-tool">
                <span class="tool-icon-small">${tutorial.icon}</span>
                <span>${tutorial.tool}</span>
            </div>
            <h3 class="tutorial-title">${tutorial.title}</h3>
            <p class="tutorial-description">
                ${tutorial.description}
            </p>
            <div class="tutorial-footer">
                <div class="tutorial-stats">
                    <span class="stat-item">👁 ${tutorial.views} vistas</span>
                    <span class="stat-item">⭐ ${tutorial.rating}</span>
                </div>
                <span class="tutorial-level ${levelClass}">${tutorial.level}</span>
            </div>
        </div>
    `;
    
    return card;
}

// ==========================================
// Chat Functionality
// ==========================================
function initChatFunctionality() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatInput || !sendButton || !chatMessages) return;

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message on button click
    sendButton.addEventListener('click', function() {
        sendMessage();
    });

    // Send message on Enter (without Shift)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Quick actions
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const actionText = this.querySelector('span:last-child').textContent;
            chatInput.value = actionText;
            chatInput.focus();
        });
    });

    // Chat history items
    const historyItems = document.querySelectorAll('.chat-history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active from all items
            historyItems.forEach(i => i.classList.remove('active'));
            
            // Add active to clicked item
            this.classList.add('active');
            
            // In a real app, this would load the chat history
            console.log('Loading chat:', this.querySelector('.chat-history-title').textContent);
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message === '') return;

        // Add user message
        addUserMessage(message);

        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI response after delay
        setTimeout(() => {
            hideTypingIndicator();
            addAssistantMessage(generateResponse(message));
        }, 1500);
    }

    function addUserMessage(text) {
        const messageHTML = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${escapeHtml(text)}</p>
                    </div>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
                <div class="message-avatar">MG</div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    function addAssistantMessage(text) {
        const messageHTML = `
            <div class="chat-message assistant-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${text}</p>
                    </div>
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            scrollToBottom();
        }
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Simple response logic based on keywords
        if (message.includes('zoom')) {
            return 'Para ayudarte con Zoom, ¿podrías especificar qué necesitas? Por ejemplo: compartir pantalla, crear salas de reunión, grabar sesiones, etc.';
        } else if (message.includes('classroom')) {
            return 'Google Classroom es muy útil. ¿Necesitas ayuda para asignar tareas, calificar, crear una clase o algo más específico?';
        } else if (message.includes('teams')) {
            return 'Microsoft Teams tiene muchas funciones. ¿Qué te gustaría aprender? Puedo ayudarte con reuniones, compartir archivos, crear equipos, etc.';
        } else if (message.includes('canva')) {
            return 'Canva es excelente para crear contenido visual. ¿Quieres diseñar presentaciones, infografías, pósters o algún otro tipo de material?';
        } else if (message.includes('kahoot')) {
            return '¡Kahoot es genial para hacer las clases más dinámicas! ¿Necesitas ayuda para crear un quiz, agregar preguntas, o usar resultados?';
        } else if (message.includes('moodle')) {
            return 'Moodle es una plataforma completa. ¿Qué aspecto necesitas configurar? Puedo guiarte con cursos, tareas, foros, calificaciones, etc.';
        } else if (message.includes('drive')) {
            return 'Google Drive es esencial para organizar archivos. ¿Necesitas ayuda para compartir carpetas, gestionar permisos, o organizar tu contenido?';
        } else if (message.includes('gracias')) {
            return '¡De nada! 😊 Estoy aquí para ayudarte siempre que lo necesites. ¿Hay algo más en lo que pueda asistirte?';
        } else if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
            return '¡Hola! 👋 ¿En qué puedo ayudarte hoy? Puedo asistirte con cualquier herramienta tecnológica educativa.';
        } else {
            return 'Entiendo tu pregunta. Para darte la mejor ayuda posible, ¿podrías darme más detalles sobre lo que necesitas? Por ejemplo, menciona la herramienta específica o el problema que estás teniendo.';
        }
    }
}

// ==========================================
// Utility Functions
// ==========================================

// Toggle mobile menu (for responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    if (userMenu && !userMenu.contains(event.target)) {
        // Close dropdown logic here if implemented
    }
});

// Loading animation for buttons
function showButtonLoading(button) {
    if (!button) return;
    
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Cargando...';
    button.classList.add('loading');
}

function hideButtonLoading(button) {
    if (!button) return;
    
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Continuar';
    button.classList.remove('loading');
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

console.log('DocenteTech app initialized ✓');
