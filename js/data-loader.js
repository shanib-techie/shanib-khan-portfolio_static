/* ============================================
   DATA LOADER — Shanib Khan Portfolio
   ============================================ */

let portfolioData = null;

async function loadPortfolioData() {
    try {
        const response = await fetch('data/portfolio.json');
        if (!response.ok) throw new Error('Failed to load portfolio data');
        portfolioData = await response.json();
        initDynamicContent();
        console.log('📂 Portfolio data loaded!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

function initDynamicContent() {
    if (!portfolioData) return;
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = portfolioData.name;
    const aboutName = document.getElementById('about-name');
    const aboutTitle = document.getElementById('about-title');
    if (aboutName) aboutName.textContent = portfolioData.name;
    if (aboutTitle) aboutTitle.textContent = portfolioData.title.toUpperCase();
    updateFooter();
    loadStats();
    loadExperience();
    loadProjects();
    loadSkills();
    updateSocialLinks();
}

function loadStats() {
    const container = document.getElementById('stats-container');
    if (!container || !portfolioData?.stats) return;
    container.innerHTML = portfolioData.stats.map(stat => `
        <div class="stat-card card">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

function loadExperience() {
    const container = document.getElementById('experience-container');
    if (!container || !portfolioData?.experience) return;
    container.innerHTML = portfolioData.experience.map(exp => `
        <div class="experience-item">
            <div class="experience-date">
                ${exp.startDate} – ${exp.isCurrent ? '<span style="color:var(--neon-cyan)">Present</span>' : exp.endDate}
            </div>
            <h3 class="experience-title">${exp.title}</h3>
            <p class="experience-company">
                <i class="fas fa-building"></i> ${exp.company}
                ${exp.location ? `&nbsp;|&nbsp; <i class="fas fa-map-marker-alt"></i> ${exp.location}` : ''}
            </p>
            <p class="experience-description">${exp.description}</p>
        </div>
    `).join('');
}

/* Category → display label & color */
const CAT_META = {
    'Data Analytics':  { label: 'Data Analytics', color: 'var(--neon-cyan)',   filter: 'data-analytics' },
    'Python':          { label: 'Python',          color: 'var(--neon-purple)', filter: 'python' },
    'Web Development': { label: 'Web Dev',          color: 'var(--neon-pink)',   filter: 'web-development' },
    'Machine Learning':{ label: 'ML',              color: 'var(--neon-orange)', filter: 'machine-learning' }
};

function buildProjectCard(project, preview = false) {
    const meta = CAT_META[project.category] || { label: project.category, color: 'var(--neon-cyan)', filter: 'other' };
    const isCS = project.comingSoon;

    const cardStyle = isCS
        ? 'opacity: 0.55; filter: grayscale(0.4); cursor: default;'
        : '';

    const backContent = isCS
        ? `<div style="text-align:center; padding: 1rem;">
                <p style="font-size:2.5rem; margin-bottom:1rem;">🚧</p>
                <h3 style="font-family:var(--font-display); font-size:1rem; margin-bottom:0.5rem;">${project.title}</h3>
                <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1.2rem;">Coming Soon</p>
                <span style="background:rgba(255,255,255,0.1); border-radius:50px; padding:0.3rem 1rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${project.tech}</span>
           </div>`
        : `<h3 style="font-family:var(--font-display); font-size:1rem; margin-bottom:0.8rem;">${project.title}</h3>
           <p style="font-size:0.82rem; margin-bottom:1rem; color: rgba(10,10,15,0.85);">${project.tech}</p>
           <div class="project-links">
               <a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>
               <a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
           </div>`;

    const csBadge = isCS ? `<span style="position:absolute; top:10px; right:10px; background:rgba(255,107,53,0.85); color:#fff; font-family:var(--font-mono); font-size:0.65rem; padding:3px 10px; border-radius:50px; z-index:2;">COMING SOON</span>` : '';

    return `
    <div class="project-card" data-category="${meta.filter}" style="${cardStyle}">
        <div class="project-card-inner">
            <div class="project-card-front" style="position:relative;">
                ${csBadge}
                <div class="project-image" style="background: linear-gradient(135deg, var(--bg-secondary), var(--bg-card)); display:flex; align-items:center; justify-content:center;">
                    <i class="fas ${project.icon}" style="font-size:3.5rem; background:var(--gradient-1); -webkit-background-clip:text; -webkit-text-fill-color:transparent;"></i>
                </div>
                <div class="project-info">
                    <span class="project-category" style="color:${meta.color}; border-color:${meta.color}30;">${meta.label}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description.substring(0,95)}...</p>
                </div>
            </div>
            <div class="project-card-back" style="display:flex; align-items:center; justify-content:center; flex-direction:column;">
                ${backContent}
            </div>
        </div>
    </div>`;
}

function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container || !portfolioData?.projects) return;

    const isProjectsPage = document.querySelector('.filter-container') !== null;

    if (isProjectsPage) {
        // Full 12-project grid with filter
        container.innerHTML = portfolioData.projects.map(p => buildProjectCard(p, false)).join('');
        initProjectFilter();
    } else {
        // Home page: show 6 (prefer non-coming-soon)
        const featured = portfolioData.projects.filter(p => !p.comingSoon).slice(0, 6);
        container.innerHTML = featured.map(p => buildProjectCard(p, true)).join('');
    }
}

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                const show = filter === 'all' || cat === filter;
                card.style.display = show ? 'block' : 'none';
                if (show) card.style.animation = 'fadeIn 0.4s ease forwards';
            });
        });
    });
}

function loadSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !portfolioData?.skills) return;
    let html = '';
    for (const [category, skills] of Object.entries(portfolioData.skills)) {
        html += `<div class="skills-category reveal"><h3 class="skills-category-title"><i class="fas fa-layer-group"></i> ${category}</h3>`;
        skills.forEach(skill => {
            html += `
                <div class="skill-item">
                    <div class="skill-header">
                        <span class="skill-name"><i class="${skill.icon}"></i> ${skill.name}</span>
                        <span class="skill-percentage">${skill.proficiency}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="${skill.proficiency}%"></div>
                    </div>
                </div>`;
        });
        html += '</div>';
    }
    container.innerHTML = html;
    if (typeof initSkillBars === 'function') initSkillBars();
}

function updateFooter() {
    const footerLinks = document.querySelectorAll('.footer-text a');
    if (footerLinks.length >= 1) footerLinks[0].textContent = portfolioData?.name || 'Shanib Khan';
}

function updateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    const s = portfolioData?.social || {};
    if (socialLinks[0]) socialLinks[0].href = s.github || '#';
    if (socialLinks[1]) socialLinks[1].href = s.linkedin || '#';
    if (socialLinks[2]) socialLinks[2].href = `mailto:${portfolioData?.email || '#'}`;
}

document.addEventListener('DOMContentLoaded', loadPortfolioData);
