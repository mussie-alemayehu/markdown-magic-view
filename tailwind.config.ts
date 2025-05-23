
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						code: {
							backgroundColor: '#f3f4f6',
							padding: '0.2em 0.4em',
							borderRadius: '0.25rem',
							fontWeight: '400',
						},
						'pre code': {
							backgroundColor: 'transparent',
							padding: 0,
						},
					},
				},
				// Add support for dark mode in typography
				invert: {
					css: {
						code: {
							backgroundColor: '#374151',
						},
						a: {
							color: '#93c5fd',
						},
						h1: {
							color: '#f9fafb',
						},
						h2: {
							color: '#f3f4f6',
						},
						h3: {
							color: '#e5e7eb',
						},
						h4: {
							color: '#d1d5db',
						},
						blockquote: {
							color: '#9ca3af',
							borderLeftColor: '#4b5563',
						},
						hr: {
							borderColor: '#374151',
						},
						pre: {
							backgroundColor: '#1f2937',
						},
						strong: {
							color: '#f9fafb',
						},
						thead: {
							color: '#f9fafb',
							borderBottomColor: '#374151',
						},
						'tbody tr': {
							borderBottomColor: '#1f2937',
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
