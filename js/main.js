/* ============================================
   MINIMAX 2.7 - EPIC JAVASCRIPT
   Three.js • GSAP • Particle Effects
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Hide loader after page load
    setTimeout(() => {
        document.querySelector('.loader')?.classList.add('hidden');
    }, 1500);
    
    // Initialize all effects
    initParticles();
    initThreeJS();
    initGSAPAnimations();
    initScrollReveal();
    initTypingEffect();
    init3DCardTilt();
    initNavbar();
    initSkillBars();
    
});

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 30;
    const colors = ['#00f5ff', '#ff2d95', '#b537f2', '#39ff14', '#ff6b35'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        
        container.appendChild(particle);
    }
}

/* ============================================
   THREE.JS 3D SCENE
   ============================================ */
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded, skipping 3D scene');
        return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create geometric shapes
    const shapes = [];
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(-3, 1, -5);
    scene.add(icosahedron);
    shapes.push({ mesh: icosahedron, rotationSpeed: { x: 0.003, y: 0.005 } });
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xff2d95,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(4, -1, -3);
    scene.add(torus);
    shapes.push({ mesh: torus, rotationSpeed: { x: 0.005, y: 0.003 } });
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.7, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({
        color: 0xb537f2,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(2, 2, -4);
    scene.add(octahedron);
    shapes.push({ mesh: octahedron, rotationSpeed: { x: 0.004, y: 0.004 } });
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate shapes
        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
        });
        
        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        
        // Mouse effect on camera
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */
function initGSAPAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded, skipping scroll animations');
        return;
    }
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-badge', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.hero-title .line1', {
        duration: 1,
        x: -100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });
    
    gsap.from('.hero-title .line2', {
        duration: 1,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.7
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.9
    });
    
    // Floating shapes animation
    gsap.to('.shape-1', {
        duration: 6,
        y: -50,
        rotation: 90,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.shape-2', {
        duration: 8,
        y: -40,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });
    
    gsap.to('.shape-3', {
        duration: 7,
        y: -60,
        rotation: 180,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
    
    gsap.to('.shape-4', {
        duration: 5,
        y: -30,
        scale: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
    });
    
    // Section animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Card animations
    gsap.utils.toArray('.card, .stat-card, .project-card, .testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Experience items
    gsap.utils.toArray('.experience-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseInt(stat.textContent);
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power2.out'
        });
    });
}

/* ============================================
   SCROLL REVEAL (Fallback)
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => observer.observe(reveal));
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Data Analyst',
        'Python Developer',
        'Business Analyst',
        'Data Science Enthusiast',
        'Power BI Specialist',
        'SQL Expert'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/* ============================================
   3D CARD TILT EFFECT
   ============================================ */
function init3DCardTilt() {
    const cards = document.querySelectorAll('.project-card, .card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

/* ============================================
   SKILL BARS ANIMATION
   ============================================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        const width = bar.style.width || '0%';
        bar.style.width = '0%';
        bar.setAttribute('data-width', width);
        observer.observe(bar);
    });
}

/* ============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

/* ============================================
   PROJECT FILTER
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00f5ff, #b537f2);
    border: none;
    border-radius: 50%;
    color: #0a0a0f;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(0, 245, 255, 0.3);
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px) scale(1.1)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0) scale(1)';
});

console.log('🔥 MINIMAX 2.7 - Portfolio loaded successfully!');
