// Fallback Logic for Missing Images
function fallback(imgElement, id) {
    imgElement.style.display = 'none';
    const wrapper = imgElement.parentElement;
    const textSpan = wrapper.querySelector('.fallback-text');
    if (textSpan) {
        textSpan.innerText = 'PROJECT_0' + id;
        textSpan.style.display = 'block';
    }
}

// Toggle Sections (Show More/Less)
function toggleSection(sectionId, btn) {
    const content = document.getElementById(sectionId);
    const span = btn.querySelector('span');
    btn.classList.toggle('active');

    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        span.innerText = "View More Projects";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        span.innerText = "Show Less";
    }
}

// Modal Logic
const modal = document.getElementById("infoModal");
const mTitle = document.getElementById("modalTitle");
const mDesc = document.getElementById("modalDesc");
const mLink = document.getElementById("modalLink");
const mTags = document.getElementById("modalTags");
const mImg = document.getElementById("modalImg");

function openModal(element) {
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    const link = element.getAttribute('data-link');
    const tags = element.getAttribute('data-tags');
    const imgSrc = element.getAttribute('data-image');

    mTitle.innerText = title;
    mDesc.innerText = desc;
    mTags.innerText = "// " + tags;
    mLink.href = link;

    if (imgSrc && imgSrc.length > 4) {
        mImg.src = imgSrc;
        mImg.style.display = "block";
        mImg.onerror = function () { this.style.display = 'none'; };
    } else {
        mImg.style.display = "none";
    }

    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'var(--text-secondary)';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent-color)';
        }
    });
});
