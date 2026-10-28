declare global {
	interface Window {
		AOS?: { init: (options?: Record<string, unknown>) => void };
		playVideo?: () => void;
		bootstrap?: {
			Collapse: new (
				element: Element,
				options?: { toggle?: boolean },
			) => { hide: () => void };
			ScrollSpy: new (
				element: Element,
				options?: { target?: string; offset?: number },
			) => void;
		};
	}
}

const NAV_OFFSET = 66;

function hideNavbarCollapse() {
	const collapse = document.getElementById('navbarNav');
	if (!collapse || !window.bootstrap?.Collapse) return;
	const instance = new window.bootstrap.Collapse(collapse, { toggle: false });
	instance.hide();
}

function setActiveNav(hash: string) {
	document.querySelectorAll('.navbar-nav .nav-item').forEach((item) => {
		item.classList.remove('active');
	});
	const link = document.querySelector(`.navbar-nav a[href="${hash}"]`);
	link?.parentElement?.classList.add('active');
}

function smoothScrollTo(hash: string) {
	const target = document.querySelector(hash);
	if (!(target instanceof HTMLElement)) return;

	setActiveNav(hash);

	const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
	window.scrollTo({ top, behavior: 'smooth' });
}

function initNavLinks() {
	document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
		link.addEventListener('click', () => hideNavbarCollapse());
	});
}

function initSmoothScroll() {
	document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			const link = anchor as HTMLAnchorElement;
			if (link.pathname !== window.location.pathname) return;
			if (link.hostname !== window.location.hostname) return;

			const hash = link.hash;
			if (!hash || hash === '#') return;
			if (!document.querySelector(hash)) return;

			event.preventDefault();
			smoothScrollTo(hash);
		});
	});
}

function initScrollSpy() {
	const body = document.body;
	if (!window.bootstrap?.ScrollSpy) {
		body.setAttribute('data-bs-spy', 'scroll');
		body.setAttribute('data-bs-target', '.navbar');
		body.setAttribute('data-bs-offset', String(NAV_OFFSET));
		return;
	}

	new window.bootstrap.ScrollSpy(body, {
		target: '.navbar',
		offset: NAV_OFFSET,
	});
}

function playVideo() {
	const thumbnail = document.getElementById('video-thumbnail');
	const videoPlayer = document.getElementById('video-player');

	if (thumbnail && videoPlayer instanceof HTMLVideoElement) {
		thumbnail.style.display = 'none';
		videoPlayer.style.display = 'block';
		void videoPlayer.play();
	}
}

export function initSite() {
	window.AOS?.init({ once: true });
	window.playVideo = playVideo;
	initNavLinks();
	initSmoothScroll();
	initScrollSpy();
}
