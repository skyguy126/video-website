export const SITE = {
	name: 'SkyFrame Studios',
	description: 'Bay Area photography and videography',
	email: 'info@skyframestudio.org',
	url: 'https://skyframestudio.org',
} as const;

export const NAV_LINKS = [
	{ href: '#hero', label: 'Home' },
	{ href: '#about', label: 'Our Studio' },
	{ href: '#portfolio', label: 'Portfolio' },
] as const;

export const TEAM = [
	{
		name: 'Vamsi',
		role: 'Videography Lead',
		image: '/images/people/vamsi.jpg',
		thumbClass: 'bg-secondary',
		active: true,
	},
	{
		name: 'Ishitha',
		role: 'Photography Lead',
		image: '/images/people/ishitha.jpg',
		thumbClass: 'bg-dark',
		active: false,
	},
] as const;

export const PORTFOLIO = {
	youtubeEmbedUrl: 'https://www.youtube.com/embed/v7H349HfeDk',
	images: [
		{ src: '/images/portfolio/pic_b.jpg', column: 'left' as const },
		{ src: '/images/portfolio/pic_a.jpg', column: 'right' as const, className: 'mt-5 mt-lg-0 mb-5' },
		{ src: '/images/portfolio/pic_c.jpg', column: 'right' as const },
	],
} as const;
