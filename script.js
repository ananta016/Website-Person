document.addEventListener('DOMContentLoaded', () => {
    // Soft mouse follow effect for background orbs
    const orbs = document.querySelectorAll('.orb');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Follow mouse coordinates
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop for the orbs moving towards mouse
    function animateOrbs() {
        const x = mouseX / window.innerWidth;
        const y = mouseY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            // Factor determines how much each orb reacts to the mouse
            const factor = (index + 1) * 30;
            const moveX = (x * factor) - (factor/2);
            const moveY = (y * factor) - (factor/2);
            
            // Append translate to existing float animation via CSS variable
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        requestAnimationFrame(animateOrbs);
    }
    // Start loop
    animateOrbs();

    // Initialize 3D Tilt effect for skill cards
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the card
            const y = e.clientY - rect.top;  // y position within the card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt degrees 
            const rotateX = ((y - centerY) / centerY) * -12; // Max 12deg
            const rotateY = ((x - centerX) / centerX) * 12;  // Max 12deg
            
            // Apply transformation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `${-rotateY}px ${rotateX + 15}px 30px rgba(0,0,0,0.4)`;
            card.style.transition = 'none'; // Disable transition during movement for smoothness
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to default state
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = '';
            
            // Re-enable transition for smooth return
            card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.1s ease';
        });
    });
});
