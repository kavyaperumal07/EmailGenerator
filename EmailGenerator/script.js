document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email-input');
    const generateBtn = document.getElementById('generate-btn');
    const toneBtns = document.querySelectorAll('.tone-btn');
    const resultSection = document.getElementById('result-section');
    const loading = document.getElementById('loading');
    const intentBadge = document.getElementById('intent-badge');
    const replyBox = document.getElementById('reply-box');
    const copyBtn = document.getElementById('copy-btn');

    let selectedTone = 'formal';

    // Tone selection logic
    toneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toneBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTone = btn.dataset.tone;
        });
    });

    // Intent Detection Patterns
    const intents = [
        { name: 'Meeting Request', patterns: [/meeting/, /schedule/, /calendar/, /availability/, /discuss/i] },
        { name: 'Inquiry', patterns: [/question/, /how to/, /information/, /details/, /price/i] },
        { name: 'Feedback/Complaint', patterns: [/issue/, /problem/, /disappointed/, /feedback/, /error/i] },
        { name: 'Application', patterns: [/resume/, /cv/, /apply/, /position/, /job/i] },
        { name: 'Thank You', patterns: [/thanks/, /appreciate/, /grateful/, /thank you/i] }
    ];

    function detectIntent(text) {
        for (const intent of intents) {
            if (intent.patterns.some(p => p.test(text))) {
                return intent.name;
            }
        }
        return 'General Correspondence';
    }

    // AI Logic (Simulated)
    async function generateReply(emailContent, tone, intent) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const templates = {
            'Meeting Request': {
                formal: "Thank you for reaching out regarding a meeting. I would be happy to discuss this further. Please let me know your preferred dates and times, and I will check my calendar for availability.\n\nBest regards,\n[Your Name]",
                friendly: "Thanks for the invite! I'd love to chat more about this. When are you free? Let's grab some time on the calendar soon.\n\nBest,\n[Your Name]"
            },
            'Inquiry': {
                formal: "Thank you for your inquiry. I have received your request for more information and will look into the details shortly. I will get back to you as soon as possible with a comprehensive response.\n\nSincerely,\n[Your Name]",
                friendly: "Thanks for asking! I'm on it. Let me dig up the info you need and I'll get right back to you. \n\nTalk soon,\n[Your Name]"
            },
            'Feedback/Complaint': {
                formal: "Thank you for your feedback. I sincerely apologize for any inconvenience you have experienced. We take these matters very seriously and are currently investigating the issue to find a resolution.\n\nRespectfully,\n[Your Name]",
                friendly: "I'm so sorry to hear you've been having trouble. Thanks for letting me know. I'm checking with the team right now to see how we can fix this for you.\n\nBest,\n[Your Name]"
            },
            'Application': {
                formal: "Thank you for your interest in the position. We have received your application and will be reviewing it carefully. We will reach out if your profile matches our current needs.\n\nBest regards,\n[Your Name]",
                friendly: "Thanks for applying! We're excited to look through your profile. Give us a little bit to review everything, and we'll be in touch soon.\n\nCheers,\n[Your Name]"
            },
            'Thank You': {
                formal: "You are very welcome. It was a pleasure working with you, and I appreciate your kind words. Please do not hesitate to reach out if you need anything in the future.\n\nBest regards,\n[Your Name]",
                friendly: "No problem at all! Glad I could help. Reach out anytime if you need anything else.\n\nBest,\n[Your Name]"
            },
            'General Correspondence': {
                formal: "Thank you for your email. I have noted your message and will respond appropriately as soon as I have had a chance to review the details.\n\nSincerely,\n[Your Name]",
                friendly: "Thanks for hitting me up! Got your message. I'll take a look and get back to you soon.\n\nBest,\n[Your Name]"
            }
        };

        return templates[intent][tone];
    }

    generateBtn.addEventListener('click', async () => {
        const text = emailInput.value.trim();
        if (!text) {
            alert('Please paste an email first!');
            return;
        }

        // Reset and Show Loading
        resultSection.style.display = 'none';
        loading.style.display = 'flex';
        generateBtn.disabled = true;

        const intent = detectIntent(text);
        const reply = await generateReply(text, selectedTone, intent);

        // UI Update
        intentBadge.textContent = `Detected Intent: ${intent}`;
        replyBox.textContent = reply;
        
        loading.style.display = 'none';
        resultSection.style.display = 'flex';
        generateBtn.disabled = false;
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(replyBox.textContent).then(() => {
            const originalSvg = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = originalSvg;
            }, 2000);
        });
    });
});
