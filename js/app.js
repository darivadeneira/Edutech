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
            
            // Filter tutorials (in a real app, this would filter the content)
            const filterValue = this.textContent.trim();
            console.log('Filtering by:', filterValue);
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
