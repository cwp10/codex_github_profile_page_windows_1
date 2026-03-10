const DATA_URL = "assets/data/site-data.json";

const DEFAULT_DATA = {
  profile: {
    name: "홍길동",
    tagline_ko: "문제 정의부터 배포까지 책임지는 풀스택 개발자입니다.",
    tagline_en: "I build reliable web products from architecture to shipping.",
    email: "hello@example.com",
    github: "https://github.com/username",
    location: "Seoul, KR",
    about_ko: "사용자 문제를 제품 가치로 바꾸는 데 집중합니다. 유지보수 가능한 구조와 명확한 인터페이스를 우선으로 설계합니다.",
    about_en: "I focus on turning user problems into measurable product outcomes with clean architecture and maintainable code."
  },
  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "React", "Next.js", "Accessibility", "Design Systems"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Redis"]
    },
    {
      category: "DevOps",
      items: ["GitHub Actions", "Docker", "Vercel", "Nginx", "Monitoring"]
    }
  ],
  projects: [
    {
      title: "SaaS Analytics Dashboard",
      summary_ko: "이벤트 데이터 파이프라인을 개선해 분석 지연을 크게 줄이고 대시보드 사용성을 높였습니다.",
      summary_en: "Improved the analytics pipeline to reduce data delay and delivered a faster, clearer dashboard experience.",
      stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      repo_url: "https://github.com/username/analytics-dashboard",
      demo_url: "https://example.com/analytics-dashboard",
      highlights: [
        "초기 렌더링 성능 개선으로 대시보드 체감 속도 향상",
        "모듈 단위 API 계약으로 프론트/백 협업 병목 감소",
        "장애 대응 런북 작성 및 모니터링 체계 정비"
      ]
    },
    {
      title: "Hiring Workflow Automation",
      summary_ko: "채용 운영 프로세스를 자동화해 반복 업무를 줄이고 처리 시간을 단축했습니다.",
      summary_en: "Automated recruiting operations to cut repetitive work and shorten process lead time.",
      stack: ["Python", "FastAPI", "PostgreSQL", "GitHub Actions"],
      repo_url: "https://github.com/username/hiring-automation",
      demo_url: "",
      highlights: [
        "수동 처리 단계 자동화로 운영 시간 절감",
        "배치 작업 실패 복구 로직 설계",
        "업무 로그 대시보드 구축으로 상태 가시성 확보"
      ]
    }
  ]
};

function isValidHttpUrl(value) {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_error) {
    return false;
  }
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function readString(value, fallback = "") {
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim();
  }
  return fallback;
}

function showStatus(message, type = "info", autoHideMs = 0) {
  const statusEl = document.getElementById("status-message");
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.classList.add("visible");
  statusEl.classList.toggle("error", type === "error");

  if (autoHideMs > 0) {
    window.setTimeout(() => {
      statusEl.classList.remove("visible");
    }, autoHideMs);
  }
}

function bindMailLink(element, email) {
  if (!element) {
    return;
  }

  if (isValidEmail(email)) {
    element.href = `mailto:${email}`;
    element.textContent = email;
    element.classList.remove("disabled");
    element.removeAttribute("aria-disabled");
    element.removeAttribute("title");
  } else {
    element.removeAttribute("href");
    element.textContent = "Email Unavailable";
    element.classList.add("disabled");
    element.setAttribute("aria-disabled", "true");
    element.setAttribute("title", "유효한 이메일이 설정되지 않았습니다.");
  }
}

function bindExternalLink(element, url, label) {
  if (!element) {
    return;
  }
  const safeLabel = readString(label, "Link");

  if (isValidHttpUrl(url)) {
    element.href = url;
    element.textContent = safeLabel;
    element.target = "_blank";
    element.rel = "noreferrer noopener";
    element.classList.remove("disabled");
    element.removeAttribute("aria-disabled");
    element.removeAttribute("title");
  } else {
    element.removeAttribute("href");
    element.textContent = `${safeLabel} 준비 중`;
    element.classList.add("disabled");
    element.setAttribute("aria-disabled", "true");
    element.setAttribute("title", "링크가 아직 설정되지 않았습니다.");
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (typeof text === "string") {
    element.textContent = text;
  }
  return element;
}

function normalizeData(rawData) {
  const rawProfile = rawData?.profile ?? {};
  const profile = {
    name: readString(rawProfile.name, DEFAULT_DATA.profile.name),
    tagline_ko: readString(rawProfile.tagline_ko, DEFAULT_DATA.profile.tagline_ko),
    tagline_en: readString(rawProfile.tagline_en, DEFAULT_DATA.profile.tagline_en),
    email: readString(rawProfile.email, DEFAULT_DATA.profile.email),
    github: readString(rawProfile.github, DEFAULT_DATA.profile.github),
    location: readString(rawProfile.location, DEFAULT_DATA.profile.location),
    about_ko: readString(rawProfile.about_ko, DEFAULT_DATA.profile.about_ko),
    about_en: readString(rawProfile.about_en, DEFAULT_DATA.profile.about_en)
  };

  const skills = Array.isArray(rawData?.skills)
    ? rawData.skills
        .filter((group) => typeof group?.category === "string" && Array.isArray(group?.items))
        .map((group) => ({
          category: group.category,
          items: group.items.filter((item) => typeof item === "string" && item.trim() !== "")
        }))
    : DEFAULT_DATA.skills;

  const projects = Array.isArray(rawData?.projects)
    ? rawData.projects
        .filter((project) => typeof project?.title === "string")
        .map((project) => ({
          title: project.title,
          summary_ko: typeof project.summary_ko === "string" ? project.summary_ko : "",
          summary_en: typeof project.summary_en === "string" ? project.summary_en : "",
          stack: Array.isArray(project.stack)
            ? project.stack.filter((tech) => typeof tech === "string" && tech.trim() !== "")
            : [],
          repo_url: typeof project.repo_url === "string" ? project.repo_url : "",
          demo_url: typeof project.demo_url === "string" ? project.demo_url : "",
          highlights: Array.isArray(project.highlights)
            ? project.highlights.filter((line) => typeof line === "string" && line.trim() !== "")
            : []
        }))
    : DEFAULT_DATA.projects;

  return {
    profile,
    skills: skills.length > 0 ? skills : DEFAULT_DATA.skills,
    projects: projects.length > 0 ? projects : DEFAULT_DATA.projects
  };
}

function renderProfile(profile) {
  const nameEl = document.getElementById("profile-name");
  const taglineKoEl = document.getElementById("tagline-ko");
  const taglineEnEl = document.getElementById("tagline-en");
  const locationEl = document.getElementById("profile-location");
  const aboutKoEl = document.getElementById("about-copy-ko");
  const aboutEnEl = document.getElementById("about-copy-en");
  const footerNameEl = document.getElementById("footer-name");

  if (nameEl) {
    nameEl.textContent = profile.name;
  }
  if (taglineKoEl) {
    taglineKoEl.textContent = profile.tagline_ko;
  }
  if (taglineEnEl) {
    taglineEnEl.textContent = profile.tagline_en;
  }
  if (locationEl) {
    locationEl.textContent = profile.location;
  }
  if (aboutKoEl) {
    aboutKoEl.textContent = profile.about_ko || profile.tagline_ko;
  }
  if (aboutEnEl) {
    aboutEnEl.textContent = profile.about_en || profile.tagline_en;
  }
  if (footerNameEl) {
    footerNameEl.textContent = profile.name;
  }

  bindMailLink(document.getElementById("profile-email"), profile.email);
  bindMailLink(document.getElementById("contact-email"), profile.email);
  const githubLabel = isValidHttpUrl(profile.github) ? profile.github.replace(/^https?:\/\//, "") : "GitHub";
  bindExternalLink(document.getElementById("profile-github"), profile.github, githubLabel);
  bindExternalLink(document.getElementById("contact-github"), profile.github, "GitHub");
}

function renderSkills(skills) {
  const container = document.getElementById("skills-grid");
  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (!Array.isArray(skills) || skills.length === 0) {
    const emptyState = createElement("article", "skill-card reveal", "등록된 기술 정보가 없습니다.");
    container.appendChild(emptyState);
    return;
  }

  skills.forEach((group) => {
    const card = createElement("article", "skill-card reveal");
    const title = createElement("h3", "", group.category);
    const list = createElement("ul", "skill-list");

    group.items.forEach((item) => {
      const chip = createElement("li", "", item);
      list.appendChild(chip);
    });

    card.appendChild(title);
    card.appendChild(list);
    container.appendChild(card);
  });
}

function createProjectLink(label, url) {
  const link = createElement("a", "button", label);

  if (isValidHttpUrl(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
  } else {
    link.removeAttribute("href");
    link.classList.add("disabled");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "링크가 아직 설정되지 않았습니다.");
  }

  return link;
}

function renderProjects(projects) {
  const container = document.getElementById("projects-grid");
  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (!Array.isArray(projects) || projects.length === 0) {
    const emptyState = createElement("article", "project-card reveal", "등록된 프로젝트 정보가 없습니다.");
    container.appendChild(emptyState);
    return;
  }

  projects.forEach((project) => {
    const card = createElement("article", "project-card reveal");
    const title = createElement("h3", "project-title", project.title);
    const stackList = createElement("ul", "stack-list");

    project.stack.forEach((tech) => {
      const stack = createElement("li", "", tech);
      stackList.appendChild(stack);
    });

    const summaryKo = createElement("p", "summary-ko", project.summary_ko);
    const summaryEn = createElement("p", "summary-en", project.summary_en);
    const highlightList = createElement("ul", "highlight-list");

    project.highlights.forEach((point) => {
      const item = createElement("li", "", point);
      highlightList.appendChild(item);
    });

    const actions = createElement("div", "project-actions");
    actions.appendChild(createProjectLink("Repository", project.repo_url));
    actions.appendChild(createProjectLink("Live Demo", project.demo_url));

    card.appendChild(title);
    card.appendChild(stackList);

    if (project.summary_ko) {
      card.appendChild(summaryKo);
    }
    if (project.summary_en) {
      card.appendChild(summaryEn);
    }
    if (project.highlights.length > 0) {
      card.appendChild(highlightList);
    }

    card.appendChild(actions);
    container.appendChild(card);
  });
}

function initializeRevealAnimation() {
  const targets = document.querySelectorAll("#about .container, #skills .section-heading, #projects .section-heading, #contact .contact-panel, .skill-card, .project-card");

  targets.forEach((target) => {
    target.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -5% 0px"
    }
  );

  targets.forEach((target) => observer.observe(target));
}

function updateMetaInfo(name) {
  const yearEl = document.getElementById("current-year");
  const updatedEl = document.getElementById("last-updated");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (updatedEl) {
    const formatted = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date());
    updatedEl.textContent = `Last updated: ${formatted}`;
  }

  document.title = `${name} | Developer Portfolio`;
}

async function loadData() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data (${response.status})`);
    }

    const data = normalizeData(await response.json());
    renderProfile(data.profile);
    renderSkills(data.skills);
    renderProjects(data.projects);
    initializeRevealAnimation();
    updateMetaInfo(data.profile.name);
    showStatus("포트폴리오 데이터를 불러왔습니다.", "info", 2500);
  } catch (error) {
    console.error(error);
    renderProfile(DEFAULT_DATA.profile);
    renderSkills(DEFAULT_DATA.skills);
    renderProjects(DEFAULT_DATA.projects);
    initializeRevealAnimation();
    updateMetaInfo(DEFAULT_DATA.profile.name);
    showStatus("데이터를 불러오지 못해 기본 샘플 데이터로 표시합니다.", "error", 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
