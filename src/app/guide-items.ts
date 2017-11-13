import { Injectable } from '@angular/core';

export interface GuideItem {
	id: string;
	name: string;
	document: string;
	url: string;
}

const GUIDES: GuideItem[] = [
	{
		id: "getting-started",
		document: "assets/docs/guides/getting-started.html",
		url: "doc/guides/getting-started",
		name: "Getting Started"
	},
	{
		id: "generate-api-key",
		document: "assets/docs/guides/generate-api-key.html",
		url: "doc/guides/generate-api-key",
		name: "Generating an API Key"
	},
	{
		id: "troubleshooting",
		document: "assets/docs/guides/troubleshooting.html",
		url: "doc/guides/troubleshooting",
		name: "Troubleshooting"
	}
];
const DEV_GUIDES: GuideItem[] = [
	{
		id: "coding-standards",
		document: "assets/docs/dev/coding-standards.html",
		url: "doc/dev/coding-standards",
		name: "Coding standards"
	},
	{
		id: "contributing",
		document: "assets/docs/dev/contributing.html",
		url: "doc/dev/contributing",
		name: "Contributing"
	},
	{
		id: "shared-injectable",
		document: "assets/docs/dev/shared-injectable.html",
		url: "doc/dev/shared-injectable",
		name: "SharedInjectable (Injectable)"
	}
]
@Injectable()
export class GuideItems {
	getAllItems(): GuideItem[] {
		return GUIDES.concat(DEV_GUIDES);
	}
	getGuideItems(): GuideItem[] {
		return GUIDES;
	}
	getDevItems(): GuideItem[] {
		return DEV_GUIDES;
	}
	getDevItemById(id: string): GuideItem {
		return DEV_GUIDES.find(i => i.id === id);
	}
	getGuideItemById(id: string): GuideItem {
		return GUIDES.find(i => i.id === id);
	}
}