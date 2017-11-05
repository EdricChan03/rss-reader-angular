import { Injectable } from '@angular/core';

export interface GuideItem {
	id: string;
	name: string;
	document: string;
}

const GUIDES: GuideItem[] = [
	{
		id: "getting-started",
		document: "assets/docs/guides/getting-started.html",
		name: "Getting Started"
	},
	{
		id: "generate-api-key",
		document: "assets/docs/guides/generate-api-key.html",
		name: "Generating an API Key"
	},
	{
		id: "troubleshooting",
		document: "assets/docs/guides/troubleshooting.html",
		name: "Troubleshooting"
	}
];
const DEV_GUIDES: GuideItem[] = [
	{
		id: "coding-standards",
		document: "assets/docs/guides/shared-injectable.html",
		name: "Coding standards"
	},
	{
		id: "contributing",
		document: "assets/docs/guides/contributing.html",
		name: "Contributing"
	},
	{
		id: "shared-injectable",
		document: "assets/docs/guides/shared-injectable.html",
		name: "Shared (Injectable)"
	}
]
@Injectable()
export class GuideItems {

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